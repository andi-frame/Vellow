package routes

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/andi-frame/Vellow/backend/database"
	"github.com/andi-frame/Vellow/backend/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/markbates/goth/gothic"
)

type ProviderIndex struct {
	Providers    []string
	ProvidersMap map[string]string
}

type UserDataStrava struct {
	StravaID       string    `json:"strava_id"`
	Username       string    `json:"username"`
	AccessToken    string    `json:"access_token"`
	RefreshToken   string    `json:"refresh_token"`
	TokenExpiresAt time.Time `json:"token_expires_at"`
}

// Callback Google
func getAuthCallbackGoogle(c *gin.Context) {
	res := c.Writer
	req := c.Request.WithContext(context.WithValue(c.Request.Context(), gothic.ProviderParamKey, "google"))

	user, err := gothic.CompleteUserAuth(res, req)
	if err != nil {
		fmt.Fprintln(res, req)
		return
	}

	userId := uuid.New()
	userData := models.User{
		ID:        userId,
		GoogleID:  user.UserID,
		Email:     user.Email,
		AvatarURL: user.AvatarURL,
	}

	userJSON, err := json.Marshal(userData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to serialize google user data"})
		return
	}

	session, err := gothic.Store.Get(req, "vellow-session")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Session error: " + err.Error()})
		return
	}

	session.Values["user"] = string(userJSON)
	err = session.Save(req, res)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save session: " + err.Error()})
		return
	}

	fmt.Println("Google User Data:")
	fmt.Println(string(userJSON))

	c.Redirect(http.StatusFound, "http://localhost:3000/login-strava")
}

// Callback Strava
func getAuthCallbackStrava(c *gin.Context) {
	res := c.Writer
	req := c.Request.WithContext(context.WithValue(c.Request.Context(), gothic.ProviderParamKey, "strava"))

	// Get user session "vellow-session"
	session, err := gothic.Store.Get(req, "vellow-session")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Session error: " + err.Error()})
		return
	}

	// Retrieve user session data
	userSessionData, ok := session.Values["user"]
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No user session found"})
		return
	}

	// Deserialize user session data
	var userSession models.User
	err = json.Unmarshal([]byte(userSessionData.(string)), &userSession)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to deserialize session data"})
		return
	}

	// Authenticate with Strava
	stravaUser, err := gothic.CompleteUserAuth(res, req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to authenticate with Strava"})
		return
	}

	// Update user session data with Strava info
	userSession.StravaID = &stravaUser.UserID
	userSession.Username = stravaUser.NickName

	// Serialize updated user session data
	updatedUserJSON, err := json.Marshal(userSession)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to serialize updated session data"})
		return
	}

	// Save updated user data to session
	session.Values["user"] = string(updatedUserJSON)
	err = session.Save(req, res)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save updated session: " + err.Error()})
		return
	}

	// Store in db
	models.CreateUpdateUser(database.DB, userSession)

	// Deauthorize Strava after using
	deauthorizeStrava(stravaUser.AccessToken)

	fmt.Println("Updated User Data with Strava:")
	fmt.Println(string(updatedUserJSON))

	// Redirect after successful authentication
	c.Redirect(http.StatusFound, "http://localhost:3000/battle")
}

// Logout
func getAuthLogout(c *gin.Context) {
	res := c.Writer
	req := c.Request.WithContext(context.WithValue(c.Request.Context(), gothic.ProviderParamKey, c.Param("provider")))

	session, err := gothic.Store.Get(c.Request, "vellow-session")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Session error"})
		return
	}

	session.Options.MaxAge = -1
	session.Values = make(map[interface{}]interface{})
	session.Save(c.Request, c.Writer)

	gothic.Logout(res, req)
	c.SetCookie("vellow-session", "", -1, "/", "localhost", false, true)

	c.JSON(http.StatusOK, gin.H{"message": "Logged out successfully"})
}

// Get User Data -- soon will implement with new user model
func getUserData(c *gin.Context) {
	session, err := gothic.Store.Get(c.Request, "vellow-session")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Session error"})
		return
	}

	user, ok := session.Values["user"]
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	fmt.Println("Testing user")
	fmt.Println(user)

	var userData models.User
	err = json.Unmarshal([]byte(user.(string)), &userData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to deserialize user data"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "User data retrieved successfully",
		"data":    userData,
	})
}

// Auth login Google
func getAuthLoginGoogle(c *gin.Context) {
	res := c.Writer
	req := c.Request.WithContext(context.WithValue(c.Request.Context(), gothic.ProviderParamKey, "google"))

	_, err := gothic.CompleteUserAuth(res, req)
	if err != nil {
		gothic.BeginAuthHandler(res, req)
	}
}

// Auth Strava
func getAuthLoginStrava(c *gin.Context) {
	var err error
	res := c.Writer
	req := c.Request.WithContext(context.WithValue(c.Request.Context(), gothic.ProviderParamKey, "strava"))

	// Strava authentication
	_, err = gothic.CompleteUserAuth(res, req)
	if err != nil {
		gothic.BeginAuthHandler(res, req)
	}
}

// Strava Deauthorization API
func deauthorizeStrava(accessToken string) error {
	client := &http.Client{}
	req, err := http.NewRequest("POST", "https://www.strava.com/oauth/deauthorize", nil)
	if err != nil {
		fmt.Println(err)
		return err
	}

	// Set the Authorization header
	q := req.URL.Query()
	q.Add("access_token", accessToken)
	req.URL.RawQuery = q.Encode()

	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// Handle non-200 responses
	if resp.StatusCode != http.StatusOK {
		var responseData map[string]interface{}
		json.NewDecoder(resp.Body).Decode(&responseData)
		return fmt.Errorf("strava deauthorization failed: %v", responseData)
	}

	return nil
}

func Auth(r *gin.Engine) {
	r.GET("/auth/google/callback", getAuthCallbackGoogle)
	r.GET("/auth/strava/callback", getAuthCallbackStrava)
	r.GET("/logout/:provider", getAuthLogout)
	r.GET("/me", getUserData)
	r.GET("/auth/google", getAuthLoginGoogle)
	r.GET("/auth/strava", getAuthLoginStrava)
}

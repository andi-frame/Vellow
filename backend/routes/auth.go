package routes

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/markbates/goth/gothic"
)

type ProviderIndex struct {
	Providers    []string
	ProvidersMap map[string]string
}

type UserData struct {
	Name      string `json:"name"`
	Email     string `json:"email"`
	AvatarURL string `json:"avatarURL"`
	UserID    string `json:"googleId"`
}

func getAuthCallbackFunction(c *gin.Context) {
	res := c.Writer
	req := c.Request.WithContext(context.WithValue(c.Request.Context(), gothic.ProviderParamKey, c.Param("provider")))

	user, err := gothic.CompleteUserAuth(res, req)

	if err != nil {
		fmt.Fprintln(res, req)
		return
	}

	userData := UserData{
		Name:      user.Name,
		Email:     user.Email,
		AvatarURL: user.AvatarURL,
		UserID:    user.UserID,
	}
	userJSON, err := json.Marshal(userData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to serialize user data"})
		return
	}

	fmt.Println("Testing auth callback")

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

	fmt.Println(user)

	c.Redirect(http.StatusFound, "http://localhost:3000")
}

func getAuthLogoutFunction(c *gin.Context) {
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

	var userData UserData
	err = json.Unmarshal([]byte(user.(string)), &userData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to deserialize user data"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": userData})
}

func getAuthLoginFunction(c *gin.Context) {
	res := c.Writer
	req := c.Request.WithContext(context.WithValue(c.Request.Context(), gothic.ProviderParamKey, c.Param("provider")))

	_, err := gothic.CompleteUserAuth(res, req)
	if err != nil {
		gothic.BeginAuthHandler(res, req)
	}
}

func Auth(r *gin.Engine) {
	r.GET("/auth/:provider/callback", getAuthCallbackFunction)
	r.GET("/logout/:provider", getAuthLogoutFunction)
	r.GET("/me", getUserData)
	r.GET("/auth/:provider", getAuthLoginFunction)

}

package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Account struct {
	User_ID             uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey" json:"user_id"`
	Type                string    `json:"type"`
	Provider            string    `json:"provider"`
	Provider_Account_ID string    `json:"provider_account_id"`
	Refresh_Token       string    `json:"refresh_token"`
	Access_Token        string    `json:"access_token"`
	Expires_At          int       `json:"expires_at"`
	Token_Type          string    `json:"token_type"`
	Scope               string    `json:"scope"`
	ID_Token            string    `json:"id_token"`
	Session_State       string    `json:"session_state"`
}

type Session struct {
	Session_Token string    `json:"session_token"`
	User_ID       uuid.UUID `json:"user_id"`
	Expires       time.Time `json:"expires"`
}

type User struct {
	ID           uuid.UUID `json:"id"`
	Email        string    `json:"email"`
	Name         string    `json:"name"`
	AvatarURL    string    `json:"avatar_url"`
	GoogleID     string    `json:"google_id"`
	Role         string    `json:"role"`
	CreatedAt    time.Time `json:"created_at"`
	LastLoggedIn time.Time `json:"last_logged_in"`
}

func (t *User) BeforeCreate(tx *gorm.DB) (err error) {
	t.ID = uuid.New()
	return
}

func MigrateUser(DB *gorm.DB) error {
	err := DB.AutoMigrate(&User{})
	return err
}

func FindOrCreateUserByGoogleID(db *gorm.DB, googleID, email, name, avatarURL string) (*User, error) {
	var user User

	// Try to find user by GoogleID
	result := db.Where("google_id = ?", googleID).First(&user)

	if result.Error != nil {
		// User not found by GoogleID, check by email
		if result.Error == gorm.ErrRecordNotFound {
			// Check if user exists with this email
			emailResult := db.Where("email = ?", email).First(&user)

			if emailResult.Error == nil {
				// User exists with email, update GoogleID and info
				user.GoogleID = googleID
				user.Name = name
				user.AvatarURL = avatarURL
				user.LastLoggedIn = time.Now()
				db.Save(&user)
			} else {
				// User doesn't exist, create new one
				user = User{
					Email:        email,
					Name:         name,
					AvatarURL:    avatarURL,
					GoogleID:     googleID,
					LastLoggedIn: time.Now(),
				}
				result = db.Create(&user)
				if result.Error != nil {
					return nil, result.Error
				}
			}
		} else {
			// Some other database error
			return nil, result.Error
		}
	} else {
		// User found, update their info
		user.Name = name
		user.AvatarURL = avatarURL
		user.LastLoggedIn = time.Now()
		db.Save(&user)
	}

	return &user, nil
}

// GetUserByID gets a user by ID
func GetUserByID(db *gorm.DB, id uint) (*User, error) {
	var user User
	result := db.First(&user, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &user, nil
}

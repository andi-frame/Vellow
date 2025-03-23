package models

// import (
// 	"fmt"
// 	"time"

// 	"github.com/google/uuid"
// 	"gorm.io/gorm"
// )

// type ActiveStravaUser struct {
// 	ID             int       `json:"id" gorm:"primaryKey"`
// 	UserID         uuid.UUID `json:"user_id" gorm:"type:uuid;not null"`
// 	AccessToken    string    `json:"access_token" gorm:"not null"`
// 	RefreshToken   string    `json:"refresh_token" gorm:"not null"`
// 	TokenExpiresAt time.Time `json:"token_expires_at" gorm:"not null"`
// 	StravaID       string    `json:"strava_id" gorm:"not null;unique"`
// }

// // BeforeCreate hook to ensure ID is always set
// func (s *ActiveStravaUser) BeforeCreate(tx *gorm.DB) (err error) {
// 	return
// }

// // Migrate ActiveStravaUser model
// func MigrateActiveStravaUser(DB *gorm.DB) error {
// 	return DB.AutoMigrate(&ActiveStravaUser{})
// }

// func CreateUpdateActiveStravaUser(db *gorm.DB, userInput ActiveStravaUser) (*ActiveStravaUser, error) {
// 	var user = ActiveStravaUser{
// 		ID:             1,
// 		UserID:         userInput.UserID,
// 		StravaID:       userInput.StravaID,
// 		AccessToken:    userInput.AccessToken,
// 		RefreshToken:   userInput.RefreshToken,
// 		TokenExpiresAt: userInput.TokenExpiresAt,
// 	}

// 	result := db.First(&user, "id = 1")
// 	if result.Error != nil {
// 		if err := db.Create(&user).Error; err != nil {
// 			return nil, err
// 		}
// 	} else {
// 		if err := db.Save(&user).Error; err != nil {
// 			return nil, err
// 		}
// 	}

// 	return &user, nil
// }

// func GetActiveStravaUser(db *gorm.DB) (*ActiveStravaUser, error) {
// 	var user ActiveStravaUser
// 	fmt.Println("Tes 1")
// 	result := db.Where(&user, "id = 1")
// 	fmt.Println("Tes 2")

// 	if result.Error != nil {
// 		fmt.Println("Active kosong")
// 		return nil, result.Error
// 	}
// 	return &user, nil
// }

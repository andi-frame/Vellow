package models

import (
	"errors"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	ID           uuid.UUID  `json:"id" gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	Username     string     `json:"username" gorm:"default:'';not null"`
	Email        string     `json:"email" gorm:"not null;unique"`
	City         *string    `json:"city"`
	Country      *string    `json:"country"`
	Sex          *string    `json:"sex"`
	Subscribed   *bool      `json:"subscribed" gorm:"default:false"`
	AvatarURL    string     `json:"avatar_url" gorm:"not null"`
	RunningPoint int        `json:"running_point" gorm:"default:0"`
	Tier         *string    `json:"tier"`
	StravaID     *string    `json:"strava_id" gorm:"unique"`
	GoogleID     string     `json:"google_id" gorm:"not null;unique"`
	ClanID       *uuid.UUID `json:"clan_id" gorm:"type:uuid"`
	CreatedAt    time.Time  `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt    time.Time  `json:"updated_at" gorm:"autoUpdateTime"`
}

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	if u.ID == uuid.Nil {
		u.ID = uuid.New()
	}
	return
}

func MigrateUser(DB *gorm.DB) error {
	if DB.Migrator().HasTable(&User{}) {
		return nil
	}
	return DB.AutoMigrate(&User{})
}

func CreateUpdateUser(db *gorm.DB, user User) (*User, error) {
	if user.Email == "" || user.StravaID == nil || user.GoogleID == "" {
		return &user, errors.New("email, strava_id, and google_id is required")
	}

	// cek dengan id
	result := db.Where("id = ?", user.ID).First(&user)

	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			// cek dengan email
			emailResult := db.Where("email = ?", user.Email).First(&user)

			// user ditemukan -> update data
			if emailResult.Error == nil {
				if err := db.Save(&user).Error; err != nil {
					return nil, err
				}
			} else {
				// user tidak ditemukan -> buat data baru
				if err := db.Create(&user).Error; err != nil {
					return nil, err
				}
			}
		} else {
			return nil, result.Error
		}
	} else {
		db.Save(&user)
	}

	return &user, nil
}

// Cari user berdasarkan ID
func GetUserByID(db *gorm.DB, id uuid.UUID) (*User, error) {
	var user User
	result := db.First(&user, "id = ?", id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &user, nil
}

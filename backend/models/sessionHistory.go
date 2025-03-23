package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type SessionHistory struct {
	ID               uuid.UUID `json:"id" gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	UserID           uuid.UUID `json:"user_id" gorm:"type:uuid;not null"`
	GameID           uuid.UUID `json:"game_id" gorm:"type:uuid;not null"`
	TotalDistance    float64   `json:"total_distance" gorm:"not null"`
	AveragePace      float64   `json:"average_pace" gorm:"not null"`
	AverageElevation float64   `json:"average_elevation" gorm:"not null"`
	Map              string    `json:"map"`
	MovingTime       int       `json:"moving_time" gorm:"not null"`
	CreatedAt        time.Time `json:"created_at" gorm:"autoCreateTime"`
}

// BeforeCreate hook to generate UUID
func (s *SessionHistory) BeforeCreate(tx *gorm.DB) (err error) {
	if s.ID == uuid.Nil {
		s.ID = uuid.New()
	}
	return
}

// Migrate function
func MigrateSessionHistory(DB *gorm.DB) error {
	if DB.Migrator().HasTable(&SessionHistory{}) {
		return nil
	}
	return DB.AutoMigrate(&SessionHistory{})
}

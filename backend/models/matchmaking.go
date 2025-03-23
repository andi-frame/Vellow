package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Matchmaking struct {
	ID           uuid.UUID `json:"id" gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	UserID       uuid.UUID `json:"user_id" gorm:"type:uuid;not null"`
	Ranked       bool      `json:"ranked" gorm:"not null"`
	GameType     string    `json:"game_type" gorm:"not null"`
	PointType    string    `json:"point_type" gorm:"not null"`
	OpponentType string    `json:"opponent_type" gorm:"not null"`
	Duration     int       `json:"duration" gorm:"not null"`
	GamePoint    int       `json:"game_point" gorm:"not null"`
	CreatedAt    time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt    time.Time `json:"updated_at" gorm:"autoUpdateTime"`
}

func (m *Matchmaking) BeforeCreate(tx *gorm.DB) (err error) {
	m.ID = uuid.New()
	return
}

func MigrateMatchmaking(DB *gorm.DB) error {
	if DB.Migrator().HasTable(&Matchmaking{}) {
		return nil
	}
	return DB.AutoMigrate(&Matchmaking{})
}

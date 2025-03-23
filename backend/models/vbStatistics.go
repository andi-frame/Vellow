package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type VBStatistics struct {
	ID               uuid.UUID `json:"id" gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	GameID           uuid.UUID `json:"game_id" gorm:"type:uuid;not null"`
	UserID           uuid.UUID `json:"user_id" gorm:"type:uuid;not null"`
	TotalDistance    float64   `json:"total_distance" gorm:"not null"`
	AveragePace      float64   `json:"average_pace" gorm:"not null"`
	AverageElevation float64   `json:"average_elevation" gorm:"not null"`
	CreatedAt        time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt        time.Time `json:"updated_at" gorm:"autoUpdateTime"`
}

// BeforeCreate hook to generate UUID
func (v *VBStatistics) BeforeCreate(tx *gorm.DB) (err error) {
	if v.ID == uuid.Nil {
		v.ID = uuid.New()
	}
	return
}

// Migrate function
func MigrateVellowBattleStats(DB *gorm.DB) error {
	return DB.AutoMigrate(&VBStatistics{})
}

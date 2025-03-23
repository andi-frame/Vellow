package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type ProfileStatistics struct {
	ID                  uuid.UUID `json:"id" gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	UserID              uuid.UUID `json:"user_id" gorm:"type:uuid;not null;unique"`
	TotalDistance       float64   `json:"total_distance" gorm:"default:0"`
	RecentTotalDistance float64   `json:"recent_total_distance" gorm:"default:0"`
	WinRate             float64   `json:"win_rate" gorm:"default:0"`
	TotalVellowBattle   int       `json:"total_vellow_battle" gorm:"default:0"`
	CreatedAt           time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt           time.Time `json:"updated_at" gorm:"autoUpdateTime"`
}

// BeforeCreate hook to generate UUID
func (p *ProfileStatistics) BeforeCreate(tx *gorm.DB) (err error) {
	if p.ID == uuid.Nil {
		p.ID = uuid.New()
	}
	return
}

// Migrate function
func MigrateProfileStatistics(DB *gorm.DB) error {
	return DB.AutoMigrate(&ProfileStatistics{})
}

package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Clan struct {
	ID              uuid.UUID `json:"id" gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	Name            string    `json:"name" gorm:"not null;unique"`
	Location        string    `json:"location"`
	MinRunningPoint int       `json:"min_running_point" gorm:"not null"`
	LeaderID        uuid.UUID `json:"leader_id" gorm:"type:uuid;not null"`
	InBattle        bool      `json:"in_battle" gorm:"default:false"`
	CreatedAt       time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt       time.Time `json:"updated_at" gorm:"autoUpdateTime"`
}

// BeforeCreate hook to generate UUID
func (c *Clan) BeforeCreate(tx *gorm.DB) (err error) {
	if c.ID == uuid.Nil {
		c.ID = uuid.New()
	}
	return
}

// Migrate function
func MigrateClan(DB *gorm.DB) error {
	if DB.Migrator().HasTable(&Clan{}) {
		return nil
	}
	return DB.AutoMigrate(&Clan{})
}

package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Enum types
const (
	OpponentTypeInvitation = "invitation"
	OpponentTypeRandom     = "random"

	GameTypeDurasi = "durasi"
	GameTypeBP     = "GP"

	// Define your point types here
	PointType1 = "fast"
	PointType2 = "endurance"
	PointType3 = "trailing"
	PointType4 = "allRounded"
)

type VellowBattle struct {
	ID           uuid.UUID  `json:"id" gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	UserID1      uuid.UUID  `json:"user_id1" gorm:"type:uuid;not null"`
	UserID2      uuid.UUID  `json:"user_id2" gorm:"type:uuid;not null"`
	BattlePoint1 int        `json:"battle_point1" gorm:"default:0"`
	BattlePoint2 int        `json:"battle_point2" gorm:"default:0"`
	OpponentType string     `json:"opponent_type" gorm:"type:varchar(20);not null"`
	Ranked       bool       `json:"ranked" gorm:"default:false"`
	GameType     string     `json:"game_type" gorm:"type:varchar(10);not null"`
	PointType    string     `json:"point_type" gorm:"type:varchar(50);not null"`
	WinnerID     *uuid.UUID `json:"winner_id" gorm:"type:uuid"`
	CreatedAt    time.Time  `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt    time.Time  `json:"updated_at" gorm:"autoUpdateTime"`
	EndAt        *time.Time `json:"end_at"`
}

// BeforeCreate hook to generate UUID
func (v *VellowBattle) BeforeCreate(tx *gorm.DB) (err error) {
	if v.ID == uuid.Nil {
		v.ID = uuid.New()
	}
	return
}

// Migrate function
func MigrateVellowBattle(DB *gorm.DB) error {
	return DB.AutoMigrate(&VellowBattle{})
}

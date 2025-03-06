package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	ID        uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey" json:"id"`
	Name     string    `json:"name"`
	Desc      string    `json:"desc"`
	Completed bool      `json:"completed"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
}

func (t *User) BeforeCreate(tx *gorm.DB) (err error) {
	t.ID = uuid.New()
	return
}

func MigrateUser(DB *gorm.DB) error {
	err := DB.AutoMigrate(&User{})
	return err
}

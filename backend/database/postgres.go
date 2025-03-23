package database

import (
	"fmt"
	"log"
	"os"

	"github.com/andi-frame/Vellow/backend/models"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	var err error
	err = godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dsn := os.Getenv("DB_URL")
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to the database", err)
	}
	fmt.Println("Database connected!")

	err = models.MigrateUser(DB)
	if err != nil {
		log.Fatal("Failed to auto migrate user", err)
	}

	err = models.MigrateVellowBattle(DB)
	if err != nil {
		log.Fatal("Failed to auto migrate vellow battle", err)
	}

	err = models.MigrateVellowBattleStats(DB)
	if err != nil {
		log.Fatal("Failed to auto migrate vellow battle statistics", err)
	}

	err = models.MigrateSessionHistory(DB)
	if err != nil {
		log.Fatal("Failed to auto migrate session history", err)
	}

	err = models.MigrateClan(DB)
	if err != nil {
		log.Fatal("Failed to auto migrate clan", err)
	}

	err = models.MigrateProfileStatistics(DB)
	if err != nil {
		log.Fatal("Failed to auto migrate profile statistics", err)
	}

	err = models.MigrateMatchmaking(DB)
	if err != nil {
		log.Fatal("Failed to auto migrate matchmaking", err)
	}

	fmt.Println("Database migrated!")
}

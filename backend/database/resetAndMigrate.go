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

func ResetAndMigrateDB() {
	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Connect to database
	dsn := os.Getenv("DB_URL")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to the database", err)
	}
	fmt.Println("Database connected!")

	// Define all models to be dropped and migrated
	tables := []interface{}{
		&models.User{},
		&models.VellowBattle{},
		&models.VBStatistics{},
		&models.SessionHistory{},
		&models.Clan{},
		&models.ProfileStatistics{},
		&models.Matchmaking{},
	}

	// Drop all tables
	fmt.Println("Dropping all tables...")
	for _, table := range tables {
		if err := db.Migrator().DropTable(table); err != nil {
			log.Fatalf("Failed to drop table: %v", err)
		}
	}
	fmt.Println("All tables dropped successfully!")

	// Recreate all tables
	fmt.Println("Recreating all tables...")

	// Migrate User table
	if err := db.AutoMigrate(&models.User{}); err != nil {
		log.Fatalf("Failed to auto migrate user: %v", err)
	}

	// Migrate VellowBattle table
	if err := db.AutoMigrate(&models.VellowBattle{}); err != nil {
		log.Fatalf("Failed to auto migrate vellow battle: %v", err)
	}

	// Migrate VellowBattleStats table
	if err := db.AutoMigrate(&models.VBStatistics{}); err != nil {
		log.Fatalf("Failed to auto migrate vellow battle statistics: %v", err)
	}

	// Migrate SessionHistory table
	if err := db.AutoMigrate(&models.SessionHistory{}); err != nil {
		log.Fatalf("Failed to auto migrate session history: %v", err)
	}

	// Migrate Clan table
	if err := db.AutoMigrate(&models.Clan{}); err != nil {
		log.Fatalf("Failed to auto migrate clan: %v", err)
	}

	// Migrate ProfileStatistics table
	if err := db.AutoMigrate(&models.ProfileStatistics{}); err != nil {
		log.Fatalf("Failed to auto migrate profile statistics: %v", err)
	}

	// Migrate Matchmaking table
	if err := db.AutoMigrate(&models.Matchmaking{}); err != nil {
		log.Fatalf("Failed to auto migrate matchmaking: %v", err)
	}

	fmt.Println("All tables created successfully!")
	DB = db
}

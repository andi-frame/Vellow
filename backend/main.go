package main

import (
	// "github.com/andi-frame/Vellow/backend/database"
	"log"
	"os"

	"github.com/andi-frame/Vellow/backend/database"
	"github.com/andi-frame/Vellow/backend/routes"
	Auth "github.com/andi-frame/Vellow/backend/services/auth"
	"github.com/gin-gonic/gin"
)

func main() {
	Auth.NewAuth()
	database.InitDB()

	gin.SetMode(gin.DebugMode)

	r := routes.SetupRouter()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Start server
	log.Printf("Server running on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}

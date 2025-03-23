package routes

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// Health Check
	r.GET("/", HealthCheck)

	// Public routes
	// Public func routes
	Auth(r)

	// Protected routes
	// protected := r.Group("/api")
	// protected.Use(middleware.AuthMiddleware())
	// {
	// 	protected.GET("/profile", controllers.GetUserProfile)
	// }

	return r
}

package routes

import "github.com/gin-gonic/gin"

func Setup(r *gin.Engine) {
	r.GET("/health-check", HealthCheck)
}
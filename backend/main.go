package main

import (
	"github.com/andi-frame/Vellow/backend/database"
	"github.com/andi-frame/Vellow/backend/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	database.InitDB()

	r := gin.Default()
	routes.Setup(r)
	r.Run(":8080")
}

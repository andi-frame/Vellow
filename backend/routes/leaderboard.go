package routes

import (
	"net/http"

	"github.com/andi-frame/Vellow/backend/models"
	"github.com/andi-frame/Vellow/backend/services/leaderboard"
	"github.com/gin-gonic/gin"
)

func getLeaderboard(c *gin.Context) {
	category := c.DefaultQuery("category", "location")
	scope := c.DefaultQuery("scope", "national")
	searchQuery := c.DefaultQuery("search", "")

	// Validate category
	if category != "location" && category != "tier" {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid category parameter. Must be one of: location, tier",
		})
		return
	}

	validScope := true
	switch category {
	case "location":
		if scope != "province" && scope != "national" && scope != "worldwide" {
			validScope = false
		}
	case "tier":
		tierValues := []string{"Ruby", "Diamond", "Gold", "Silver", "Bronze", "Iron", "Newbie"}
		found := false
		for _, t := range tierValues {
			if scope == t {
				found = true
				break
			}
		}
		validScope = found
	}

	if !validScope {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid scope parameter for the selected category",
		})
		return
	}

	results, err := leaderboard.GetLeaderboardData(category, scope, searchQuery)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to fetch leaderboard data",
			"error":   err.Error(),
		})
		return
	}

	// Ensure results is never nil
	if results == nil {
		results = []models.LeaderboardEntry{}
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Leaderboard data retrieved successfully",
		"data":    results,
	})
}

func Leaderboard(r *gin.Engine) {
	r.GET("/api/leaderboard", getLeaderboard)
}
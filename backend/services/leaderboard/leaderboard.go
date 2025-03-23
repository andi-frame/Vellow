package leaderboard

import (
	"github.com/andi-frame/Vellow/backend/database"
	"github.com/andi-frame/Vellow/backend/models"
)

func GetLeaderboardData(category, scope string, searchQuery string) ([]models.LeaderboardEntry, error) {
	var results []models.LeaderboardEntry
	var err error

	if searchQuery != "" {
		results, err = models.SearchUsersLeaderboard(database.DB, category, scope, searchQuery)
	} else if category == "tier" {
		results, err = models.GetUsersByTierLeaderboard(database.DB, scope)
	} else if category == "location" {
		results, err = models.GetUsersByLocationLeaderboard(database.DB, scope)
	}

	// Ensure we always return an empty array instead of nil
	if results == nil {
		results = []models.LeaderboardEntry{}
	}

	return results, err
}
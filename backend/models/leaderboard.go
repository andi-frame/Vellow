package models

import (
	"gorm.io/gorm"
)

type LeaderboardEntry struct {
	Rank      int     `json:"rank"`
	Name      string  `json:"name"`
	Score     int     `json:"score"`
	Tier      *string `json:"tier,omitempty"`
	AvatarURL string  `json:"avatar_url"`
}

func GetUsersByLocationLeaderboard(db *gorm.DB, scope string) ([]LeaderboardEntry, error) {
	var entries []LeaderboardEntry
	var query string

	switch scope {
	case "province":
		query = `
			SELECT 
				ROW_NUMBER() OVER (ORDER BY running_point DESC) as rank,
				username as name, 
				running_point as score, 
				tier, 
				avatar_url
			FROM users
			WHERE city IS NOT NULL 
			ORDER BY running_point DESC
			LIMIT 100
		`
	case "national":
		query = `
			SELECT 
				ROW_NUMBER() OVER (ORDER BY running_point DESC) as rank,
				username as name, 
				running_point as score, 
				tier, 
				avatar_url
			FROM users
			WHERE country IS NOT NULL
			ORDER BY running_point DESC
			LIMIT 100
		`
	case "worldwide":
		query = `
			SELECT 
				ROW_NUMBER() OVER (ORDER BY running_point DESC) as rank,
				username as name, 
				running_point as score, 
				tier, 
				avatar_url
			FROM users
			ORDER BY running_point DESC
			LIMIT 100
		`
	}

	err := db.Raw(query).Scan(&entries).Error
	return entries, err
}

func GetUsersByTierLeaderboard(db *gorm.DB, tier string) ([]LeaderboardEntry, error) {
	var entries []LeaderboardEntry

	query := `
		SELECT 
			ROW_NUMBER() OVER (ORDER BY running_point DESC) as rank,
			username as name, 
			running_point as score, 
			tier, 
			avatar_url
		FROM users
		WHERE tier = ?
		ORDER BY running_point DESC
		LIMIT 100
	`

	err := db.Raw(query, tier).Scan(&entries).Error
	return entries, err
}

func SearchUsersLeaderboard(db *gorm.DB, category string, scope string, query string) ([]LeaderboardEntry, error) {
	var entries []LeaderboardEntry
	var sqlQuery string
	var params []interface{}

	if category == "tier" {
		sqlQuery = `
			SELECT 
				ROW_NUMBER() OVER (ORDER BY running_point DESC) as rank,
				username as name, 
				running_point as score, 
				tier, 
				avatar_url
			FROM users
			WHERE tier = ? AND username ILIKE ?
			ORDER BY running_point DESC
			LIMIT 100
		`
		params = append(params, scope, "%"+query+"%")
	} else {
		switch scope {
		case "province":
			sqlQuery = `
				SELECT 
					ROW_NUMBER() OVER (ORDER BY running_point DESC) as rank,
					username as name, 
					running_point as score, 
					tier, 
					avatar_url
				FROM users
				WHERE city IS NOT NULL AND username ILIKE ?
				ORDER BY running_point DESC
				LIMIT 100
			`
		case "national":
			sqlQuery = `
				SELECT 
					ROW_NUMBER() OVER (ORDER BY running_point DESC) as rank,
					username as name, 
					running_point as score, 
					tier, 
					avatar_url
				FROM users
				WHERE country IS NOT NULL AND username ILIKE ?
				ORDER BY running_point DESC
				LIMIT 100
			`
		case "worldwide":
			sqlQuery = `
				SELECT 
					ROW_NUMBER() OVER (ORDER BY running_point DESC) as rank,
					username as name, 
					running_point as score, 
					tier, 
					avatar_url
				FROM users
				WHERE username ILIKE ?
				ORDER BY running_point DESC
				LIMIT 100
			`
		}
		params = append(params, "%"+query+"%")
	}

	err := db.Raw(sqlQuery, params...).Scan(&entries).Error
	return entries, err
}
// services/leaderboardService.ts

type LeaderboardCategory = 'location' | 'tier';
type LocationScope = 'province' | 'national' | 'worldwide';
type TierScope = 'Ruby' | 'Diamond' | 'Gold' | 'Silver' | 'Bronze' | 'Iron' | 'Newbie';
type LeaderboardScope = LocationScope | TierScope;

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  tier?: string;
  avatar_url?: string;
}

export interface LeaderboardResponse {
  success: boolean;
  message: string;
  data: LeaderboardEntry[] | null;
}

const API_URL = 'http://localhost:8080';

export const fetchLeaderboard = async (
  category: LeaderboardCategory,
  scope: LeaderboardScope,
  searchQuery: string = ''
): Promise<LeaderboardEntry[]> => {
  try {
    let url = `${API_URL}/api/leaderboard?category=${category}&scope=${scope}`;
    
    if (searchQuery) {
      url += `&search=${encodeURIComponent(searchQuery)}`;
    }
    
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: LeaderboardResponse = await response.json();
    
    if (!data.success) {
      throw new Error(data.message);
    }
    
    // Handle null data by returning an empty array
    return data.data || [];
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    return [];
  }
};
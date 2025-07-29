// API service for game analytics data
const API_BASE_URL = 'http://localhost:5001/api'

// Type definitions matching the API response structure
export interface AgentPersona {
  name: string
  description: string
  goals: {
    explore_coverage?: number
    interaction_count?: number
    combat_engagement?: number
    objective_completion?: number
    score_maximization?: number
    defend_zone_success?: number
    ally_protection?: number
    agent_interference?: number
    objective_disruption?: number
  }
  behavior_parameters: {
    movement_speed: string
    pathfinding_bias?: string
    avoid_conflict?: boolean
    target_priority?: string
    retry_failed_objectives?: boolean
    patrol_radius?: number
    aggro_response_time?: number
    ignore_objectives?: boolean
  }
  alive_reward_modifier?: number
  death_penalty_modifier?: number
  jump_frequency_modifier?: number
  risk_tolerance?: number
  score_reward_modifier?: number
}

export interface GameSession {
  sessionId: string
  currentScore: number
  highScore: number
  timestamp: string
  isNewHighScore: boolean
  gameDuration: number
  pipesPassed: number
  playerName: string
  difficulty: string
  agentPersona?: string
  averageJumpInterval?: number
  jumps?: number
  longestSurvivalTime?: number
}

export interface GameStatistics {
  totalGamesPlayed: number
  averageScore: number
  bestScore: number
  totalPipesPassed: number
  totalPlayTime: number
  newHighScores: number
  lastUpdated: string
  averageGameDuration?: number
  bestSurvivalTime?: number
  totalJumps?: number
}

export interface GameSettings {
  autoSave: boolean
  jsonFormat: string
  includeTimestamps: boolean
  trackStatistics: boolean
  enablePersonaTracking?: boolean
}

export interface GameData {
  gameSessions: GameSession[]
  statistics: GameStatistics
  settings: GameSettings
  agent_personas: AgentPersona[]
}

export interface GameInfo {
  name: string
  icon: string
  gradient: string
  data: GameData
}

export interface ApiResponse {
  [gameId: string]: GameInfo
}

// API functions
export async function fetchGameData(gameId: string): Promise<GameInfo | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/${gameId}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    // The API returns the data directly, not wrapped in an object with gameId as key
    const data: GameInfo = await response.json()
    return data
  } catch (error) {
    console.error(`Error fetching game data for ${gameId}:`, error)
    return null
  }
}

export async function fetchAllGames(): Promise<{ [gameId: string]: GameInfo }> {
  try {
    // For now, we'll fetch known games. In the future, you might have an endpoint that lists all games
    const gameIds = ['flappy-bird'] // Add more game IDs as they become available
    const games: { [gameId: string]: GameInfo } = {}
    
    for (const gameId of gameIds) {
      const gameData = await fetchGameData(gameId)
      if (gameData) {
        games[gameId] = gameData
      }
    }
    
    return games
  } catch (error) {
    console.error('Error fetching all games:', error)
    return {}
  }
}

// Helper function to convert API data to the format expected by existing components
export function formatGameForCard(gameId: string, gameInfo: GameInfo) {
  const { data, name, icon, gradient } = gameInfo
  const { statistics } = data
  
  return {
    id: gameId,
    name,
    icon,
    totalSessions: statistics.totalGamesPlayed,
    averageScore: statistics.averageScore,
    bestScore: statistics.bestScore,
    totalPlayTime: statistics.totalPlayTime,
    lastPlayed: statistics.lastUpdated,
    gradient,
    accentColor: getAccentColor(gradient),
    trend: '+12%', // You might want to calculate this based on historical data
    status: 'active' as const,
  }
}

// Helper function to extract accent color from gradient
function getAccentColor(gradient: string): string {
  if (gradient.includes('blue')) return 'text-blue-400'
  if (gradient.includes('green') || gradient.includes('emerald')) return 'text-emerald-400'
  if (gradient.includes('purple')) return 'text-purple-400'
  if (gradient.includes('yellow') || gradient.includes('amber')) return 'text-yellow-400'
  return 'text-blue-400' // default
} 
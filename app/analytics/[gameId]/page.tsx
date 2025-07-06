import { GameAnalytics } from "@/components/game-analytics"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Import agent personas data
import agentPersonasData from "../../../sample-agent-data.json"

// Enhanced mock data with full analytics for all games
const gameData = {
  "flappy-bird": {
    name: "Flappy Bird",
    icon: "🐦",
    gradient: "from-sky-400 via-blue-500 to-blue-600",
    data: {
      gameSessions: [
        {
          sessionId: "session_001",
          currentScore: 5,
          highScore: 10,
          timestamp: "2024-01-15 14:30:25",
          isNewHighScore: false,
          gameDuration: 45.67,
          pipesPassed: 5,
          playerName: "Player1",
          difficulty: "normal",
        },
        {
          sessionId: "session_002",
          currentScore: 12,
          highScore: 12,
          timestamp: "2024-01-15 15:15:30",
          isNewHighScore: true,
          gameDuration: 78.92,
          pipesPassed: 12,
          playerName: "Player1",
          difficulty: "normal",
        },
        {
          sessionId: "session_003",
          currentScore: 8,
          highScore: 12,
          timestamp: "2024-01-15 16:00:15",
          isNewHighScore: false,
          gameDuration: 62.34,
          pipesPassed: 8,
          playerName: "Player1",
          difficulty: "normal",
        },
        {
          sessionId: "session_004",
          currentScore: 15,
          highScore: 15,
          timestamp: "2024-01-15 17:30:45",
          isNewHighScore: true,
          gameDuration: 95.12,
          pipesPassed: 15,
          playerName: "Player1",
          difficulty: "normal",
        },
        {
          sessionId: "session_005",
          currentScore: 3,
          highScore: 15,
          timestamp: "2024-01-15 18:45:20",
          isNewHighScore: false,
          gameDuration: 28.76,
          pipesPassed: 3,
          playerName: "Player1",
          difficulty: "normal",
        },
      ],
      statistics: {
        totalGamesPlayed: 5,
        averageScore: 8.6,
        bestScore: 15,
        totalPipesPassed: 43,
        totalPlayTime: 310.81,
        newHighScores: 2,
        lastUpdated: "2024-01-15 18:45:20",
      },
      settings: {
        autoSave: true,
        jsonFormat: "v1.0",
        includeTimestamps: true,
        trackStatistics: true,
      },
      agent_personas: agentPersonasData.agent_personas,
    },
  },
  "snake-game": {
    name: "Snake Game",
    icon: "🐍",
    gradient: "from-emerald-400 via-green-500 to-green-600",
    data: {
      gameSessions: [
        {
          sessionId: "snake_001",
          currentScore: 45,
          highScore: 45,
          timestamp: "2024-01-14 20:30:15",
          isNewHighScore: true,
          gameDuration: 120.5,
          pipesPassed: 45,
          playerName: "Player1",
          difficulty: "normal",
        },
        {
          sessionId: "snake_002",
          currentScore: 89,
          highScore: 89,
          timestamp: "2024-01-14 21:15:30",
          isNewHighScore: true,
          gameDuration: 180.25,
          pipesPassed: 89,
          playerName: "Player1",
          difficulty: "normal",
        },
      ],
      statistics: {
        totalGamesPlayed: 12,
        averageScore: 45.2,
        bestScore: 89,
        totalPipesPassed: 542,
        totalPlayTime: 1250.5,
        newHighScores: 4,
        lastUpdated: "2024-01-14 20:30:15",
      },
      settings: {
        autoSave: true,
        jsonFormat: "v1.0",
        includeTimestamps: true,
        trackStatistics: true,
      },
      agent_personas: agentPersonasData.agent_personas,
    },
  },
  tetris: {
    name: "Tetris",
    icon: "🧩",
    gradient: "from-purple-400 via-violet-500 to-purple-600",
    data: {
      gameSessions: [
        {
          sessionId: "tetris_001",
          currentScore: 1250,
          highScore: 1250,
          timestamp: "2024-01-13 16:22:10",
          isNewHighScore: true,
          gameDuration: 150.75,
          pipesPassed: 125,
          playerName: "Player1",
          difficulty: "normal",
        },
        {
          sessionId: "tetris_002",
          currentScore: 2340,
          highScore: 2340,
          timestamp: "2024-01-13 17:45:20",
          isNewHighScore: true,
          gameDuration: 220.5,
          pipesPassed: 234,
          playerName: "Player1",
          difficulty: "hard",
        },
      ],
      statistics: {
        totalGamesPlayed: 8,
        averageScore: 1250,
        bestScore: 2340,
        totalPipesPassed: 1000,
        totalPlayTime: 890.25,
        newHighScores: 3,
        lastUpdated: "2024-01-13 16:22:10",
      },
      settings: {
        autoSave: true,
        jsonFormat: "v1.0",
        includeTimestamps: true,
        trackStatistics: true,
      },
    },
  },
  "pac-man": {
    name: "Pac-Man",
    icon: "👻",
    gradient: "from-amber-400 via-yellow-500 to-orange-500",
    data: {
      gameSessions: [
        {
          sessionId: "pacman_001",
          currentScore: 3200,
          highScore: 3200,
          timestamp: "2024-01-12 19:45:30",
          isNewHighScore: true,
          gameDuration: 180.25,
          pipesPassed: 320,
          playerName: "Player1",
          difficulty: "normal",
        },
        {
          sessionId: "pacman_002",
          currentScore: 5670,
          highScore: 5670,
          timestamp: "2024-01-12 20:30:45",
          isNewHighScore: true,
          gameDuration: 240.5,
          pipesPassed: 567,
          playerName: "Player1",
          difficulty: "hard",
        },
      ],
      statistics: {
        totalGamesPlayed: 15,
        averageScore: 3200,
        bestScore: 5670,
        totalPipesPassed: 4800,
        totalPlayTime: 2100.75,
        newHighScores: 6,
        lastUpdated: "2024-01-12 19:45:30",
      },
      settings: {
        autoSave: true,
        jsonFormat: "v1.0",
        includeTimestamps: true,
        trackStatistics: true,
      },
      agent_personas: agentPersonasData.agent_personas,
    },
  },
}

interface AnalyticsPageProps {
  params: {
    gameId: string
  }
}

export default function AnalyticsPage({ params }: AnalyticsPageProps) {
  const game = gameData[params.gameId as keyof typeof gameData]

  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Game Not Found</h1>
            <Link href="/">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="mb-12">
            <Link href="/">
              <Button
                variant="ghost"
                className="mb-6 bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/80 text-gray-300 hover:text-white border border-gray-700/50 rounded-2xl px-6 py-3 transition-all duration-300"
              >
                <ArrowLeft className="h-5 w-5 mr-3" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-6 bg-gray-800/60 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-700/50">
              <div className={`text-6xl p-4 rounded-3xl bg-gradient-to-br ${game.gradient} shadow-2xl`}>
                {game.icon}
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-3">
                  {game.name} Analytics
                </h1>
                <p className="text-xl text-gray-400">Comprehensive performance insights and detailed statistics</p>
                <div className="flex items-center space-x-3 mt-4">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-300 tracking-wide">REAL-TIME DATA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Component */}
          <GameAnalytics data={game.data} gameGradient={game.gradient} />
        </div>
      </div>
    </div>
  )
}

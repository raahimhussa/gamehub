"use client"

import { GameAnalytics } from "@/components/game-analytics"
import { GameController } from "@/components/game-controller"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { fetchGameData, GameInfo } from "@/lib/api"

interface AnalyticsPageProps {
  params: {
    gameId: string
  }
}

export default function AnalyticsPage({ params }: AnalyticsPageProps) {
  const [game, setGame] = useState<GameInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadGameData() {
      try {
        const gameData = await fetchGameData(params.gameId)
        if (gameData) {
          setGame(gameData)
        } else {
          setError('Game not found')
        }
      } catch (err) {
        console.error('Error loading game data:', err)
        setError('Failed to load game data')
      } finally {
        setLoading(false)
      }
    }

    loadGameData()
  }, [params.gameId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-300">Loading game analytics...</p>
        </div>
      </div>
    )
  }

  if (error || !game) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{error || 'Game Not Found'}</h1>
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

          {/* Game Controller */}
          <div className="mb-8">
            <GameController gameId={params.gameId} />
          </div>

          {/* Analytics Component */}
          <GameAnalytics data={game.data} gameGradient={game.gradient} />
        </div>
      </div>
    </div>
  )
}

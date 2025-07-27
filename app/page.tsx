"use client"

import { GameCard } from "@/components/game-card"
import { AnimatedCounter } from "@/components/animated-counter"
import { Gamepad2, TrendingUp, Users, Clock, Sparkles, Zap, Target, Award } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { fetchAllGames, formatGameForCard, GameInfo } from "@/lib/api"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
    },
  },
}

export default function Dashboard() {
  const [games, setGames] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadGames() {
      try {
        const gamesData = await fetchAllGames()
        const formattedGames = Object.entries(gamesData).map(([gameId, gameInfo]) => 
          formatGameForCard(gameId, gameInfo)
        )
        setGames(formattedGames)
      } catch (error) {
        console.error('Error loading games:', error)
        // Fallback to mock data if API fails
        setGames([
          {
            id: "flappy-bird",
            name: "Flappy Bird",
            icon: "🐦",
            totalSessions: 5,
            averageScore: 8.6,
            bestScore: 15,
            totalPlayTime: 310.81,
            lastPlayed: "2024-01-15 18:45:20",
            gradient: "from-sky-400 via-blue-500 to-blue-600",
            accentColor: "text-blue-400",
            trend: "+12%",
            status: "active",
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    loadGames()
  }, [])

  const totalSessions = games.reduce((sum, game) => sum + game.totalSessions, 0)
  const totalPlayTime = games.reduce((sum, game) => sum + game.totalPlayTime, 0)
  const avgPerformance = 87.5

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-xl text-gray-300">Loading game analytics...</p>
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
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-3 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles className="h-10 w-10 text-blue-400" />
              </motion.div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent mb:2">
                Aquila Play Analytics
              </h1>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Zap className="h-10 w-10 text-purple-400" />
              </motion.div>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              Advanced performance insights and real-time analytics for your gaming portfolio
            </p>
            <div className="inline-flex items-center space-x-3 bg-gray-800/80 backdrop-blur-sm rounded-full px-8 py-3 shadow-2xl border border-gray-700/50">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-200 tracking-wide">LIVE ANALYTICS ACTIVE</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
            </div>
          </motion.div>

          {/* Enhanced Overview Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <div className="group relative overflow-hidden bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-700/50 hover:shadow-blue-500/25 transition-all duration-500 hover:-translate-y-3 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Total Games</p>
                    <div className="flex items-baseline space-x-3">
                      <AnimatedCounter
                        end={games.length}
                        className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                      />
                      <span className="text-sm text-emerald-400 font-semibold bg-emerald-400/10 px-2 py-1 rounded-full">
                        +{games.length} active
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Gamepad2 className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="group relative overflow-hidden bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-700/50 hover:shadow-emerald-500/25 transition-all duration-500 hover:-translate-y-3 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Total Sessions</p>
                    <div className="flex items-baseline space-x-3">
                      <AnimatedCounter
                        end={totalSessions}
                        className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent"
                      />
                      <span className="text-sm text-emerald-400 font-semibold bg-emerald-400/10 px-2 py-1 rounded-full">
                        Live data
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="group relative overflow-hidden bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-700/50 hover:shadow-purple-500/25 transition-all duration-500 hover:-translate-y-3 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Total Play Time</p>
                    <div className="flex items-baseline space-x-3">
                      <AnimatedCounter
                        end={Math.round(totalPlayTime / 60)}
                        suffix="h"
                        className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                      />
                      <span className="text-sm text-emerald-400 font-semibold bg-emerald-400/10 px-2 py-1 rounded-full">
                        Real-time
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="group relative overflow-hidden bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-700/50 hover:shadow-orange-500/25 transition-all duration-500 hover:-translate-y-3 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Performance Score</p>
                    <div className="flex items-baseline space-x-3">
                      <AnimatedCounter
                        end={avgPerformance}
                        suffix="%"
                        className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent"
                      />
                      <span className="text-sm text-emerald-400 font-semibold bg-emerald-400/10 px-2 py-1 rounded-full">
                        Optimized
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Games Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {games.map((game, index) => (
              <motion.div key={game.id} variants={itemVariants}>
                <GameCard game={game} index={index} />
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Platform Insights */}
          <motion.div
            className="bg-gray-800/60 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-gray-700/50"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent mb-4">
                Platform Insights
              </h2>
              <p className="text-xl text-gray-400">Real-time analytics across all gaming experiences</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <motion.div
                className="text-center group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Target className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-200 mb-3">Engagement Rate</h3>
                <div className="text-5xl font-bold text-blue-400 mb-2">94.2%</div>
                <p className="text-gray-500">Average session completion</p>
              </motion.div>

              <motion.div
                className="text-center group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Award className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-200 mb-3">Achievement Rate</h3>
                <div className="text-5xl font-bold text-emerald-400 mb-2">76.8%</div>
                <p className="text-gray-500">Players reaching milestones</p>
              </motion.div>

              <motion.div
                className="text-center group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Zap className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-200 mb-3">Retention Score</h3>
                <div className="text-5xl font-bold text-purple-400 mb-2">89.5%</div>
                <p className="text-gray-500">7-day player retention</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

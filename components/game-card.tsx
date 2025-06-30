"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Trophy, TrendingUp, Play, Sparkles, FlameIcon as Fire, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface Game {
  id: string
  name: string
  icon: string
  totalSessions: number
  averageScore: number
  bestScore: number
  totalPlayTime: number
  lastPlayed: string
  gradient: string
  accentColor: string
  trend: string
  status: string
}

interface GameCardProps {
  game: Game
  index: number
}

export function GameCard({ game, index }: GameCardProps) {
  const router = useRouter()

  const handleViewAnalytics = () => {
    router.push(`/analytics/${game.id}`)
  }

  const formatPlayTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "trending":
        return <TrendingUp className="h-4 w-4" />
      case "hot":
        return <Fire className="h-4 w-4" />
      case "popular":
        return <Star className="h-4 w-4" />
      default:
        return <Sparkles className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "trending":
        return "bg-emerald-900/50 text-emerald-300 border-emerald-700/50"
      case "hot":
        return "bg-red-900/50 text-red-300 border-red-700/50"
      case "popular":
        return "bg-yellow-900/50 text-yellow-300 border-yellow-700/50"
      default:
        return "bg-blue-900/50 text-blue-300 border-blue-700/50"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -12, scale: 1.03 }}
      className="group h-full"
    >
      <Card className="relative overflow-hidden bg-gray-800/80 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-3xl border border-gray-700/50 h-full flex flex-col min-h-[500px]">
        {/* Gradient Background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500`}
        />

        {/* Animated Border */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-gray-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <CardHeader className="pb-6 relative z-10 flex-shrink-0">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <motion.div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${game.gradient} flex items-center justify-center text-3xl shadow-xl`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                {game.icon}
              </motion.div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-100 group-hover:text-white transition-colors">
                  {game.name}
                </CardTitle>
                <p className="text-sm text-gray-400 mt-1">Last played {formatDate(game.lastPlayed)}</p>
              </div>
            </div>
            <Badge className={`${getStatusColor(game.status)} border font-semibold px-3 py-1`}>
              <span className="flex items-center space-x-1">
                {getStatusIcon(game.status)}
                <span className="capitalize">{game.status}</span>
              </span>
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <Badge variant="outline" className="bg-gray-700/50 border-gray-600 text-gray-300 px-3 py-1">
              {game.totalSessions} sessions
            </Badge>
            <div
              className={`text-sm font-bold ${game.accentColor} flex items-center space-x-1 bg-gray-700/30 px-3 py-1 rounded-full`}
            >
              <TrendingUp className="h-3 w-3" />
              <span>{game.trend}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 relative z-10 flex-grow flex flex-col justify-between p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                className="bg-gradient-to-br from-yellow-900/40 to-orange-900/40 rounded-2xl p-5 border border-yellow-800/40 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center space-x-2 mb-3">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  <span className="text-xs font-bold text-yellow-300 uppercase tracking-wide">Best Score</span>
                </div>
                <p className="text-3xl font-bold text-yellow-200">{game.bestScore.toLocaleString()}</p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-emerald-900/40 to-green-900/40 rounded-2xl p-5 border border-emerald-800/40 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center space-x-2 mb-3">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide">Avg Score</span>
                </div>
                <p className="text-3xl font-bold text-emerald-200">{game.averageScore.toLocaleString()}</p>
              </motion.div>
            </div>

            <motion.div
              className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 rounded-2xl p-5 border border-blue-800/40 backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center space-x-2 mb-3">
                <Clock className="h-5 w-5 text-blue-400" />
                <span className="text-xs font-bold text-blue-300 uppercase tracking-wide">Total Play Time</span>
              </div>
              <p className="text-2xl font-bold text-blue-200">{formatPlayTime(game.totalPlayTime)}</p>
            </motion.div>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-8">
            <Button
              onClick={handleViewAnalytics}
              className={`w-full bg-gradient-to-r ${game.gradient} hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 text-white font-bold py-4 px-6 rounded-2xl border-0 text-lg shadow-xl ring-2 ring-white/10 hover:ring-white/30 hover:scale-105`}
            >
              <Play className="h-6 w-6 mr-3" />
              View Analytics
              <Sparkles className="h-6 w-6 ml-3" />
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

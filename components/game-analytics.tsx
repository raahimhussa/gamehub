"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedCounter } from "@/components/animated-counter"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { Trophy, Target, Clock, TrendingUp, GamepadIcon, Star, Calendar, Timer, Users } from "lucide-react"
import { motion } from "framer-motion"

interface GameSession {
  sessionId: string
  currentScore: number
  highScore: number
  timestamp: string
  isNewHighScore: boolean
  gameDuration: number
  pipesPassed: number
  playerName: string
  difficulty: string
}

interface Statistics {
  totalGamesPlayed: number
  averageScore: number
  bestScore: number
  totalPipesPassed: number
  totalPlayTime: number
  newHighScores: number
  lastUpdated: string
}

interface AgentPersona {
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
}

interface GameData {
  gameSessions: GameSession[]
  statistics: Statistics
  agent_personas?: AgentPersona[]
  settings: {
    autoSave: boolean
    jsonFormat: string
    includeTimestamps: boolean
    trackStatistics: boolean
  }
}

interface GameAnalyticsProps {
  data: GameData
  gameGradient?: string
}

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
      type: "spring",
      stiffness: 100,
    },
  },
}

export function GameAnalytics({ data, gameGradient = "from-blue-400 to-purple-600" }: GameAnalyticsProps) {
  const { gameSessions, statistics, agent_personas } = data

  // Prepare chart data
  const scoreProgressionData = gameSessions.map((session, index) => ({
    session: index + 1,
    score: session.currentScore,
    highScore: session.highScore,
    duration: session.gameDuration,
    timestamp: new Date(session.timestamp).toLocaleDateString(),
  }))

  const durationData = gameSessions.map((session, index) => ({
    session: `S${index + 1}`,
    duration: Math.round(session.gameDuration),
    score: session.currentScore,
  }))

  const performanceData = [
    { name: "High Scores", value: statistics.newHighScores, color: "#10B981" },
    { name: "Regular Games", value: statistics.totalGamesPlayed - statistics.newHighScores, color: "#6B7280" },
  ]

  // Prepare agent personas grouped bar chart data
  const agentPersonasColors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"]
  
  // Get all unique goal keys for bar chart
  const allGoalKeys = agent_personas?.reduce((keys, persona) => {
    Object.keys(persona.goals).forEach(key => {
      if (!keys.includes(key)) keys.push(key)
    })
    return keys
  }, [] as string[]) || []

  // Create grouped bar chart data structure
  const groupedBarChartData = allGoalKeys.map(goalKey => {
    const dataPoint: any = {
      goal: goalKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    }
    
    agent_personas?.forEach((persona) => {
      dataPoint[persona.name] = persona.goals[goalKey as keyof typeof persona.goals] || 0
    })
    
    return dataPoint
  })

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const formatPlayTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
  }

  return (
    <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <motion.div variants={itemVariants}>
          <Card className="group relative overflow-hidden bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-700/50 hover:shadow-blue-500/25 transition-all duration-500 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
              <CardTitle className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Games</CardTitle>
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <GamepadIcon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex items-baseline space-x-3">
                <AnimatedCounter
                  end={statistics.totalGamesPlayed}
                  className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">{statistics.newHighScores} new high scores</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="group relative overflow-hidden bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-700/50 hover:shadow-yellow-500/25 transition-all duration-500 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
              <CardTitle className="text-sm font-bold text-gray-400 uppercase tracking-wider">Best Score</CardTitle>
              <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Trophy className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex items-baseline space-x-3">
                <AnimatedCounter
                  end={statistics.bestScore}
                  className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">Avg: {statistics.averageScore.toFixed(1)}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="group relative overflow-hidden bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-700/50 hover:shadow-purple-500/25 transition-all duration-500 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
              <CardTitle className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                Total Play Time
              </CardTitle>
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex items-baseline space-x-3">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {formatPlayTime(statistics.totalPlayTime)}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Avg: {formatTime(statistics.totalPlayTime / statistics.totalGamesPlayed)}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="group relative overflow-hidden bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-700/50 hover:shadow-emerald-500/25 transition-all duration-500 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
              <CardTitle className="text-sm font-bold text-gray-400 uppercase tracking-wider">Pipes Passed</CardTitle>
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Target className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex items-baseline space-x-3">
                <AnimatedCounter
                  end={statistics.totalPipesPassed}
                  className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Avg: {(statistics.totalPipesPassed / statistics.totalGamesPlayed).toFixed(1)} per game
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={itemVariants}>
          <Card className="bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-b border-gray-700/50">
              <CardTitle className="flex items-center space-x-3 text-lg font-bold text-gray-100">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                <span>Score Progression</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={scoreProgressionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="session" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "12px",
                      color: "#F3F4F6",
                    }}
                    formatter={(value, name) => [value, name === "score" ? "Current Score" : "High Score"]}
                    labelFormatter={(label) => `Session ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="highScore"
                    stroke="#10B981"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-b border-gray-700/50">
              <CardTitle className="flex items-center space-x-3 text-lg font-bold text-gray-100">
                <Timer className="h-5 w-5 text-purple-400" />
                <span>Game Duration vs Score</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={durationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="session" stroke="#9CA3AF" />
                  <YAxis yAxisId="left" stroke="#9CA3AF" />
                  <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "12px",
                      color: "#F3F4F6",
                    }}
                  />
                  <Bar yAxisId="left" dataKey="duration" fill="#8B5CF6" name="Duration (s)" />
                  <Bar yAxisId="right" dataKey="score" fill="#F59E0B" name="Score" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={itemVariants}>
          <Card className="bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-b border-gray-700/50">
              <CardTitle className="flex items-center space-x-3 text-lg font-bold text-gray-100">
                <Star className="h-5 w-5 text-yellow-400" />
                <span>Performance Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={performanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "12px",
                      color: "#F3F4F6",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center space-x-4 mt-4">
                {performanceData.map((entry, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="text-sm text-gray-300">{entry.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-b border-gray-700/50">
              <CardTitle className="flex items-center space-x-3 text-lg font-bold text-gray-100">
                <Calendar className="h-5 w-5 text-emerald-400" />
                <span>Recent Sessions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {gameSessions
                  .slice(-3)
                  .reverse()
                  .map((session) => (
                    <div
                      key={session.sessionId}
                      className="flex items-center justify-between p-3 bg-gray-700/50 rounded-2xl border border-gray-600/50"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-200">Score: {session.currentScore}</span>
                          <span className="text-sm text-gray-400">
                            {formatTime(session.gameDuration)} • {session.pipesPassed} pipes
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {session.isNewHighScore && (
                          <Badge className="bg-green-900/50 text-green-300 border-green-700/50">New High Score!</Badge>
                        )}
                        <span className="text-sm text-gray-400">
                          {new Date(session.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Agent Personas Chart */}
      {agent_personas && agent_personas.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card className="bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-b border-gray-700/50">
              <CardTitle className="flex items-center space-x-3 text-lg font-bold text-gray-100">
                <Users className="h-5 w-5 text-indigo-400" />
                <span>Agent Personas Goal Comparison</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={groupedBarChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="goal" 
                    stroke="#9CA3AF"
                    tick={{ fill: "#9CA3AF", fontSize: 12 }}
                    axisLine={{ stroke: "#374151" }}
                  />
                  <YAxis 
                    domain={[0, 1]}
                    stroke="#9CA3AF"
                    tick={{ fill: "#9CA3AF", fontSize: 10 }}
                    axisLine={{ stroke: "#374151" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "12px",
                      color: "#F3F4F6",
                    }}
                  />
                  <Legend />
                  {agent_personas?.map((persona, index) => (
                    <Bar
                      key={persona.name}
                      dataKey={persona.name}
                      fill={agentPersonasColors[index % agentPersonasColors.length]}
                      radius={[4, 4, 0, 0]}
                      name={persona.name}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
              
              {/* Agent Personas Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {agent_personas.map((persona, index) => (
                  <div
                    key={persona.name}
                    className="p-4 bg-gray-700/50 rounded-2xl border border-gray-600/50"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: agentPersonasColors[index % agentPersonasColors.length] }}
                      />
                      <h4 className="font-bold text-gray-200">{persona.name}</h4>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{persona.description}</p>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-500">Movement: {persona.behavior_parameters.movement_speed}</div>
                      {persona.behavior_parameters.target_priority && (
                        <div className="text-xs text-gray-500">Priority: {persona.behavior_parameters.target_priority}</div>
                      )}
                      {persona.behavior_parameters.patrol_radius && (
                        <div className="text-xs text-gray-500">Patrol: {persona.behavior_parameters.patrol_radius}m</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Detailed Sessions Table */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-b border-gray-700/50">
            <CardTitle className="text-lg font-bold text-gray-100">All Game Sessions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="text-left p-3 font-bold text-gray-300 uppercase tracking-wider">Session</th>
                    <th className="text-left p-3 font-bold text-gray-300 uppercase tracking-wider">Score</th>
                    <th className="text-left p-3 font-bold text-gray-300 uppercase tracking-wider">High Score</th>
                    <th className="text-left p-3 font-bold text-gray-300 uppercase tracking-wider">Duration</th>
                    <th className="text-left p-3 font-bold text-gray-300 uppercase tracking-wider">Pipes Passed</th>
                    <th className="text-left p-3 font-bold text-gray-300 uppercase tracking-wider">Date</th>
                    <th className="text-left p-3 font-bold text-gray-300 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {gameSessions.map((session, index) => (
                    <tr
                      key={session.sessionId}
                      className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors duration-200"
                    >
                      <td className="p-3 font-medium text-gray-200">#{index + 1}</td>
                      <td className="p-3 text-blue-400 font-bold">{session.currentScore}</td>
                      <td className="p-3 text-emerald-400 font-bold">{session.highScore}</td>
                      <td className="p-3 text-gray-300">{formatTime(session.gameDuration)}</td>
                      <td className="p-3 text-gray-300">{session.pipesPassed}</td>
                      <td className="p-3 text-gray-300">{new Date(session.timestamp).toLocaleDateString()}</td>
                      <td className="p-4">
                        {session.isNewHighScore ? (
                          <Badge className="bg-green-900/50 text-green-300 border-green-700/50">High Score</Badge>
                        ) : (
                          <Badge className="bg-gray-700/50 text-gray-300 border-gray-600/50">Regular</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

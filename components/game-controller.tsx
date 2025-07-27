"use client"

import { Button } from "@/components/ui/button"
import { Play, Square, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

interface GameControllerProps {
  gameId: string
}

export function GameController({ gameId }: GameControllerProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check game status on component mount
  useEffect(() => {
    checkGameStatus()
  }, [])

  const checkGameStatus = async () => {
    try {
      const response = await fetch('/api/game/status')
      const data = await response.json()
      setIsRunning(data.isRunning || false)
    } catch (err) {
      console.error('Error checking game status:', err)
    }
  }

  const startGame = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/game/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameId }),
      })

      const data = await response.json()
      
      if (response.ok) {
        setIsRunning(true)
      } else {
        setError(data.error || 'Failed to start game')
      }
    } catch (err) {
      setError('Failed to connect to game service')
      console.error('Error starting game:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const stopGame = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/game/stop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      
      if (response.ok) {
        setIsRunning(false)
      } else {
        setError(data.error || 'Failed to stop game')
      }
    } catch (err) {
      setError('Failed to connect to game service')
      console.error('Error stopping game:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-100 mb-2">Unity Game Control</h3>
          <p className="text-gray-400 text-sm">
            {isRunning ? 'Game is currently running' : 'Game is stopped'}
          </p>
          {error && (
            <p className="text-red-400 text-sm mt-2">{error}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-emerald-400 animate-pulse' : 'bg-gray-500'}`} />
          
          {!isRunning ? (
            <Button
              onClick={startGame}
              disabled={isLoading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <Play className="h-5 w-5 mr-2" />
              )}
              Start Game
            </Button>
          ) : (
            <Button
              onClick={stopGame}
              disabled={isLoading}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/25"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <Square className="h-5 w-5 mr-2" />
              )}
              Stop Game
            </Button>
          )}
        </div>
      </div>
    </div>
  )
} 
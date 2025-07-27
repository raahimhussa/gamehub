import { NextRequest, NextResponse } from 'next/server'
import { spawn, ChildProcess } from 'child_process'
import path from 'path'

// Global process reference (in production, you'd want to use a proper state management solution)
declare global {
  var gameProcess: ChildProcess | null
}

export async function POST(request: NextRequest) {
  try {
    const { gameId } = await request.json()
    
    // Stop any existing process first
    if ((global as any).gameProcess) {
      (global as any).gameProcess.kill()
      ;(global as any).gameProcess = null
    }

    // Configure game-specific settings
    const gameConfigs: Record<string, any> = {
      'flappy-bird': {
        location: "D:\\Aquila Play\\Executables\\Flappy",
        exe: "My project.exe"
      },
      // Add other games here as needed
    }

    const config = gameConfigs[gameId]
    if (!config) {
      return NextResponse.json({ error: 'Game configuration not found' }, { status: 404 })
    }

    // Start the Unity game process (just like double-clicking the exe)
    const execPath = path.join(config.location, config.exe)
    
    ;(global as any).gameProcess = spawn(execPath, [], {
      cwd: config.location,
      detached: false,
      stdio: 'ignore'
    })

    ;(global as any).gameProcess.on('error', (error: Error) => {
      console.error('Game process error:', error)
      ;(global as any).gameProcess = null
    })

    ;(global as any).gameProcess.on('exit', (code: number) => {
      console.log(`Game process exited with code ${code}`)
      ;(global as any).gameProcess = null
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Game started successfully',
      processId: (global as any).gameProcess.pid 
    })

  } catch (error) {
    console.error('Error starting game:', error)
    return NextResponse.json({ 
      error: 'Failed to start game',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 
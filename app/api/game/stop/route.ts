import { NextRequest, NextResponse } from 'next/server'
import { ChildProcess } from 'child_process'

// This would ideally be managed through a proper state management solution
// For now, we'll use a global reference (not recommended for production)
declare global {
  var gameProcess: ChildProcess | null
}

export async function POST(request: NextRequest) {
  try {
    // Access the global process reference
    const gameProcess = (global as any).gameProcess

    if (!gameProcess) {
      return NextResponse.json({ 
        error: 'No active game process found' 
      }, { status: 404 })
    }

    // Stop the game process
    gameProcess.kill('SIGTERM')
    
    // Clear the global reference
    ;(global as any).gameProcess = null

    return NextResponse.json({ 
      success: true, 
      message: 'Game stopped successfully' 
    })

  } catch (error) {
    console.error('Error stopping game:', error)
    return NextResponse.json({ 
      error: 'Failed to stop game',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 
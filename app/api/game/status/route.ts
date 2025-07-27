import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Check if there's an active game process
    const gameProcess = (global as any).gameProcess
    
    const isRunning = gameProcess && !gameProcess.killed
    
    return NextResponse.json({ 
      isRunning,
      processId: isRunning ? gameProcess.pid : null
    })

  } catch (error) {
    console.error('Error checking game status:', error)
    return NextResponse.json({ 
      error: 'Failed to check game status',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 
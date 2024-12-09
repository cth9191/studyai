import { NextResponse } from 'next/server'
import { dbClient } from '@/lib/db'

export async function GET() {
  try {
    const documents = await dbClient.document.findMany()
    return NextResponse.json(documents)
  } catch (error) {
    console.error('Error fetching documents:', error)
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    )
  }
} 
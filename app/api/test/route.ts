import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Test endpoint is working' })
}

export async function POST() {
  return NextResponse.json({ message: 'Test POST endpoint is working' })
} 
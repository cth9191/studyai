import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { dbClient } from '@/lib/db'

// Ensure uploads directory exists
const ensureUploadsDir = async () => {
  try {
    await mkdir(path.join(process.cwd(), 'uploads'), { recursive: true })
  } catch (error) {
    console.error('Error creating uploads directory:', error)
  }
}

export async function POST(request: NextRequest) {
  console.log('POST request received')
  
  try {
    await ensureUploadsDir()
    
    // Log the request method and headers
    console.log('Request method:', request.method)
    console.log('Request headers:', Object.fromEntries(request.headers.entries()))
    
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    
    console.log('FormData received:', {
      hasFile: formData.has('file'),
      fileInfo: file ? {
        name: file.name,
        type: file.type,
        size: file.size
      } : null
    })

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Create unique filename
    const buffer = await file.arrayBuffer()
    const filename = `${Date.now()}-${file.name}`
    const filepath = path.join(process.cwd(), 'uploads', filename)
    
    console.log('Saving file to:', filepath)
    
    // Save file
    await writeFile(filepath, Buffer.from(buffer))
    
    console.log('File saved, creating database entry')
    
    // Save to database
    const document = await dbClient.document.create({
      data: {
        filename,
        originalName: file.name,
        filepath,
        mimeType: file.type,
      }
    })
    
    console.log('Database entry created:', document)

    return NextResponse.json({
      documentId: document.id,
      message: 'Upload successful'
    })
    
  } catch (error) {
    console.error('Error in POST handler:', error)
    
    // Ensure we're returning a proper JSON response even for errors
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to upload document',
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}

// Add GET method for testing
export async function GET() {
  return NextResponse.json({ message: 'Upload endpoint is working' })
} 
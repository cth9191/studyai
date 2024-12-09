import fs from 'fs/promises'
import path from 'path'

async function createTestDocuments() {
  const testDir = path.join(process.cwd(), 'test-documents')
  
  try {
    await fs.mkdir(testDir, { recursive: true })
    
    // Create a test TXT file
    await fs.writeFile(
      path.join(testDir, 'test.txt'),
      'This is a test document.\nIt has multiple lines.\nWe can use it for testing.'
    )
    
    // Create a simple test PDF (you'll need to create this manually)
    console.log('Please create a test PDF file manually in:', testDir)
    
    console.log('Test documents created in:', testDir)
  } catch (error) {
    console.error('Error creating test documents:', error)
  }
}

createTestDocuments() 
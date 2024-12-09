import { createWorker } from 'tesseract.js'
import { default as pdfParse } from 'pdf-parse'
import * as mammoth from 'mammoth'
import { readFile } from 'fs/promises'
import { getDb } from './db'

export async function extractTextFromDocument(filepath: string, mimeType: string): Promise<string> {
  try {
    switch (mimeType) {
      case 'application/pdf':
        const pdfBuffer = await readFile(filepath)
        const pdfData = await pdfParse(pdfBuffer)
        return pdfData.text

      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        const docxBuffer = await readFile(filepath)
        const docxResult = await mammoth.extractRawText({ buffer: docxBuffer })
        return docxResult.value

      case 'text/plain':
        const textContent = await readFile(filepath, 'utf-8')
        return textContent

      default:
        throw new Error('Unsupported file type')
    }
  } catch (error) {
    console.error('Text extraction error:', error)
    throw error
  }
}

export async function processDocument(documentId: string): Promise<void> {
  try {
    const db = await getDb()
    const document = await db.get('SELECT * FROM documents WHERE id = ?', [documentId])
    
    if (!document) {
      throw new Error('Document not found')
    }

    const extractedText = await extractTextFromDocument(document.filepath, document.mimeType)
    
    await db.run(
      'UPDATE documents SET content = ? WHERE id = ?',
      [extractedText, documentId]
    )
  } catch (error) {
    console.error('Document processing error:', error)
    throw error
  }
} 
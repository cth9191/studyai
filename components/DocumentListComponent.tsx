'use client'

import { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from './ui/button'

interface Document {
  id: string
  originalName: string
  createdAt: string
  mimeType: string
}

export function DocumentListComponent() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/documents')
      if (!response.ok) throw new Error('Failed to fetch documents')
      const data = await response.json()
      setDocuments(data)
    } catch (error) {
      console.error('Error fetching documents:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return

    try {
      const response = await fetch(`/api/documents/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete document')
      
      // Remove document from list
      setDocuments(documents.filter(doc => doc.id !== id))
    } catch (error) {
      console.error('Error deleting document:', error)
    }
  }

  if (isLoading) {
    return <div className="text-center py-4">Loading documents...</div>
  }

  return (
    <div className="space-y-4">
      {documents.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No documents uploaded yet
        </div>
      ) : (
        <ul className="divide-y">
          {documents.map((doc) => (
            <li key={doc.id} className="py-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium">{doc.originalName}</h3>
                <p className="text-sm text-gray-500">
                  Uploaded on {new Date(doc.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(doc.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
} 
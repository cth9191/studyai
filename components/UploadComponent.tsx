'use client'

import { useState } from 'react'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface UploadComponentProps {
  onUploadComplete: (documentId: string) => void
}

export function UploadComponent({ onUploadComplete }: UploadComponentProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    console.log('File selected:', {
      name: file.name,
      type: file.type,
      size: file.size
    })
    
    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      })
      
      console.log('Upload response status:', response.status)
      const responseText = await response.text()
      console.log('Upload response text:', responseText)
      
      let data
      try {
        data = JSON.parse(responseText)
      } catch (e) {
        console.error('Error parsing response:', e)
        throw new Error(`Invalid server response: ${responseText}`)
      }
      
      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }
      
      onUploadComplete(data.documentId)
    } catch (error) {
      console.error('Upload error:', error)
      alert(error instanceof Error ? error.message : 'Failed to upload document')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 border rounded-lg shadow-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="w-full h-32 border-2 border-dashed rounded-lg flex items-center justify-center">
          <label className="cursor-pointer flex flex-col items-center">
            <Upload className="w-8 h-8 text-gray-400" />
            <span className="mt-2 text-sm text-gray-500">
              Upload PDF, DOCX, or TXT
            </span>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.docx,.txt"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
        </div>
        
        {isUploading && (
          <div className="w-full">
            <Progress value={uploadProgress} className="w-full" />
          </div>
        )}
      </div>
    </div>
  )
} 
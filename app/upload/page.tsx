'use client'

import { useRouter } from 'next/navigation'
import { UploadComponent } from '@/components/UploadComponent'

export default function UploadPage() {
  const router = useRouter()

  const handleUploadComplete = (documentId: string) => {
    // Redirect to documents page or show success message
    router.push('/documents')
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Upload Study Material</h1>
      <UploadComponent onUploadComplete={handleUploadComplete} />
    </div>
  )
} 
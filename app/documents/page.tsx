import { DocumentListComponent } from '@/components/DocumentListComponent'

export default function DocumentsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">My Documents</h1>
      <DocumentListComponent />
    </div>
  )
} 
import { Database as SQLiteDatabase } from 'sqlite3'
import { Database, open } from 'sqlite'

let dbInstance: Database | null = null

export async function getDb() {
  if (!dbInstance) {
    dbInstance = await open({
      filename: './data.db',
      driver: SQLiteDatabase
    })
    
    await dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS documents (
        id TEXT PRIMARY KEY,
        filename TEXT NOT NULL,
        originalName TEXT NOT NULL,
        filepath TEXT NOT NULL,
        mimeType TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        content TEXT
      )
    `)
  }
  
  return dbInstance
}

export const dbClient = {
  document: {
    async create({ data }: { data: any }) {
      const db = await getDb()
      const id = crypto.randomUUID()
      
      await db.run(
        `INSERT INTO documents (id, filename, originalName, filepath, mimeType)
         VALUES (?, ?, ?, ?, ?)`,
        [id, data.filename, data.originalName, data.filepath, data.mimeType]
      )
      
      return { id }
    },
    
    async findMany() {
      const db = await getDb()
      return db.all('SELECT * FROM documents ORDER BY createdAt DESC')
    },
    
    async findById(id: string) {
      const db = await getDb()
      return db.get('SELECT * FROM documents WHERE id = ?', [id])
    },
    
    async delete(id: string) {
      const db = await getDb()
      await db.run('DELETE FROM documents WHERE id = ?', [id])
    }
  }
} 
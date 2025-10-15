const { MongoClient } = require('mongodb')
const bcrypt = require('bcryptjs')

async function createAdmin() {
  const client = new MongoClient('mongodb://localhost:27017/yarri')
  
  try {
    await client.connect()
    const db = client.db('yarri')
    
    const hashedPassword = await bcrypt.hash('admin123', 10)
    
    await db.collection('admins').insertOne({
      email: 'admin@yaari.com',
      password: hashedPassword,
      createdAt: new Date(),
    })
    
    console.log('✅ Admin created successfully!')
    console.log('Email: admin@yaari.com')
    console.log('Password: admin123')
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await client.close()
  }
}

createAdmin()

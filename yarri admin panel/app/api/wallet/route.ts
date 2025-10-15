import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('yarri')
    
    const users = await db.collection('users').find({}).project({
      _id: 1,
      name: 1,
      phone: 1,
      balance: 1,
      totalSpent: 1,
    }).toArray()
    
    return NextResponse.json(users.map(u => ({
      ...u,
      userName: u.name || 'User',
    })))
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch wallets' }, { status: 500 })
  }
}

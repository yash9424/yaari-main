import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('yarri')
    
    const settings = await db.collection('settings').findOne({ type: 'app' })
    
    return NextResponse.json(settings || {
      appName: 'Yaari',
      callRate: 10,
      minRecharge: 100,
      maxRecharge: 10000,
      commission: 20,
      coinsPerRupee: 1,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const client = await clientPromise
    const db = client.db('yarri')
    
    await db.collection('settings').updateOne(
      { type: 'app' },
      { $set: { ...body, updatedAt: new Date() } },
      { upsert: true }
    )
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}

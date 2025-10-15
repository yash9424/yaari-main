import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    console.log('Received update for user:', params.id)
    console.log('Update data:', JSON.stringify(body).substring(0, 200))
    
    const client = await clientPromise
    const db = client.db('yarri')
    
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { ...body, updatedAt: new Date() } }
    )
    
    console.log('Update result:', result.modifiedCount, 'documents modified')
    
    return NextResponse.json({ success: true }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json({ error: 'Failed to update user' }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
}

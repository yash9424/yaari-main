import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

export async function POST(request: Request) {
  try {
    const { phone } = await request.json()
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    
    const client = await clientPromise
    const db = client.db('yarri')
    
    await db.collection('otps').updateOne(
      { phone },
      { 
        $set: { 
          otp, 
          createdAt: new Date(),
          expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        } 
      },
      { upsert: true }
    )
    
    console.log('\n🔐 OTP REQUEST')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`📱 Phone: ${phone}`)
    console.log(`🔢 OTP: ${otp}`)
    console.log(`⏰ Valid for: 5 minutes`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    
    return NextResponse.json({ success: true, message: 'OTP sent' }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send OTP' }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
}

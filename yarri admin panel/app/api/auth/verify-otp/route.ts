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
    const { phone, otp } = await request.json()
    
    const client = await clientPromise
    const db = client.db('yarri')
    
    const otpRecord = await db.collection('otps').findOne({ phone })
    
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    if (!otpRecord) {
      return NextResponse.json({ error: 'OTP not found' }, { status: 400, headers: corsHeaders })
    }
    
    if (new Date() > otpRecord.expiresAt) {
      return NextResponse.json({ error: 'OTP expired' }, { status: 400, headers: corsHeaders })
    }
    
    if (otpRecord.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400, headers: corsHeaders })
    }
    
    let user = await db.collection('users').findOne({ phone })
    
    if (!user) {
      const result = await db.collection('users').insertOne({
        phone,
        createdAt: new Date(),
        isActive: true,
        balance: 0,
      })
      user = { _id: result.insertedId, phone, balance: 0, isActive: true, createdAt: new Date() }
    }
    
    await db.collection('otps').deleteOne({ phone })
    
    console.log(`✅ User logged in: ${phone}\n`)
    
    return NextResponse.json({ 
      success: true, 
      user: {
        id: user._id,
        phone: user.phone,
        name: user.name,
        gender: user.gender,
        about: user.about,
        hobbies: user.hobbies,
        profilePic: user.profilePic,
        gallery: user.gallery,
        balance: user.balance || 0,
      }
    }, { headers: corsHeaders })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to verify OTP' }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
}

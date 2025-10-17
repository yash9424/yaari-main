'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import LoginScreen from '@/components/LoginScreen'

export default function LoginPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Handle Google OAuth callback
    const hash = window.location.hash
    if (hash) {
      const params = new URLSearchParams(hash.substring(1))
      const accessToken = params.get('access_token')
      
      if (accessToken) {
        handleGoogleCallback(accessToken)
        return
      }
    }
    
    const user = localStorage.getItem('user')
    if (user) {
      try {
        const userData = JSON.parse(user)
        if (userData.name && userData.gender) {
          router.replace('/users')
        } else {
          router.replace('/language')
        }
      } catch {}
    }
  }, [router])

  const handleGoogleCallback = async (accessToken: string) => {
    try {
      const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      const userInfo = await userInfoRes.json()
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      const res = await fetch(`${apiUrl}/api/auth/google-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: userInfo.email, 
          name: userInfo.name, 
          googleId: userInfo.sub, 
          profilePic: userInfo.picture 
        }),
      })
      
      if (res.ok) {
        const data = await res.json()
        localStorage.setItem('user', JSON.stringify(data.user))
        
        if (data.user.name && data.user.gender) {
          router.push('/users')
        } else {
          router.push('/language')
        }
      } else {
        alert('Failed to login with Google')
      }
    } catch (error) {
      console.error('Google login error:', error)
      alert('Error logging in with Google')
    }
  }

  if (!mounted) return null
  
  return <LoginScreen onNext={() => router.push('/otp')} />
}

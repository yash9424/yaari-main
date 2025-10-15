'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import LoginScreen from '@/components/LoginScreen'

export default function LoginPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
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

  if (!mounted) return null
  
  return <LoginScreen onNext={() => router.push('/otp')} />
}

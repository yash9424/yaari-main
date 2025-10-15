'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import UserListScreen from '@/components/UserListScreen'

export default function UsersPage() {
  const router = useRouter()
  const [callData, setCallData] = useState<any>(null)
  
  return (
    <UserListScreen 
      onNext={() => {}}
      onProfileClick={() => router.push('/profile')}
      onCoinClick={() => router.push('/coins')}
      onUserClick={(id) => router.push(`/users/${id}`)}
      onStartCall={(data) => {
        sessionStorage.setItem('callData', JSON.stringify(data))
        router.push(data.type === 'video' ? '/video-call' : '/audio-call')
      }}
    />
  )
}

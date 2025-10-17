'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import UserDetailScreen from '@/components/UserDetailScreen'
import { Suspense } from 'react'

function UserDetailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get('id') || ''

  return (
    <UserDetailScreen 
      userId={userId}
      onBack={() => router.back()}
      onStartCall={(data) => {
        router.push(data.type === 'video' ? '/video-call' : '/audio-call')
      }}
    />
  )
}

export default function UserDetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserDetailContent />
    </Suspense>
  )
}

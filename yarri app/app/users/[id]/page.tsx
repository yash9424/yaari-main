'use client'
import { useRouter } from 'next/navigation'
import UserDetailScreen from '@/components/UserDetailScreen'

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  return (
    <UserDetailScreen 
      userId={params.id}
      onBack={() => router.back()}
      onStartCall={(data) => {
        router.push(data.type === 'video' ? '/video-call' : '/audio-call')
      }}
    />
  )
}

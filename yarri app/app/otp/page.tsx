'use client'
import { useRouter } from 'next/navigation'
import OTPScreen from '@/components/OTPScreen'

export const dynamic = 'force-dynamic'

export default function OTPPage() {
  const router = useRouter()
  
  return <OTPScreen onNext={() => router.push('/language')} />
}

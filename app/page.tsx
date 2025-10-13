'use client'
import { useState } from 'react'
import LoginScreen from '../components/LoginScreen'
import OTPScreen from '../components/OTPScreen'
import LanguageScreen from '../components/LanguageScreen'
import GenderScreen from '../components/GenderScreen'
import UserListScreen from '../components/UserListScreen'
import ProfileMenuScreen from '../components/ProfileMenuScreen'
import DashboardScreen from '../components/DashboardScreen'
import CoinPurchaseScreen from '../components/CoinPurchaseScreen'
import UserDetailScreen from '../components/UserDetailScreen'

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('login')
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onNext={() => setCurrentScreen('otp')} />
      case 'otp':
        return <OTPScreen onNext={() => setCurrentScreen('language')} />
      case 'language':
        return <LanguageScreen onNext={() => setCurrentScreen('gender')} />
      case 'gender':
        return <GenderScreen onNext={() => setCurrentScreen('userlist')} />
      case 'userlist':
        return <UserListScreen onNext={() => setCurrentScreen('dashboard')} onProfileClick={() => setCurrentScreen('profile')} onCoinClick={() => setCurrentScreen('coins')} onUserClick={(id) => { setSelectedUserId(id); setCurrentScreen('userdetail'); }} />
      case 'userdetail':
        return <UserDetailScreen userId={selectedUserId!} onBack={() => setCurrentScreen('userlist')} />
      case 'profile':
        return <ProfileMenuScreen onBack={() => setCurrentScreen('userlist')} />
      case 'coins':
        return <CoinPurchaseScreen onBack={() => setCurrentScreen('userlist')} />
      case 'dashboard':
        return <DashboardScreen />
      default:
        return <LoginScreen onNext={() => setCurrentScreen('otp')} />
    }
  }

  return renderScreen()
}
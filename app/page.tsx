'use client'
import { useState, useEffect } from 'react'
import { App as CapacitorApp } from '@capacitor/app'
import LoginScreen from '../components/LoginScreen'
import OTPScreen from '../components/OTPScreen'
import LanguageScreen from '../components/LanguageScreen'
import GenderScreen from '../components/GenderScreen'
import UserListScreen from '../components/UserListScreen'
import ProfileMenuScreen from '../components/ProfileMenuScreen'
import DashboardScreen from '../components/DashboardScreen'
import CoinPurchaseScreen from '../components/CoinPurchaseScreen'
import UserDetailScreen from '../components/UserDetailScreen'
import CallHistoryScreen from '../components/CallHistoryScreen'
import TransactionHistoryScreen from '../components/TransactionHistoryScreen'
import CustomerSupportScreen from '../components/CustomerSupportScreen'
import EditProfileScreen from '../components/EditProfileScreen'
import PrivacySecurityScreen from '../components/PrivacySecurityScreen'
import VideoCallScreen from '../components/VideoCallScreen'
import AudioCallScreen from '../components/AudioCallScreen'

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('login')
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [callData, setCallData] = useState<{ userName: string; userAvatar: string; rate: number } | null>(null)
  const [screenHistory, setScreenHistory] = useState<string[]>(['login'])

  useEffect(() => {
    const handleBackButton = CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (screenHistory.length > 1) {
        const newHistory = [...screenHistory]
        newHistory.pop()
        const previousScreen = newHistory[newHistory.length - 1]
        setScreenHistory(newHistory)
        setCurrentScreen(previousScreen)
      } else {
        CapacitorApp.exitApp()
      }
    })

    return () => {
      handleBackButton.remove()
    }
  }, [screenHistory])

  const navigateTo = (screen: string) => {
    setScreenHistory([...screenHistory, screen])
    setCurrentScreen(screen)
  }

  const navigateBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory]
      newHistory.pop()
      const previousScreen = newHistory[newHistory.length - 1]
      setScreenHistory(newHistory)
      setCurrentScreen(previousScreen)
    }
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onNext={() => navigateTo('otp')} />
      case 'otp':
        return <OTPScreen onNext={() => navigateTo('language')} />
      case 'language':
        return <LanguageScreen onNext={() => navigateTo('gender')} />
      case 'gender':
        return <GenderScreen onNext={() => navigateTo('userlist')} />
      case 'userlist':
        return <UserListScreen 
          onNext={() => navigateTo('dashboard')} 
          onProfileClick={() => navigateTo('profile')} 
          onCoinClick={() => navigateTo('coins')} 
          onUserClick={(id) => { setSelectedUserId(id); navigateTo('userdetail'); }}
          onStartCall={(data) => { setCallData(data); navigateTo(data.type === 'video' ? 'videocall' : 'audiocall'); }}
        />
      case 'userdetail':
        return <UserDetailScreen 
          userId={selectedUserId!} 
          onBack={navigateBack}
          onStartCall={(data) => { setCallData(data); navigateTo(data.type === 'video' ? 'videocall' : 'audiocall'); }}
        />
      case 'profile':
        return <ProfileMenuScreen 
          onBack={navigateBack}
          onCallHistory={() => navigateTo('callhistory')}
          onTransactionHistory={() => navigateTo('transactionhistory')}
          onCustomerSupport={() => navigateTo('customersupport')}
          onEditProfile={() => navigateTo('editprofile')}
          onPrivacySecurity={() => navigateTo('privacysecurity')}
        />
      case 'callhistory':
        return <CallHistoryScreen onBack={navigateBack} />
      case 'transactionhistory':
        return <TransactionHistoryScreen onBack={navigateBack} />
      case 'customersupport':
        return <CustomerSupportScreen onBack={navigateBack} />
      case 'editprofile':
        return <EditProfileScreen onBack={navigateBack} />
      case 'privacysecurity':
        return <PrivacySecurityScreen onBack={navigateBack} />
      case 'coins':
        return <CoinPurchaseScreen onBack={navigateBack} />
      case 'videocall':
        return callData ? <VideoCallScreen onEnd={navigateBack} userName={callData.userName} userAvatar={callData.userAvatar} rate={callData.rate} /> : <LoginScreen onNext={() => navigateTo('otp')} />
      case 'audiocall':
        return callData ? <AudioCallScreen onEnd={navigateBack} userName={callData.userName} userAvatar={callData.userAvatar} rate={callData.rate} /> : <LoginScreen onNext={() => navigateTo('otp')} />
      case 'dashboard':
        return <DashboardScreen />
      default:
        return <LoginScreen onNext={() => navigateTo('otp')} />
    }
  }

  return renderScreen()
}
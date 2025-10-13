# Yaari Mobile App

A Next.js mobile application with the exact UI from your screenshots.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Welcome Screen with Yaari branding
- Login with phone number and keypad
- OTP verification
- Language selection (English, Hindi, Bengali)
- Gender selection
- Dashboard with:
  - Home screen with balance and recharge
  - Profile management
  - Call history
  - Customer support
- Mobile-optimized responsive design
- Smooth navigation between screens

## Tech Stack

- Next.js 14 (Static Export)
- React 18
- TypeScript
- Tailwind CSS
- Lucide React Icons
- Capacitor Ready (for native mobile apps)

## Mobile Optimization

- ✅ 100% mobile-responsive design
- ✅ Native keyboard support
- ✅ Touch-optimized UI
- ✅ No zoom on input focus
- ✅ Safe area support
- ✅ Capacitor ready for iOS/Android

## Project Structure

```
yaari/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── WelcomeScreen.tsx
│   ├── LoginScreen.tsx
│   ├── OTPScreen.tsx
│   ├── LanguageScreen.tsx
│   ├── GenderScreen.tsx
│   └── DashboardScreen.tsx
├── public/
│   └── images/          # Place your images here
├── capacitor.config.json
├── MOBILE_SETUP.md      # Mobile deployment guide
└── package.json
```

## Converting to Native Mobile App

See [MOBILE_SETUP.md](MOBILE_SETUP.md) for detailed instructions on converting this app to native iOS/Android using Capacitor.
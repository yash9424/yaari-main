# Start Yaari Servers

## Terminal 1 - Admin Panel (Backend)
```bash
cd "d:\dating-app-Yaari\yarri admin panel"
npm run dev
```
Runs on: http://localhost:3000

## Terminal 2 - Mobile App (Frontend)
```bash
cd "d:\dating-app-Yaari\yarri app"
npm run dev
```
Runs on: http://localhost:3001

## How OTP Works

1. Open mobile app: http://localhost:3001
2. Enter phone number (e.g., 9876543210)
3. Click "Get OTP"
4. Check Terminal 1 (admin panel) - OTP will display like:

```
🔐 OTP REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 Phone: 9876543210
🔢 OTP: 123456
⏰ Valid for: 5 minutes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

5. Enter the OTP in mobile app
6. Click "Verify & Continue"

## Admin Panel Login
- URL: http://localhost:3000
- Email: admin@yaari.com
- Password: admin123

## MongoDB
- Database: yarri
- URI: mongodb://localhost:27017/yarri
- Collections: admins, users, otps, payments, calls, settings

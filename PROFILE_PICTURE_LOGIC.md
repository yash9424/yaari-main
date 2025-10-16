# Profile Picture Display Logic

## Priority Order:

### 1. **Uploaded Profile Picture** (Highest Priority)
- When user uploads a custom profile picture in Edit Profile
- Stored as base64 or uploaded image URL in `user.profilePic`
- This ALWAYS takes priority over everything else

### 2. **Google Profile Picture** (Medium Priority)
- When user logs in with Google
- Google profile picture URL stored in `user.profilePic`
- URL contains `googleusercontent.com`
- Used if no custom picture uploaded

### 3. **Dicebear Avatar** (Fallback)
- Generated avatar based on user ID
- Used when no profile picture exists at all
- URL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`

---

## How It Works:

### In User List (`/users`):

```javascript
// Check if user has uploaded custom profile pic
if (user.profilePic && !user.profilePic.includes('googleusercontent.com')) {
  // Show uploaded picture
  displayPic = user.profilePic
} else if (user.profilePic && user.profilePic.includes('googleusercontent.com')) {
  // Show Google profile picture
  displayPic = user.profilePic
} else {
  // Show Dicebear avatar
  displayPic = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`
}
```

### In Profile Menu (`/profile`):

```javascript
// Show uploaded picture or Google picture
if (userData.profilePic) {
  setProfilePic(userData.profilePic)
} else {
  // Show default User icon
  <User icon />
}
```

### In Edit Profile (`/edit-profile`):

```javascript
// User can upload new picture
// This will replace Google profile picture
// New picture stored in user.profilePic
```

---

## User Scenarios:

### Scenario 1: Phone Login User
1. Login with phone number
2. No profile picture initially
3. **Shows:** Dicebear avatar
4. User uploads picture in Edit Profile
5. **Shows:** Uploaded picture

### Scenario 2: Google Login User (No Upload)
1. Login with Google
2. Google profile picture saved
3. **Shows:** Google profile picture
4. User doesn't upload custom picture
5. **Shows:** Google profile picture (continues)

### Scenario 3: Google Login User (With Upload)
1. Login with Google
2. Google profile picture saved
3. **Shows:** Google profile picture
4. User uploads custom picture in Edit Profile
5. **Shows:** Uploaded picture (replaces Google pic)

### Scenario 4: User Removes Uploaded Picture
1. User had uploaded custom picture
2. User removes it in Edit Profile
3. If Google user: **Shows:** Google profile picture
4. If phone user: **Shows:** Dicebear avatar

---

## Database Structure:

```javascript
{
  _id: "user123",
  name: "John Doe",
  email: "john@gmail.com",  // From Google login
  phone: "1234567890",       // From phone login
  profilePic: "...",         // Can be:
                             // - Google URL (googleusercontent.com)
                             // - Base64 uploaded image
                             // - Uploaded image URL
                             // - null/undefined
  googleId: "...",           // If Google login
  loginMethod: "google"      // or "phone"
}
```

---

## Display Logic Summary:

| User Type | Has Uploaded Pic | Has Google Pic | Shows |
|-----------|-----------------|----------------|-------|
| Phone | ❌ | ❌ | Dicebear |
| Phone | ✅ | ❌ | Uploaded |
| Google | ❌ | ✅ | Google |
| Google | ✅ | ✅ | Uploaded |

---

## Implementation Files:

1. `components/UserListScreen.tsx` - User list display
2. `components/ProfileMenuScreen.tsx` - Profile menu display
3. `components/EditProfileScreen.tsx` - Profile picture upload
4. `app/api/users/[id]/route.ts` - Update user profile

---

**✅ Profile picture priority is now properly implemented!**

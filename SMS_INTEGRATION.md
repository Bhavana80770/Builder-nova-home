# SMS OTP Integration Guide

NovaBot now supports real SMS OTP functionality! This guide will help you configure different SMS providers for sending OTP to mobile numbers.

## 🚀 Quick Start (Development)

For development, the app uses a **mock SMS service** that:

- ✅ Generates real OTP codes
- ✅ Shows OTP in browser console
- ✅ Displays OTP via browser notifications (if permitted)
- ✅ Validates OTP correctly
- ✅ Handles expiration and retry limits

**No setup required for development!** Just run the app and it works.

## 📱 Production SMS Providers

### 1. MSG91 (Recommended for India)

MSG91 is one of the most popular SMS providers in India.

**Setup:**

1. Sign up at [msg91.com](https://msg91.com)
2. Get your API key and Template ID
3. Update `.env`:

```env
VITE_SMS_PROVIDER=msg91
VITE_SMS_API_KEY=your_msg91_api_key_here
VITE_SMS_TEMPLATE_ID=your_template_id_here
VITE_SMS_SENDER_ID=AROGYA
```

**Template Example:**

```
Your NovaBot verification code is: ##OTP##. Valid for 5 minutes. Do not share this code with anyone.
```

### 2. TextLocal (India Focused)

TextLocal is another popular choice for Indian businesses.

**Setup:**

1. Sign up at [textlocal.in](https://textlocal.in)
2. Get your API key
3. Update `.env`:

```env
VITE_SMS_PROVIDER=textlocal
VITE_SMS_API_KEY=your_textlocal_api_key_here
VITE_SMS_SENDER_ID=AROGYA
```

### 3. Twilio (Global)

Twilio is a global SMS provider but requires backend implementation for security.

**Note:** Twilio requires server-side implementation to keep credentials secure.

### 4. Firebase Phone Authentication

Coming soon! Firebase Auth provides excellent phone verification with automatic SMS.

## 🔧 Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# SMS Provider (mock, msg91, textlocal, twilio)
VITE_SMS_PROVIDER=mock

# Provider-specific settings
VITE_SMS_API_KEY=your_api_key_here
VITE_SMS_TEMPLATE_ID=your_template_id_here
VITE_SMS_SENDER_ID=AROGYA

# Development settings
VITE_APP_ENV=development
```

## 🛡️ Security Features

✅ **OTP Expiration:** 5 minutes  
✅ **Rate Limiting:** Max 3 verification attempts  
✅ **Input Validation:** 10-digit Indian mobile numbers  
✅ **Secure Storage:** OTP stored in memory only  
✅ **Auto-cleanup:** Expired OTPs automatically removed

## 🧪 Testing

### Development Mode

1. Enter any 10-digit number (e.g., 9876543210)
2. OTP will be shown in:
   - Browser console
   - Browser notification (if enabled)
   - Network tab of developer tools

### Production Testing

1. Use your real mobile number
2. You'll receive actual SMS
3. Enter the OTP to verify

## 📱 Supported Features

- ✅ **Real SMS sending** via multiple providers
- ✅ **OTP validation** with expiration
- ✅ **Resend functionality** with cooldown
- ✅ **Error handling** with user-friendly messages
- ✅ **Attempt limiting** to prevent abuse
- ✅ **Development mode** for easy testing

## 🔄 How It Works

1. **Phone Entry:** User enters 10-digit mobile number
2. **OTP Generation:** 6-digit random OTP generated
3. **SMS Sending:** OTP sent via configured provider
4. **Storage:** OTP stored temporarily with expiration
5. **Verification:** User enters OTP for validation
6. **Cleanup:** OTP deleted after verification/expiration

## 🎯 Provider Comparison

| Provider      | Best For         | Setup Difficulty | Cost   |
| ------------- | ---------------- | ---------------- | ------ |
| **Mock**      | Development      | ⭐ Easy          | Free   |
| **MSG91**     | India Production | ⭐⭐ Medium      | Low    |
| **TextLocal** | India Production | ⭐⭐ Medium      | Low    |
| **Twilio**    | Global           | ⭐⭐⭐ Hard      | Medium |

## 🚨 Important Notes

1. **Never commit real API keys** to version control
2. **Use environment variables** for all credentials
3. **Test thoroughly** before going live
4. **Monitor SMS usage** to avoid unexpected charges
5. **Implement rate limiting** on server-side for production

## 💡 Tips for Rural India

- **Local Language Support:** Consider SMS templates in regional languages
- **Network Issues:** Implement retry mechanisms for poor connectivity
- **Cost Optimization:** Choose providers with good rates for bulk SMS
- **Regulatory Compliance:** Ensure DLT (Distributed Ledger Technology) registration for commercial SMS

Ready to go live? Configure your preferred SMS provider and start sending real OTP messages! 🎉

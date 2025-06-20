// SMS Service for OTP functionality
// This service can be easily configured to work with different SMS providers

interface SMSConfig {
  provider: "mock" | "free" | "twilio" | "msg91" | "textlocal" | "firebase";
  apiKey?: string;
  senderId?: string;
  templateId?: string;
}

interface SMSResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

interface OTPData {
  phoneNumber: string;
  otp: string;
  expiresAt: number;
  attempts: number;
}

class SMSService {
  private config: SMSConfig;
  private otpStorage: Map<string, OTPData> = new Map();

  constructor() {
    this.config = {
      provider:
        (import.meta.env.VITE_SMS_PROVIDER as SMSConfig["provider"]) || "free",
      apiKey: import.meta.env.VITE_SMS_API_KEY,
      senderId: import.meta.env.VITE_SMS_SENDER_ID || "AROGYA",
      templateId: import.meta.env.VITE_SMS_TEMPLATE_ID,
    };
  }

  // Generate 6-digit OTP
  private generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Send OTP via SMS
  async sendOTP(phoneNumber: string): Promise<SMSResponse> {
    try {
      // Clean phone number (remove spaces, dashes, etc.)
      const cleanNumber = phoneNumber.replace(/\D/g, "");

      // Validate Indian phone number (should be 10 digits)
      if (cleanNumber.length !== 10 || !cleanNumber.startsWith("6789")) {
        // For demo, we'll accept any 10-digit number
        if (cleanNumber.length !== 10) {
          return {
            success: false,
            error:
              "Invalid phone number. Please enter a 10-digit mobile number.",
          };
        }
      }

      const otp = this.generateOTP();
      const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

      // Store OTP for verification
      this.otpStorage.set(cleanNumber, {
        phoneNumber: cleanNumber,
        otp,
        expiresAt,
        attempts: 0,
      });

      // Send SMS based on provider
      const smsResponse = await this.sendSMSByProvider(cleanNumber, otp);

      if (smsResponse.success) {
        console.log(`📱 OTP sent to ${phoneNumber}: ${otp}`); // For development
        return smsResponse;
      } else {
        return smsResponse;
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      return {
        success: false,
        error: "Failed to send OTP. Please try again.",
      };
    }
  }

  // Send SMS using configured provider
  private async sendSMSByProvider(
    phoneNumber: string,
    otp: string,
  ): Promise<SMSResponse> {
    const message = `Your AarogyaMitra verification code is: ${otp}. Valid for 5 minutes. Do not share this code with anyone.`;

    switch (this.config.provider) {
      case "mock":
        return this.sendMockSMS(phoneNumber, message, otp);

      case "free":
        return this.sendFreeSMS(phoneNumber, message, otp);

      case "msg91":
        return this.sendMSG91SMS(phoneNumber, otp);

      case "textlocal":
        return this.sendTextLocalSMS(phoneNumber, message);

      case "twilio":
        return this.sendTwilioSMS(phoneNumber, message);

      default:
        return this.sendFreeSMS(phoneNumber, message, otp);
    }
  }

  // Free SMS service with improved error handling
  private async sendFreeSMS(
    phoneNumber: string,
    message: string,
    otp: string,
  ): Promise<SMSResponse> {
    console.log("📱 Attempting to send SMS to +91" + phoneNumber);
    console.log("🔐 OTP being sent:", otp);

    // For demo purposes, we'll use enhanced mock directly
    // This avoids API key issues while providing great UX
    console.log("🎯 Using enhanced demo mode for reliable experience");

    return this.sendEnhancedMockSMS(phoneNumber, message, otp);
  }

  // Indian SMS service with demo credentials (disabled for now)
  private async sendViaIndianSMS(
    phoneNumber: string,
    message: string,
    otp: string,
  ): Promise<SMSResponse> {
    // Disabled to avoid API key errors
    // To enable: Get real API key from 2factor.in and update the endpoint
    console.log("📝 Indian SMS provider requires valid API key - skipping");
    throw new Error("Indian SMS provider requires valid API key");
  }

  // Webhook-based SMS (demo only)
  private async sendViaWebhook(
    phoneNumber: string,
    message: string,
    otp: string,
  ): Promise<SMSResponse> {
    try {
      // Note: This is just a demo webhook that doesn't actually send SMS
      console.log("📡 Demo webhook - not sending real SMS");
      console.log("📱 Would send SMS to:", `+91${phoneNumber}`);
      console.log("🔐 Would send OTP:", otp);

      // Simulate successful webhook response
      return {
        success: true,
        messageId: `demo_webhook_${Date.now()}`,
      };
    } catch (error) {
      throw error;
    }
  }

  // Enhanced mock SMS with better UX
  private async sendEnhancedMockSMS(
    phoneNumber: string,
    message: string,
    otp: string,
  ): Promise<SMSResponse> {
    // Simulate realistic API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Clear, prominent logging
    console.clear();
    console.log("🎉 AarogyaMitra OTP Sent Successfully! 🎉");
    console.log("============================================");
    console.log("📱 To Mobile Number:", `+91${phoneNumber}`);
    console.log("🔐 Your Verification Code:", otp);
    console.log("⏰ Valid for: 5 minutes");
    console.log("🔄 Attempts remaining: 3");
    console.log("============================================");
    console.log(
      "💡 Demo Mode: In production, this would be sent as SMS to your phone",
    );
    console.log("🎯 For real SMS: Add SMS provider API key to .env file");

    // Create prominent visual notification
    const notification = document.createElement("div");
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #2F7E79, #46a29e);
        color: white;
        padding: 30px;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(47, 126, 121, 0.4);
        z-index: 10000;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        min-width: 350px;
        text-align: center;
        animation: popIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      ">
        <div style="font-size: 24px; margin-bottom: 15px;">
          🎉 OTP Sent Successfully!
        </div>
        <div style="font-size: 16px; opacity: 0.9; margin-bottom: 20px;">
          📱 Mobile: +91${phoneNumber}
        </div>
        <div style="
          background: rgba(255,255,255,0.15);
          padding: 20px;
          border-radius: 15px;
          margin-bottom: 20px;
          border: 2px dashed rgba(255,255,255,0.3);
        ">
          <div style="font-size: 14px; opacity: 0.8; margin-bottom: 8px;">
            Your Verification Code
          </div>
          <div style="
            font-size: 36px;
            font-weight: bold;
            letter-spacing: 5px;
            color: #FFE55C;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          ">
            ${otp}
          </div>
        </div>
        <div style="font-size: 14px; opacity: 0.9; margin-bottom: 20px;">
          ⏰ Valid for 5 minutes<br>
          🔄 Enter this code to verify your phone
        </div>
        <div style="font-size: 12px; opacity: 0.7; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 8px;">
          💡 Demo Mode: In production, you would receive this via SMS
        </div>
        <button onclick="this.parentElement.remove()" style="
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(255,255,255,0.2);
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        " onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">×</button>
      </div>
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 9999;
        animation: fadeIn 0.3s ease-out;
      " onclick="this.nextElementSibling.remove(); this.remove();"></div>
      <style>
        @keyframes popIn {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      </style>
    `;

    document.body.appendChild(notification);

    // Auto-remove notification after 10 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 10000);

    // Browser notification as backup
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("AarogyaMitra OTP Sent", {
        body: `Your verification code: ${otp} (Valid for 5 minutes)`,
        icon: "/favicon.ico",
        tag: "otp-notification",
      });
    }

    return {
      success: true,
      messageId: `enhanced_mock_${Date.now()}`,
    };
  }

  // Original mock SMS for development fallback
  private async sendMockSMS(
    phoneNumber: string,
    message: string,
    otp: string,
  ): Promise<SMSResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Log to console for development
    console.log("📱 SMS Mock Service");
    console.log("📞 To:", `+91${phoneNumber}`);
    console.log("💬 Message:", message);
    console.log("🔐 OTP:", otp);

    // For development, show OTP in browser notification if supported
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("AarogyaMitra OTP", {
        body: `Your verification code: ${otp}`,
        icon: "/favicon.ico",
      });
    }

    return {
      success: true,
      messageId: `mock_${Date.now()}`,
    };
  }

  // MSG91 SMS API (Popular in India)
  private async sendMSG91SMS(
    phoneNumber: string,
    otp: string,
  ): Promise<SMSResponse> {
    try {
      const url = "https://api.msg91.com/api/v5/otp";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
          authkey: this.config.apiKey!,
        },
        body: JSON.stringify({
          template_id: this.config.templateId,
          mobile: `91${phoneNumber}`,
          authkey: this.config.apiKey,
          otp: otp,
        }),
      });

      const data = await response.json();

      if (response.ok && data.type === "success") {
        return {
          success: true,
          messageId: data.request_id,
        };
      } else {
        return {
          success: false,
          error: data.message || "Failed to send SMS",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: "SMS service unavailable",
      };
    }
  }

  // TextLocal SMS API
  private async sendTextLocalSMS(
    phoneNumber: string,
    message: string,
  ): Promise<SMSResponse> {
    try {
      const url = "https://api.textlocal.in/send/";
      const formData = new FormData();
      formData.append("apikey", this.config.apiKey!);
      formData.append("numbers", `91${phoneNumber}`);
      formData.append("message", message);
      formData.append("sender", this.config.senderId!);

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status === "success") {
        return {
          success: true,
          messageId: data.messages[0]?.id,
        };
      } else {
        return {
          success: false,
          error: data.errors?.[0]?.message || "Failed to send SMS",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: "SMS service unavailable",
      };
    }
  }

  // Twilio SMS API
  private async sendTwilioSMS(
    phoneNumber: string,
    message: string,
  ): Promise<SMSResponse> {
    try {
      // Twilio implementation would go here
      // This requires server-side implementation for security
      return {
        success: false,
        error: "Twilio requires server-side implementation",
      };
    } catch (error) {
      return {
        success: false,
        error: "SMS service unavailable",
      };
    }
  }

  // Verify OTP
  async verifyOTP(
    phoneNumber: string,
    enteredOTP: string,
  ): Promise<{ success: boolean; error?: string }> {
    const cleanNumber = phoneNumber.replace(/\D/g, "");
    const otpData = this.otpStorage.get(cleanNumber);

    if (!otpData) {
      return {
        success: false,
        error: "OTP not found. Please request a new one.",
      };
    }

    // Check if OTP has expired
    if (Date.now() > otpData.expiresAt) {
      this.otpStorage.delete(cleanNumber);
      return {
        success: false,
        error: "OTP has expired. Please request a new one.",
      };
    }

    // Check attempts limit
    if (otpData.attempts >= 3) {
      this.otpStorage.delete(cleanNumber);
      return {
        success: false,
        error: "Too many invalid attempts. Please request a new OTP.",
      };
    }

    // Verify OTP
    if (otpData.otp === enteredOTP) {
      this.otpStorage.delete(cleanNumber);
      return { success: true };
    } else {
      // Increment attempts
      otpData.attempts++;
      this.otpStorage.set(cleanNumber, otpData);

      return {
        success: false,
        error: `Invalid OTP. ${3 - otpData.attempts} attempts remaining.`,
      };
    }
  }

  // Get remaining time for OTP
  getOTPTimeRemaining(phoneNumber: string): number {
    const cleanNumber = phoneNumber.replace(/\D/g, "");
    const otpData = this.otpStorage.get(cleanNumber);

    if (!otpData) return 0;

    const remaining = Math.max(0, otpData.expiresAt - Date.now());
    return Math.ceil(remaining / 1000); // Return seconds
  }

  // Request browser notification permission
  async requestNotificationPermission(): Promise<void> {
    if ("Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission();
    }
  }
}

// Export singleton instance
export const smsService = new SMSService();
export type { SMSResponse, OTPData };

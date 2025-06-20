// SMS Service for OTP functionality
// This service can be easily configured to work with different SMS providers

interface SMSConfig {
  provider: "mock" | "twilio" | "msg91" | "textlocal" | "firebase";
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
        (import.meta.env.VITE_SMS_PROVIDER as SMSConfig["provider"]) || "mock",
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

      case "msg91":
        return this.sendMSG91SMS(phoneNumber, otp);

      case "textlocal":
        return this.sendTextLocalSMS(phoneNumber, message);

      case "twilio":
        return this.sendTwilioSMS(phoneNumber, message);

      default:
        return this.sendMockSMS(phoneNumber, message, otp);
    }
  }

  // Mock SMS for development
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

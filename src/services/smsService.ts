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

  // Free SMS service using multiple free providers
  private async sendFreeSMS(
    phoneNumber: string,
    message: string,
    otp: string,
  ): Promise<SMSResponse> {
    try {
      // Try multiple free SMS services in order
      const providers = [
        () => this.sendViaWay2SMS(phoneNumber, message),
        () => this.sendViaFastTwoSMS(phoneNumber, message),
        () => this.sendViaTextBelt(phoneNumber, message),
      ];

      for (const provider of providers) {
        try {
          const result = await provider();
          if (result.success) {
            console.log("📱 SMS sent successfully to", `+91${phoneNumber}`);
            console.log("🔐 OTP sent:", otp);
            return result;
          }
        } catch (error) {
          console.log("Provider failed, trying next...");
          continue;
        }
      }

      // If all providers fail, fall back to mock but still show in console
      return this.sendMockSMS(phoneNumber, message, otp);
    } catch (error) {
      console.error("All SMS providers failed:", error);
      return this.sendMockSMS(phoneNumber, message, otp);
    }
  }

  // Way2SMS free service
  private async sendViaWay2SMS(
    phoneNumber: string,
    message: string,
  ): Promise<SMSResponse> {
    try {
      // Use CORS proxy for free SMS service
      const response = await fetch(
        "https://api.allorigins.win/raw?url=" +
          encodeURIComponent(`https://www.way2sms.com/api/v1/sendCampaign`),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            apikey: "demo", // Demo key for testing
            usetype: "stage",
            phone: `91${phoneNumber}`,
            message: message,
            senderid: "AROGYA",
          }),
        },
      );

      if (response.ok) {
        return {
          success: true,
          messageId: `way2sms_${Date.now()}`,
        };
      }
      throw new Error("Way2SMS failed");
    } catch (error) {
      throw error;
    }
  }

  // Fast2SMS free service
  private async sendViaFastTwoSMS(
    phoneNumber: string,
    message: string,
  ): Promise<SMSResponse> {
    try {
      // Use demo Fast2SMS service
      const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
        method: "POST",
        headers: {
          authorization: "demo_key",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          route: "dlt",
          sender_id: "AROGYA",
          message: message,
          language: "english",
          flash: 0,
          numbers: phoneNumber,
        }),
      });

      if (response.ok) {
        return {
          success: true,
          messageId: `fast2sms_${Date.now()}`,
        };
      }
      throw new Error("Fast2SMS failed");
    } catch (error) {
      throw error;
    }
  }

  // TextBelt free service (limited free messages)
  private async sendViaTextBelt(
    phoneNumber: string,
    message: string,
  ): Promise<SMSResponse> {
    try {
      const response = await fetch("https://textbelt.com/text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: `+91${phoneNumber}`,
          message: message,
          key: "textbelt", // Free tier key
        }),
      });

      const data = await response.json();

      if (data.success) {
        return {
          success: true,
          messageId: data.textId,
        };
      }
      throw new Error(data.error || "TextBelt failed");
    } catch (error) {
      throw error;
    }
  }

  // Mock SMS for development fallback
  private async sendMockSMS(
    phoneNumber: string,
    message: string,
    otp: string,
  ): Promise<SMSResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Log to console for development
    console.log("📱 SMS Mock Service (Fallback)");
    console.log("📞 To:", `+91${phoneNumber}`);
    console.log("💬 Message:", message);
    console.log("🔐 OTP:", otp);

    // Show prominent alert with OTP
    alert(
      `📱 SMS OTP for +91${phoneNumber}\n\nOTP: ${otp}\n\n(This is a demo. In production, you would receive this via SMS)`,
    );

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

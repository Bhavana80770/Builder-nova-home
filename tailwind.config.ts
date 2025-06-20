import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Poppins", "Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        // AarogyaMitra Custom Colors
        herbal: {
          DEFAULT: "#2F7E79",
          50: "#E8F4F3",
          100: "#C7E5E3",
          500: "#2F7E79",
          600: "#275A56",
          700: "#1F4441",
          900: "#0F1F1E",
        },
        sand: {
          DEFAULT: "#F9F8F4",
          50: "#FEFEFE",
          100: "#F9F8F4",
          200: "#F5F3ED",
          300: "#F1EEE6",
        },
        coral: {
          DEFAULT: "#EF8354",
          50: "#FDF5F1",
          100: "#FBEADD",
          500: "#EF8354",
          600: "#E4652A",
          700: "#C4511F",
        },
        indigo: {
          DEFAULT: "#394867",
          50: "#F1F2F5",
          100: "#DDE0E8",
          500: "#394867",
          600: "#2D3751",
          700: "#212A3E",
          900: "#141A26",
        },
        "soft-red": {
          DEFAULT: "#F06C6C",
          50: "#FEF2F2",
          100: "#FDE3E3",
          500: "#F06C6C",
          600: "#EC4545",
          700: "#DC2626",
        },
        "gender-blue": {
          DEFAULT: "#3E8EDE",
          50: "#F0F7FE",
          100: "#DEEEFF",
          500: "#3E8EDE",
          600: "#1D6BC7",
          700: "#1557A5",
        },
        "gender-pink": {
          DEFAULT: "#DE6EA1",
          50: "#FDF2F8",
          100: "#FCE7F3",
          500: "#DE6EA1",
          600: "#C7498A",
          700: "#A93370",
        },
        "gray-border": "#DADADA",

        // Shadcn mappings to our theme
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

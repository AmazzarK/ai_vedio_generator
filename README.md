# 🎬 AI Video Generator - Next.js SaaS Platform

A powerful AI-driven video generation platform with multilingual support, subscription management, and cloud storage.

## ✨ Features

### 🎥 Video Generation
- **AI-Powered Scripts** - Google Gemini AI generates video scripts
- **90+ Video Styles** - Cinematic, 3D Animation, VFX, and more
- **Platform Optimization** - TikTok, Instagram, YouTube, Twitter, etc.
- **Multiple Durations** - 15s, 30s, 60s, or custom length
- **Quality Options** - 720p, 1080p, 4K

### 🎙️ Text-to-Speech
- **Edge TTS** - Microsoft's high-quality neural voices
- **3 Languages** - English, Arabic (العربية), French (Français)
- **Male & Female Voices** - Natural-sounding speech
- **Auto-Fallback** - gTTS backup if Edge TTS fails
- **100% FREE** - No API keys required

### ☁️ Cloud Storage
- **Cloudinary Integration** - 25 GB free storage
- **CDN Delivery** - Global content delivery network
- **Auto-Upload** - Audio files automatically uploaded
- **No Credit Card** - Forever free tier

### 💳 Payment System
- **Stripe Integration** - Secure subscription management
- **3 Pricing Tiers** - Free, Pro ($19/mo), Enterprise ($49/mo)
- **Token System** - Usage-based billing
- **Webhook Handlers** - Real-time subscription updates

### 🌍 Multilingual Support
- **3 Languages** - English, Arabic, French
- **Complete Translation** - All UI elements translated
- **RTL Support** - Right-to-left for Arabic
- **Language Switcher** - Easy language switching

### 🔐 Authentication
- **Clerk Integration** - Secure user management
- **Social Login** - Google, GitHub, etc.
- **Protected Routes** - Middleware-based protection
- **User Profiles** - Complete user management

### 💾 Database
- **Neon PostgreSQL** - Serverless PostgreSQL
- **Drizzle ORM** - Type-safe database queries
- **2 Tables** - Users and Videos
- **Subscription Tracking** - Plan, tokens, status

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - Latest React features
- **Tailwind CSS 4** - Utility-first CSS
- **Framer Motion** - Animations
- **Lucide Icons** - Beautiful icons

### Backend
- **Next.js API Routes** - Serverless functions
- **Clerk Auth** - Authentication
- **Stripe** - Payment processing
- **Drizzle ORM** - Database queries

### AI & Media
- **Google Gemini** - AI script generation
- **Edge TTS** - Text-to-speech
- **Cloudinary** - Media storage & CDN

### Database
- **Neon PostgreSQL** - Serverless database
- **Drizzle Kit** - Database migrations

## 🚀 Getting Started

**📖 For complete setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)**

### Quick Setup

```bash
# 1. Clone & Install
git clone https://github.com/AmazzarK/ai_vedio_generator.git
cd ai-vedio-generator
npm install

# 2. Setup environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# 3. Push database schema
npm run db:push

# 4. Start development server
npm run dev
```

Open http://localhost:3000

### Required Services (All FREE!)

| Service | Purpose | Setup Time |
|---------|---------|------------|
| [Clerk](https://clerk.com) | Authentication | 5 min |
| [Neon](https://neon.tech) | Database | 3 min |
| [Gemini](https://aistudio.google.com) | AI Scripts | 2 min |
| [Cloudinary](https://cloudinary.com) | Storage (25 GB) | 5 min |

**No credit cards required!** ✅

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup instructions.

## 📁 Project Structure

```
ai-vedio-generator/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── generate-audio/   # TTS generation
│   │   ├── get-vedio-script/ # AI script generation
│   │   └── stripe/           # Payment webhooks
│   ├── dashboard/            # Main dashboard
│   ├── pricing/              # Pricing page
│   ├── sign-in/              # Auth pages
│   └── test-audio/           # TTS testing
├── components/               # React components
├── configs/                  # Configuration
│   ├── plans.ts              # Pricing plans
│   └── schema.ts             # Database schema
├── lib/                      # Utilities
│   ├── cloudinary-storage.ts # Cloudinary upload
│   ├── edge-tts.ts           # Edge TTS
│   ├── gtts.ts               # Google TTS fallback
│   └── text-to-speech.ts     # Main TTS interface
├── public/                   # Static files
│   └── audio/                # Generated audio (temp)
└── scripts/                  # Utility scripts
```

## 📖 Documentation

- **TTS Setup** - `TTS_SETUP.md`
- **Cloudinary Setup** - `CLOUDINARY_SETUP.md`
- **Payment Setup** - `PAYMENT_SETUP.md`

## 🎯 Features Status

### ✅ Completed
- Authentication with Clerk
- Database with Neon + Drizzle
- Dashboard with multilingual support
- Text-to-speech with Edge TTS
- Cloudinary storage integration
- Stripe payment system (backend ready)
- AI script generation with Gemini
- Pricing page
- 90+ video styles configuration

### ⏳ In Progress
- Actual video rendering
- Token deduction system
- Video management UI
- Social media integration

### 📋 Planned
- Video analytics
- Team collaboration
- API access for Pro users
- White-label options

## 🔧 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run db:push    # Push database schema
npm run db:studio  # Open Drizzle Studio
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

Make sure to add all `.env.local` variables in Vercel dashboard.

## 💰 Pricing Plans

| Plan | Price | Tokens | Quality | Features |
|------|-------|--------|---------|----------|
| **Free** | $0 | 100/mo | 720p | 30 styles, watermark |
| **Pro** | $19/mo | 500/mo | 1080p | 90+ styles, no watermark |
| **Enterprise** | $49/mo | Unlimited | 4K | API access, priority support |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Clerk for authentication
- Microsoft for Edge TTS
- Cloudinary for free storage
- Google for Gemini AI

## 📧 Support

For support, email support@yourdomain.com or open an issue on GitHub.

---

**Built with ❤️ using Next.js 16**

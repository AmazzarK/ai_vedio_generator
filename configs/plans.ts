export const PLANS = {
  FREE: {
    id: 'free',
    name: {
      en: 'Free',
      ar: 'مجاني',
      fr: 'Gratuit'
    },
    price: {
      monthly: 0,
      yearly: 0
    },
    tokens: 100,
    features: {
      en: [
        '100 tokens per month',
        '720p video quality',
        'Basic styles (30 styles)',
        'Watermark on videos',
        'Watch ads for extra tokens',
        'Community support'
      ],
      ar: [
        '100 جيتون شهرياً',
        'جودة 720p',
        'أنماط أساسية (30 نمط)',
        'علامة مائية على الفيديوهات',
        'شاهد إعلانات للحصول على جيتونات إضافية',
        'دعم المجتمع'
      ],
      fr: [
        '100 jetons par mois',
        'Qualité vidéo 720p',
        'Styles de base (30 styles)',
        'Filigrane sur les vidéos',
        'Regardez des pubs pour des jetons',
        'Support communautaire'
      ]
    },
    limits: {
      maxDuration: 15,
      maxQuality: '720p',
      stylesCount: 30,
      watermark: true,
      adsForTokens: true
    }
  },
  PRO: {
    id: 'pro',
    name: {
      en: 'Pro',
      ar: 'محترف',
      fr: 'Pro'
    },
    price: {
      monthly: 19,
      yearly: 190
    },
    priceId: {
      monthly: process.env.STRIPE_PRICE_PRO_MONTHLY || 'price_pro_monthly',
      yearly: process.env.STRIPE_PRICE_PRO_YEARLY || 'price_pro_yearly'
    },
    tokens: 500,
    features: {
      en: [
        '500 tokens per month',
        '1080p HD video quality',
        'All styles (90+ styles)',
        'No watermark',
        'Priority rendering',
        'Email support',
        'Advanced AI tools',
        '50% faster generation'
      ],
      ar: [
        '500 جيتون شهرياً',
        'جودة 1080p HD',
        'جميع الأنماط (90+ نمط)',
        'بدون علامة مائية',
        'معالجة ذات أولوية',
        'دعم عبر البريد الإلكتروني',
        'أدوات AI متقدمة',
        'إنشاء أسرع بنسبة 50%'
      ],
      fr: [
        '500 jetons par mois',
        'Qualité vidéo 1080p HD',
        'Tous les styles (90+ styles)',
        'Sans filigrane',
        'Rendu prioritaire',
        'Support par email',
        'Outils IA avancés',
        'Génération 50% plus rapide'
      ]
    },
    limits: {
      maxDuration: 60,
      maxQuality: '1080p',
      stylesCount: 90,
      watermark: false,
      adsForTokens: false
    },
    popular: true
  },
  ENTERPRISE: {
    id: 'enterprise',
    name: {
      en: 'Enterprise',
      ar: 'للشركات',
      fr: 'Entreprise'
    },
    price: {
      monthly: 49,
      yearly: 490
    },
    priceId: {
      monthly: process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY || 'price_enterprise_monthly',
      yearly: process.env.STRIPE_PRICE_ENTERPRISE_YEARLY || 'price_enterprise_yearly'
    },
    tokens: -1, // Unlimited
    features: {
      en: [
        'Unlimited tokens',
        '4K UHD video quality',
        'All styles + Custom styles',
        'No watermark',
        'Instant rendering',
        'Priority 24/7 support',
        'White-label options',
        'API access',
        'Team collaboration (5 members)',
        'Custom branding'
      ],
      ar: [
        'جيتونات غير محدودة',
        'جودة 4K UHD',
        'جميع الأنماط + أنماط مخصصة',
        'بدون علامة مائية',
        'معالجة فورية',
        'دعم على مدار الساعة',
        'خيارات العلامة البيضاء',
        'الوصول إلى API',
        'تعاون الفريق (5 أعضاء)',
        'علامة تجارية مخصصة'
      ],
      fr: [
        'Jetons illimités',
        'Qualité vidéo 4K UHD',
        'Tous les styles + Styles personnalisés',
        'Sans filigrane',
        'Rendu instantané',
        'Support prioritaire 24/7',
        'Options marque blanche',
        'Accès API',
        'Collaboration en équipe (5 membres)',
        'Image de marque personnalisée'
      ]
    },
    limits: {
      maxDuration: 120,
      maxQuality: '4K',
      stylesCount: -1, // Unlimited
      watermark: false,
      adsForTokens: false
    }
  }
} as const;

export type PlanId = 'free' | 'pro' | 'enterprise';
export type BillingCycle = 'monthly' | 'yearly';

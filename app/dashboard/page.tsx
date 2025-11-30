'use client'

import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  Video, 
  Plus, 
  Library, 
  Settings, 
  Sparkles,
  Coins,
  Crown,
  PlayCircle,
  Smartphone,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  Linkedin,
  Film,
  Image as ImageIcon,
  Upload,
  X,
  Languages
} from 'lucide-react';

export default function Dashboard() {
  const pathname = usePathname();
  const [tokens, setTokens] = useState(250);
  const [selectedPlatform, setSelectedPlatform] = useState('tiktok');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<'ar' | 'fr' | 'en'>('ar');

  // Translations
  const translations = {
    ar: {
      title: 'إنشاء محتوى سوشيال ميديا',
      subtitle: 'للمبدعين العرب',
      watchAd: 'شاهد إعلان +50',
      platform: 'اختر المنصة',
      describe: 'اوصف محتوى الفيديو',
      placeholder: 'مثال: فيديو ترند تيك توك عن وصفة كنافة رمضانية، إضاءة ذهبية دافئة، موسيقى عربية حماسية، انتقالات سريعة وجذابة...',
      uploadImages: 'ارفع صور مرجعية (اختياري)',
      uploadText: 'اضغط لرفع الصور',
      dragDrop: 'أو اسحب وأفلت',
      chooseStyle: 'اختر نمط الجرافيك',
      duration: 'المدة',
      music: 'نوع الموسيقى',
      textOverlay: 'النصوص',
      quality: 'الجودة',
      cost: 'التكلفة',
      remaining: 'المتبقي',
      generate: 'إنشاء فيديو',
      tokens: 'جيتون',
      // Navigation
      navGenerate: 'إنشاء',
      navVideos: 'مقاطعي',
      navStudio: 'استوديو AI',
      navSettings: 'الإعدادات',
      // Sidebar
      upgradeToPro: 'ترقية للنسخة المميزة',
      myAccount: 'حسابي',
      freePlan: 'باقة مجانية',
      // Stats
      videosCreated: 'مقاطع منشأة',
      totalViews: 'مجموع المشاهدات',
      tokensBalance: 'رصيد الجيتونات',
      storageUsed: 'المساحة المستخدمة',
      thisWeek: 'هذا الأسبوع',
      earnMore: 'اكسب المزيد بمشاهدة الإعلانات',
      of: 'من',
      // Duration
      optimizedFor: 'محسّن لـ',
      maxDuration: 'المدة القصوى',
      selected: 'المختار',
      // Music options
      arabicPop: 'عربي بوب',
      khaleeji: 'خليجي',
      dabke: 'دبكة',
      traditionalArabic: 'تراثي عربي',
      arabicFusion: 'فيوجن عربي',
      oudOriental: 'عود وشرقي',
      islamicNasheed: 'أناشيد إسلامية',
      noMusic: 'بدون موسيقى',
      // Text overlay options
      arabicCaptions: 'ترجمة عربية',
      arabicEnglish: 'عربي وإنجليزي',
      animatedText: 'نص متحرك',
      titleOnly: 'العنوان فقط',
      islamicQuotes: 'آيات وأذكار',
      noText: 'بدون نص',
      // Quality options
      hdFree: '1080p (HD) - مجاني',
      sdFree: '720p (SD) - مجاني',
      uhdPro: '4K (UHD) - للمميزين فقط'
    },
    fr: {
      title: 'Créer du Contenu Social Media',
      subtitle: 'Pour les Créateurs',
      watchAd: 'Regarder Pub +50',
      platform: 'Choisir la Plateforme',
      describe: 'Décrivez Votre Vidéo',
      placeholder: 'Exemple: Vidéo tendance TikTok sur une recette de Kunafa du Ramadan, éclairage doré chaleureux, musique arabe énergique, transitions rapides et engageantes...',
      uploadImages: 'Télécharger Images Référence (Optionnel)',
      uploadText: 'Cliquer pour télécharger',
      dragDrop: 'ou glisser-déposer',
      chooseStyle: 'Choisir le Style Graphique',
      duration: 'Durée',
      music: 'Style Musical',
      textOverlay: 'Texte',
      quality: 'Qualité',
      cost: 'Coût',
      remaining: 'Restant',
      generate: 'Générer Vidéo',
      tokens: 'jetons',
      // Navigation
      navGenerate: 'Générer',
      navVideos: 'Mes Vidéos',
      navStudio: 'Studio IA',
      navSettings: 'Paramètres',
      // Sidebar
      upgradeToPro: 'Passer à Pro',
      myAccount: 'Mon Compte',
      freePlan: 'Plan Gratuit',
      // Stats
      videosCreated: 'Vidéos Créées',
      totalViews: 'Vues Totales',
      tokensBalance: 'Solde de Jetons',
      storageUsed: 'Stockage Utilisé',
      thisWeek: 'cette semaine',
      earnMore: 'Gagnez plus en regardant des pubs',
      of: 'sur',
      // Duration
      optimizedFor: 'Optimisé pour',
      maxDuration: 'Durée maximale',
      selected: 'Sélectionné',
      // Music options
      arabicPop: 'Pop Arabe',
      khaleeji: 'Khaleeji',
      dabke: 'Dabke',
      traditionalArabic: 'Traditionnel Arabe',
      arabicFusion: 'Fusion Arabe',
      oudOriental: 'Oud et Oriental',
      islamicNasheed: 'Nasheed Islamique',
      noMusic: 'Sans Musique',
      // Text overlay options
      arabicCaptions: 'Sous-titres Arabes',
      arabicEnglish: 'Arabe + Anglais',
      animatedText: 'Texte Animé',
      titleOnly: 'Titre Uniquement',
      islamicQuotes: 'Citations Islamiques',
      noText: 'Sans Texte',
      // Quality options
      hdFree: '1080p (HD) - Gratuit',
      sdFree: '720p (SD) - Gratuit',
      uhdPro: '4K (UHD) - Pro Seulement'
    },
    en: {
      title: 'Create Social Media Content',
      subtitle: 'For Content Creators',
      watchAd: 'Watch Ad +50',
      platform: 'Choose Platform',
      describe: 'Describe Your Video',
      placeholder: 'Example: TikTok trend video about Ramadan Kunafa recipe, warm golden lighting, upbeat Arabic music, fast engaging transitions...',
      uploadImages: 'Upload Reference Images (Optional)',
      uploadText: 'Click to upload',
      dragDrop: 'or drag and drop',
      chooseStyle: 'Choose Graphic Style',
      duration: 'Duration',
      music: 'Music Style',
      textOverlay: 'Text',
      quality: 'Quality',
      cost: 'Cost',
      remaining: 'Remaining',
      generate: 'Generate Video',
      tokens: 'tokens',
      // Navigation
      navGenerate: 'Generate',
      navVideos: 'My Videos',
      navStudio: 'AI Studio',
      navSettings: 'Settings',
      // Sidebar
      upgradeToPro: 'Upgrade to Pro',
      myAccount: 'My Account',
      freePlan: 'Free Plan',
      // Stats
      videosCreated: 'Videos Created',
      totalViews: 'Total Views',
      tokensBalance: 'Tokens Balance',
      storageUsed: 'Storage Used',
      thisWeek: 'this week',
      earnMore: 'Earn more by watching ads',
      of: 'of',
      // Duration
      optimizedFor: 'Optimized for',
      maxDuration: 'Max duration',
      selected: 'Selected',
      // Music options
      arabicPop: 'Arabic Pop',
      khaleeji: 'Khaleeji',
      dabke: 'Dabke',
      traditionalArabic: 'Traditional Arabic',
      arabicFusion: 'Arabic Fusion',
      oudOriental: 'Oud & Oriental',
      islamicNasheed: 'Islamic Nasheed',
      noMusic: 'No Music',
      // Text overlay options
      arabicCaptions: 'Arabic Captions',
      arabicEnglish: 'Arabic + English',
      animatedText: 'Animated Text',
      titleOnly: 'Title Only',
      islamicQuotes: 'Islamic Quotes',
      noText: 'No Text',
      // Quality options
      hdFree: '1080p (HD) - Free',
      sdFree: '720p (SD) - Free',
      uhdPro: '4K (UHD) - Pro Only'
    }
  };

  const t = translations[selectedLanguage];

  const navItems = [
    { name: t.navGenerate, icon: Plus, href: '/dashboard' },
    { name: t.navVideos, icon: Library, href: '/dashboard/videos' },
    { name: t.navStudio, icon: Sparkles, href: '/dashboard/studio' },
    { name: t.navSettings, icon: Settings, href: '/dashboard/settings' },
  ];

  // Social Media Platforms with their specs
  const platforms = [
    { 
      id: 'tiktok', 
      name: 'TikTok', 
      icon: Smartphone,
      aspectRatio: '9:16',
      durations: ['15s', '30s', '60s', '3min'],
      maxDuration: '10min'
    },
    { 
      id: 'instagram-reel', 
      name: 'Instagram Reels', 
      icon: Instagram,
      aspectRatio: '9:16',
      durations: ['15s', '30s', '60s', '90s'],
      maxDuration: '90s'
    },
    { 
      id: 'instagram-post', 
      name: 'Instagram Post', 
      icon: ImageIcon,
      aspectRatio: '1:1',
      durations: ['15s', '30s', '60s'],
      maxDuration: '60s'
    },
    { 
      id: 'youtube-shorts', 
      name: 'YouTube Shorts', 
      icon: Youtube,
      aspectRatio: '9:16',
      durations: ['15s', '30s', '60s'],
      maxDuration: '60s'
    },
    { 
      id: 'youtube', 
      name: 'YouTube Video', 
      icon: Film,
      aspectRatio: '16:9',
      durations: ['30s', '1min', '2min', '5min', '10min'],
      maxDuration: 'Unlimited'
    },
    { 
      id: 'facebook', 
      name: 'Facebook', 
      icon: Facebook,
      aspectRatio: '1:1',
      durations: ['30s', '1min', '2min', '5min'],
      maxDuration: '240min'
    },
    { 
      id: 'twitter', 
      name: 'Twitter/X', 
      icon: Twitter,
      aspectRatio: '16:9',
      durations: ['30s', '1min', '2min'],
      maxDuration: '2min 20s'
    },
    { 
      id: 'linkedin', 
      name: 'LinkedIn', 
      icon: Linkedin,
      aspectRatio: '16:9',
      durations: ['30s', '1min', '3min', '5min'],
      maxDuration: '10min'
    },
  ];

  // Graphic/Visual Styles - Pure Visual Aesthetics
  const styleCategories = [
    {
      category: 'Cinematic',
      styles: ['Film Noir', 'Hollywood Blockbuster', 'Documentary Style', 'Drone Footage', 'Slow Motion', 'Time-lapse', 'Anamorphic Lens', 'Vintage Film']
    },
    {
      category: '3D & Animation',
      styles: ['3D Rendered', 'Motion Graphics', 'Particle Effects', 'Isometric 3D', 'Low Poly', 'CGI Realistic', 'Claymation', 'Liquid Simulation']
    },
    {
      category: '2D Animation',
      styles: ['Cartoon Style', 'Flat Design', 'Hand Drawn', 'Whiteboard Animation', 'Vector Animation', 'Frame-by-Frame', 'Cut-out Animation', 'Rotoscope']
    },
    {
      category: 'Color Grading',
      styles: ['Warm Golden', 'Cool Blue', 'Vintage Fade', 'High Contrast', 'Desaturated', 'Neon Vibrant', 'Pastel Soft', 'Moody Dark', 'Cinematic Teal-Orange']
    },
    {
      category: 'Lighting',
      styles: ['Natural Daylight', 'Golden Hour', 'Studio Lighting', 'Neon Lights', 'Dramatic Shadows', 'Soft Diffused', 'Backlit', 'Volumetric Rays', 'Low Key']
    },
    {
      category: 'Camera Movement',
      styles: ['Smooth Tracking', 'Handheld Shaky', 'Static Wide Shot', 'Dutch Angle', 'Dolly Zoom', 'Aerial View', 'POV First Person', 'Orbiting 360°']
    },
    {
      category: 'Visual Effects',
      styles: ['Glitch Effect', 'VHS Retro', 'Film Grain', 'Light Leaks', 'Lens Flare', 'Bokeh Blur', 'Chromatic Aberration', 'Double Exposure', 'Prism Effect']
    },
    {
      category: 'Transitions',
      styles: ['Quick Cut', 'Smooth Fade', 'Wipe Transition', 'Zoom Transition', 'Spin Transition', 'Morph Effect', 'Glitch Cut', 'Seamless Match Cut']
    },
    {
      category: 'Typography & Text',
      styles: ['Kinetic Typography', 'Minimal Text', 'Bold Captions', 'Animated Subtitles', 'Handwritten Style', 'Glitch Text', '3D Text', 'Neon Text']
    },
    {
      category: 'Artistic Styles',
      styles: ['Oil Painting', 'Watercolor', 'Sketch Drawing', 'Pop Art', 'Abstract', 'Impressionist', 'Cubism', 'Street Art', 'Graffiti Style']
    },
    {
      category: 'Texture & Overlay',
      styles: ['Paper Texture', 'Film Grain Overlay', 'Dust Particles', 'Rain Drops', 'Smoke Effect', 'Geometric Patterns', 'Halftone Dots', 'Scanlines']
    },
    {
      category: 'Speed & Pacing',
      styles: ['Ultra Slow Motion', 'Time Remapping', 'Speed Ramp', 'Hyper-lapse', 'Stop Motion', 'Freeze Frame', 'Fast Forward', 'Reverse Motion']
    }
  ];

  const selectedPlatformData = platforms.find(p => p.id === selectedPlatform);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files);
      setUploadedImages([...uploadedImages, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#0F0F12] text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#16161B] border-r border-[#7C3AED]/20 flex flex-col z-50">
        {/* Logo */}
        <div className="p-6 border-b border-[#7C3AED]/20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-linear-to-br from-[#7C3AED] to-[#00E7FF] rounded-lg flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gradient">ArabicVibes</span>
              <span className="text-[10px] text-gray-400">محتوى عربي</span>
            </div>
          </Link>
        </div>

        {/* Tokens Display */}
        <div className="p-4 border-b border-[#7C3AED]/20">
          <div className="bg-linear-to-r from-[#7C3AED]/20 to-[#00E7FF]/20 border border-[#7C3AED]/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-[#FFD700]" />
                <span className="text-sm font-medium">Tokens</span>
              </div>
              <button className="text-[#00E7FF] text-xs hover:underline">
                Get More
              </button>
            </div>
            <p className="text-2xl font-bold">{tokens}</p>
            <p className="text-xs text-gray-400 mt-1">20 tokens per video</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-linear-to-r from-[#7C3AED]/20 to-[#00E7FF]/20 border border-[#7C3AED]/50 text-white'
                    : 'text-gray-400 hover:bg-[#7C3AED]/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}

          {/* Premium Upgrade Button */}
          <Link href="/pricing" className="w-full mt-4 px-4 py-3 bg-linear-to-r from-[#FFD700] to-[#FFA500] rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <Crown className="w-5 h-5" />
            {t.upgradeToPro}
          </Link>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-[#7C3AED]/20">
          <div className="flex items-center gap-3 px-4 py-3 bg-[#0F0F12] rounded-xl">
            <UserButton afterSignOutUrl="/" />
            <div className="flex-1">
              <p className="text-sm font-medium">{t.myAccount}</p>
              <p className="text-xs text-gray-400">{t.freePlan}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-[#0F0F12]/80 backdrop-blur-xl border-b border-[#7C3AED]/20">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h1 className="text-2xl font-bold">{t.title}</h1>
              <p className="text-sm text-gray-400 mt-1">{t.subtitle}</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="flex items-center gap-2 px-3 py-2 bg-[#16161B] rounded-xl border border-[#7C3AED]/20">
                <Languages className="w-4 h-4 text-gray-400" />
                <select 
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value as 'ar' | 'fr' | 'en')}
                  className="bg-transparent text-sm text-white focus:outline-none cursor-pointer"
                >
                  <option value="ar">العربية</option>
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div className="px-4 py-2 bg-[#16161B] rounded-xl border border-[#7C3AED]/20">
                <span className="text-sm text-gray-400">{t.freePlan} • </span>
                <button className="text-[#FFD700] hover:underline text-sm font-medium">{t.watchAd}</button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-[#16161B] rounded-2xl p-6 border border-[#7C3AED]/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm">{t.videosCreated}</h3>
                <div className="w-10 h-10 bg-[#7C3AED]/20 rounded-lg flex items-center justify-center">
                  <Video className="w-5 h-5 text-[#7C3AED]" />
                </div>
              </div>
              <p className="text-3xl font-bold">12</p>
              <p className="text-sm text-gray-400 mt-2">+3 {t.thisWeek}</p>
            </div>

            <div className="bg-[#16161B] rounded-2xl p-6 border border-[#00E7FF]/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm">{t.totalViews}</h3>
                <div className="w-10 h-10 bg-[#00E7FF]/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#00E7FF]" />
                </div>
              </div>
              <p className="text-3xl font-bold">1.2K</p>
              <p className="text-sm text-gray-400 mt-2">+245 {t.thisWeek}</p>
            </div>

            <div className="bg-[#16161B] rounded-2xl p-6 border border-[#FFD700]/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm">{t.tokensBalance}</h3>
                <div className="w-10 h-10 bg-[#FFD700]/20 rounded-lg flex items-center justify-center">
                  <Coins className="w-5 h-5 text-[#FFD700]" />
                </div>
              </div>
              <p className="text-3xl font-bold">{tokens}</p>
              <p className="text-sm text-gray-400 mt-2">{t.earnMore}</p>
            </div>

            <div className="bg-[#16161B] rounded-2xl p-6 border border-[#7C3AED]/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm">{t.storageUsed}</h3>
                <div className="w-10 h-10 bg-[#7C3AED]/20 rounded-lg flex items-center justify-center">
                  <Library className="w-5 h-5 text-[#7C3AED]" />
                </div>
              </div>
              <p className="text-3xl font-bold">2.4 GB</p>
              <p className="text-sm text-gray-400 mt-2">{t.of} 10 GB</p>
            </div>
          </div>

          {/* Video Generation Form */}
          <div className="bg-[#16161B] rounded-2xl p-8 border border-[#7C3AED]/20">
            <h2 className="text-2xl font-bold mb-6">{t.title}</h2>
            
            <div className="space-y-6">
              {/* Platform Selection */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-400">
                  {t.platform}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {platforms.map((platform) => {
                    const Icon = platform.icon;
                    return (
                      <button
                        key={platform.id}
                        onClick={() => setSelectedPlatform(platform.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedPlatform === platform.id
                            ? 'border-[#00E7FF] bg-[#00E7FF]/10'
                            : 'border-[#7C3AED]/20 hover:border-[#7C3AED]/50'
                        }`}
                      >
                        <div className="flex justify-center mb-2">
                          <Icon className="w-8 h-8 text-[#00E7FF]" />
                        </div>
                        <p className="text-sm font-medium">{platform.name}</p>
                        <p className="text-xs text-gray-400 mt-1">{platform.aspectRatio}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Prompt Input */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-400">
                  {t.describe}
                </label>
                <textarea
                  placeholder={t.placeholder}
                  className="w-full px-6 py-4 bg-[#0F0F12] border border-[#7C3AED]/30 rounded-xl text-white placeholder:text-gray-500 focus:border-[#00E7FF] focus:outline-none focus:ring-2 focus:ring-[#00E7FF]/20 transition-all resize-none"
                  rows={4}
                  dir="auto"
                />
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-400">
                  {t.uploadImages}
                </label>
                
                {/* Upload Area */}
                <div className="border-2 border-dashed border-[#7C3AED]/30 rounded-xl p-6 text-center hover:border-[#00E7FF]/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-[#7C3AED]/20 rounded-full flex items-center justify-center mb-3">
                        <Upload className="w-8 h-8 text-[#7C3AED]" />
                      </div>
                      <p className="text-white font-medium mb-1">{t.uploadText}</p>
                      <p className="text-sm text-gray-400">{t.dragDrop}</p>
                      <p className="text-xs text-gray-500 mt-2">PNG, JPG, WEBP up to 10MB</p>
                    </div>
                  </label>
                </div>

                {/* Uploaded Images Preview */}
                {uploadedImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {uploadedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-[#0F0F12] rounded-lg border border-[#7C3AED]/30 overflow-hidden">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                        <p className="text-xs text-gray-400 mt-1 truncate">{image.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Style Selection - Extensive Options */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-400">
                  {t.chooseStyle} (90+ Styles)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto p-4 bg-[#0F0F12] rounded-xl">
                  {styleCategories.map((category) => (
                    <div key={category.category} className="space-y-2">
                      <h4 className="text-sm font-semibold text-[#00E7FF] mb-2">{category.category}</h4>
                      {category.styles.map((style) => (
                        <button
                          key={style}
                          onClick={() => setSelectedStyle(style)}
                          className={`w-full text-left px-4 py-2 rounded-lg border transition-all ${
                            selectedStyle === style
                              ? 'border-[#00E7FF] bg-[#00E7FF]/10 text-white'
                              : 'border-[#7C3AED]/20 hover:border-[#7C3AED]/50 text-gray-400'
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
                {selectedStyle && (
                  <p className="text-sm text-[#00E7FF] mt-2">{t.selected}: {selectedStyle}</p>
                )}
              </div>

              {/* Duration Selection (Platform-specific) */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-400">
                  {t.duration} ({t.optimizedFor} {selectedPlatformData?.name})
                </label>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                  {selectedPlatformData?.durations.map((duration: string) => (
                    <button
                      key={duration}
                      className="px-4 py-3 bg-[#0F0F12] border border-[#7C3AED]/30 rounded-xl text-sm hover:border-[#00E7FF] hover:bg-[#00E7FF]/10 transition-all"
                    >
                      {duration}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  {t.maxDuration} {t.of} {selectedPlatformData?.name}: {selectedPlatformData?.maxDuration}
                </p>
              </div>

              {/* Additional Settings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-400">
                    {t.music}
                  </label>
                  <select className="w-full px-4 py-3 bg-[#0F0F12] border border-[#7C3AED]/30 rounded-xl text-white focus:border-[#00E7FF] focus:outline-none focus:ring-2 focus:ring-[#00E7FF]/20">
                    <option>{t.arabicPop}</option>
                    <option>{t.khaleeji}</option>
                    <option>{t.dabke}</option>
                    <option>{t.traditionalArabic}</option>
                    <option>{t.arabicFusion}</option>
                    <option>{t.oudOriental}</option>
                    <option>{t.islamicNasheed}</option>
                    <option>{t.noMusic}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-400">
                    {t.textOverlay}
                  </label>
                  <select className="w-full px-4 py-3 bg-[#0F0F12] border border-[#7C3AED]/30 rounded-xl text-white focus:border-[#00E7FF] focus:outline-none focus:ring-2 focus:ring-[#00E7FF]/20">
                    <option>{t.arabicCaptions}</option>
                    <option>{t.arabicEnglish}</option>
                    <option>{t.animatedText}</option>
                    <option>{t.titleOnly}</option>
                    <option>{t.islamicQuotes}</option>
                    <option>{t.noText}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-400">
                    {t.quality}
                  </label>
                  <select className="w-full px-4 py-3 bg-[#0F0F12] border border-[#7C3AED]/30 rounded-xl text-white focus:border-[#00E7FF] focus:outline-none focus:ring-2 focus:ring-[#00E7FF]/20">
                    <option>{t.hdFree}</option>
                    <option>{t.sdFree}</option>
                    <option>{t.uhdPro}</option>
                  </select>
                </div>
              </div>

              {/* Cost Display and Generate Button */}
              <div className="flex items-center justify-between pt-6 border-t border-[#7C3AED]/20">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-[#FFD700]" />
                    <p className="text-sm">
                      <span className="text-gray-400">{t.cost}: </span>
                      <span className="text-white font-semibold">20 {t.tokens}</span>
                    </p>
                  </div>
                  <p className="text-sm text-gray-400">
                    {t.remaining}: <span className="text-white font-semibold">{tokens - 20} {t.tokens}</span>
                  </p>
                  <button className="text-[#00E7FF] hover:underline text-sm font-medium flex items-center gap-1">
                    <PlayCircle className="w-4 h-4" />
                    {t.watchAd} {t.tokens}
                  </button>
                </div>
                
                <button 
                  disabled={tokens < 20}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                    tokens >= 20
                      ? 'bg-linear-to-r from-[#7C3AED] to-[#00E7FF] hover:opacity-90'
                      : 'bg-gray-600 cursor-not-allowed opacity-50'
                  }`}
                >
                  <Plus className="w-5 h-5" />
                  <span>{t.generate}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Recent Videos */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recent Videos</h2>
              <Link href="/dashboard/videos" className="text-[#00E7FF] hover:text-[#00E7FF]/80 text-sm font-medium">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id: 1, title: 'TikTok Dance Challenge', platform: 'TikTok 📱', views: '1.2K' },
                { id: 2, title: 'Instagram Product Review', platform: 'Instagram 📷', views: '856' },
                { id: 3, title: 'YouTube Tutorial', platform: 'YouTube ▶️', views: '2.4K' },
              ].map((video) => (
                <div key={video.id} className="bg-[#16161B] rounded-xl border border-[#7C3AED]/20 overflow-hidden hover:border-[#00E7FF]/50 transition-all group">
                  <div className="aspect-video bg-linear-to-br from-[#7C3AED]/20 to-[#00E7FF]/20 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Video className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="absolute top-2 left-2 px-2 py-1 bg-[#00E7FF]/20 border border-[#00E7FF]/30 rounded-lg text-xs font-medium backdrop-blur-sm">
                      Complete
                    </div>
                    <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg text-xs">
                      {video.platform}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{video.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{video.views} views • 2 hours ago</p>
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 bg-[#7C3AED]/20 hover:bg-[#7C3AED]/30 border border-[#7C3AED]/30 rounded-lg text-sm font-medium transition-colors">
                        View
                      </button>
                      <button className="flex-1 px-3 py-2 bg-[#00E7FF]/20 hover:bg-[#00E7FF]/30 border border-[#00E7FF]/30 rounded-lg text-sm font-medium transition-colors">
                        Share
                      </button>
                      <button className="px-3 py-2 bg-[#FFD700]/20 hover:bg-[#FFD700]/30 border border-[#FFD700]/30 rounded-lg text-sm font-medium transition-colors">
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

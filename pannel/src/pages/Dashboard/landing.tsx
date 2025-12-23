import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Shield,
  Zap,
  BarChart3,
  ArrowRight,
  Coins,
  Wallet,
  History,
  ChevronDown,
  Sparkles,
  TrendingUp,
  Cpu,
  Globe,
} from "lucide-react";
import { Navigate, useNavigate } from "react-router";

// وارد کردن تصویر PNG خود در اینجا (مسیر را به روز کنید)
// import spiderBotImage from './path/to/your/spider-bot.png';

export default function LandingPage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // بخش قهرمان تصویر - بالای صفحه
  const ImageHeroSection = () => (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-purple-900" dir="rtl">
      {/* الگوی پس‌زمینه متحرک */}
      <div className="absolute inset-0 opacity-20">
        {/* الگوی برد مدار */}
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="#8B5CF6" opacity="0.3"/>
              <path d="M0,50 H100 M50,0 V100" stroke="#EC4899" strokeWidth="1" opacity="0.2" fill="none"/>
              <path d="M20,20 L80,80 M80,20 L20,80" stroke="#3B82F6" strokeWidth="1" opacity="0.2" fill="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)"/>
        </svg>
      </div>

      {/* عناصر شناور */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`float-${i}`}
            className="absolute"
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
            }}
          >
            {i % 3 === 0 ? (
              <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-sm" />
            ) : i % 3 === 1 ? (
              <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg blur-sm" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-sm" />
            )}
          </motion.div>
        ))}
      </div>

      {/* کره‌های درخشان */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

      {/* محتوای اصلی */}
      <div className="relative z-20 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* سمت چپ - محتوای متنی */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* نشان */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-500/30"
            >
              <Sparkles className="w-5 h-5 text-purple-400 ml-3" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 font-semibold">
                انقلاب معاملاتی مبتنی بر  
              </span>
            </motion.div>

            {/* عنوان اصلی */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="block text-white">با</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 mt-2">
                ربات اسپایدر
              </span>
              <span className="block text-2xl md:text-3xl text-gray-300 mt-6 font-normal">
                دستیار هوشمند معاملات ارز دیجیتال شما
              </span>
            </motion.h1>

            {/* توضیحات */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-300 max-w-2xl leading-relaxed"
            >
              ربات معاملاتی پیشرفته که بازار را پایش، تحلیل و با دقت بالا در بازار نوسانی ارزهای دیجیتال معامله می‌کند. معاملات خودکار ۲۴ ساعته با مدیریت ریسک هوشمند.
            </motion.p>

            {/* نقاط قوت */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {[
                { icon: Cpu, text: "تحلیل مبتنی بر  ", color: "text-purple-400" },
                { icon: Zap, text: "اجرای سریع معاملات", color: "text-blue-400" },
                { icon: Shield, text: "مدیریت ریسک هوشمند", color: "text-green-400" },
                { icon: Globe, text: "پشتیبانی از چندین صرافی", color: "text-cyan-400" },
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-reverse space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 ${feature.color}`}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <span className="text-gray-300">{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* دکمه‌های اقدام */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button
                onClick={() => navigate("/signin", { replace: true })}
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center"
              >
                <span>شروع معاملات هوشمند</span>
                <ArrowRight className="w-5 h-5 mr-3 group-hover:translate-x-2 transition-transform rotate-180" />
              </button>
              <button
                onClick={() => navigate("/signup", { replace: true })}
                className="px-8 py-4 border-2 border-purple-500/30 rounded-xl font-bold text-lg hover:bg-purple-500/10 transition-all duration-300"
              >
                مشاهده ویدئوی دمو
              </button>
            </motion.div>
          </motion.div>

          {/* سمت راست - نمایش تصویر */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* اثر درخشش */}
            <div className="absolute -inset-8 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 rounded-3xl blur-3xl" />

            {/* کانتینر اصلی تصویر */}
            <div className="relative bg-gradient-to-br from-gray-900/80 via-black/80 to-purple-900/20 backdrop-blur-xl rounded-3xl border-2 border-purple-500/20 p-1 shadow-2xl">
              {/* حاشیه تزئینی */}
              <div className="absolute -inset-4 border border-purple-500/10 rounded-3xl" />
              
              {/* جایگاه تصویر - با تصویر PNG خود جایگزین کنید */}
              <div className="relative z-10 min-h-[500px] flex items-center justify-center p-8">
                {/* این div را با تصویر واقعی خود جایگزین کنید */}
                <div className="relative w-full max-w-md">
                  {/* ناحیه تصویر اصلی */}
                  {/* <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center"> */}
                    {/* تصویر PNG شما اینجا قرار می‌گیرد */}
          
                    
                    {/* ایموجی را حذف کرده و برای استفاده از تصویر خود، زیر را آنکامنت کنید */}
                    <img 
                      src={'/itslogo.jpeg'} 
                      alt="ربات معاملاتی اسپایدر" 
                      className="w-full h-full object-contain"
                    />
                    
                    {/* عناصر شناور اطراف تصویر */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={`float-${i}`}
                        className="absolute w-16 h-16"
                        animate={{
                          rotate: 360,
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: i * 0.5,
                          ease: "linear"
                        }}
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                        }}
                      >
                        <div className="w-full h-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-sm" />
                      </motion.div>
                    ))}
                  {/* </div> */}

                  {/* نشان اطلاعات تصویر */}
                  {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="absolute -bottom-6 right-1/2 transform translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-xl shadow-lg"
                  >
                    <div className="flex items-center space-x-reverse space-x-3">
                      <TrendingUp className="w-5 h-5" />
                      <span className="font-bold">عملکرد لحظه‌ای</span>
                    </div>
                  </motion.div> */}
                </div>
              </div>

              {/* حلقه‌های متحرک */}
              <motion.div
                className="absolute inset-0 border-2 border-purple-300/20 rounded-3xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-4 border-2 border-pink-300/20 rounded-3xl"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* آمار شناور اطراف تصویر */}
            {[
              { value: "۹۵٪", label: "دقت", pos: "top-0 right-0" },
              { value: "۰.۱ثانیه", label: "سرعت", pos: "top-0 left-0" },
              { value: "۲۴/۷", label: "آپ‌تایم", pos: "bottom-0 right-0" },
              { value: "۵۰+", label: "جفت ارز", pos: "bottom-0 left-0" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`absolute ${stat.pos} transform translate-x-1/2 -translate-y-1/2 bg-gray-900/80 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4 min-w-[100px] text-center`}
              >
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* نشانگر اسکرول */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 right-1/2 transform translate-x-1/2"
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-gray-400 text-sm">برای کاوش اسکرول کنید</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6 text-purple-400" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );

  // بخش قهرمان اصلی (اکنون بخش دوم)
  const OriginalHeroSection = () => (
    <div className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-purple-900/20 to-black" dir="rtl">
      <div className="absolute inset-0">
        {/* الگوی تار عنکبوت */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45) * (Math.PI / 180);
            const x = 50 + 40 * Math.cos(angle);
            const y = 50 + 40 * Math.sin(angle);
            return (
              <div
                key={`line-${i}`}
                className="absolute top-1/2 right-1/2 w-px h-64 bg-white origin-top"
                style={{
                  transform: `translate(50%, -50%) rotate(${i * 45}deg)`,
                }}
              />
            );
          })}
          {/* حلقه‌های تار */}
          {[20, 40, 60].map((radius, idx) => (
            <div
              key={`circle-${idx}`}
              className="absolute top-1/2 right-1/2 rounded-full border border-white/10"
              style={{
                width: `${radius * 2}%`,
                height: `${radius * 2}%`,
                transform: 'translate(50%, -50%)',
              }}
            />
          ))}
        </div>

        {/* عنکبوت متحرک */}
        <motion.div
          className="absolute w-8 h-12"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            top: '30%',
            right: '40%',
          }}
        >
          {/* بدن عنکبوت */}
          <div className="absolute w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
          {/* پاهای عنکبوت */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`leg-${i}`}
              className="absolute w-6 h-px bg-gradient-to-r from-purple-400 to-pink-400"
              animate={{
                rotate: i < 4 ? [0, 10, -10, 0] : [0, -10, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
              style={{
                top: '4px',
                right: i < 4 ? '0px' : '24px',
                transformOrigin: i < 4 ? 'right center' : 'left center',
                rotate: `${(i * 45) - 90}deg`,
              }}
            />
          ))}
        </motion.div>

        {/* سکه‌های شناور */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`coin-${i}`}
            className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-300 shadow-lg"
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
              rotate: 360,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            style={{
              right: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <div className="absolute inset-1 rounded-full bg-yellow-200/30"></div>
          </motion.div>
        ))}

        {/* خطوط اتصال */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="pulse-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0">
                <animate
                  attributeName="stop-opacity"
                  values="0;0.5;0"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="50%" stopColor="#EC4899" stopOpacity="0.5">
                <animate
                  attributeName="stop-opacity"
                  values="0.5;1;0.5"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0">
                <animate
                  attributeName="stop-opacity"
                  values="0;0.5;0"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          </defs>
          {[...Array(5)].map((_, i) => (
            <motion.path
              key={`path-${i}`}
              d={`M ${20 + i * 15} 50 Q 50 ${30 + i * 10} 80 ${20 + i * 15}`}
              fill="none"
              stroke="url(#pulse-gradient)"
              strokeWidth="1"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </svg>
      </div>

      {/* محتوای با تم فارسی */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* نشان به سبک فارسی */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-400 ml-2 animate-pulse"></div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 text-sm font-bold">
                🕸️ ربات معاملاتی اسپایدر
              </span>
            </div>
            
            {/* عنوان فارسی */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-right">
              <span className="block text-white">ربات هوشمند معاملاتی</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 mt-2">
                اسپایدر
              </span>
              <span className="block text-xl text-gray-300 mt-4 font-normal">
                در بازار اسپات ارز دیجیتال
              </span>
            </h1>
            
            {/* توضیحات فارسی */}
            <div className="space-y-4 mb-8 max-w-lg">
              <p className="text-gray-300 text-lg leading-relaxed">
                ربات معاملاتی اسپایدر با   پیشرفته، معاملات شما در بازار اسپات ارزهای دیجیتال را به صورت ۲۴ ساعته مدیریت می‌کند
              </p>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-purple-300">🕸️ شناسایی فرصت‌های طلایی معاملاتی</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                <span className="text-pink-300">⚡ اجرای خودکار معاملات با سرعت بالا</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
                <span className="text-orange-300">🛡️ مدیریت ریسک هوشمند</span>
              </div>
            </div>
            
            {/* دکمه‌های اقدام با متن فارسی */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/signin", { replace: true })}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300"
              >
                <span className="flex items-center justify-center">
                  شروع معاملات هوشمند
                  <Zap className="w-5 h-5 mr-2" />
                </span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/signup", { replace: true })}
                className="px-8 py-3 border-2 border-purple-500/30 rounded-full font-bold text-lg hover:bg-purple-500/10 transition-all duration-300"
              >
                <span className="flex items-center justify-center">
                  مشاهده دموی ربات
                  <ArrowRight className="w-5 h-5 mr-2" />
                </span>
              </motion.button>
            </div>
          </motion.div>

          {/* بخش تصویر ربات */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* کانتینر اصلی تصویر ربات */}
            <div className="relative">
              {/* اثر پس‌زمینه درخشان */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl"></div>
              
              {/* کانتینر تصویر با طراحی فارسی */}
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl border border-purple-500/20 p-8">
                {/* قاب با الگوی فارسی */}
                <div className="absolute -inset-1 border-2 border-transparent rounded-3xl bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10"></div>
                
                {/* جایگاه تصویر ربات - با تصویر PNG خود جایگزین کنید */}
                <div className="relative z-10 flex flex-col items-center justify-center min-h-[400px]">
                  <div className="relative w-64 h-64 mb-6">
                    {/* تصویر اصلی ربات */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full flex items-center justify-center">
                      
                       <img 
                      src={'/logo.png'} 
                      alt="ربات معاملاتی اسپایدر" 
                      className="w-1/3 object-contain"
                    />

                    </div>
                    
                    {/* حلقه‌های چرخان */}
                    <motion.div
                      className="absolute inset-0 border-2 border-purple-300/20 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute inset-4 border-2 border-pink-300/20 rounded-full"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {/* نشانگرهای شناور */}
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={`indicator-${i}`}
                        className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-blue-400"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                        style={{
                          top: `${50 + 40 * Math.cos((i * 90) * Math.PI / 180)}%`,
                          right: `${50 + 40 * Math.sin((i * 90) * Math.PI / 180)}%`,
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* نشانگرهای وضعیت */}
                  <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    <motion.div 
                      className="bg-gray-900/50 rounded-xl p-4 border border-purple-500/20"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-gray-400 text-sm mb-1">وضعیت ربات</div>
                      <div className="flex items-center">
                        <span className="text-green-400 font-bold text-xl ml-2">فعال</span>
                        <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="bg-gray-900/50 rounded-xl p-4 border border-pink-500/20"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-gray-400 text-sm mb-1">سرعت معامله</div>
                      <div className="flex items-center">
                        <span className="text-blue-400 font-bold text-xl ml-2">۰.۱ ثانیه</span>
                        <Zap className="w-4 h-4 text-blue-400" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
              
              {/* عناصر فارسی شناور */}
              <motion.div
                className="absolute -top-6 -left-6 text-3xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🕸️
              </motion.div>
              <motion.div
                className="absolute -bottom-6 -right-6 text-3xl"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                ⚡
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* بنر متنی فارسی متحرک */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-purple-900/20 rounded-2xl border border-purple-500/30 backdrop-blur-sm"
        >
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              "🕸️ شبکه هوشمند معاملاتی",
              "⚡ اجرای لحظه‌ای",
              "🎯 دقت ۹۵٪",
              "🛡️ امنیت بالا"
            ].map((text, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 text-lg"
                whileHover={{ scale: 1.1 }}
              >
                <div className="text-2xl">{text.split(' ')[0]}</div>
                <span className="text-gray-200">{text.split(' ').slice(1).join(' ')}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  // بخش ویژگی‌ها
  const FeaturesSection = () => (
    <div className="py-20 bg-black/50" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">قابلیت‌های قدرتمند</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            تمام آنچه برای معاملات موفق در یک پلتفرم نیاز دارید
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:-translate-y-2 text-right">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform mr-auto ml-0">
                  <feature.icon className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  // بخش آمار
  const StatsSection = () => (
    <div className="py-20 relative overflow-hidden" dir="rtl">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-pink-900/10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  // بخش دعوت به اقدام
  const CTASection = () => (
    <div className="py-20" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-gray-900 rounded-3xl p-12">
              <h2 className="text-4xl font-bold mb-4">آماده شروع معامله هستید؟</h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                به هزاران معامله‌گری بپیوندید که برای نیازهای معاملاتی خودکار به پلتفرم ما اعتماد می‌کنند.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                onClick={()=>{
                    navigate("/signup" , {replace : true})
                }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-lg hover:opacity-90 transition-all transform hover:scale-105 flex items-center justify-center">
                  ایجاد حساب رایگان
                  <ArrowRight className="w-5 h-5 mr-2 inline rotate-180" />
                </button>
                <button 
                onClick={()=>{
                    navigate("/signup" , {replace : true})
                }
                }
                className="px-8 py-4 border border-gray-700 rounded-full font-semibold text-lg hover:bg-white/5 transition-all">
                  رزرو وقت دمو
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white">
      {/* بخش قهرمان تصویر جدید - بالای صفحه */}
      <ImageHeroSection />
      
      {/* بخش قهرمان اصلی */}
      <OriginalHeroSection />
      
      {/* بخش‌های موجود */}
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </div>
  );
}

// داده‌های ویژگی‌ها
const features = [
  {
    icon: BarChart3,
    title: "تحلیل لحظه‌ای",
    description: "داده‌های زنده بازار با ابزارهای نموداری پیشرفته و اندیکاتورهای تکنیکال"
  },
  {
    icon: Shield,
    title: "معاملات امن",
    description: "امنیت در سطح بانک با احراز هویت چند مرحله‌ای و ذخیره‌سازی سرد"
  },
  {
    icon: Zap,
    title: "معاملات خودکار",
    description: "معاملات الگوریتمی با استراتژی‌های قابل تنظیم و مدیریت ریسک"
  },
  {
    icon: Wallet,
    title: "مدیریت پرتفولیو",
    description: "پیگیری جامع پرتفولیو و تحلیل عملکرد"
  },
  {
    icon: Coins,
    title: "چند صرافی",
    description: "معامله در چندین صرافی از یک رابط واحد"
  },
  {
    icon: History,
    title: "تاریخچه و گزارش‌ها",
    description: "تاریخچه تراکنش‌های دقیق و گزارش‌دهی جامع"
  }
];

// داده‌های آمار
const stats = [
  { value: "۲۴/۷", label: "پایش بازار" },
  { value: "۹۹.۹٪", label: "آپ‌تایم" },
  { value: "۵۰+", label: "جفت ارز معاملاتی" },
];
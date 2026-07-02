/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // تخطي كل أخطاء التايب سكريبت مباشرة في المشروع كاملاً
    ignoreBuildErrors: true,
  },
  eslint: {
    // تخطي كل تحذيرات وإشكالات الإسلنت مباشرة
    ignoreDuringBuilds: true,
  },
};
// إضافة إعدادات الصور أسفل الملف دون لمس الكود السابق
if (nextConfig.images) {
  nextConfig.images.remotePatterns = [
    { protocol: 'https', hostname: '*.supabase.co', pathname: '/storage/v1/object/public/**' }
  ];
} else {
  nextConfig.images = {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co', pathname: '/storage/v1/object/public/**' }
    ]
  };
}
module.exports = nextConfig;

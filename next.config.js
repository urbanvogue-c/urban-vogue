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

module.exports = nextConfig;

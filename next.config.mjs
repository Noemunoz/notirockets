/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Esto le dice a Vercel que no detenga el lanzamiento por advertencias de estilo (ESLint)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
	   remotePatterns: [
		   // Unsplash
		   {
			   protocol: 'https',
			   hostname: 'images.unsplash.com',
			   port: '',
			   pathname: '/**',
		   },
		   // Placeholder images
		   {
			   protocol: 'https',
			   hostname: 'via.placeholder.com',
			   port: '',
			   pathname: '/**',
		   },
		   {
			   protocol: 'https',
			   hostname: 'placehold.co',
			   port: '',
			   pathname: '/**',
		   },
		   // Google static
		   {
			   protocol: 'https',
			   hostname: 'encrypted-tbn0.gstatic.com',
			   port: '',
			   pathname: '/**',
		   },
		   // API images (http and https)
		   {
			   protocol: 'http',
			   hostname: '62.72.57.219',
			   port: '',
			   pathname: '/uploads/landing-media/**',
		   },
		   {
			   protocol: 'http',
			   hostname: '62.72.57.219',
			   port: '',
			   pathname: '/files/landing-media/**',
		   },
		   {
			   protocol: 'https',
			   hostname: '62.72.57.219',
			   port: '',
			   pathname: '/uploads/landing-media/**',
		   },
		   {
			   protocol: 'https',
			   hostname: '62.72.57.219',
			   port: '',
			   pathname: '/files/landing-media/**',
		   },
		   // Add more domains as needed
	   ],
		formats: ['image/webp', 'image/avif'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		minimumCacheTTL: 60,
		dangerouslyAllowSVG: true,
		// Remove unsupported options: contentDispositionType, contentSecurityPolicy
	},
	// Production-specific optimizations (swcMinify is default in Next.js 15+)
	compress: true,
	poweredByHeader: false,
	// Security headers for production
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'Referrer-Policy',
						value: 'origin-when-cross-origin',
					},
					{
						key: 'X-XSS-Protection',
						value: '1; mode=block',
					},
					{
						key: 'Permissions-Policy',
						value: 'camera=(), microphone=(), geolocation=()',
					},
				],
			},
		];
	},
};

export default nextConfig;

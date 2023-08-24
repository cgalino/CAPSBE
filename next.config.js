/** @type {import('next').NextConfig} */
const nextConfig = {
   experimental: {
      esmExternals: "loose",
      serverComponentsExternalPackages: ["mongoose", "bcryptjs"]
   },
   // webpack: (config) => {
   //    config.experiments = { ...config.experiments, topLevelAwait: true };
   //    return config;
   // },
   // reactStrictMode: true,
   // serverRuntimeConfig: {
   //    connectionString: "mongodb://trial.soidemdt.com:27017",
   //    secret: '363f8db2-57f6-44fa-a253-0f046775b9cf-039decab-4a24-43ba-a965-61df165d50d8'
   // },
   // publicRuntimeConfig: {
   //    apiUrl: process.env.NODE_ENV === 'development'
   //       ? 'http://localhost:3000/api' // development api
   //       : 'http://localhost:3000/api' // production api
   // },
   async redirects() {
      return [
         {
            source: '/',
            destination: `/dashboard/479/${process.env.DASHBOARD_DEFAULT_YEAR}/${process.env.DASHBOARD_DEFAULT_SECTION}`,
            permanent: false,
         },
         {
            source: '/contracts',
            destination: `/contracts/${process.env.CONTRACTS_DEFAULT_YEAR}/${process.env.CONTRACTS_DEFAULT_CENTER}`,
            permanent: false,
         },
         {
            source: '/contracts/:slug',
            destination: `/contracts/:slug/${process.env.CONTRACTS_DEFAULT_CENTER}`,
            permanent: false,
         },
         {
            source: '/professionals',
            destination: `/professionals/${process.env.PROFESSIONALS_DEFAULT_VIEW}/${process.env.PROFESSIONALS_DEFAULT_CENTER}/${process.env.PROFESSIONALS_DEFAULT_SECTION}`,
            permanent: false,
         },
         {
            source: '/professionals/global',
            destination: `/professionals/global/${process.env.PROFESSIONALS_DEFAULT_CENTER}/${process.env.PROFESSIONALS_DEFAULT_SECTION}`,
            permanent: false,
         },
         {
            source: '/professionals/global/:centre',
            destination: `/professionals/global/:centre/${process.env.PROFESSIONALS_DEFAULT_SECTION}`,
            permanent: false,
         },
         {
            source: '/professionals/individual',
            destination: `/professionals/individual/${process.env.PROFESSIONALS_DEFAULT_CENTER}/${process.env.PROFESSIONALS_DEFAULT_SECTION}/${process.env.PROFESSIONALS_DEFAULT_YEAR}`,
            permanent: false,
         },
         {
            source: '/professionals/individual/:centre',
            destination: `/professionals/individual/:centre/${process.env.PROFESSIONALS_DEFAULT_SECTION}/${process.env.PROFESSIONALS_DEFAULT_YEAR}`,
            permanent: false,
         },
         {
            source: '/professionals/individual/:centre/:section',
            destination: `/professionals/individual/:centre/:section/${process.env.PROFESSIONALS_DEFAULT_YEAR}`,
            permanent: false,
         }
      ];
   },
}

module.exports = nextConfig
// module.exports = {}

export const baseUrl =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_FE_URL
    : process.env.NEXT_PUBLIC_DOMAIN_URL;
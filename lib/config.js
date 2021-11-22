export const nodeEnv = process.env.NODE_ENV;
export const isProduction = nodeEnv === 'production';
export const locale = process.env.LOCALE ?? 'en-US';

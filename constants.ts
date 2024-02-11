export const URL = process.env.ENVIRONMENT === 'local' ?
  process.env.LOCALHOST : process.env.PROD_URL
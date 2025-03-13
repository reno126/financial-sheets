export const FETCH_CONFIG: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
};

import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app';

const app = createApp();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`[M.A.T.E. API] Server actively running on http://localhost:${PORT}/api/v1`);
  console.log(`[M.A.T.E. API] Health check endpoint: http://localhost:${PORT}/api/v1/health`);
});

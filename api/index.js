/**
 * Vercel serverless entry: handles /api/* only. Static SPA is served from public/ via rewrites.
 */
import { createApp } from '../Backend/app.js';

let appPromise = null;

async function getApp() {
  if (!appPromise) appPromise = createApp();
  return appPromise;
}

export default async function handler(req, res) {
  const app = await getApp();
  return app(req, res);
}

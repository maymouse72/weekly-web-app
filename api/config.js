module.exports = function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !publishableKey) {
    return res.status(503).json({ error: 'Supabase environment variables are not configured.' });
  }

  if (publishableKey.startsWith('sb_secret_')) {
    return res.status(500).json({ error: 'A server-only Supabase secret key cannot be used by the browser.' });
  }

  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  return res.status(200).json({ supabaseUrl, publishableKey });
};

// Vercel serverless function  ->  https://YOUR-SITE.vercel.app/api/ip
// Returns the visitor's IP and approximate location (from Vercel's edge headers).
module.exports = (req, res) => {
  const fwd = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  const ip = fwd || String(req.headers['x-real-ip'] || '').trim() ||
             (req.socket && req.socket.remoteAddress) || '';
  const dec = (v) => { try { return decodeURIComponent(v || ''); } catch (e) { return v || ''; } };
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    ip: ip,
    city: dec(req.headers['x-vercel-ip-city']),
    region: dec(req.headers['x-vercel-ip-country-region']),
    country: dec(req.headers['x-vercel-ip-country'])
  });
};

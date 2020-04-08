const proxy = require('http-proxy-middleware').createProxyMiddleware

module.exports = function(app) {
  app.use(proxy('/v1', {
    target: 'https://v.lehe.com/xz/api/',
    secure: false,
    changeOrigin: true,
    https: true
  }));
  app.use(proxy('/share', {
    target: 'https://m.lehe.com/api/',
    secure: false,
    changeOrigin: true,
    https: true
  }));
  app.use(proxy('/api', {
    target: 'http://47.95.1.50:7002/',
    secure: false,
    changeOrigin: true,
    https: true
  }));
};


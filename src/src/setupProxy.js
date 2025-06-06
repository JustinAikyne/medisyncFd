const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "https://jxeep3kh01.execute-api.ap-south-1.amazonaws.com",
            changeOrigin: true,
            pathRewrite: { "^/api": "/dev/api/auth" }
        })
    );
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
};

const withTM = require("next-transpile-modules")(["@ably-labs/react-hooks"]);

module.exports = withTM(nextConfig);

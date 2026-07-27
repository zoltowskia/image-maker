/** @type {import('next').NextConfig} */
const nextConfig = {
  // Without this, Vercel's build can't tell that the API route reads files
  // out of public/reference-images/ at runtime (the path is built dynamically,
  // so it isn't statically detectable), and may leave those images out of the
  // deployed serverless function — causing "no reference images found" in
  // production even though everything works locally. This forces them in.
  experimental: {
    outputFileTracingIncludes: {
      "/api/generate-image": ["./public/reference-images/**/*"],
    },
  },
};

export default nextConfig;

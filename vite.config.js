export default {
  root: "src",
  base: "/recursive",
  server: { host: true },
  build: {
    outDir: "../dist",
    chunkSizeWarningLimit: 1000,
  },
};

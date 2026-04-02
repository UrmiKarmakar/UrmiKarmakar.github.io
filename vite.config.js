export default defineConfig({
  plugins: [react()],
  base: '/', 
  build: {
    outDir: 'docs', // This tells Vite to put the build in 'docs'
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
})
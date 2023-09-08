export default {
  build: {
    rollupOptions: {
      input: {
        background: 'scripts/background.ts',
        content: 'scripts/content.ts',
        popup: 'scripts/popup.ts',
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
  optimizeDeps: {
    exclude: ['web_scraper'],
  },
};

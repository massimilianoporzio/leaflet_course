import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Base path per i file statici in produzione/sviluppo MA CON DJANGO
  //base: '/static/', 
  
  build: {
    // Genera il manifest.json che Django leggerà
    manifest: true,
    
    // Pulisce la cartella di output prima di ricostruire
    emptyOutDir: true,
    
    // Output dentro la cartella static di Django (un livello sopra 'frontend')
    outDir: resolve(__dirname, '../static/dist'),
    
    rollupOptions: {
      // Il tuo punto di ingresso (che vedo già nel tuo screenshot)
      input: {
        main: resolve(__dirname, 'src/main.js'),
      },
    },
  },
  
  server: {
    // Configurazione server di sviluppo
    host: '0.0.0.0',
    port: 5173,
    origin: 'http://localhost:5173', // Importante per evitare problemi CORS
  },
});
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
// base: '/Vocabulary-Generator/', // Solo el nombre del repositorio con barras inclinadas
export default defineConfig({
  base: './', // Configuración para rutas relativas
  plugins: [react()],
})
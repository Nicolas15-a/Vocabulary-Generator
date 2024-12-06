import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/Vocabulary-Generator/', // Solo el nombre del repositorio con barras inclinadas
  plugins: [react()],
})

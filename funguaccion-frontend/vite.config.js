
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})


//import { defineConfig } from 'vite'
//import react from '@vitejs/plugin-react'

//export default defineConfig({
//  plugins: [react()],
//  server: {
//    host: true, // Escucha en todas las interfaces de red (0.0.0.0)
//    port: 5173,
//    allowedHosts: [
//      'localhost',
//      'pjpss7-ip-186-1-175-65.tunnelmole.net', // <- Añade aquí tu dominio Tunnelmole
//    ],
//  },
//})

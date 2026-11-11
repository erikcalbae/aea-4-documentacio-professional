/// <reference types="vite/client" />
/// <reference types="vite-plugin-vue-layouts-next/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '../router' {
  const router: any
  export default router
}

declare module '@/services/communicationManager' {
  export function buscarPelicules(text: string): Promise<any>
  export function obtenirDetallPelicula(imdbID: string): Promise<any>
}

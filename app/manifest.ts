import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vault',
    short_name: 'Vault',
    description: 'Vault Chat App',
    start_url: '/',
    display: 'standalone',
    background_color: '#000',
    theme_color: '#000',
    orientation:"portrait",
    icons: [
      {
        src: 'darkIcon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
    screenshots: [
      {
        src: "screenShot.png",
        sizes: "956x642",
        type: "image/png",
        form_factor: "wide",
        label: "Application"
      },
      {
        src: "screenShot2.png",
        sizes: "956x642",
        type: "image/png",
        form_factor: "narrow",
        label: "Application"
      }
    ]
  }
}
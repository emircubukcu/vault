import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Next.js App',
    short_name: 'Next.js App',
    description: 'Next.js App',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    orientation:"landscape",
    icons: [
      {
        src: '../public/icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
    screenshots: [
      {
        src: "../public/screenShot.png",
        sizes: "640x320",
        type: "image/png",
        form_factor: "wide",
        label: "Application"
      },
      {
        src: "../public/screenShot2.png",
        sizes: "640x320",
        type: "image/png",
        form_factor: "wide",
        label: "Application"
      }
    ]
  }
}
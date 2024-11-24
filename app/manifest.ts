import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DiscordClone',
    short_name: 'DiscordClone',
    description: 'DiscordClone App',
    start_url: '/',
    display: 'standalone',
    background_color: '#000',
    theme_color: '#000',
    orientation:"landscape",
    icons: [
      {
        src: 'pwaIcon.jpg',
        sizes: 'any',
        type: 'image/jpg',
      },
    ],
    screenshots: [
      {
        src: "screenShot.png",
        sizes: "640x320",
        type: "image/png",
        form_factor: "wide",
        label: "Application"
      },
      {
        src: "screenShot2.png",
        sizes: "640x320",
        type: "image/png",
        form_factor: "narrow",
        label: "Application"
      }
    ]
  }
}
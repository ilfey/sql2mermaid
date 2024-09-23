import localFont from 'next/font/local'

export const fontSans = localFont({
  src: [
    { // Normal
      path: '../../public/fonts/NunitoSans.ttf',
      weight: '400',
      style: 'normal',
    },
    { // Semibold
      path: '../../public/fonts/NunitoSans.ttf',
      weight: '600',
      style: 'normal',
    },
    { // Bold
      path: '../../public/fonts/NunitoSans.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-sans',
  preload: true,
})

import { ImageListProvider } from '@/context'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ImageListProvider>
      <Component {...pageProps} />
    </ImageListProvider>
  )
}

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../store'
import Head from 'next/head'
import React from 'react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Cosmic Cutie</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

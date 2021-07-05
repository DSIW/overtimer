import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Timer from './Timer'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Overtimer</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
        <meta name="" content="Overtimer" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>

      <main className={styles.main}>
        <Timer />
      </main>
    </div>
  )
}

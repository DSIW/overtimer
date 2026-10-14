import Head from "next/head";
import styles from "./Page.module.css";
import React from "react";
import Children from "./Children";
import ThemeToggle from "../theme/ThemeToggle";

export default function Page({ children }: Children) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Overtimer</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <meta name="" content="Overtimer" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>

      <ThemeToggle />
      <main className={styles.main}>{children}</main>
    </div>
  );
}

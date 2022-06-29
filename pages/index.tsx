import styles from "../styles/Home.module.css";
import TimerApp from "../lib/interface/TimerApp";
import React from "react";
import createEmotionCache from "../lib/infrastructure/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <TimerApp />
      </main>
    </div>
  );
}

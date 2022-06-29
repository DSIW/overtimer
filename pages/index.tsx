import styles from "../styles/Home.module.css";
import TimerApp from "../lib/interface/TimerApp";
import React from "react";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <TimerApp />
      </main>
    </div>
  );
}

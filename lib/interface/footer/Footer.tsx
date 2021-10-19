import React from "react";
import styles from "./Footer.module.css";
import GitHubIcon from "@material-ui/icons/GitHub";

export default function Footer() {
  return (
    <div className={styles.root}>
      <a
        href="https://github.com/DSIW/overtimer"
        rel="noreferrer"
        target="_blank"
      >
        <GitHubIcon />
      </a>
    </div>
  );
}

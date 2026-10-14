import { Head, Html, Main, NextScript } from "next/document";
import { geistSans, poppins } from "../lib/interface/theme/fonts";

const THEME_BOOT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var isDark = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", isDark);
  } catch (e) {}
})();
`;

export default function Document() {
  return (
    <Html lang="en" className={`${poppins.variable} ${geistSans.variable}`}>
      <Head>
        {}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

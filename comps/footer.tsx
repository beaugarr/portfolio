import styles from "@/styles/page.module.css";
import { translations } from "@/utils/translations";
import { useTheme } from "./themeContext";
import Link from "next/link";

const Footer = () => {
  const { language } = useTheme();
  const t = translations[language];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerLeft}>
        <p>© 2024, Michał Zagajewski</p>
        <p>{t.version}: 1.1.1</p>
      </div>
      <div className={styles.footerRight}>
        <Link href="/imprint" className={styles.footerLink}>
          {t.imprint}
        </Link>
        <Link href="/privacy" className={styles.footerLink}>
          {t.privacy}
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

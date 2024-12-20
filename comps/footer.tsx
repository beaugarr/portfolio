import styles from "@/styles/page.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLeft}>
        <p>© 2024, Name</p>
        <p>Version: 1.1.1</p>
      </div>
      <div className={styles.footerRight}>
        <a href="/imprint" className={styles.footerLink}>
          Imprint
        </a>
        <a href="/privacy" className={styles.footerLink}>
          Privacy
        </a>
      </div>
    </footer>
  );
};

export default Footer;

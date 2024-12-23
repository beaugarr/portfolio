import styles from "@/styles/page.module.css";
import { translations } from "@/utils/translations";
import { useTheme } from "./themeContext";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const { language } = useTheme();
  const t = translations[language];

  const socialLinks = [
    { href: "https://www.linkedin.com/in/michał-zagajewski-a02855272/", label: "LinkedIn", icon: "/icons/linkedin.svg" },
    { href: "https://www.instagram.com/michal_zagajewski/", label: "Instagram", icon: "/icons/instagram.svg" },
    { href: "https://github.com/beaugarr/", label: "GitHub", icon: "/icons/github.svg" },
    { href: "https://www.facebook.com/michal.zagajewski.90/", label: "Facebook", icon: "/icons/facebook.svg" },
    { href: "https://x.com/mizagajewski", label: "X (Twitter)", icon: "/icons/x.svg" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerLeft}>
        <p>© 2024, Michał Zagajewski</p>
        <p>{t.version}: 1.1.1</p>
      </div>
      <div className={styles.footerCenter}>
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className={styles.socialIcon}
          >
            <img src={link.icon} alt={link.label} />
          </a>
        ))}
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

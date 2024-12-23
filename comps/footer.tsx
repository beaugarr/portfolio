import styles from "@/styles/page.module.css";
import { translations } from "@/utils/translations";
import { useTheme } from "./themeContext";
import Link from "next/link";
import Image from "next/image";
import { icons } from "@/utils/icons";

const Footer = () => {
  const { language } = useTheme();
  const t = translations[language];

  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/michał-zagajewski-a02855272/",
      label: "LinkedIn",
      icon: icons.LinkedIn,
    },
    {
      href: "https://www.instagram.com/michal_zagajewski/",
      label: "Instagram",
      icon: icons.Instagram,
    },
    {
      href: "https://github.com/beaugarr/",
      label: "GitHub",
      icon: icons.GitHub,
    },
    {
      href: "https://www.facebook.com/michal.zagajewski.90/",
      label: "Facebook",
      icon: icons.Facebook,
    },
    { href: "https://x.com/mizagajewski", label: "X (Twitter)", icon: icons.X },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerLeft}>
        <p>© 2024, Michał Zagajewski</p>
        <p>{t.version}: 1.1.1</p>
      </div>
      <div className={styles.footerCenter}>
        {socialLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className={styles.socialIcon}
          >
            {link.icon}
          </Link>
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

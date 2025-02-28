import styles from "@/styles/page.module.css";

const Imprint = () => {

  return (
    <div className={styles.imprintContainer}>
      <div>
        <p>Michał Zagajewski</p>
        <p>Poland</p>

        <h2>Contact</h2>
        <p>Email: mich.zagajewski5@gmail.com</p>

        <h2>Fonts</h2>
        <p>CeraPro by Jakob Runge</p>
        <p>Benzin by Roman Postovoy</p>

        <p>Our email address can be found above in the contact section.</p>

        <h2>Cookies</h2>
        <p>
          This website uses cookies to ensure the best user experience. Cookies are small text files that are stored on your device when you visit our website. They help us analyze website traffic, improve functionality, and personalize content.
        </p>
        <p>
          By using our website, you consent to the use of cookies in accordance with our Privacy Policy. You can manage or disable cookies through your browser settings, but please note that some features of the website may not function properly without cookies.
        </p>
      </div>
    </div>
  );
};

export default Imprint;
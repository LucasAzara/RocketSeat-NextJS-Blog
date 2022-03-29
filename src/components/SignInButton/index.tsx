// Import FontAwesome Icons
import { FaGithub } from "react-icons/fa";
// Import Feather Icons
import { FiX } from "react-icons/fi";

import styles from "./styles.module.scss";

export function SignInButton() {
  const isUserLoggedIn = false;

  return isUserLoggedIn ? (
    <button type="button" className={styles.signInButton}>
      <FaGithub color="#04d361" />
      Lucas Azara
      <FiX className={styles.closeIcon} />
    </button>
  ) : (
    <button type="button" className={styles.signInButton}>
      {/* Github Icon with color set */}
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
}

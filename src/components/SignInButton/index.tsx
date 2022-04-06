// Import FontAwesome Icons
import { FaGithub } from "react-icons/fa";
// Import Feather Icons
import { FiX } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";

import styles from "./styles.module.scss";

export function SignInButton() {
  const { data: session } = useSession();

  return session ? (
    <button type="button" className={styles.signInButton}>
      <FaGithub color="#04d361" />
      {session.user.name}
      <FiX className={styles.closeIcon} onClick={() => signOut()} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signIn()}
    >
      {/* Github Icon with color set */}
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
}

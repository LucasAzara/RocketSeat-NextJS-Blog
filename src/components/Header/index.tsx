import styles from "./styles.module.scss";
import { SignInButton } from "../SignInButton";
import { ActiveLink } from "../activeLink";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          {/* ActiveLink Component configures Link */}
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
            <a>Posts</a>
          </ActiveLink>
        </nav>
        {/* GitHub Sign in Button */}
        <SignInButton />
      </div>
    </header>
  );
}

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react";

// ActiveLinkprops recieves all props from Link
interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeClassName: string;
}

// Automatically configures active link to menu
export function ActiveLink({
  children,
  activeClassName,
  ...rest
}: ActiveLinkProps) {
  // Current page
  const asPath = useRouter();

  // Set Current Active Link
  const className = asPath.route == rest.href ? activeClassName : "";

  // return new configured Link
  return <Link {...rest}>{cloneElement(children, { className })}</Link>;
}

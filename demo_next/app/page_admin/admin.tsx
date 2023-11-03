import "../styles/globals.css";

import type { AppProps } from "next/app";

import LayoutN from '../../components/LayoutN'
function Admin({ Component, pageProps }: AppProps) {
  return (
    <LayoutN>
      <Component {...pageProps} />
    </LayoutN>
  );
}

export default Admin;
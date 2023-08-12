import type { AppProps } from "next/app";
import PictureSelectedProvider from "~/context/PictureSelectedProvider";
import "~/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PictureSelectedProvider>
      <Component {...pageProps} />
    </PictureSelectedProvider>
  );
}

import "styles/globals.css";
import { SWRConfig } from "swr";
import TopNav from "../components/TopNav";

const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");

    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

function MyApp({ Component, pageProps }) {
  return (
    <>
    <TopNav />
    <SWRConfig value={{ fetcher }}>
      <Component {...pageProps} />
    </SWRConfig>
    </>
  );
}

export default MyApp;

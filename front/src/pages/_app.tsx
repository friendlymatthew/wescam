import { type AppType } from "next/dist/shared/lib/utils";
import { RecoilRoot } from "recoil";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
};

export default MyApp;

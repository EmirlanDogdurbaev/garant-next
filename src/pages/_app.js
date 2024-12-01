import { appWithTranslation } from "next-i18next";
import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "@/store/store";
import '../i18n';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default appWithTranslation(MyApp);

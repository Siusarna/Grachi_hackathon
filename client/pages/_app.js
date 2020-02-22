// import App from 'next/app'
import withRedux from "next-redux-wrapper";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../redux/reducers";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "../stylesheets/intro.css";

const makeStore = (initialState, options) => {
  return createStore(reducer, initialState);
};

const MyApp = ({ Component, pageProps, store }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default withRedux(makeStore)(MyApp);

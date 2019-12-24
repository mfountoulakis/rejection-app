import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import createStore from '../store';

class RejectionApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <div>
        <style global jsx>{`
          html,
          body,
          body > div:first-child,
          div#__next,
          div#__next > div,
          div#__next > div > div {
            height: 100%;
          }
        `}</style>

        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </div>
    );
  }
}

export default withRedux(createStore)(withReduxSaga(RejectionApp));

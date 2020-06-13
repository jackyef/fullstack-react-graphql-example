import Document, { Html, Head, Main, NextScript } from 'next/document'
import NoFlashSript from '../utils/misc/NoFlashScripts'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Head>
            <NoFlashSript />
          </Head>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
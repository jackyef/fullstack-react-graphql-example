import Document, { Html, Head, Main, NextScript } from 'next/document'
import useDarkModeFix from '../utils/misc/useDarkModeFix'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Head>
            <script dangerouslySetInnerHTML={{ __html: useDarkModeFix }} />
          </Head>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
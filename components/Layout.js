import Link from 'next/link';
import Head from 'next/head';

export default class Layout extends React.Component {
  render() {
    const { children, title, navLink, navText } = this.props

    return <div>
      <Head>
        <title>{ title }</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
      </Head>

      <style jsx>{`
        :global(body) {
          margin: 0;
          font-family: system-ui;
          background: white;
        }
        header {
          color: #fff;
          background: #8756ca;
          padding: 15px;
          text-align: center;
          position: relative;
          z-index: 10;
        }
        header a {
          color: #fff;
          text-decoration: none;
        }
      `}</style>

      <header><Link href={navLink}><a>{navText}</a></Link></header>

      { children }
    </div>
  }
}
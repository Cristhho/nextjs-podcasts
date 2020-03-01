import Link from 'next/link';

import Layout from '../components/Layout';

function Error({ statusCode }) {
  return (
  	<Layout title="Error" navLink="/" navText="Podcasts">
  		<style jsx>{`
        .message {
          padding: 100px 30px;
          text-align: center;
        }
        h1 {
          margin-bottom: 2em;
        }
        a {
          color: #8756ca;
          text-decoration: none;
        }
      `}</style>
    	{ statusCode === 404 ?
    		<div className="message">
    			<h1>Esta página no existe.</h1>
    			<Link href="/"><a>Regresar a Inicio</a></Link>
    		</div>
    		:
    		<div className="message">
    			<h1>Hubo un problema.</h1>
    			<p>Intenta nuevamente en unos segundos</p>
    		</div>
    	}
    </Layout>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error;

import {Fragment} from 'react';
import Link from 'next/link';

export default class extends React.Component {
	render() {
		return(
			<Fragment>
				<img src="/platzi-logo.png" />
				<h1>Creado por Christian</h1>
				<Link href="/">
        	<a>Home</a>
      	</Link>
				<style jsx>{`
					:global(body){
						background: #254050;
						text-align: center;
						color: #fff;
					}
					img{
						max-width: 120px;
					}
					a{
						color: #97C93E;
						text-decoration: initial;
						font-weight: bold;
					}
				`}</style>
			</Fragment>
		);
	}
}
import fetch from 'isomorphic-unfetch';

import Error from './_error.js';
import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';
import PodcastList from '../components/PodcastList';

export default class extends React.Component {

	static async getInitialProps({query, res}) {
		let idChannel = query.id;

		try{
			let[reqChannel, reqAudios, reqSeries] = await Promise.all([
				fetch(`https://api.audioboom.com/channels/${idChannel}`),
				fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
				fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
			]);

			if(reqChannel.status >= 400){
				res.statusCode = reqChannel.status;
				return {channel:null, audios:null, series:null, statusCode:reqChannel.status}
			}
			
			let dataChannel = await reqChannel.json();
			let channel = dataChannel.body.channel;

			let dataAudios = await reqAudios.json();
			let audios = dataAudios.body.audio_clips;

			let dataSeries = await reqSeries.json();
			let series = dataSeries.body.channels;

			return {channel, audios, series, statusCode:200}
		} catch(error) {
			res.statusCode = 503;
			return {channel:null, audios:null, series:null, statusCode:503}
		}
	}

	render() {
		const {channel, audios, series, statusCode} = this.props;

		if(statusCode != 200) {
			return <Error statusCode={statusCode} />
		}

		return(
			<Layout title={`${channel.title}`} route="home" params={{}} navText="Podcasts">
				<style jsx>{`
	        .banner {
	          width: 100%;
	          padding-bottom: 25%;
	          background-position: 50% 50%;
	          background-size: cover;
	          background-color: #aaa;
	        }
	        h1 {
	          font-weight: 600;
	          padding: 15px;
	        }
	        h2 {
	          padding: 5px;
	          font-size: 1.1em;
	          font-weight: 600;
	          margin: 0;
	          text-align: left;
	        }
				`}</style>
				{
					(channel.urls.banner_image.original) ?
						<div className="banner"
							style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />
						: ""
				}

				<h1>{channel.title}</h1>

				{ series.length > 0 &&
	        <div>
	          <h2>Series</h2>
	          <ChannelGrid channels={series} />
	        </div>
	      }

	      <h2>Últimos podcasts</h2>
	      <PodcastList podcasts={audios} />
			</Layout>
		)
	}
}
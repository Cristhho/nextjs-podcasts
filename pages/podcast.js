import Layout from '../components/Layout';
import slug from '../helpers/slug';

export default class extends React.Component {

	static async getInitialProps({query}) {
		let idPodcast = query.id;

		let reqAudio = await fetch(`https://api.audioboom.com/audio_clips/${idPodcast}.mp3`);
		let dataAudio = await reqAudio.json();
		let audio = dataAudio.body.audio_clip;

		return {audio};
	}

	render() {
		const {audio} = this.props;
		return(
			<Layout
				title={`${audio.title}`}
				route='channel'
				params={{
					slug: slug(audio.channel.title),
					id: audio.channel.id
				}}
				navLink={`/channel?id=${audio.channel.id}`}
				navText="&lt; Volver">
				<style jsx>{`
	        .clip {
	          display: flex;
	          height: 100%;
	          flex-direction: column;
	          background: #8756ca;
	          color: white;
	        }
	        picture {
	          display: flex;
	          align-items: center;
	          justify-content: center;
	          flex: 1 1;
	          flex-direction: column;
	          width: auto;
	          padding: 10%;
	        }
	        picture div {
	          width: 100%;
	          height: 100%;
	          background-position: 50% 50%;
	          background-size: contain;
	          background-repeat: no-repeat;
	        }
	        .player {
	          padding: 30px;
	          background: rgba(0,0,0,0.3);
	          text-align: center;
	        }
	        h3 {
	          margin: 0;
	        }
	        h6 {
	          margin: 0;
	          margin-top: 1em;
	        }
	        audio {
	          margin-top: 2em;
	          width: 100%;
	        }

	        .modal {
	          position: fixed;
	          top: 0;
	          left: 0;
	          right: 0;
	          bottom: 0;
	          z-index: 9;
	        }
	      `}</style>
	      <div className='modal'>
        <div className='clip'>

          <picture>
            <div style={{ backgroundImage: `url(${audio.urls.image || audio.channel.urls.logo_image.original})` }} />
          </picture>

          <div className='player'>
            <h3>{ audio.title }</h3>
            <h6>{ audio.channel.title }</h6>
            <audio controls autoPlay={true}>
              <source src={audio.urls.high_mp3} type='audio/mpeg' />
            </audio>
          </div>
        </div>
      </div>
      </Layout>
		);
	}
}
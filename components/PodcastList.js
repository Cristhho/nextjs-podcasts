import React, { Component } from 'react';

import {Link} from '../routes';
import slug from '../helpers/slug';

export default class PodcastList extends Component {
	render() {
		const {podcasts, onClickPodcast} = this.props;

		return (
			<div>
				<style jsx>{`
					.podcast {
	          display: block;
	          text-decoration: none;
	          color: #333;
	          padding: 15px;
	          border-bottom: 1px solid rgba(0,0,0,0.2);
	          cursor: pointer;
	        }
	        .podcast:hover {
	          color: #000;
	        }
	        .podcast h3 {
	          margin: 0;
	        }
	        .podcast .meta {
	          color: #666;
	          margin-top: 0.5em;
	          font-size: 0.8em;
	        }
				`}</style>
				{ podcasts.map((clip) => (
					<Link route='podcast'
						params={{
							slugChannel: slug(clip.channel.title),
							idChannel: clip.channel.id,
							slug: slug(clip.title),
							id: clip.id
						}} key={clip.id}>
	        	<a className="podcast" onClick={(event) => onClickPodcast(event, clip)}>
	        		<h3>{ clip.title }</h3>
	        		<div className='meta'>
	              { Math.ceil(clip.duration / 60) } minutes
            	</div>
	        	</a>
	        </Link>
	      ))}
			</div>
		);
	}
}

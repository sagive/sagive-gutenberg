import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl, RangeControl } from '@wordpress/components';

import './editor.scss';

export default function Edit({

	attributes: { 
		listName, 
		videoUrlist, 
		itemsPerRow, 
	},
	setAttributes,}) {

	let items_per_row = itemsPerRow ? itemsPerRow : 3;
	
	return (
		<div {...useBlockProps()}>

			<div className="block-label">Youtube Playlist Gallery</div>
			<iframe width="560" height="315" src={videoUrlist ? fixYoutubeURL(videoUrlist) : 'https://www.youtube.com/embed/EuDX4qfQb9c'} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
			<div className="galleryContainer" style={{display:'grid', gridTemplateColumns: 'repeat('+items_per_row+', 1fr'}}>
			{ 
				videoUrlist && videoUrlist.length > 0 &&  videoUrlist.split('\n').map( (url, index) => {
					if( url.length > 0 ) {
						let src = "https://img.youtube.com/vi/"+getYoutubeId(url)+"/0.jpg";
						let nam = listName ? listName : 'Youtube Playlist';
						let alt = nam+ ' ' + (index+1);
						return <div id={index}><img src={src} alt={alt} /></div>
					}
				}) 
			}
			</div>

			<InspectorControls>
				<PanelBody title={__('Options', 'sagive')}>
					<TextControl
						label={__('Playlist Name', 'sagive')} 
						value={ listName }
						onChange={ (newListName) => setAttributes({ listName: newListName }) }
						type="text"
						help="Would act as alt (num) text for the image"
					/>
					<TextareaControl
						label={__('list of videos (urls) - one per line', 'sagive')} 
						rows={4}
						value={ videoUrlist }
						onChange={ (newVideoUrlist) => setAttributes({ videoUrlist: newVideoUrlist }) }
					/>
					<RangeControl
						label={__('item per row', 'sagive')} 
						allowReset
						resetFallbackValue={3}
						step={1}
						withInputField={false}
						separatorType="none"
						trackColor="green"
						isShiftStepEnabled
						value={ itemsPerRow }
						onChange={ (newItemsPerRow) => setAttributes({ itemsPerRow: newItemsPerRow }) }
						min={ 0 }
						max={ 5 }
					/>
				</PanelBody>
			</InspectorControls>

		</div>
	);
}



function fixYoutubeURL(videoUrlist) {
	if(videoUrlist && videoUrlist.length > 0) {
		// split by new line
		let urls = videoUrlist.split('\n');

		if (urls[0] && urls[0].indexOf('youtube.com') > -1) {
			return urls[0].replace('watch?v=', 'embed/');
		}
		return url;
	}
}


function getYoutubeId(vidUrl) {
	if(vidUrl.length > 0) {
		let parts 	= vidUrl.split('/');
		let last	= parts.at(-1);
		let id		= last.split('=');
	
		return id.length > 1 ? id[1] : id[0];
	}
}


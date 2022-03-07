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

			<div className="block-label"> <span class="dashicons dashicons-format-video"></span> Youtube Playlist Gallery <span class="pull-right">show options <span class="dashicons dashicons-menu-alt2"></span></span></div>
			<iframe id="sgutPlayer" width="560" height="315" src={videoUrlist ? fixYoutubeURL(videoUrlist) : 'https://www.youtube.com/embed/EuDX4qfQb9c'} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
			<div className="galleryContainer" style={{display:'grid', gridTemplateColumns: 'repeat('+items_per_row+', 1fr'}}>
			{ 
				videoUrlist && videoUrlist.length > 0 &&  videoUrlist.split('\n').map( (url, index) => {
					if( url.length > 0 ) {
						let src = "https://img.youtube.com/vi/"+getYoutubeId(url)+"/0.jpg";
						let nam = listName ? listName : 'Youtube Playlist';
						let alt = nam+ ' ' + (index+1);
						return <div id={index} className="ytPlaylistItem" onClick={runPlaylistItem}><img src={src} alt={alt} data-vid={getYoutubeId(url)} /></div>
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


function runPlaylistItem(el) {
	console.log(el.target);
	let vid 	= el.target.getAttribute('data-vid');
	let ytitem	= el.target.parentNode;
	let ytlist	= ytitem.parentNode;

	// remove all active classes (of parent)
	let active_items = ytlist.querySelectorAll('.active');

	if( active_items.length > 0 ) {
		active_items.forEach(item => {
			item.classList.remove('active');
		});
	}

	// add active class to current item
	ytitem.classList.add('active');
	document.getElementById('sgutPlayer').src = "https://www.youtube.com/embed/"+vid+"?autoplay=1";
}



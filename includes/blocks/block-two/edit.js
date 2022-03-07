import { __ } from '@wordpress/i18n';

import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { SelectControl, TextControl } from '@wordpress/components';

import './editor.scss';

export default function Edit({

	attributes: {
		shortcode,
		wrapper,
		wrapperClass,
		wrapperId
	},
	setAttributes,}) {

	return (
		<div {...useBlockProps()}>
			<div className="block-label"> <span class="dashicons dashicons-editor-code"></span> Shortcode Extended</div>

			<TextControl
				label={ __( 'Enter shorcode here:', 'sagive' ) }
				value={shortcode}
				onChange={ (newShortcode) => setAttributes({ shortcode: newShortcode }) }
				type="text"
			/>

			<div className="flexWrap">

				<div className="w33 pr10">
					<SelectControl
						label={ __( 'Wrapper:', 'sagive' ) }
						value={ wrapper } 
						onChange={ (newWrapper) => setAttributes({ wrapper: newWrapper }) }
						options={ [
							{ value: null, label: 'Wrapper type',},
							{ value: 'div', label: '<div>' },
							{ value: 'section', label: '<section>' },
							{ value: 'p', label: '<p>' }
						] }
					/>
				</div>
				<div className="w33 pr10">
					<TextControl
						label={ __( 'Wrapper Class:', 'sagive' ) }
						value={wrapperClass}
						onChange={ (newWrapperClass) => setAttributes({ wrapperClass: newWrapperClass }) }
						type="text"
					/>					
				</div>
				<div className="w33">
					<TextControl
						label={ __( 'Wrapper ID:', 'sagive' ) }
						value={wrapperId}
						onChange={ (newWrapperId) => setAttributes({ wrapperId: newWrapperId }) }
						type="text"
					/>					
				</div>

			</div>
		</div>
	);
}

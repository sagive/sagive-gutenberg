import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit() {
	return (
		<p {...useBlockProps()}>
			{__('3rd Block – hello from the editor!', 'multiple-blocks')}
		</p>
	);
}

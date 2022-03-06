import { registerBlockType } from '@wordpress/blocks';

import './style.scss';

// Internal dependencies
import edit from './edit';
import json from './block.json';

const { name, ...settings } = json;

registerBlockType(name, {
	...settings,
	
	edit,
	save: () => null,
});

<?php
/**
 * Plugin Name:       Sagive Gutenberg Blocks
 * Description:       This has multiple blocks.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       multiple-blocks
 *
 * @package           sagive
 */


$blocks = array(
	'block-one',		// Youtube Playlist Gallery (Manual)
	'block-two',
	'block-three',
);


function twitchstreams_multiple_blocks_block_init() {
	global $blocks;

	foreach( $blocks as $key => $block ) {
		register_block_type( plugin_dir_path( __FILE__ ).'includes/blocks/'.$block.'/', array(
				'render_callback' => 'sagive_'.slugify($block).'_callback',
			)
		);
	}
}

add_action( 'init', 'twitchstreams_multiple_blocks_block_init' );


	// load callback functions
	if( !empty($blocks) ) {
		foreach($blocks as $block) {
			include( plugin_dir_path( __FILE__ ).'callback/'.$block.'-callback.php' );
		}
	};




/********************************************************
**  HELPER FUNCTIONS
********************************************************/
function slugify($str) {
	return str_replace('-', '_', strtolower(sanitize_title($str)));
}
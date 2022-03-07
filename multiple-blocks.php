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
	'block-two',		// better shortcode 
	'block-three',
);


function sagive_gutenberg_blocks_init() {
	global $blocks;

	foreach( $blocks as $key => $block ) {
		register_block_type( 
			plugin_dir_path( __FILE__ ).'includes/blocks/'.$block.'/',
			array(
				'render_callback' => 'sagive_'.slugify($block).'_callback',
			)
		);
	}
}
add_action( 'init', 'sagive_gutenberg_blocks_init' );


	// load callback functions
	if( !empty($blocks) ) {
		foreach($blocks as $block) {
			include( plugin_dir_path( __FILE__ ).'includes/blocks/'.$block.'/front.php' );
		}
	};




/********************************************************
**  HELPER FUNCTIONS
********************************************************/
function slugify($str) {
	return str_replace('-', '_', strtolower(sanitize_title($str)));
}



/********************************************************
**  REGISTER NEW BLOCKS CATEGORY
********************************************************/
function sagutenberg_plugin_block_categories( $categories ) {
    return array_merge(
        $categories,
        [
            [
                'slug'  => 'sagivos',
                'title' => __( 'Sagive Blocks', 'sagive' ),
            ],
        ]
    );
}
add_action( 'block_categories', 'sagutenberg_plugin_block_categories', 10, 2 );



/********************************************************
**  ENQUEUE SCRIPTS & STYLES
********************************************************/
function sagutenberg_enqueue_assets( $categories ) {

	wp_enqueue_style( 'sagive-gutenberg-style', plugins_url('assets/global-backend.css', __FILE__) );
    wp_enqueue_script( 'sagive-gutenberg-script', plugin_dir_url( __FILE__ ) . 'assets/global-backend.js?v='.time(), array(), false );

}
add_action( 'admin_enqueue_scripts', 'sagutenberg_enqueue_assets', 10, 2 );
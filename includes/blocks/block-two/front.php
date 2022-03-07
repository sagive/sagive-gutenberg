<?php
function sagive_block_two_callback($atts, $content, $block_instance ) {

    $wrapper_id     = ( !empty($atts['wrapperId']) ? 'id="'.$atts['wrapperId'].'"' : '' );
    $wrapper_class  = ( !empty($atts['wrapperClass']) ? 'class="'.$atts['wrapperClass'].'"' : '' );

    $wrapper = array(
        'open_tag' => ( !empty($atts['wrapper']) ? '<'.$atts['wrapper'].' '.$wrapper_id.' '.$wrapper_class.'>' : '' ),
        'close_tag' => ( !empty($atts['wrapper']) ? '</'.$atts['wrapper'].'>' : '' ),
    );


    return ( !empty($atts['shortcode']) ? $wrapper['open_tag'] . do_shortcode($atts['shortcode']) . $wrapper['close_tag'] : '' );
}
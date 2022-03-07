<?php
function sagive_block_one_callback($atts, $content, $block_instance ) {

    if($atts['videoUrlist']) {
        $videoList  = explode("\n", str_replace("\r", "", $atts['videoUrlist']));
        $listName   = ( !empty($atts['listName']) ? $atts['listName'] : 'Youtube Playlist' );
        $ItemsPerow = ( !empty($atts['itemsPerRow']) ? $atts['itemsPerRow'] : 3 );

        // build list of thumbnails
        $thumbs = '';
        $counter = 1;
        if( !empty($videoList) ) {
            foreach($videoList as $vidurl) {
                $vidid = extractYoutubeId($vidurl);
                $thumbs .= '
                <div class="ytPlaylistItem" onClick="runPlaylistItem(this)" data-id="'.$vidid.'">
                    <img src="https://img.youtube.com/vi/'.$vidid.'/0.jpg" alt="'.$listName.' '.($counter + 1).'" />
                </div>
                ';
            }
        };

        // result
        return '
        <div class="sagive-youtube-playlist-gallery">
            <div class="responsive-youtube">
                <iframe id="sagut" width="560" height="315" src="https://www.youtube.com/embed/'.extractYoutubeId($videoList[0]).'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div class="galleryContainer" style="grid-template-columns:repeat('.$ItemsPerow.', 1fr)">
                '.$thumbs.'
            </div>
        </div>
        <script>
        function runPlaylistItem(ele, vid) {
            var vid         = ele.getAttribute("data-id");
            var parent      = getParentNode(ele, 2); 
            var iframe      = parent.querySelector("iframe");
            
            let active_items = parent.querySelectorAll(".active");

            if( active_items.length > 0 ) {
                active_items.forEach(item => {
                    item.classList.remove("active");
                });
            }

            ele.classList.add("active");
            iframe.setAttribute("src", "https://www.youtube.com/embed/"+vid+"?autoplay=1");
            iframe.scrollIntoView({behavior: "smooth", block: "center"});
        }


        function getParentNode(element, level = 1) { // 1 - default value (if no `level` parameter is passed to the function)
            while (level-- > 0) {
              element = element.parentNode;
              if (!element) return null; // to avoid a possible "TypeError: Cannot read property `parentNode` of null" if the requested level is higher than document
            }
            return element;
        }
        </script>
        ';
    }


}


function extractYoutubeId($url) {
    if($url) {
        $url = explode( '?', end(explode('=', $url)) );
        return $url[0];
    }
}
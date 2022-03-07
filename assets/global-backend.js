function getParents(el, selector){
    var parent_container = el;
    do {
        parent_container = parent_container.parentNode;
    }
    while( !parent_container.matches(selector) && parent_container !== document.body );

    return parent_container;
}
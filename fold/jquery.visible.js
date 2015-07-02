
(function($) {


    /**
     * Partial visible
     *
     * @author Sam Sehnert,Hovsep Avakyan
     */
    var $w = $(window);
    $.fn.visible = function(partial,hidden,direction,pv){


        if (this.length < 1)
            return;



        var $t        = this.length > 1 ? this.eq(0) : this,
            t         = $t.get(0),
            vpWidth   = $w.width(),
            vpHeight  = $w.height(),
            direction = (direction) ? direction : 'both',
            clientSize = hidden === true ? t.offsetWidth * t.offsetHeight : true,
            pvh = 0,
            pvw = 0;

        if (pv > 0) {
            pvh = $t.height()*pv/100;
            pvw = $t.width()*pv/100;
        }


        if (typeof t.getBoundingClientRect === 'function'){

            // Use this native browser method, if available.
            var rec = t.getBoundingClientRect(),
                tViz = (rec.top + pvh)    >= 0 && (rec.top + pvh)    <  vpHeight,
                bViz = (rec.bottom - pvh) >  0 && (rec.bottom - pvh) <= vpHeight,
                lViz = (rec.left + pvw)   >= 0 && (rec.left + pvw)  <  vpWidth,
                rViz = (rec.right - pvw)  >  0 && (rec.right - pvw)  <= vpWidth,
                vVisible   = partial ? tViz || bViz : tViz && bViz,
                hVisible   = partial ? lViz || rViz : lViz && rViz;

            if(direction === 'both')
                return clientSize && vVisible && hVisible;
            else if(direction === 'vertical')
                return clientSize && vVisible;
            else if(direction === 'horizontal')
                return clientSize && hVisible;
        } else {

            var viewTop         = $w.scrollTop(),
                viewBottom      = viewTop + vpHeight,
                viewLeft        = $w.scrollLeft(),
                viewRight       = viewLeft + vpWidth,
                offset          = $t.offset(),
                _top            = offset.top,
                _bottom         = _top + $t.height(),
                _left           = offset.left,
                _right          = _left + $t.width(),
                compareTop      = partial === true ? _bottom : _top,
                compareBottom   = partial === true ? _top : _bottom,
                compareLeft     = partial === true ? _right : _left,
                compareRight    = partial === true ? _left : _right;

            compareTop = compareTop + pvh;
            compareBottom = compareBottom - pvh;
            compareRight = compareRight - pvw;
            compareLeft = compareLeft + pvw;

            if(direction === 'both')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop)) && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
            else if(direction === 'vertical')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop));
            else if(direction === 'horizontal')
                return !!clientSize && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
        }
    };
})(jQuery)

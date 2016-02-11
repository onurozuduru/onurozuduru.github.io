/*******************************************************************************
 * Author-2016: Onur Ozuduru
 *   e-mail: onur.ozuduru { at } gmail.com
 *   github: github.com/onurozuduru
 *   twitter: twitter.com/OnurOzuduru
 *
 * Author-2012: Finn Dorby
 *   website: http://finndorby.com/
 *   github: github.com/fido-hh
 *
 * jQuery-Wikibox
 * Copyright (c) 2016 by Onur Ozuduru <onur.ozuduru { at } gmail.com>
 *
 * jQuery wikipedia-tooltip plugin version 0.1
 * Copyright (c) 2012 finn dorby
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 ******************************************************************************/
 
(function($) {
    $.fn.wikibox = function(settings) {
		// Settings to configure the jQuery lightBox plugin how you like
		settings = jQuery.extend({
		wiki_lang : 'en',
		delay : 0,
		in_speed : 200,
		out_speed : 200
		},settings);
        var tooltip = $('<div id="wikibox_container"></div>');
        $('body').append(tooltip);
        $(".wikibox").click(function(m){
            $("#wikibox_container").html("");							   
            $("#wikibox_container").css('display','none');	
            $("#wikibox_container").css('opacity','1');	
	        var _t = m.pageY + 10;
        	var _l = m.pageX + 10;
        	tooltip.css({ 'top':_t, 'left':_l }); 
            title = $(this).attr('rel');
            title = title.replace(' ','_');
          	var x;
	        if(x) {x = null; x.abort(); }
            x = $.ajax({
                url: 'http://'+settings.wiki_lang+'.wikipedia.org/w/api.php',
                data: {
                    action:'query',
                    prop:'extracts',
                    format:'json',
                    exintro:'',
                    exsectionformat:'plain',
                    titles:title
                },
                dataType:'jsonp',
                success: function(data) {
                    for (var firstEl in data['query']['pages']) break;
                    page = data['query']['pages'][firstEl];
                    wikititle = page['title'];
                    wikipage = page['extract'];
                    wikiheader = "<div id='wikibox_header'><table style='width: 100%;'><tr><td><b>"+wikititle+"</b></td><td id='wikibox_close'>close &#10006;</td></tr></table></div>"
                    $("#wikibox_container").html(wikiheader);
                    $("#wikibox_container").append(wikipage);
                    $("#wikibox_container").append("<a href='http://"+settings.wiki_lang+".wikipedia.org/?curid="+page['pageid']+"' target='wikipedia'>Read more on Wikipedia</a>");
                    $("#wikibox_container").stop(true, true).delay(settings.delay).fadeIn(settings.in_speed);
		          
                    $("#wikibox_close").click(function() {
                        $("#wikibox_container").clearQueue();
                        $("#wikibox_container").stop();
                        $("#wikibox_container").delay(settings.delay).fadeOut(settings.out_speed);
                    });
                }
            });
        });
    }
})(jQuery);

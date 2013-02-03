var showpostthumbnails_gal  = true;
    var showpostsummary_gal    = true;
	var random_posts       		= false;
	var numchars_gal			= 150;
	var numposts_gal			= 10;
function showgalleryposts(json) {
    var numPosts = json.feed.openSearch$totalResults.$t;
    var indexPosts = new Array();
	document.write('<ul>');
    for (var i = 0; i < numPosts; ++i) {
        indexPosts[i] = i;
    }
	if (random_posts == true){
    indexPosts.sort(function() {return 0.5 - Math.random()});
	}
    if (numposts_gal > numPosts) {
        numposts_gal = numPosts;
    }
    for (i = 0; i < numposts_gal; ++i) {
        var entry_gal = json.feed.entry[indexPosts[i]];
		var posttitle_gal =  entry_gal.title.$t;
        for (var k = 0; k <  entry_gal.link.length; k++) {
            if ( entry_gal.link[k].rel == 'alternate') {
                posturl_gal =  entry_gal.link[k].href;
                break;
            }
        }
		if ("content" in entry_gal) {
            var postcontent_gal = entry_gal.content.$t
        }
        s = postcontent_gal;
        a = s.indexOf("<img");
        b = s.indexOf("src=\"", a);
        c = s.indexOf("\"", b + 5);
        d = s.substr(b + 5, c - b - 5);
        if ((a != -1) && (b != -1) && (c != -1) && (d != "")) {
            var thumburl_gal = d
        } else var thumburl_gal = '';
        document.write('<div class="ui-tabs-panel" id="gambar-'+(i+1)+'" style="">');
        document.write('<img alt="'+posttitle_gal+'" height="375" src="' + thumburl_gal + '" width="727"/><div class="tulisan-bawah"><h2><a href="#">'+posttitle_gal+'</a></h2><p>');
        var re = /<\S[^>]*>/g;
        postcontent_gal = postcontent_gal.replace(re, "");
        if (showpostsummary_gal == true) {
            if (postcontent_gal.length < numchars_gal) {
                document.write(postcontent_gal);
                document.write('</p></div></div>')
            } else {
                postcontent_gal = postcontent_gal.substring(0, numchars_gal);
                var quoteEnd_gal = postcontent_gal.lastIndexOf(" ");
                postcontent_gal = postcontent_gal.substring(0, quoteEnd_gal);
                document.write(postcontent_gal + '...');
                document.write('</p></div></div>')
            }
        }
		 
    }
	
	
}

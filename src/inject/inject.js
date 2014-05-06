chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		// ----------------------------------------------------------
        (function(){
            var a = document.createElement('a');
            var p = document.getElementById('player');
            a.href = '#';
            a.class = 'pluginFullscreenBtn';
            a.appendChild(document.createTextNode('Full Screen'));
            p.appendChild(a);
            a.addEventListener('click', function(){
                var urlBits = location.href.split('watch?v=');
                location.href = urlBits[0] + 'embed/' + urlBits[1];
            }, false);
        })();

	}
	}, 10);
});
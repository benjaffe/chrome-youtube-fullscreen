chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		// ----------------------------------------------------------

        /**
         * This function runs the function parameter within the context of the actual page,
         * since chrome extensions have limited access to page objects and methods.
         * This only works for functions that are self-contained - ie, closures don't persist
         * when you stringify functions like this, so don't rely on anything outside of the
         * function itself.
         */
        var runAsPage = function(fun) {
            // only run functions
            if (!typeof fun === 'function') return false;

            // make a new script element
            var script = document.createElement('script');

            // stringify function and invoke in string
            var scriptContent = '(' + fun.toString() + ')();';

            // add script content to the script, and add the script to the body, "running it"
            script.appendChild(document.createTextNode(scriptContent));
            document.body.appendChild(script);

            // success
            return true;
        };



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
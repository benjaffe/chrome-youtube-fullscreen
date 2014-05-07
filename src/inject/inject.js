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
            var player = document.getElementById('player');

            // make a button for fullscreenification
            var fullscreenBtn = document.createElement('a');
            fullscreenBtn.href = '#';
            fullscreenBtn.classList.add('pluginFullscreenBtn');
            fullscreenBtn.appendChild(document.createTextNode('Standalone'));

            // when you click, make it happen
            fullscreenBtn.addEventListener('click', function(){

                // run code as if it's on the native page, since chrome extensions
                // have limited access to page objects and methods
                runAsPage(function(){

                    // padNum adds leading zeros. It's in here so it's accessible in our code below.
                    var padNum = function(num, digits) {
                        var numStr = num.toString();
                        while (numStr.length < digits) {
                            numStr = '0' + numStr;
                        }
                        return numStr;
                    };

                    // get the current time of the video (only works when run in the page's memory space)
                    var totalSeconds = document.getElementById('movie_player').getCurrentTime();

                    // round to the nearest second
                    totalSeconds = Math.floor(totalSeconds);

                    // convert the time into youtube's format (eg. 132 is 1m 32s)
                    var seconds = totalSeconds % 60;
                    var totalMinutes = ((totalSeconds - seconds) / 60);
                    var minutes = totalMinutes % 60;
                    var totalHours = ((totalMinutes - minutes) / 60);
                    var hours = totalHours % 60;

                    var timeStr = padNum(hours, 2) + padNum(minutes, 2) + padNum(seconds, 2);
                    console.log(timeStr);
                    // chop up the url
                    var urlBits = location.href.split('watch?v=');

                    // put it back together
                    location.href = urlBits[0] + 'embed/' + urlBits[1].split('#')[0] + '?start=' + timeStr + '&autoplay=1';
                });

            }, false);

            // add the button
            player.appendChild(fullscreenBtn);

        })();

	}
	}, 10);
});
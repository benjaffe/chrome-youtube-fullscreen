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

        /**
         * This function makes the standalonification happen!
         */
        var standalonify = function(){

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

                // reform the url
                var location = window.location;

                var urlBits = location.search.slice(1).split('&');
                urlBits.push( ('start=' + timeStr), ('autoplay=1') );

                // find the v url parameter (the video id)
                for (i=0; urlBits[i].split('=')[0] !== 'v'; i++) {}

                // get the video id while removing it from the array of parameters
                var videoIdParameter = urlBits.splice(i,1)[0];
                var videoId = videoIdParameter.split('v=')[1];

                // form the new url
                var newUrl = location.origin + '/embed/' + videoId + '?' + urlBits.join('&') + location.hash;

                // GO!
                location.href = newUrl;
            });
        };



        (function(){
            var player = document.querySelector('.html5-player-chrome');

            // make a button for standalonification
            var standalonifyBtn = document.createElement('a');
            standalonifyBtn.href = '#';
            standalonifyBtn.className = 'ytp-button ytp-button-standalone';
            standalonifyBtn.appendChild(document.createTextNode('Standalone'));

            // when you click, make it happen
            standalonifyBtn.addEventListener('click', standalonify, false);

            // add the button
            player.appendChild(standalonifyBtn);

        })();

	}
	}, 10);
});
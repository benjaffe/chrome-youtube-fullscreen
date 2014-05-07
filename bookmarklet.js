// minified via http://javascriptcompressor.com/
(function(){
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
})();
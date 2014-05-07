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
    // chop up the url
    var urlBits = location.href.split('watch?v=');

    // put it back together
    location.href = urlBits[0] + 'embed/' + urlBits[1].split('#')[0] + '?start=' + timeStr + '&autoplay=1';
})();
// minified via http://javascriptcompressor.com/
(function(){
    var timeStr, totalSeconds;//, seconds, minutes, totalMinutes, hours, totalHours;
    var location = window.location;
    var urlBits, videoIdParameter, videoId, newUrl;

    // get the current time of the video (only works when run in the page's memory space)
    totalSeconds = document.getElementById('movie_player').getCurrentTime();

    // round to the nearest second
    totalSeconds = Math.floor(totalSeconds);

    // convert the time into youtube's format (eg. 132 is 1m 32s)
    // seconds = totalSeconds % 60;
    // totalMinutes = ((totalSeconds - seconds) / 60);
    // minutes = totalMinutes % 60;
    // totalHours = ((totalMinutes - minutes) / 60);
    // hours = totalHours % 60;

    // timeStr = padNum(hours, 2) + padNum(minutes, 2) + padNum(seconds, 2);
    // console.log(timeStr);
    timeStr = String(totalSeconds);

    // reform the url
    urlBits = location.search.slice(1).split('&');
    urlBits.push( ('start=' + timeStr), ('autoplay=1') );

    // find the v url parameter (the video id)
    for (i=0; urlBits[i].split('=')[0] !== 'v'; i++) {}

    // get the video id while removing it from the array of parameters
    videoIdParameter = urlBits.splice(i,1)[0];
    videoId = videoIdParameter.split('v=')[1];

    // form the new url
    newUrl = location.origin + '/embed/' + videoId + '?' + urlBits.join('&') + location.hash;

    // GO!
    location.href = newUrl;
})();
    var classes=document.getElementsByClassName("musicPlayer");

    for(var i=0;i<classes.length;i++)
        classes[i].addEventListener("loadedmetadata", syncPlayhead);
    

        
document.addEventListener("click", function(event) {
    let classNames = event.target.getAttribute("class")
    let player = getPlayer(event);

    if (classNames == null){}
    else if (classNames.includes("playButton")){
        togglePlayState(player);
 
        event.target.innerHTML = (player.paused ? '\u25B6' : '\u25AE\u25AE');
        
    } else if (classNames.includes("timeline")){ 

        player.currentTime =  clickPercent(event) * player.duration

    } else {

    }
});


document.addEventListener("timeupdate", syncPlayhead(event), false);

//Helper functions

function getPlayer(event) {
    return (event.target.getAttribute("class").includes("musicPlayer") ? event.target : findAncestorByClass(event.target, "musicPlayerWrapper").getElementsByClassName("musicPlayer")[0]);
}

function getTimeline(event) {
    return findAncestorByClass(event.target, "musicPlayerWrapper").getElementsByClassName("playerControls")[0].getElementsByClassName("timeline")[0];
}

function getClock(event) {
    return findAncestorByClass(event.target, "musicPlayerWrapper").getElementsByClassName("playerControls")[0].getElementsByClassName("clock")[0];
}

function getElapsedTime(event) {
    return getClock(event).getElementsByClassName("elapsedTime")[0];
}

function getTotalTime(event) {
    return getClock(event).getElementsByClassName("totalTime")[0];
}

//https://stackoverflow.com/a/22119674
function findAncestorByClass(el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}



function togglePlayState(player) {
    if (player.paused) {
        player.play()
    } else {
        player.pause()
    }
}

// Synchronizes playhead position with current point in audio
function syncPlayhead(event) {

    let player = getPlayer(event)
    let timeline = getTimeline(event)

    timeline.max = player.duration
    timeline.value = player.currentTime
    
    setTimes(event, player)
}

function setTimes(event, player) {
    getElapsedTime(event).innerHTML = makeReadableTime(player.currentTime)
    getTotalTime(event).innerHTML = makeReadableTime(player.duration)
}



function makeReadableTime(seconds, locale = "en-US", format = {minute: '2-digit', second: '2-digit'}) {
    //https://stackoverflow.com/a/25279340
    var date = new Date(null);
    date.setSeconds(seconds);
    return date.toLocaleString(locale, format);
}

// getPosition
// Returns elements left position relative to top-left of viewport
function getPosition(el) {
    return el.getBoundingClientRect().left;
}

// returns click as decimal (.77) of the total timelineWidth
function clickPercent(event) {
    let timeline = getTimeline(event)
    return (event.clientX - getPosition(timeline)) / timeline.scrollWidth;

}


function formatTime(seconds) {
  minutes = Math.floor(seconds / 60);
  minutes = (minutes >= 10) ? minutes : "0" + minutes;
  seconds = Math.floor(seconds % 60);
  seconds = (seconds >= 10) ? seconds : "0" + seconds;
  return minutes + ":" + seconds;
}
function player() {
  var audio = document.getElementById("track");
  var button = document.querySelector(".button-play");
  var time = document.querySelector(".time");
  var duration = document.querySelector(".duration");
  var timeline = document.querySelector(".timeline");
  var timelineWidth = timeline.getBoundingClientRect().width;
  timeline.max = timelineWidth;
  audio.addEventListener('timeupdate', function(){
    timeline.value = Math.floor(audio.currentTime * (timelineWidth / audio.duration));
    time.innerHTML = formatTime(audio.currentTime) + "/" + formatTime(audio.duration);

    if (audio.paused) {
      button.innerHTML = "PLAY";
    } else {
      button.innerHTML = "PAUSE";
    }
  });
  timeline.addEventListener('click', function(e){
    audio.currentTime = audio.duration * (e.clientX - timeline.getBoundingClientRect().left) / timelineWidth;
  });
  button.addEventListener('click', function(){
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });
}

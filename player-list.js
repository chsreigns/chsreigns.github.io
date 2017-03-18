document.addEventListener("DOMContentLoaded", function() {
  var path = window.location.pathname.slice(0,window.location.pathname.search("index.html")) + "index.json";
  var list = document.getElementById("list");

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    var DONE = 4;
    var OK = 200;
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        setUpPlayerList(xhr.responseText);
        setListeners();
      } else {
        console.log('Error: ' + xhr.status);
      }
    }
  };
  xhr.open('GET', path, true);
  xhr.send();

  function setUpPlayerList(response) {
    var items = JSON.parse(response).items;
    for (i = 0; i < items.length; i++) {
      var item = document.createElement('li');

      var link = document.createElement('a');
      link.classList.add("title");
      link.innerHTML = items[i].title;
      link.setAttribute("href",items[i].href);
      item.appendChild(link);

      if (items[i].type == "audio" || items[i].type == "video") {
        if (items[i].type == "audio") {
          var file = document.createElement('audio');
        } else {
          var file = document.createElement('video');
        }
        var button = document.createElement('button');
        button.classList.add("button-play");
        button.innerHTML = "PLAY";
        item.appendChild(button);

        var time = document.createElement('span');
        time.classList.add("time");
        item.appendChild(time);

        var duration = document.createElement('span');
        duration.classList.add("duration");
        duration.innerHTML = items[i].duration;
        item.appendChild(duration);

        var download = document.createElement('a');
        download.classList.add("button-download");
        download.setAttribute("href",items[i].src);
        download.setAttribute("target","_blank");
        download.innerHTML = "↓";
        item.appendChild(download);

        var timeline = document.createElement('input');
        timeline.classList.add("timeline");
        timeline.setAttribute("type","range");
        timeline.setAttribute("min","0");
        timeline.setAttribute("value","0");
        item.appendChild(timeline);

        file.classList.add("media-file");
        item.appendChild(file);
        file.setAttribute("src",items[i].src);
        item.classList.add("item-media");
      } else {
        link.classList.add("title-folder");
      }

      list.appendChild(item);
    }
  }

  function setListeners() {
    var buttons = document.querySelectorAll(".button-play");
    var itemsMedia = document.querySelectorAll(".item-media");
    var audios = document.querySelectorAll(".media-file");
    var timelines = document.querySelectorAll(".timeline");
    var time = document.querySelectorAll(".time");
    var timelineWidth = itemsMedia[0].getBoundingClientRect().width - 4;
    for (i = 0; i < buttons.length; i++) {
      timelines[i].max = timelineWidth;
    }
    for (i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function(e) {
        var item = this.parentNode;
        var audio = item.lastChild;

        if (!item.classList.contains('active') && audio.paused) {
          for (i = 0; i < audios.length; i++) {
            audios[i].pause();
            itemsMedia[i].classList.remove("active");
          }
          item.classList.add("active");
          this.innerHTML = "PAUSE";
          audio.play();
        } else {
          item.classList.remove("active");
          audio.pause();
          this.innerHTML = "PLAY";
        }
      });

      audios[i].addEventListener('timeupdate', function(){
        var item = this.parentNode;
        var time = item.childNodes[2];
        var timeline = item.childNodes[5];
        var button = item.childNodes[1];
        var nextItem = item.nextSibling;
        timeline.value = Math.floor(this.currentTime * (timelineWidth / this.duration));
        if (this.duration) time.innerHTML = formatTime(this.currentTime) + "/";
        if (this.paused) {
          button.innerHTML = "PLAY";
        }
        if (this.currentTime == this.duration) {
          item.classList.remove("active");
          if (nextItem) {
            nextItem.classList.add("active");
            nextItem.childNodes[6].play();
            nextItem.childNodes[1].innerHTML = "PAUSE";
          }
        }
      });

      timelines[i].addEventListener('click', function(e) {
        var item = this.parentNode;
        var file = item.lastChild;
        file.currentTime = file.duration * (e.clientX - this.getBoundingClientRect().left) / timelineWidth;
      });
    }
  }

  function formatTime(seconds) {
    minutes = Math.floor(seconds / 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
  }
});

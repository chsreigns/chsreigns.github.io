document.addEventListener("DOMContentLoaded", function () {
  // 1. figure out where index.json lives
  var base = window.location.pathname.slice(
    0,
    window.location.pathname.search("index.html")
  );
  var jsonPath = base + "index.json";

  // 2. fetch it
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var items = JSON.parse(xhr.responseText).items;
        initPlaceholders(items);
        setListeners();
      } else {
        console.error("Error loading JSON:", xhr.status);
      }
    }
  };
  xhr.open("GET", jsonPath, true);
  xhr.send();

  // 3. build each placeholder exactly like setUpPlayerList
  function initPlaceholders(items) {
    document.querySelectorAll(".player-placeholder").forEach(function (el) {
      // clear anything inside
      el.innerHTML = "";

      // pick data either by index or by explicit data-attrs
      var idx = el.getAttribute("data-index");
      var cfg =
        idx !== null && items[idx]
          ? items[idx]
          : {
              title: el.getAttribute("data-title"),
              href: el.getAttribute("data-href"),
              src: el.getAttribute("data-src"),
              duration: el.getAttribute("data-duration"),
              type: el.getAttribute("data-type") || "audio",
            };

      // <a class="title" href="…">title</a>
      var link = document.createElement("a");
      link.classList.add("title");
      link.innerHTML = cfg.title || "";
      if (cfg.href) link.setAttribute("href", cfg.href);
      el.appendChild(link);

      if (cfg.type === "audio" || cfg.type === "video") {
        // button
        var button = document.createElement("button");
        button.classList.add("button-play");
        button.innerHTML = "PLAY";
        el.appendChild(button);

        // time span
        var time = document.createElement("span");
        time.classList.add("time");
        el.appendChild(time);

        // duration
        var duration = document.createElement("span");
        duration.classList.add("duration");
        duration.innerHTML = cfg.duration || "";
        el.appendChild(duration);

        // download link
        var download = document.createElement("a");
        download.classList.add("button-download");
        download.setAttribute("href", cfg.src);
        download.setAttribute("target", "_blank");
        download.innerHTML = "↓";
        el.appendChild(download);

        // timeline
        var timeline = document.createElement("input");
        timeline.classList.add("timeline");
        timeline.setAttribute("type", "range");
        timeline.setAttribute("min", "0");
        timeline.setAttribute("value", "0");
        el.appendChild(timeline);

        // audio/video file
        var file = document.createElement(
          cfg.type === "audio" ? "audio" : "video"
        );
        file.classList.add("media-file");
        file.setAttribute("src", cfg.src);
        el.appendChild(file);

        // mark the item
        el.classList.add("item-media");
      } else {
        // folder-style link
        link.classList.add("title-folder");
      }
    });
  }

  // 4. your exact setListeners (no changes)…
  function setListeners() {
    var buttons = document.querySelectorAll(".button-play");
    var itemsMedia = document.querySelectorAll(".item-media");
    var audios = document.querySelectorAll(".media-file");
    var timelines = document.querySelectorAll(".timeline");
    var timeEls = document.querySelectorAll(".time");
    var timelineWidth = itemsMedia[0].getBoundingClientRect().width - 4;

    for (var i = 0; i < buttons.length; i++) {
      timelines[i].max = timelineWidth;
    }
    for (i = 0; i < buttons.length; i++) {
      (function (i) {
        buttons[i].addEventListener("click", function (e) {
          var item = this.parentNode;
          var audio = item.lastChild;

          if (!item.classList.contains("active") && audio.paused) {
            for (var j = 0; j < audios.length; j++) {
              audios[j].pause();
              itemsMedia[j].classList.remove("active");
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

        audios[i].addEventListener("timeupdate", function () {
          var item = this.parentNode;
          var time = item.childNodes[2];
          var timeline = item.childNodes[5];
          var button = item.childNodes[1];
          var nextItem = item.nextSibling;
          timeline.value = Math.floor(
            this.currentTime * (timelineWidth / this.duration)
          );
          if (this.duration)
            time.innerHTML = formatTime(this.currentTime) + "/";
          if (this.paused) {
            button.innerHTML = "PLAY";
          }
          if (this.currentTime === this.duration) {
            item.classList.remove("active");
            if (nextItem && !detectmob()) {
              nextItem.classList.add("active");
              nextItem.childNodes[6].play();
              nextItem.childNodes[1].innerHTML = "PAUSE";
            }
          }
        });

        timelines[i].addEventListener("click", function (e) {
          var item = this.parentNode;
          var file = item.lastChild;
          file.currentTime =
            (file.duration * (e.clientX - this.getBoundingClientRect().left)) /
            timelineWidth;
        });
      })(i);
    }
  }

  function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    minutes = minutes >= 10 ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = seconds >= 10 ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
  }

  function detectmob() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(
      navigator.userAgent
    );
  }
});

var btn = document.getElementById("btn")
var play = document.getElementById("music_play")
var stop = document.getElementById("music_stop")
var m = document.getElementById("music")
m.src="src/music.mp3"
m.autoplay=true;
btn.onclick = function () {
  if (m.paused) {
    m.play();
    stop.style.display = "none"
  }else{
    m.pause();
    stop.style.display = "block"
  }
}
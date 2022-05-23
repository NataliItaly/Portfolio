const videoPlayer = document.querySelector('.video');
const controlsPlay = document.querySelector('.controls-play');
const controlsStop = document.querySelector('.controls-stop');
const playBtn = document.querySelector('.play-btn');

/*--------------Play-Pause Video-------------- */
function toggleVideo() {
    if (videoPlayer.paused) {
        videoPlayer.play();
    }
    else {
        videoPlayer.pause();
    }
 }
 controlsPlay.addEventListener('click', toggleVideo);
 playBtn.addEventListener('click', toggleVideo);
import './scss/main.scss';
console.log('Hello, SASS');
console.log('Hello, HTML');


const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);


const buttonPlay = $(".button_play");
const buttonPause = $(".button_pause");

const buttonMutedOn = $(".button_muted-on");
const buttonMutedOff = $(".button_muted-off");


const speedSelection = $(".player__control_speed");
const iconRate = $(".icon_player-rate");

const speedSelectionItem = $$(".player__control_speed_item");

const buttonForwardPosition = $(".button_forward");
const buttonBackPosition = $(".button_back");


const buttonRepeat = $(".button_repeat");
const buttonNext = $(".button_next");
const buttonPrevious = $(".button_previous");


const durationRange = $(".duration__progress-bar");
const durationRangeBase = $(".duration__progress-background");

const volumeRange = $(".volume__progress-bar");
const volumeRangeBase = $(".volume__progress-background");


const timeDisplay = $(".playing-time");


const video = $(".player__video_container .video");


video.volume = 0.5;

let videoStep;
let videosSRC = ["forest life.mp4", "how mushrooms grow.mp4", "how flowers bloom.mp4"]
let videoIndex = 0;

let timer;

const playVideo = () => {
    buttonPlay.classList.add("hidden");
    buttonPause.classList.remove("hidden");
    video.play();
    timer = setInterval(setVideoTime, 500);
};

const pauseVideo = () => {
    buttonPause.classList.add("hidden");
    buttonPlay.classList.remove("hidden");
    video.pause();
    clearTimeout(timer);
};


const toggleVideo = () => {
    if (buttonPause.classList.contains("hidden")) {
        playVideo();
    } else {
        pauseVideo();
    }
};


const mutedOn = () => {
    buttonMutedOff.classList.add("hidden");
    buttonMutedOn.classList.remove("hidden");
    video.muted = true;
};

const mutedOff = () => {
    buttonMutedOn.classList.add("hidden");
    buttonMutedOff.classList.remove("hidden");
    video.muted = false;
};


const speedToggle = () => {
    iconRate.classList.toggle("rotated");
    speedSelection.classList.toggle("opened");
};

const speedChoose = () => {
    speedSelectionItem.forEach(el => el.classList.remove("active"));
    if (event.target.classList.contains("player__control_speed_item")) {
        event.target.classList.add("active");
        video.playbackRate = event.target.dataset.speed;
        setTimeout(speedToggle, 750);
    }
};


const runForward = () => {
    videoStep = video.duration / 8;
    let newTime = video.currentTime + videoStep;
    if (newTime > video.duration) {
        newTime = video.duration;
    }
    video.currentTime = newTime;
    buttonBackPosition.classList.remove("maximum-value");
    if (newTime === video.duration) {
        buttonForwardPosition.classList.add("maximum-value");
    }
};

const runBack = () => {
    videoStep = video.duration / 8;
    let newTime = video.currentTime - videoStep;
    if (newTime < 0) {
        newTime = 0;
    }
    video.currentTime = newTime;
    buttonForwardPosition.classList.remove("maximum-value");
    if (video.currentTime == 0) {
        buttonBackPosition.classList.add("maximum-value");
    }
};


const repeatVideo = () => {
    buttonRepeat.classList.toggle("default-value");
    video.loop = !video.loop
};


const nextVideo = () => {
    ++videoIndex;
    if (videoIndex >= videosSRC.length) {
        videoIndex = 0
    }
    video.src = "/video/" + videosSRC[videoIndex];
    playVideo();
};

const previousVideo = () => {
    if (videoIndex == 0) {
        videoIndex = videosSRC.length
    }
    videoIndex--;
    video.src = "/video/" + videosSRC[videoIndex];
    playVideo();
};


const timeConversion = (duration) => {
    let seconds = Math.floor(duration % 60);
    let minutes = Math.floor((duration / 60) % 60);
    let hours = Math.floor((duration / (60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    if (hours == 0) {
        return minutes + ":" + seconds;
    } else {
        return hours + ":" + minutes + ":" + seconds;
    }
};

const setVideoTime = () => {
    let timer = (video.currentTime.toFixed(0));
    timeDisplay.innerText = timeConversion(timer);
};


const volumeProgressValue = () => {
    let percent = (video.volume / 1) * 100;
    volumeRange.style.width = Math.floor(percent) + "%";
};


const volumeProgressValueChange = (event) => {
    let mousePosition = Math.floor(event.offsetX);
    let progress = mousePosition / volumeRangeBase.offsetWidth * 1;
    video.volume = progress;
    if (video.volume > 0) {
        mutedOff();
    }
    if (video.volume == 0) {
        mutedOn();
    }
};


const videoProgressValue = () => {
    let percent = (video.currentTime / video.duration) * 100;
    // durationRange.style.width = Math.floor(percent) + "%";
    durationRange.style.width = percent + "%";
};


const videoProgressValueChange = (event) => {
    durationRange.offsetHeight;
    let mousePosition = Math.floor(event.offsetX);
    let progress = mousePosition / durationRangeBase.offsetWidth * video.duration;
    video.currentTime = progress;
};


// Run
video.addEventListener("click", toggleVideo);

buttonPlay.addEventListener("click", playVideo);
buttonPause.addEventListener("click", pauseVideo);
video.addEventListener("click", toggleVideo);

buttonMutedOff.addEventListener("click", mutedOn);
buttonMutedOn.addEventListener("click", mutedOff);


iconRate.addEventListener("click", speedToggle);

buttonForwardPosition.addEventListener("click", runForward);
buttonBackPosition.addEventListener("click", runBack);


buttonRepeat.addEventListener("click", repeatVideo);

buttonNext.addEventListener("click", nextVideo);
buttonPrevious.addEventListener("click", previousVideo);


video.addEventListener("volumechange", volumeProgressValue);
volumeRangeBase.addEventListener("click", volumeProgressValueChange);


video.addEventListener("timeupdate", videoProgressValue);
durationRangeBase.addEventListener("click", videoProgressValueChange);

speedSelection.addEventListener("click", speedChoose);

video.addEventListener("ended", pauseVideo);
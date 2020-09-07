const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('button[data-skip]');
const ranges = player.querySelectorAll('input[type="range"]');


function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
};

function updateButton() {
    const icon = video.paused ? '⏵' : '❚❚';
    toggle.textContent = icon;
};

function skip(e) {
    video.currentTime += parseFloat(e.target.dataset.skip);

};

function handleRangeUpdate(e) {
    video[`${e.target.name}`] = parseFloat(e.target.value);
}

function handleProgress(e) {
    const percent = video.currentTime / video.duration * 100;
    progressBar.style.flexBasis = `${percent}%`;
};

function handleScrubBar(e) {
    video.currentTime = e.offsetX / progress.offsetWidth * video.duration;
};

video.addEventListener('click', togglePlay);
video.addEventListener('click', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
toggle.addEventListener('click', updateButton);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
progress.addEventListener('click', handleScrubBar);
let mouseDown = false;
progress.addEventListener('mousemove', (e) => mouseDown && handleScrubBar(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);






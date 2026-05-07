const audio = document.getElementById('audio');
const playToggle = document.getElementById('play-toggle');
const playIcon = document.getElementById('play-icon');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const disc = document.getElementById('disc');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const playlistItems = document.querySelectorAll('.playlist li');

// 歌曲列表（和你素材里的文件完全对应）
const songs = [
  { src: 'music/music0.mp3', cover: 'images/record0.jpg', name: 'music0' },
  { src: 'music/music1.mp3', cover: 'images/record1.jpg', name: 'music1' },
  { src: 'music/music2.mp3', cover: 'images/record2.jpg', name: 'music2' },
  { src: 'music/music3.mp3', cover: 'images/record3.jpg', name: 'music3' }
];

let currentIndex = 0;
let isPlaying = false;

// 播放/暂停切换（修复图标路径）
playToggle.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    playIcon.src = 'images/继续播放.png';
    disc.classList.remove('playing');
  } else {
    audio.play();
    playIcon.src = 'images/暂停.png';
    disc.classList.add('playing');
  }
  isPlaying = !isPlaying;
});

// 上一首
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  if (isPlaying) audio.play();
});

// 下一首
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  if (isPlaying) audio.play();
});

// 加载歌曲（切换封面和歌曲名）
function loadSong(index) {
  audio.src = songs[index].src;
  disc.src = songs[index].cover;
  document.getElementById('song-name').textContent = songs[index].name;
  playlistItems.forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });
}

// 进度条点击跳转
progressBar.addEventListener('click', (e) => {
  const width = progressBar.clientWidth;
  const pos = e.offsetX;
  audio.currentTime = (pos / width) * audio.duration;
});

// 更新进度条和时间
audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + '%';
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

// 加载完成后显示总时长
audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
});

// 时间格式化（00:00格式）
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

// 点击播放列表切换歌曲
playlistItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentIndex = index;
    loadSong(currentIndex);
    audio.play();
    isPlaying = true;
    playIcon.src = 'images/暂停.png';
    disc.classList.add('playing');
  });
});
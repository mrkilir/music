let $ = document
const image = $.getElementById("cover")

const title = $.getElementById("title")

const artist = $.getElementById("artist")

const music = $.querySelector("audio")

const currentTimeEl = $.getElementById("current-time")

const durationEl = $.getElementById("duration")

const progress = $.getElementById("progress")

const progressContainer = $.getElementById("progress-container")

const prevBtn = $.getElementById("prev")

const playBtn = $.getElementById("play")

const nextBtn = $.getElementById("next")

const background = $.getElementById("background")

const songs = [
	{path:"http://dl.musicgeek.ir/classical/Max%20Richter%20-%20On%20the%20Nature%20of%20Daylight%20-%20musicgeek.ir.mp3",musicName:"On the Nature of Daylight",artist:"Max Richter",cover:"https://i.guim.co.uk/img/media/410c84ed058f3f03a6c5d342b637f4dbecae0118/2107_739_2927_1756/master/2927.jpg?width=465&quality=85&dpr=1&s=none"},
	{path:"https://dls.music-fa.com/tagdl/1401/Ashvan%20-%20Ghasedak(320).mp3",musicName:"Ghasedak",artist:"Ashvan",cover:"https://music-fa.com/wp-content/uploads/2022/03/Ashvan-Music-fa.com_.jpg"},
	{path:"https://dls.music-fa.com/tagdl/1401/Sadegh%20Zeyn%20-%20Leila%20Leila%20(Demo).mp3",musicName:"Leila Leila",artist:"Sadegh Zeyn",cover:"https://music-fa.com/wp-content/uploads/2022/06/Serial-Jadogar-leila-Music-fa.com_.jpg"}
]

let isLoading = false

function playSong(){
	isLoading = true
	playBtn.classList.replace("fa-play", "fa-pause");
	playBtn.setAttribute("title", "Pause");
	music.play()
}

function pauseSong(){
	isLoading = false
	playBtn.classList.replace("fa-pause", "fa-play");
  	playBtn.setAttribute("title", "Play");
	music.pause()
}


function playToggle(){
	if (isLoading) {
		pauseSong()
	} else {
		playSong()
	}
}

function loadSongs(song){
	title.innerHTML = song.musicName
	artist.innerHTML = song.artist
	music.src = song.path
	changeCover(song.cover)
}

function changeCover(cover) {
	image.classList.remove("active");
	setTimeout(function(){
		image.src = cover
		image.classList.add("active");
	},100)
	background.src = cover
}

let songIndex = 0

function prevSong(){
	songIndex--
	if(songIndex < 0) {
		songIndex = 2
	}
	loadSongs(songs[songIndex])
	playSong()
}

function nextSong(){
	songIndex++
	if(songIndex > songs.length - 1) {
		songIndex = 0
	}
	loadSongs(songs[songIndex])
	playSong()
}

loadSongs(songs[songIndex])


function updateProgressBar(){
	if(isLoading){
		const duration = music.duration
	let currentTime = music.currentTime
	let progressPercent = (currentTime / duration) * 100
	progress.style.width = progressPercent + "%"
	const durationMinutes = Math.floor(duration / 60)
	let durationSeconds = Math.floor(duration % 60)
	if (durationSeconds < 10){
		durationSeconds = "0" + durationSeconds
	}
	if (durationSeconds){
		durationEl.innerHTML = durationMinutes + ":" + durationSeconds
	}
	const currentMinutes = Math.floor(currentTime / 60)
	let currentSeconds = Math.floor(currentTime % 60)
	if (currentSeconds < 10) {
		currentSeconds = "0" + currentSeconds
	}
	currentTimeEl.innerHTML = currentMinutes + ":" + currentSeconds
	}
}

function setProgressBar(e) {
	const width = this.clientWidth;
  	const clickX = e.offsetX;
  	const duration = music.duration;
  	music.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener("click",playToggle)
prevBtn.addEventListener("click",prevSong)
nextBtn.addEventListener("click",nextSong)
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
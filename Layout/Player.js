let place = document.querySelector('.forPlayer')
let music = localStorage.getItem("currentMusic");music = JSON.parse(music)
const url = "http://localhost:7777/"
let id = 0


export function Player(info, isplay, fetch) {
    place.innerHTML = ""
    if(info !== null) {
        let playing = isplay
        id = info.id
        localStorage.setItem("currentMusic", JSON.stringify(info))
        place.innerHTML = ''
        let player = document.createElement('div')
        let left = document.createElement('div')
        let mid = document.createElement('div')
        let right = document.createElement('div')
        
        // for left
        let image = document.createElement('img')
        let artistNtitle = document.createElement('div')
        let title = document.createElement('p')
        let artist = document.createElement('p')
        let like = document.createElement('img')
        let toPage = document.createElement('a')

        // for mid
        let top = document.createElement('div')
        let bot = document.createElement('div')
        let repeat = document.createElement('img')
        let random = document.createElement('img')
        let prev = document.createElement('img')
        let next = document.createElement('img')
        let playPause = document.createElement('div')
        let play = document.createElement('img')
        let audio = document.createElement('audio')
        let audioDiv = document.createElement('div')
        let audioLength = document.createElement('div')
        let currTime = document.createElement('p')
        let total = document.createElement('p')

        // for left
        let devices = document.createElement('img')
        let queue = document.createElement('img')
        let volume = document.createElement('img')


        // classList
        
        player.classList.add('player')
        left.classList.add('left')
        mid.classList.add('mid')
        right.classList.add('right')
        image.classList.add('image')
        artistNtitle.classList.add('artistNtitle')
        title.classList.add('title')
        artist.classList.add('artist')
        like.classList.add('like')
        top.classList.add('top')
        bot.classList.add('bot')
        repeat.classList.add('repeat')
        random.classList.add('random')
        prev.classList.add('prev')
        next.classList.add('next')
        playPause.classList.add('playPause')
        play.classList.add('play')
        devices.classList.add('devices')
        queue.classList.add('queue')
        volume.classList.add('volume')
        audioDiv.classList.add("audio")
        audioLength.classList.add("audioLength")

        // src and funcs

        toPage.href = "../pages/playerPage.html"
        image.src = info?.img
        title.innerHTML = info?.title
        artist.innerHTML = info?.artists
        like.src = info?.isLiked ? "../images/GreenHeart.svg" : "../images/like.png"
        repeat.src = "../images/Repeat.svg"
        random.src = "../images/Shuffle.svg"
        play.src = isplay ?"../images/play.svg" : "../images/pause.svg"
        next.src = "../images/next.svg"
        prev.src = "../images/prev.svg"
        devices.src = "../images/Devices.svg"
        queue.src = "../images/Queue.svg"
        volume.src = "../images/Volume.svg"
        audio.src = info?.url
        total.innerHTML = "0:30"
        currTime.innerHTML = "0:00"

        audio.setAttribute("controls", "controls")
        if(typeof(fetch) == "function" || isplay == false) {
            audio.setAttribute("autoplay", "autoplay")
        }
        image.onclick = () => {
            window.location.assign("pages/playerPage.html")
        }
        
        playPause.onclick = () => {
            playing = !playing
            playing ? play.src = "../images/play.svg" : play.src = "../images/pause.svg"
            playing ? audio.pause() : audio.play()  
        }
        repeat.onclick = () => {
            repeat.classList.toggle("active")
            audio.toggleAttribute("loop")
        }
        random.onclick = () => {
            random.classList.toggle("active")
            let id = Math.round(Math.random()*40)
            axios.get(`${url}tracks/${id}`)
            .then(res => {
                Player(res.data)
            })
        }
        volume.onclick = () => {
            audio.muted = !audio.muted
        }

        like.onclick = () => {
            console.log("liked");
            axios.patch(`${url}tracks/${info.id}`, {
                isLiked: info.isLiked ? false : true
            }).then(res => {
                localStorage.setItem("currentMusic", JSON.stringify(res.data))
                Player(res.data, true, fetch)
                fetch()
            })
        }

        next.onclick = () => {
            id = id + 1
            axios.get(`${url}tracks/${id}`)
                .then(res => {
                    Player(res.data, false, fetch)
                })
            console.log("nice");
        }

        prev.onclick = () => {
            id = id - 1
            axios.get(`${url}tracks/${id}`)
                .then(res => {
                    Player(res.data, false, fetch)
                })
        }

        audio.addEventListener('timeupdate', width)
        audioDiv.addEventListener('click', setProgress)

        function width(e) {
            const {duration, currentTime} = e.srcElement
            const progresspercent = (currentTime / duration) * 100
            audioLength.style.width = `${progresspercent}%`
            let curr = Math.round(currentTime) <= 9 ? "0" + Math.round(currentTime) : Math.round(currentTime)
            currTime.innerHTML = "0:" + curr
        }

        function setProgress(e) {
            const width = this.clientWidth
            const clickX = e.offsetX
            const duration = audio.duration
            audio.currentTime = (clickX / width) * duration
        }
        audio.onended = () => {
            id = id + 1
            axios.get(`${url}tracks/${id}`)
                .then(res => {
                    Player(res.data, playing)
                })
        }

        // appending

        audioDiv.append(audioLength)
        toPage.append(image)
        bot.append(currTime, audio, audioDiv, total)
        playPause.append(play)
        top.append(repeat, prev, playPause, next, random)
        artistNtitle.append(title, artist)
        left.append(toPage, artistNtitle, like)
        mid.append(top, bot)
        right.append(devices, queue, volume)
        player.append(left, mid, right)
        place.append(player)
    }
}

Player(music, true, true)

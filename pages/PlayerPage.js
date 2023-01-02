
let info = JSON.parse(localStorage.getItem("currentMusic"))
let place = document.querySelector(".playerPage")
let id = 0
const url = "http://localhost:7777/"


function Player(info, isplay) {
    if(info !== null) {
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
        let smth = document.createElement('div')

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

        // for left
        let devices = document.createElement('img')
        let queue = document.createElement('img')
        let volume = document.createElement('img')


        // classList
        
        player.classList.add('playerPages')
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
        audio.classList.add('audio')
        devices.classList.add('devices')
        queue.classList.add('queue')
        volume.classList.add('volume')
        smth.classList.add("smth")
        audio.classList.add("audio")

        // src and funcs

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
        audio.setAttribute("controls", "controls")

        if(isplay == false) {
            audio.setAttribute("autoplay", "autoplay")
        }

        playPause.onclick = () => {
            Player(info, !isplay)
            isplay ? audio.play() : audio.pause()
        }

        repeat.onclick = () => {
            repeat.classList.toggle("active")
            audio.toggleAttribute("loop")
            console.log("works");
        }

        random.onclick = () => {
            random.classList.toggle("active")
            let id = Math.round(Math.random()*40)
            axios.get(`${url}tracks/${id}`)
            .then(res => {
                Player(res.data, false)
            })
            console.log("works");
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
                Player(res.data, isplay)
            })
            console.log("works");
        }

        next.onclick = () => {
            id = id + 1
            axios.get(`${url}tracks/${id}`)
                .then(res => {
                    Player(res.data, false)
                })
            console.log("nice");
        }

        prev.onclick = () => {
            id = id - 1
            axios.get(`${url}tracks/${id}`)
                .then(res => {
                    Player(res.data, false)
                })
            console.log("works");
        }

        // appending

        smth.append(artistNtitle, like)
        bot.append(audio)
        playPause.append(play)
        top.append(repeat, prev, playPause, next, random)
        artistNtitle.append(title, artist)
        left.append(image, smth)
        mid.append(top, bot)
        right.append(devices, queue, volume)
        player.append(left, mid, right)
        place.append(player)
        place.append(player)
    }
}

Player(info, true)
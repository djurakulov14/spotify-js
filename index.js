import { reloadCard } from "./Layout/PlaylistCard.js"
import { Player } from "./Layout/Player.js"

let forPLaylist = document.querySelector('.forPlaylists')
let urTopMixes = document.querySelector('.urTopMixes')
let currentTime = document.querySelector('#currentTime')
const url = "http://localhost:7777/"

let date = new Date()
let hours = date.getHours()

if(hours >= 18){
    currentTime.innerHTML = "Добрый вечер"
} else if(hours >= 12) {
    currentTime.innerHTML = "Добрый день"
} else {
    currentTime.innerHTML = "Доброе утро"
}

console.log(hours);


axios.get(url + "playlists")
    .then(res => {
        reloadPlaylist(res.data)
    })


const reloadPlaylist = (arr) => {
    for (let item of arr) {
        let box = document.createElement('box')
        let title = document.createElement('h2')
        let img = document.createElement('img')

        box.classList.add('box')

        img.src = item.img[0]

        title.innerHTML = item.title

        box.append(img, title)
        forPLaylist.append(box)

        box.onclick = () => {
            window.location.assign(`../pages/PlaylistPage.html?id=${item.id}`)
        }
    }

    reloadCard(urTopMixes, arr)
}

let screenWidth = window.screen.width

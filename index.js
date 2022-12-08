import { reloadHeader } from "./Layout/Header.js";
import { reloadAside } from "./Layout/Aside.js";
import { reloadleftAside } from "./Layout/LeftAside.js";
import { reloadCard } from "./Layout/PlaylistCard.js"
let forPLaylist = document.querySelector('.forPlaylists')
let urTopMixes = document.querySelector('.urTopMixes')
const url = "http://localhost:7777/"


reloadAside()
reloadleftAside()

axios.get(url + "playlists")
.then(res => {
        reloadPlaylist(res.data)
    })
axios.get(url + "user")
    .then(res => {
        reloadHeader(res.data)
    })


const reloadPlaylist = (arr) => {
    for (let item of arr) {
        let box = document.createElement('div')
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

    for (let item of arr) {
        reloadCard(urTopMixes, item)
    }
}


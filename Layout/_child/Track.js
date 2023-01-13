const url = "http://localhost:7777/"
import reloadAddto from "../../Layout/_child/AddtoFunc.js";
import { Player } from "../Player.js";

axios.get("http://localhost:7777/" + "playlists")
    .then(res => playlists = res.data.filter(item => item.isFromSpoti == false))

let playlists = []


const reloadTrack = (arr, place, fetch, AddtoBG, Addto, blyat) => {
    if(blyat == false) {
        place.innerHTML = ""
    }
    for(let item of arr) {
        let raw = document.createElement('div')
        let invisible = document.createElement('div')
        let titleNartist = document.createElement('div')
        let fr = document.createElement('div')
        let title = document.createElement('p')
        let artist = document.createElement('span')
        let img = document.createElement('img')
        let num = document.createElement('p')
        let album = document.createElement('p')
        let duration = document.createElement('p')
        let like = document.createElement('img')
        let more = document.createElement('img')

        invisible.classList.add('invisible')
        let modalcha = document.createElement('div')

        modalcha.classList.add('modalcha')

        let addToPl = document.createElement('p')

        addToPl.innerHTML = "Add to playlist"

        modalcha.append(addToPl)

        like.classList.add('like')
        more.classList.add('more')

        title.classList.add("trackTitle")

        like.src = item.isLiked ? "../images/GreenHeart.svg" : "../images/like.png"

        more.src = "../images/3tochka.svg"

        num.innerHTML = arr.indexOf(item) + 1

        raw.classList.add('track')

        fr.classList.add('fr')

        album.classList.add('album')

        duration.classList.add('duration')

        duration.innerHTML = "0:29"

        album.innerHTML = item.album

        titleNartist.classList.add('titleNartist')

        titleNartist.append(title, artist)
        
        fr.append(num, img, titleNartist,)
        
        title.innerHTML = item.title
        artist.innerHTML = item.artists
        img.src = item.img
        modalcha.style.display = "none"

        raw.append(fr, album, like, invisible, duration, more)
        place.append(raw)

        raw.onmouseenter = () => {
            raw.innerHTML = ""
            raw.append(fr,modalcha, album, like, invisible, duration, more )
        }
        raw.onmouseleave = () => {
            raw.innerHTML = ""
            raw.append(fr, album, duration, like, invisible, duration, more)
            modalcha.style.display = "none"
        }

        like.onclick = () => {
            axios.patch(`${url}tracks/${item.id}`, {
                isLiked: item.isLiked ? false : true
            })
            fetch()
        }

        more.onclick = () => {
            modalcha.style.display = "block"
        }
        

        modalcha.onclick = () => {
            ModalOpen(Addto, AddtoBG)
            reloadAddto(playlists, Addto, item.id, fetch, ModalClose)
        }

        AddtoBG.onclick = () => {
            ModalClose(Addto, AddtoBG)
        }
        invisible.onclick = () => {
            Player(item, false, fetch)
            raw.innerHTML = ""
            raw.classList.add('active')
        }
    }
    
    function ModalOpen () {
        document.body.style.overflow = 'hidden';
        Addto.style.display = "block"
        AddtoBG.style.display = "block"
        setTimeout(() => {
            Addto.style.opacity = "1"
            AddtoBG.style.opacity = "1"
        }, 300);
    }
    
    function ModalClose () {
        document.body.style.overflow = 'scroll';
        Addto.style.opacity = "0"
        AddtoBG.style.opacity = "0"
        setTimeout(() => {
            Addto.style.display = "none"
            AddtoBG.style.display = "none"
        }, 300);
    }
}

export {reloadTrack};
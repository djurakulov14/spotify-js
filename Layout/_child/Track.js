const url = "http://localhost:7777/"


const reloadTrack = (arr, place) => {
    place.innerHTML = ""
    for(let item of arr) {
        let raw = document.createElement('div')
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

        like.classList.add('like')
        more.classList.add('more')

        like.src = item.isLiked ? "../images/GreenHeart.svg" : "../images/like.svg"

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

        raw.append(fr, album, duration)
        place.append(raw)

        raw.onmouseenter = () => {
            raw.innerHTML = ""
            raw.append(fr, album, like, duration, more)
        }
        raw.onmouseleave = () => {
            raw.innerHTML = ""
            raw.append(fr, album, duration)
        }

        like.onclick = () => {
            axios.patch(`${url}tracks/${item.id}`, {
                isLiked: item.isLiked ? false : true
            })
        }
        
    }
}

export {reloadTrack};
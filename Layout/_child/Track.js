

const reloadTrack = (arr, place) => {
    for(let item of arr) {
        let raw = document.createElement('div')
        let title = document.createElement('p')
        let artist = document.createElement('p')
        let img = document.createElement('img')

        raw.classList.add('track')

        title.innerHTML = item.title
        artist.innerHTML = item.artists
        img.src = item.img

        raw.append(img, title, artist)
        place.append(raw)
    }
}

export {reloadTrack};
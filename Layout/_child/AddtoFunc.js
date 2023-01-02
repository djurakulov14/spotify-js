const reloadAddto = (arr, place, id, fetch, close) => {
    place.innerHTML = ""

    place.innerHTML = `
        <h2>Choose Playlist</h2>
    `
    for(let item of arr) {
        let link = document.createElement('p')

        link.innerHTML = item.title
        link.classList.add("toPlaylist")
        place.append(link)

        link.onclick = () => {
            axios.patch(`http://localhost:7777/tracks/${id}`, {
                playlistID: item.id
            }).then(res => {
                fetch()
                close()
            })
        }
    }
}

export default reloadAddto;
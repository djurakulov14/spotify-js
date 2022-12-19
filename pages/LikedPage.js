import { reloadTrack } from "../Layout/_child/Track.js";

let liked = document.querySelector('#liked')
let forTracks = document.querySelector('.forTracks')
let searchBox = document.querySelector('.inpBox')
let searchTrack = searchBox.children.inp

let searched = []

axios.get("http://localhost:7777/" + "tracks")
    .then(res => {
        let filtered = res.data.filter(item => item.isLiked)
        reloadTrack(filtered, forTracks)
        liked.innerHTML = filtered.length
        searched = filtered
    })

searchBox.children[0].onclick = () => {
    searchBox.classList.toggle('active')
    reloadTrack(searched, forTracks)
}

searchBox.onkeyup = () => {
    let filtered = searched.filter(item => item.title.toLowerCase().includes(searchTrack.value.toLowerCase().trim()))
    reloadTrack(filtered, forTracks)
}
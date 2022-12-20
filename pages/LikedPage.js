import { reloadTrack } from "../Layout/_child/Track.js";

let liked = document.querySelector('#liked')
let forTracks = document.querySelector('.forTracks')
let searchBox = document.querySelector('.inpBox')
let searchTrack = searchBox.children.inp
let AddtoBG = document.querySelector('.AddtoBG')
let Addto = document.querySelector('.Addto')

let searched = []

function fetchTrack () {
    axios.get("http://localhost:7777/" + "tracks")
        .then(res => {
            let filtered = res.data.filter(item => item.isLiked)
            reloadTrack(filtered, forTracks, fetchTrack, AddtoBG, Addto)
            liked.innerHTML = filtered.length
            searched = filtered
        })
}
fetchTrack()

searchBox.children[0].onclick = () => {
    searchBox.classList.toggle('active')
    reloadTrack(searched, forTracks, fetchTrack, AddtoBG, Addto)
}

searchBox.onkeyup = () => {
    let filtered = searched.filter(item => item.title.toLowerCase().includes(searchTrack.value.toLowerCase().trim()))
    reloadTrack(filtered, forTracks, fetchTrack, AddtoBG, Addto)
}
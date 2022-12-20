import { reloadTrack } from "../Layout/_child/Track.js";

let mainInfo = document.querySelector('.mainInfo')
let tracks = document.querySelector('.forTracks')
let searchBox = document.querySelector('.inpBox')
let searchTrack = searchBox.children.inp
let AddtoBG = document.querySelector('.AddtoBG')
let Addto = document.querySelector('.Addto')


const url = "http://localhost:7777/"
let id = window.location.href.split('=').at(-1)
let setSearchBox = false
let total = 0
let searched = []



    
function fetchTrack () {
    axios.get(`${url}tracks?playlistID=${id}`)
    .then(res => {
        searched = res.data
        for(let i = 0; i < res.data.length; i++) {
            total++
        }
        reloadTrack(res.data, tracks, fetchTrack, AddtoBG, Addto)
    })
}

fetchTrack()
    
axios.get(url + "playlists/" + id)
    .then(res => {
        reloadInfo(res.data)
    })
    
const reloadInfo = (arr) => {
    mainInfo.innerHTML = ""

    mainInfo.innerHTML = `
        <img src="${ arr.img[0].includes('images') ? "." + arr.img[0] : arr.img[0]}"/>
        <div class="info">
            <p>PUBLIC PLAYLIST</p>
            <h1>${arr.title}</h1>
            <p>${arr.isFromSpoti ? 'Made for ' + "<b>" + arr.creator + "</b>" : 'Made by ' + "<b>" + arr.creator + "</b>"} - ${total} songs</p>
        </div>
    `
}

searchBox.children[0].onclick = () => {
    searchBox.classList.toggle('active')
    reloadTrack(searched, tracks, AddtoBG, Addto)
}

searchBox.onkeyup = () => {
    tracks.innerHTML = ""
    let filtered = searched.filter(item => item.title.toLowerCase().includes(searchTrack.value.toLowerCase().trim()))
    reloadTrack(filtered, tracks, AddtoBG, Addto)
}



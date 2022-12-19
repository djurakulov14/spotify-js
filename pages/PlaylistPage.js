import { reloadHeader } from "../Layout/Header.js";
import { reloadleftAside } from "../Layout/LeftAside.js";
import { reloadTrack } from "../Layout/_child/Track.js";

let mainInfo = document.querySelector('.mainInfo')
let tracks = document.querySelector('.forTracks')
let searchBox = document.querySelector('.inpBox')

const url = "http://localhost:7777/"
let id = window.location.href.split('=').at(-1)
let setSearchBox = false
let total = 0

reloadleftAside()

axios.get(url + "user")
    .then(res => {
        reloadHeader(res.data)
    })
    
axios.get(`${url}tracks?playlistID=${id}`)
    .then(res => {
        for(let i = 0; i < res.data.length; i++) {
            total++
        }
        reloadTrack(res.data, tracks)
    })
    
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
    searchBoxOpen()
}



function searchBoxOpen () {
    searchBox.classList.toggle('active')

}
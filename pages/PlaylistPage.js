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
let randomTracks = []
const randomIds = [Math.round(Math.random()*40),Math.round(Math.random()*40),Math.round(Math.random()*40),Math.round(Math.random()*40),Math.round(Math.random()*40),Math.round(Math.random()*40),Math.round(Math.random()*40),Math.round(Math.random()*40),Math.round(Math.random()*40),Math.round(Math.random()*40),]

if(id == 2){
    fetchRandomTrack()
} else {
    fetchTrack()
}



    
function fetchTrack () {
    axios.get(`${url}tracks?playlistID=${id}`)
    .then(res => {
        for(let i = 0; i < res.data.length; i++) {
            total++
        }
        searched = res.data
        reloadTrack(res.data, tracks, fetchTrack, AddtoBG, Addto)
    })
}

function fetchRandomTrack () {
    for(let item of randomIds) {
        axios.get(`${url}tracks?id=${item}`)
        .then(res => {
            for(let i = 0; i < res.data.length; i++) {
                total++
            }
            randomTracks.push(res.data[0])
            tracks.innerHTML =""
            reloadTrack(randomTracks, tracks, fetchTrack, AddtoBG, Addto, true)
        })
    }
}

    
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
            <p>${arr.isFromSpoti ? 'Made for ' + "<b>" + arr.creator + "</b>" : 'Made by ' + "<b>" + arr.creator + "</b>"} - ${total - 1} songs</p>
        </div>
    `
}

if(id == 2){
    searchBox.children[0].onclick = () => {
        tracks.innerHTML = ""
        searchBox.classList.toggle('active')
        reloadTrack(randomTracks, tracks, AddtoBG, Addto, true)
    }
    
    searchBox.onkeyup = () => {
        tracks.innerHTML = ""
        let filtered = randomTracks.filter(item => item.title.toLowerCase().includes(searchTrack.value.toLowerCase().trim()))
        reloadTrack(filtered, tracks, AddtoBG, Addto, true)
    }
} else {
    searchBox.children[0].onclick = () => {
        tracks.innerHTML = ""
        searchBox.classList.toggle('active')
        reloadTrack(searched, tracks, AddtoBG, Addto)
    }
    
    searchBox.onkeyup = () => {
        tracks.innerHTML = ""
        let filtered = searched.filter(item => item.title.toLowerCase().includes(searchTrack.value.toLowerCase().trim()))
        reloadTrack(filtered, tracks, AddtoBG, Addto)
    }    
}




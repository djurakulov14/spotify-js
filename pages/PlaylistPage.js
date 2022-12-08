import { reloadHeader } from "../Layout/Header.js";
import { reloadAside } from "../Layout/Aside.js";
import { reloadleftAside } from "../Layout/LeftAside.js";
const url = "http://localhost:7777/"
let id = window.location.href.split('=').at(-1)
let mainInfo = document.querySelector('.mainInfo')


reloadleftAside()
reloadAside()

axios.get(url + "playlists/" + id)
.then(res => {
        reloadInfo(res.data)
        console.log(res.data);
    })

axios.get(url + "user")
    .then(res => {
        reloadHeader(res.data)
    })


const reloadInfo = (arr) => {
    mainInfo.innerHTML = ""

    mainInfo.innerHTML = `
        <img src="${ arr.img.lenght >= 1 ? "." + arr.img[0] : arr.img[0]}"/>
        <div class="info">
            <p>PUBLIC PLAYLIST</p>
            <h1>${arr.title}</h1>
            <p>${arr.isFromSpoti ? 'Made for ' + "<b>" + arr.creator + "</b>" : 'Made by ' + arr.creator}</p>
        </div>
    `
}
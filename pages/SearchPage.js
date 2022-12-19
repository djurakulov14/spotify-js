import { reloadHeader } from "../Layout/Header.js";
import { reloadleftAside } from "../Layout/LeftAside.js";
import { reloadTrack } from "../Layout/_child/Track.js";

let searched = document.querySelector('.searchedItems')
let searchInp = document.querySelector('.headerSearch')

let arr = []


reloadleftAside()

axios.get("http://localhost:7777/" + "user")
    .then(res => {
        reloadHeader(res.data)
    }) 

axios.get("http://localhost:7777/" + "tracks")
    .then(res => {
        arr = res.data
    }) 
    

searchInp.onkeyup = () => {
    let filtered = []
    let filtered2 = []
    if(searchInp.value.length !== 0) {
        filtered = arr.filter(item => item.title.toLowerCase().includes(searchInp.value.toLowerCase().trim()))
        filtered2 = arr.filter(item => item.artists.toLowerCase().includes(searchInp.value.toLowerCase().trim()))
    } 
    ReloadSearched(filtered.concat(filtered2))
} 





const ReloadSearched = (items) => {
    searched.innerHTML = ""
    if(items.length !== 0) {
        reloadTrack(items, searched)
    }
}
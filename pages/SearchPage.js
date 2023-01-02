import { reloadTrack } from "../Layout/_child/Track.js";
import { reloadCard } from "../Layout/PlaylistCard.js"

let searched = document.querySelector('.forTracks')
let searchInp = document.querySelector('.headerSearch')
let swipeItems = document.querySelector('.swiper-wrapper')
let AddtoBG = document.querySelector('.AddtoBG')
let Addto = document.querySelector('.Addto')

let arr = []



function fetchTrack() {
    axios.get("http://localhost:7777/" + "tracks")
    .then(res => {  
        ReloadSearched(res.data)    
    }) 
}

fetchTrack()

axios.get("http://localhost:7777/" + "playlists")
.then(res => {
    reloadCard(swipeItems, res.data, true)
}) 




const ReloadSearched = (arr) => {
    
    searchInp.onkeyup = () => {
        searched.innerHTML = ""
        
        let filtered = []
        let filtered2 = []
        
        if(searchInp.value.length !== 0) {
            filtered = arr.filter(item => item.title.toLowerCase().includes(searchInp.value.toLowerCase().trim()))
            filtered2 = arr.filter(item => item.artists.toLowerCase().includes(searchInp.value.toLowerCase().trim()))
        } 
        
        reloadTrack(filtered.concat(filtered2), searched, fetchTrack, AddtoBG, Addto)
        console.log("works");
    } 
}






var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
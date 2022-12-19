import { reloadCard } from "../Layout/PlaylistCard.js"

let allPlaylists = document.querySelector(".allPlaylists")


axios.get("http://localhost:7777/" + "playlists")
    .then(res => {
        reloadCard(allPlaylists, res.data)
        console.log(res.data);
    })


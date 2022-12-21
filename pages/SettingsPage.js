// import { Player } from "../Layout/Player"

let checkBox = document.querySelector('.checkbox_input')
let form = document.forms.user
let inpName = form.name

let premium = false

function fetch () {
    axios.get("http://localhost:7777/" + "user")
    .then(res => {
        inpName.value = res.data.name
        premium = res.data.isPremium
        if(res.data.isPremium){
            checkBox.setAttribute("checked","checked")
        }
    })
}

fetch()


form.onsubmit = () => {


    let user = {
        "ava": "https://i.scdn.co/image/ab6775700000ee85e111965805c91b6543f9caa2",
        "isPremium": premium
    }

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        user[key] = value
    })

    console.log(user);

    axios.patch("http://localhost:7777/" + "user", user)
        .then(res => fetch())

}


checkBox.onchange = () => {

    premium = !premium

}
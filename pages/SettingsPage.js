
let checkBox = document.querySelector('.checkbox_input')

let premium = false

function fetch () {
    axios.get("http://localhost:7777/" + "user")
    .then(res => {
        premium = res.data.isPremium
        if(res.data.isPremium){
            checkBox.setAttribute("checked","checked")
        }
    })
}

fetch()


checkBox.onchange = () => {

    axios.patch("http://localhost:7777/" + "user", {
        isPremium: !premium
    }).then(res => fetch())

    location.reload()
}
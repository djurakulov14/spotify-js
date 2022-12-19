

const reloadCard = (place, arr) => {
    for(let item of arr){
        let card = document.createElement('div')
        let cardText = document.createElement('div')
        let img = document.createElement('img')
        let title = document.createElement('h2')
        let authors = document.createElement('p')
    
        img.src = `${ item.img[0].includes('images') ? "." + item.img[0] : item.img[0]}`
        title.innerHTML = item.title
        authors.innerHTML = item.isFromSpoti ? `Made for ${item.creator}` : `Made by ${item.creator}`
    
        card.classList = 'card'
    
        cardText.append(title,authors)
        card.append(img, cardText)
        place.append(card)
    
        card.onclick = () => {
            window.location.assign(`../pages/PlaylistPage.html?id=${item.id}`)
        }
    }
}

export {reloadCard};
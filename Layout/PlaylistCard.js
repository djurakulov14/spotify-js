

const reloadCard = (place, item) => {
    let card = document.createElement('div')
    let cardText = document.createElement('div')
    let img = document.createElement('img')
    let title = document.createElement('h2')
    let authors = document.createElement('p')

    img.src = item.img[0]
    title.innerHTML = item.title
    authors.innerHTML = item.isFromSpoti ? `Made for ${item.creator}` : `Made by ${item.creator}`

    card.classList = 'card'

    cardText.append(title,authors)
    card.append(img, cardText)
    place.append(card)
}

export {reloadCard};
const aside = document.querySelector('aside')

const reloadAside = () => {
    let nav = document.createElement('nav')
    let top = document.createElement('div')
    let bot = document.createElement('div')

    let home = document.createElement('div')
    let search = document.createElement('div')
    let library = document.createElement('div')

    let homeLink = document.createElement('a')
    let searchLink = document.createElement('a')
    let libraryLink = document.createElement('a')

    let homeIcon = document.createElement('img')
    let searchIcon = document.createElement('img')
    let libraryIcon = document.createElement('img')

    let homeText = document.createElement('span')
    let searchText = document.createElement('span')
    let libraryText = document.createElement('span')

    homeText.innerHTML = 'Home'
    searchText.innerHTML = 'Search'
    libraryText.innerHTML = 'Your Library'

    top.classList.add('top')
    bot.classList.add('bot')

    home.classList.add('home')
    search.classList.add('search')
    library.classList.add('library')

    homeIcon.src = '../images/Home.svg'
    searchIcon.src = '../images/Search.svg'
    libraryIcon.src = '../images/Library.svg'

    homeLink.href = '../index.html'
    searchLink.href = '#'
    libraryLink.href = '#'

    let createPlaylist = document.createElement('div')
    let liked = document.createElement('div')

    let blockForIconpl = document.createElement('div')
    let blockForIconlike = document.createElement('div')

    let plus = document.createElement('img')
    let heart = document.createElement('img')

    let createText = document.createElement('span')
    let likedText = document.createElement('span')


    likedText.innerHTML = 'Liked Songs'
    createText.innerHTML = 'Create Playlist'

    plus.src = '../images/plus.svg'
    heart.src = '../images/heart.svg'

    createPlaylist.classList.add('create')
    liked.classList.add('liked')

    blockForIconpl.append(plus)
    blockForIconlike.append(heart)

    createPlaylist.append(blockForIconpl, createText)
    liked.append(blockForIconlike, likedText)
    bot.append(createPlaylist, liked)
    
    home.append(homeIcon, homeText)
    search.append(searchIcon, searchText)
    library.append(libraryIcon, libraryText)
    
    homeLink.append(home)
    searchLink.append(search)
    libraryLink.append(library)

    top.append(homeLink, searchLink, libraryLink)
    nav.append(top, bot)
    aside.append(nav)
}

export { reloadAside };
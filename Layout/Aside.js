const aside = document.querySelector('aside')
const CreateModalBG = document.querySelector('.CreatePlaylistBG')
const CreateModal = document.querySelector('.CreatePlaylist')
const form = document.forms.add



function fetchPlaylists() {
    axios.get("http://localhost:7777/" + "playlists")
    .then(res => {
            reloadAside(res.data.filter(item => item.isFromSpoti == false))
        })
}
fetchPlaylists()


const reloadAside = (arr) => {
    aside.innerHTML = ""
    let nav = document.createElement('nav')
    let top = document.createElement('div')
    let bot = document.createElement('div')
    let underNav = document.createElement('div')
    
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

    for(let item of arr){
        let playlist = document.createElement('a')
        playlist.classList.add("navPlaylist")
        playlist.innerHTML = item.title
        underNav.append(playlist)

        playlist.onclick = () => {
            window.location.assign(`../pages/PlaylistPage.html?id=${item.id}`)
        }
    }
    homeText.innerHTML = 'Home'
    searchText.innerHTML = 'Search'
    libraryText.innerHTML = 'Your Library'

    underNav.classList.add('underNav')
    top.classList.add('top')
    bot.classList.add('bot')

    home.classList.add('home')
    search.classList.add('search')
    library.classList.add('library')

    homeIcon.src = '../images/Home.svg'
    searchIcon.src = '../images/Search.svg'
    libraryIcon.src = '../images/Library.svg'

    homeLink.href = '../index.html'
    searchLink.href = '../pages/SearchPage.html'
    libraryLink.href = '../pages/LibraryPage.html'

    let createPlaylist = document.createElement('div')
    let liked = document.createElement('a')

    let blockForIconpl = document.createElement('div')
    let blockForIconlike = document.createElement('div')

    let plus = document.createElement('img')
    let heart = document.createElement('img')

    let createText = document.createElement('span')
    let likedText = document.createElement('span')

    liked.href = '../pages/LikedPage.html'

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
    nav.append(top, bot, underNav)
    aside.append(nav)


    createPlaylist.onclick = () => {
        ModalOpen()
    }

    CreateModalBG.onclick = () => {
        ModalClose()
    }
}

function ModalOpen () {
    document.body.style.overflow = 'hidden';
    CreateModal.style.display = "block"
    CreateModalBG.style.display = "block"
    setTimeout(() => {
        CreateModal.style.opacity = "1"
        CreateModalBG.style.opacity = "1"
    }, 300);
}

function ModalClose () {
    document.body.style.overflow = 'scroll';
    CreateModal.style.opacity = "0"
    CreateModalBG.style.opacity = "0"
    setTimeout(() => {
        CreateModal.style.display = "none"
        CreateModalBG.style.display = "none"
    }, 300);
}


form.onsubmit = (e) => {
    let playlist = {
        "id": Math.random(),
        "creator": "Sardor",
        "isFromSpoti": false,
        "genre": "random",
        "img": [
            "./images/newPlaylist.png"
        ]
    }

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        playlist[key] = value
    })

    axios.post("http://localhost:7777/" + "playlists", playlist)
        .then(res => {
            ModalClose()
        })
    
}
let htmls = document.querySelectorAll('html')

axios.get("http://localhost:7777/" + "user")
    .then(res => {
        ChangeTheme(res.data.isPremium)
    })

const ChangeTheme = (bool) => {
    htmls.forEach(item => {
        if(bool) {
            item.classList.remove('nonpremium')
            item.classList.add('premium')
        } else{
            item.classList.remove('premium')
            item.classList.add('nonpremium')
        }
    })
}


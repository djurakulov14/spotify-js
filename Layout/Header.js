const header = document.querySelector('header')

axios.get("http://localhost:7777/" + "user")
    .then(res => {
        reloadHeader(res.data)
    })

const reloadHeader = (info) => {
    let nextPrevBtns = document.createElement('div')
    let next = document.createElement('button')
    let prev = document.createElement('button')
    let nextPrevIcon = document.createElement('img')
    let nextPrevIcon2 = document.createElement('img')

    let secret = document.createElement('div')
    let secretInfo = document.createElement('p')
    let secretLink = document.createElement('a')

    let nonsecret = document.createElement('div')

    nonsecret.classList.add("nonsecret")

    secret.classList.add("secret")

    secretInfo.innerHTML = info.isPremium ? "Premium User" : "Free User"
    secretLink.href = "../pages/SettingsPage.html"
    secretLink.innerHTML = "Settings"
    secret.append(secretInfo, secretLink)

    let account = document.createElement('div')
    let ava = document.createElement('img')
    let accountName = document.createElement('span')
    let dropDownBtn = document.createElement('img')

    nextPrevBtns.classList.add('nextPrevBtns')
    next.classList.add('next')
    prev.classList.add('prev')
    
    account.classList.add('account')
    ava.classList.add('ava')
    dropDownBtn.classList.add('dropDownBtn')

    prev.append(nextPrevIcon)
    next.append(nextPrevIcon2)

    prev.onclick = () => {
        history.back()
    }
    next.onclick = () => {
        history.forward()
    }

    nextPrevIcon.src = '../images/arrow.svg'
    nextPrevIcon2.src = '../images/arrow.svg'
    ava.src = info.ava
    dropDownBtn.src = '../images/dropDown.svg'

    accountName.innerHTML = info.name

    nextPrevBtns.append(prev, next)
    nonsecret.append(ava, accountName, dropDownBtn)
    account.append(nonsecret, secret)
    header.append(nextPrevBtns, account)

    dropDownBtn.onclick = () => {
        account.style.height = account.style.height == "80px" ? "40px" : "80px"
        dropDownBtn.classList.toggle("turn")
    }
}

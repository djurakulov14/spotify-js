const header = document.querySelector('header')

const reloadHeader = () => {
    let nextPrevBtns = document.createElement('div')
    let next = document.createElement('button')
    let prev = document.createElement('button')
    let nextPrevIcon = document.createElement('img')
    let nextPrevIcon2 = document.createElement('img')

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

    nextPrevIcon.src = './images/arrow.svg'
    nextPrevIcon2.src = './images/arrow.svg'
    ava.src = './images/chelik.png'
    dropDownBtn.src = './images/dropDown.svg'

    accountName.innerHTML = 'sardor'

    nextPrevBtns.append(prev, next)
    account.append(ava, accountName, dropDownBtn)
    header.append(nextPrevBtns, account)
}

export {reloadHeader};
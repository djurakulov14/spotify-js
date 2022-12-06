let leftAside = document.querySelector('.leftAside')

const reloadleftAside = () => {
    leftAside.innerHTML = `
    <div class="leftAside">
        <div class="head">
            <p>Friend Activity</p>
            <div class="icons">
                <img src="../images/cross.svg"/>
            </div>
        </div>
        <p class="leftdsc1">Let friends and followers on Spotify see what you’re listening to.</p>

        <img src="../images/friend.png"/>
        <img src="../images/friend.png"/>
        <img src="../images/friend.png"/>

        <p class="leftdsc2">Go to Settings / Social and enable “Share my listening activity on Spotify.’ You can turn this off at any time.</p>
        <button class="stngs">SETTINGS</button>
    </div>
    `
}


export {reloadleftAside} ;
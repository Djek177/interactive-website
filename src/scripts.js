/* Smooth Scroll */

const viewport = document.getElementById('container');
const content = document.getElementById('parent');
const image = document.getElementById('backgroundImg');

const sb = new ScrollBooster({
    viewport,
    content,
    textSelection: false,
    scrollMode: 'transform',
    emulateScroll: true,
    /*     onUpdate: (data) => {
            // viewport.scrollLeft = data.position.x
            // viewport.scrollTop = data.position.y
            content.style.transform = `translate(${-data.position.x}px,${-data.position.y}px)`
        }, */
    shouldScroll: (data, event) => {
        // disable scroll if clicked on button
        const isButton = event.target.nodeName.toLowerCase() === 'button';
        return !isButton;
    }
});

image.addEventListener('load', () => {
    // set viewport position to the center of an image
    const offsetX = image.scrollWidth - viewport.offsetWidth;
    const offsetY = image.scrollHeight - viewport.offsetHeight;
    sb.setPosition({
        x: offsetX / 2,
        y: offsetY / 2
    });
});

/* Buttons Behavior */

const videoSP = document.getElementById('btnStockpile');
const videoHO = document.getElementById("videoHeadOffice");
const btnHO = document.getElementById("btn-headOffice");
const videoUNetwork = document.getElementById("videoUNetwork");
const videoControlRoom = document.getElementById("videoControlRoom");
const videoDrone = document.getElementById("videoDrone");
const videoCitizens = document.getElementById("videoCitizens");
const videoUDrill = document.getElementById("videoUDrill");
const videoBelowSurface = document.getElementById("videoBelowSurface");

function headOfficeOver() {
    videoHO.style.opacity = 1;
    videoHO.playbackRate = 1.5;
}

function headOfficeOut() {
    videoHO.style.opacity = 0.6;
    videoHO.playbackRate = 0.5;
}

function uNetworkOver() {
    videoUNetwork.currentTime = 0;
}

function controlRoomOver() {
    videoControlRoom.currentTime = 0;
}

function droneOver() {
    videoDrone.currentTime = 0;
}

function citizenOver() {
    videoCitizens.currentTime = 0;
}

function uDrillOver() {
    videoUDrill.currentTime = 0;
}

function belowSurfaceOver() {
    videoBelowSurface.currentTime = 0;
}

/* Pop Up */
const hoverBackground = document.getElementById("openPopup");
const popUpText = document.getElementById("popUpText");
const popUpTitle = document.getElementById("popUpTitle");
const popUpVideo = document.getElementById("popUpVideo");
const popUpSubtitle = document.getElementById("popUpSubtitle");
const popUp = document.getElementById("popUp");
const popUpContent = document.getElementById("popUpContent");

function closePopUp() {
    popUpVideo.pause();
    popUpVideo.currentTime = 0;
    hoverBackground.style.display = "none";

    //fade anim
    hoverBackground.classList.add('visuallyhidden');

    hoverBackground.addEventListener('transitionend', function (e) {
        hoverBackground.classList.add('hidden');
    }, {
        capture: false,
        once: true,
        passive: false
    });
}

function openPopUp(element, title, subtitle, text, source) {
    popUpText.innerText = text;
    popUpTitle.innerText = title;
    popUpVideo.src = source;
    popUpSubtitle.innerText = subtitle;
    popUpVideo.play();
    hoverBackground.style.display = "block";

    //fade anim
    hoverBackground.classList.remove('hidden');
    setTimeout(function () {
        hoverBackground.classList.remove('visuallyhidden');
    }, 20);
}

//Pop up video alignement
var vidRatio = popUpVideo.clientHeight / popUpVideo.clientWidth;

setInterval(function () {
    var width = popUpVideo.clientWidth;
    popUpContent.style.width = width + "px";
    popUpContent.style.height = width * vidRatio;
}, 10);
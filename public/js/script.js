


// VARIABLES /////////////////////////////////////////////////////////
const mapID = "worldMap"
var selectedZoom = 6.5,
    beforezoom = selectedZoom,
    focusX = -1183, focusY = -166,
    pinX = 4898, pinY = 3143,
    locations






// INCLUDES ////////////////////////////////////////////////////////
readTextFile("./public/json/locations.json", function (e) {
    locations = JSON.parse(e);
});






// EVENTS ////////////////////////////////////////////////////////////
window.onload = function () {
    console.log(locations)

    i = 8;
    pinX = locations[i].pinX
    pinY = locations[i].pinY

    getPinLocate(pinX, pinY)

    genMap()
    getEastMapZoom(selectedZoom);
    setTimeout(() => {
        document.getElementsByClassName('zoom-in')[0].click();
        setTimeout(() => {
            getCoords(focusX, focusY);
        }, 400);
    }, 800);
}

window.onresize = function () {
    onResizeWindow()
};

function onResizeWindow() {
    let comp = document.getElementsByClassName('mappy')[0]
    comp.style.width = window.innerWidth;
    comp.style.height = window.innerHeight;

    console.log(comp.style.width)
    console.log(comp.style.height)
    /*  ????????????????????? */
}


document.getElementsByClassName('zoom-in')[0].addEventListener('click', zoomInOnMap)
function zoomInOnMap() {
    beforezoom = selectedZoom
    selectedZoom += 0.5;
    getEastMapZoom(selectedZoom);
}

document.getElementsByClassName('zoom-out')[0].addEventListener('click', zoomOutOnMap)
function zoomOutOnMap() {
    beforezoom = selectedZoom
    selectedZoom -= 0.5;
    getEastMapZoom(selectedZoom);
}








// FUNCTIONS ////////////////////////////////////////////////////////////
function getPinLocate(x, y) {
    let pin = document.getElementById('pin')
    pin.style.top = x;
    pin.style.left = y;

    let pinImage = pin.children[0]

    for (const attr of pinImage.attributes) {
        if (attr.name == "main-left") {
            attr.value = x
        }
        if (attr.name == "main-top") {
            attr.value = y
        }
    }
}


function genMap() {
    var map = new SpryMap({
        id: mapID,
        width: window.innerWidth,
        height: window.innerHeight,
        cssClass: "mappy"
    });

    let mItems = document.getElementsByClassName("map-item")
    for (const child of mItems) {
        child.style.position = "absolute"
    };
}

function getCoords(x = 0, y = 0) {
    let map = document.getElementById(mapID)
    xpx = x + "px",
        ypx = y + "px"

    map.style.top = ypx
    map.style.left = xpx
}

function getEastMapZoom(zoom = 1) {
    if (zoom > 10) {
        zoom = 10
    }
    if (zoom < 1) {
        zoom = 1
    }
    selectedZoom = zoom
    let diff = beforezoom - selectedZoom;

    if (beforezoom == selectedZoom) {
        return false;
    }

    console.log(beforezoom)
    console.log(selectedZoom)

    if (selectedZoom < beforezoom) {
        zoomtype = "zoomout";
    } else {
        zoomtype = "zoomin";
    }

    zoom = 10 - zoom + 1 // revers


    let map = document.getElementById(mapID)
    for (const child of map.children) {


        // map
        if (child.className == "map-image") {
            let img = child,
                mainW,
                mainH;

            for (const attr of img.attributes) {
                if (attr.name == "main-width") {
                    mainW = attr.value
                }
                if (attr.name == "main-height") {
                    mainH = attr.value
                }
            }

            let w = parseInt(mainW / zoom),
                h = parseInt(mainH / zoom);

            img.style.width = w + "px";
            img.style.height = h + "px";

            map.style.width = w + "px";
            map.style.height = h + "px";

            // --- BAD WORKING ---
            // map.style.left = parseInt(parseInt(map.style.left.substring(0, map.style.left.length - 2).trim()) / zoom) + "px"
            // map.style.top = parseInt(parseInt(map.style.top.substring(0, map.style.top.length - 2).trim()) / zoom) + "px"
            /*
            if (zoomtype == "zoomin") {
                let l = parseInt(map.style.left.substring(0, map.style.left.length - 2).trim()),
                    t = parseInt(map.style.top.substring(0, map.style.top.length - 2).trim())

                
                map.style.left = parseInt(l - (window.innerWidth * -diff)) + "px"
                map.style.top = parseInt(t - (window.innerHeight * -diff)) + "px"
                
            }
            */
            // getCoords(map.style.left, map.style.top);
        }



        // map items
        if (child.className == "map-item") {
            let mapItem = child
            let mainL,
                mainT;

            for (const element of mapItem.children) {
                if (element.tagName == "IMG") {
                    let img = element,
                        mainW,
                        mainH;


                    for (const attr of img.attributes) {
                        if (attr.name == "main-width") {
                            mainW = attr.value
                        }
                        if (attr.name == "main-height") {
                            mainH = attr.value
                        }
                        if (attr.name == "main-left") {
                            mainL = attr.value
                        }
                        if (attr.name == "main-top") {
                            mainT = attr.value
                        }
                    }

                    img.style.width = parseInt(mainW / zoom) + "px";
                    img.style.height = parseInt(mainH / zoom) + "px";
                }
            }

            mapItem.style.left = parseInt(mainL / zoom) + "px";
            mapItem.style.top = parseInt(mainT / zoom) + "px";
        }
    }
}

// json read
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
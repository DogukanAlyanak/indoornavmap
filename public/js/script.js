const mapID = "worldMap"
var selectedZoom = 7
var beforezoom = selectedZoom;

window.onload = function () {
    genMap()
    getEastMapZoom(selectedZoom);

    setTimeout(() => {
        getCoords(-1054, -68);
    }, 400);
    setTimeout(() => {
        getCoords(-1054, -68);
    }, 2000);
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
        child.style.position="absolute"
    };
}

function getCoords(y = 0, x = 0) {
    let map = document.getElementById(mapID)
        xpx = x + "px",
        ypx = y + "px"

    map.style.top = xpx
    map.style.left = ypx
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
    console.log(diff)

    if (selectedZoom < beforezoom) {
        zoomtype = "zoomout";
    } else {
        zoomtype = "zoomin";
    }
    console.log(zoomtype)
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

                console.log(map.style.left)
                
                map.style.left = parseInt(l - (window.innerWidth * -diff)) + "px"
                map.style.top = parseInt(t - (window.innerHeight * -diff)) + "px"
                
                console.log(map.style.left)
            }
            */
            getCoords(map.style.left, map.style.top);
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
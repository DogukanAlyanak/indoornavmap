const mapID = "worldMap"

window.onload = function () {
    var map = new SpryMap({
        id: mapID,
        width: window.innerWidth,
        height: window.innerHeight,
        cssClass: "mappy"
    });

    getEastMapZoom(3);
    getCoords(0, 0);
}

function getCoords(x = 0, y = 0) {
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

            map.style.left = parseInt(parseInt(map.style.left.substring(0, map.style.left.length - 2).trim()) / zoom) + "px"
            map.style.top = parseInt(parseInt(map.style.top.substring(0, map.style.top.length - 2).trim()) / zoom) + "px"
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
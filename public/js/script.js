


// VARIABLES /////////////////////////////////////////////////////////
const mapID = "worldMap"
var selectedZoom = 6.5,
    beforezoom = selectedZoom,
    focusX = -1183, focusY = -166,
    pinX = 4898, pinY = 3143,
    locations,
    locationID,
    targets = [],
    onMenu = false






    // INCLUDES ////////////////////////////////////////////////////////
    readTextFile("./public/json/locations.json", function (e) {
        locations = JSON.parse(e);
    });


for (let i = 0; i < 9; i++) {
    readTextFile(`./public/json/targets_${i}.json`, function (e) {
        targets[i] = JSON.parse(e);

        optionsComp = `<option selected>Hedef Konum Seçiniz</option>`
        if (i == 0) {
            let options = targets[0];
            options.forEach(option => {
                optionsComp += `<option value="${parseInt(option.id)}">${option.room_code} ${option.name.trim()}</option>`
            });
            document.getElementById('floatingSelect').innerHTML = optionsComp
        }
    });

}


readTextFile("./public/json/locations.json", function (e) {
    locations = JSON.parse(e);
});






// EVENTS ////////////////////////////////////////////////////////////
window.onload = function () {
    getStart()
}


window.onresize = function () {
    if (onMenu == false) {
        location.reload();
    }
};


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

document.getElementsByClassName('on-location-btn')[0].addEventListener('click', onCurrLocation)
function onCurrLocation() {
    getCoords(focusX, focusY);
}

document.getElementsByClassName('open-menu-button')[0].addEventListener('click', openMenuButton)
function openMenuButton() {
    onMenu = true;
    openMenu()
}

document.getElementsByClassName('close-menu-button')[0].addEventListener('click', closeMenuButton)
function closeMenuButton() {
    onMenu = false;
    closeMenu()
}

document.getElementsByClassName('map-image')[0].addEventListener('click', clickItsMap)
function clickItsMap() {
    onMenu = false;
    closeMenu()
}

$(document).on(`change`, `#floatingSelect`, function () {
    let targetID = $(this).val()
    let selectedTarget = targets[locationID][targetID]
    let selectedPaths = selectedTarget.paths
    let comp = ``
    selectedPaths.forEach(path => {
        let item = `<div class="col-12">
            <div class="row">
                <div class="col-2">
                    <h1 class="route-icon"><i class="${path.icon}"></i></h1>
                </div>
                <div class="col-10">
                    <h4 class="route-head">${path.directive}</h4>
                    <p class="route-desc">${path.description}</p>
                </div>
            </div>
        </div>`

        comp += item
    });
    document.getElementsByClassName('menu-route')[0].innerHTML = comp

    $(`#location-image`).find("img").attr("src", `public/img/route/${selectedTarget.route_image}`);
})

let satalliteShow = false
$(document).on(`click`, `.satallite-on-off-btn`, function () {
    if (satalliteShow) {
        satalliteShow = false;
    } else {
        satalliteShow = true;
    }

    if (satalliteShow) {
        $(`#satelliteMap`).css("display", `block`);
    } else {
        $(`#satelliteMap`).css("display", `none`);
    }
})








// FUNCTIONS ////////////////////////////////////////////////////////////
async function getStart() {
    let timer = await setInterval(() => {
        if (locations != undefined) {
            clearInterval(timer);

            let i
            let locationCode = getGETParam("location");
            if (locationCode != null) {
                locations.forEach(e => {
                    if (locationCode == e.code) {
                        i = e.id;
                    }
                });
            } else {
                i = 0; // main_entrance
            }
            locationID = i;

            pinX = locations[i].pinX
            pinY = locations[i].pinY
            focusX = locations[i].focusX
            focusY = locations[i].focusY
            selectedZoom = locations[i].zoom

            getPinLocate(pinX, pinY)

            genMap()
            getEastMapZoom(selectedZoom);
            setTimeout(() => {
                document.getElementsByClassName('zoom-in')[0].click();
                setTimeout(() => {
                    getCoords(focusX, focusY);
                    setTimeout(() => {
                        let arr = document.querySelectorAll('.wait-loading');
                        for (var i = 0; i < arr.length; i++) {
                            arr[i].classList.remove("wait-loading");
                        }
                        document.getElementsByClassName('loading')[0].classList.add("hide");
                    }, 40);
                }, 40);
            }, 40);
        }
    }, 40);

    $(`.select2`).select2();
}


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






// ---------------------------------------------------------------------------------------
// Close Menu
function closeMenu() {
    // menu-bar animate__animated animate__backOutLeft animate__faster

    let menuBar = document.getElementsByClassName('menu-bar')[0]
    let menuBarCls = menuBar.classList

    menuBarCls.add("animate__backOutLeft");
    menuBarCls.add("animate__animated");
    menuBarCls.add("animate__faster");

    setTimeout(() => {
        menuBar.style.display = "none"
    }, 525);
    setTimeout(() => {
        menuBarCls.remove("animate__backOutLeft");
        menuBarCls.remove("animate__animated");
        menuBarCls.remove("animate__faster");
    }, 550);
}



// Open Menu
function openMenu() {
    // menu-bar animate__animated animate__backOutLeft animate__faster

    let menuBar = document.getElementsByClassName('menu-bar')[0]
    let menuBarCls = menuBar.classList

    menuBarCls.add("animate__backInLeft");
    menuBarCls.add("animate__animated");
    menuBarCls.add("animate__faster");

    menuBar.style.display = "block"
    setTimeout(() => {
    }, 525);
    setTimeout(() => {
        menuBarCls.remove("animate__backInLeft");
        menuBarCls.remove("animate__animated");
        menuBarCls.remove("animate__faster");
    }, 550);
}


// func _GET Catch
function getGETParam(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}
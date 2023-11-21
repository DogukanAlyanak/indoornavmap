window.onload = function () {
    let w = window.innerWidth,
        h = window.innerHeight

    var map = new SpryMap({
        id: "worldMap",
        width: w,
        height: h,
        startX: 200,
        startY: 200,
        cssClass: "mappy"
    });
}
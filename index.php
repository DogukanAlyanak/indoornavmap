<?php



$http = "http://";
$hostName = "127.0.0.1";

// FOR WEBSITE

$domain = trim($_SERVER['HTTP_HOST']);
if (substr($domain, 0, 4) == "www.") {
    $domain = substr($domain, 4);
}


if ($_SERVER["HTTP_HOST"] != "127.0.0.1") {

    $http = "https://www.";
    $hostName = $domain;

    if ($_SERVER["REQUEST_METHOD"] == "GET" && $_SERVER["REQUEST_SCHEME"] == "http") {
        header('Location: ' . $http . $hostName . $_SERVER["REQUEST_URI"], true, 301);
        exit;
    }

    if (substr($_SERVER["HTTP_HOST"], 0, 4) !== "www.") {
        header('Location: ' . $http . $hostName . $_SERVER["REQUEST_URI"], true, 301);
        exit;
    }
}

unset($http);
unset($hostName);
unset($domain);


?>

<!DOCTYPE html>
<html lang="tr">

<!-- version : 1.0.10.2311252228 -->

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="Description" content="INDOOR MAP" />

  <title>A.Ü. Teknik Bilimler Kampüsü M.Y.O.</title>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css"
    integrity="sha512-b2QcS5SsA8tZodcDtGRELiGv5SaKSk1vDHDaQRda0htPYWZ6046lr3kJ5bAAQdpV2mmA/4v0wQF9MyU6/pDIAg=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />

  <!---Fontawesome v6.2.0 css -->
  <link rel="stylesheet" href="public/plugin/fontawesome/6.2.0/css/all.min.css" />

  <!-- Animate.css -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />

  <!-- select2 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css"
    integrity="sha512-nMNlpuaDPrqlEls3IX/Q56H36qvBASwb3ipuo3MxeWbsQB1881ox0cRv7UPTgBlriqoynt35KjEwgGUeUXIPnw=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />

  <link rel="stylesheet" href="public/css/style.css" type="text/css">

</head>

<body>
  <div class="loading">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>

  <div class="menu-bar animate__backInLeft animate__animated" style="display: none;">
    <div class="row menu-head">
      <div class="col-12">
        <div class="d-flex justify-content-between">
          <h3>Menü</h3>
          <div class="text-right">
            <button type="button" class="btn btn-light close-menu-button">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div class="row menu-select">
      <div class="col-12">
        <h4>Gitmek istediğiniz yer:</h4>
        <div class="form-floating">


          <select class="form-select select2" id="floatingSelect"></select>


        </div>
      </div>
    </div>
    <div class="row menu-route"></div>
  </div>

  <div class="wait-loading">
    <button type="button" class="btn btn-primary btn-md open-menu-button">
      <i class="fa-solid fa-bars"></i>
    </button>
  </div>

  <div class="zoom-buttons wait-loading">
    <button type="button" class="btn btn-primary btn-md zoom-in">
      <i class="fa-regular fa-magnifying-glass-plus"></i>
    </button>
    <button type="button" class="btn btn-primary btn-md zoom-out">
      <i class="fa-regular fa-magnifying-glass-minus"></i>
    </button>
    <button type="button" class="btn btn-primary btn-md on-location-btn">
      <i class="fa-duotone fa-location-crosshairs"></i>
    </button>
  </div>

  <div class="mapping wait-loading">
    <div id="worldMap">
      <img src="public/img/3_floor_map.jpg" class="map-image" main-height="3805" main-width="6767" />

      <a id="pin" class="map-item" style="top:2269px;left:4898px;">
        <img src="public/img/pin.png" class="animate__animated animate__bounce animate__slowly animate__infinite"
          main-width="128" main-height="163" main-top="2269" main-left="4898" />
      </a>

    </div>
  </div>




  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"
    integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"
    integrity="sha512-2ImtlRlf2VVmiGZsjm9bEyhjGW4dU7B6TNwh/hx/iSByxNENtj3WVE6o/9Lj4TJeVXPi4bnOIMXFIJJAeufa0A=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/js/bootstrap.min.js"
    integrity="sha512-WW8/jxkELe2CAiE4LvQfwm1rajOS8PHasCCx+knHG0gBHt8EXxS6T6tJRTGuDQVnluuAvMxWF4j8SNFDKceLFg=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script type="text/javascript" src="public/js/spryMap-2.js"></script>
  <script type="text/javascript" src="public/js/script.js"></script>

</body>

</html>
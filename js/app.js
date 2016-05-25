var longWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var shortWeekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var units = {"Metric": '&deg;C', "Imperial": '&deg;F'};
var measure = "Metric";
var canvas = false;

var rain = '<svg version="1.1" id="rain_icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 92.614 94.781" style="enable-background:new 0 0 94.2 101.8;" xml:space="preserve"><style type="text/css">.rn0{fill:#C5C5C4;}.rn1{fill:#E4E4E4;}.rn2{fill:#828ECE;}</style><polyline id="XMLID_205_" class="rn0" points="1,66.3 40.9,5.9 80.4,66"/><polyline id="XMLID_204_" class="rn1" points="48.7,66.1 71.3,32 93.6,66"/><g id="XMLID_167_"><path class="rn2" d="M53.5,76c0,2.6-2.1,4.8-4.8,4.8c-2.6,0-4.8-2.1-4.8-4.8c0-0.9,0.3-1.8,0.8-2.6c0.8-1.3,2.3-2.2,4-2.2C51.4,71.2,53.5,73.3,53.5,76z"/><polygon class="rn2" points="48.7,69 45,72.9 52.4,72.9"/></g><g id="XMLID_166_"><path class="rn2" d="M37.4,84.7c0,2.6-2.1,4.8-4.8,4.8s-4.8-2.1-4.8-4.8c0-0.9,0.3-1.8,0.8-2.6c0.8-1.3,2.3-2.2,4-2.2C35.2,79.9,37.4,82.1,37.4,84.7z"/><polygon class="rn2" points="32.6,77.7 28.9,81.7 36.3,81.7"/></g><g id="XMLID_165_"><path class="rn2" d="M69.6,84.7c0,2.6-2.1,4.8-4.8,4.8c-2.6,0-4.8-2.1-4.8-4.8c0-0.9,0.3-1.8,0.8-2.6c0.8-1.3,2.3-2.2,4-2.2C67.5,79.9,69.6,82.1,69.6,84.7z"/><polygon class="rn2" points="64.9,77.7 61.2,81.7 68.5,81.7"/></g><g id="XMLID_163_"><path class="rn2" d="M53.5,95.9c0,2.6-2.1,4.8-4.8,4.8S44,98.5,44,95.9c0-0.9,0.3-1.8,0.8-2.6c0.8-1.3,2.3-2.2,4-2.2C51.4,91.1,53.5,93.2,53.5,95.9z"/><polygon id="XMLID_164_" class="rn2" points="48.7,88.9 45,92.8 52.4,92.8"/></g></svg>';

var clear = '<svg version="1.1" id="clear_icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 96.58 96.58" style="enable-background:new 0 0 96.8 96.7;" xml:space="preserve"><style type="text/css">.st0{fill:#F7DFAD;}.st1{fill:#F3BD3D;}</style><rect x="31.2" y="29.8" class="st0" width="34.6" height="34.6"/><rect x="31.2" y="29.8" id="sunny_square" transform="matrix(0.7071 0.7071 -0.7071 0.7071 47.5096 -20.4497)" class="st1" width="34.6" height="34.6"/><path class="st1 sunny_ray" d="M48.4,13.7L48.4,13.7c-0.9,0-1.6-0.7-1.6-1.6V1.7c0-0.9,0.7-1.6,1.6-1.6h0c0.9,0,1.6,0.7,1.6,1.6v10.4C50,13,49.3,13.7,48.4,13.7z"/><path class="st1 sunny_ray" d="M48.4,96.7L48.4,96.7c-0.9,0-1.6-0.7-1.6-1.6V84.6c0-0.9,0.7-1.6,1.6-1.6h0c0.9,0,1.6,0.7,1.6,1.6v10.4C50,95.9,49.3,96.7,48.4,96.7z"/><path class="st1 sunny_ray" d="M83.1,47.7L83.1,47.7c0-0.9,0.7-1.6,1.6-1.6h10.4c0.9,0,1.6,0.7,1.6,1.6v0c0,0.9-0.7,1.6-1.6,1.6H84.7C83.8,49.3,83.1,48.6,83.1,47.7z"/><path class="st1 sunny_ray" d="M0.1,47.7L0.1,47.7c0-0.9,0.7-1.6,1.6-1.6h10.4c0.9,0,1.6,0.7,1.6,1.6v0c0,0.9-0.7,1.6-1.6,1.6H1.8C0.9,49.3,0.1,48.6,0.1,47.7z"/><path class="st1 sunny_ray" d="M72.9,72.3L72.9,72.3c0.6-0.6,1.6-0.6,2.3,0l7.4,7.4c0.6,0.6,0.6,1.6,0,2.3l0,0c-0.6,0.6-1.6,0.6-2.3,0l-7.4-7.4C72.3,74,72.3,73,72.9,72.3z"/><path class="st1 sunny_ray" d="M14.3,13.7L14.3,13.7c0.6-0.6,1.6-0.6,2.3,0l7.4,7.4c0.6,0.6,0.6,1.6,0,2.3l0,0c-0.6,0.6-1.6,0.6-2.3,0L14.3,16C13.7,15.3,13.7,14.3,14.3,13.7z"/><path class="st1 sunny_ray" d="M72.9,24.8L72.9,24.8c-0.6-0.6-0.6-1.6,0-2.3l7.4-7.4c0.6-0.6,1.6-0.6,2.3,0v0c0.6,0.6,0.6,1.6,0,2.3l-7.4,7.4C74.6,25.5,73.6,25.5,72.9,24.8z"/><path class="st1 sunny_ray" d="M14.3,83.5L14.3,83.5c-0.6-0.6-0.6-1.6,0-2.3l7.4-7.4c0.6-0.6,1.6-0.6,2.3,0h0c0.6,0.6,0.6,1.6,0,2.3l-7.4,7.4C15.9,84.1,14.9,84.1,14.3,83.5z"/></svg>';

var thunder = '<svg version="1.1" id="thunder_icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 73.4 87.7" style="enable-background:new 0 0 73.4 87.7;" xml:space="preserve"><style type="text/css">.th0{fill:#C5C5C4;}.th1{fill:#E4E4E4;}.th2{fill:#FFC416;}</style><g id="XMLID_99_"><g id="XMLID_122_"><g id="XMLID_134_"><polyline id="XMLID_136_" class="th0" points="0,48.1 31.6,0.3 62.9,47.9"/><polyline id="XMLID_135_" class="th1" points="37.8,47.9 55.6,21 73.3,47.8"/></g></g></g><polygon id="XMLID_98_" class="th2" points="29.1,53.2 43.2,53.2 35.3,66.4 44.7,66.4 26.5,87.6 31.4,72.2 21.9,71.8 "/></svg>';

var snow = '<svg version="1.1" id="snow_icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-433 237.9 91.6 87.1" style="enable-background:new -433 237.9 91.6 87.1;" xml:space="preserve"><style type="text/css">.sw0{fill:#C5C5C4;}.sw1{fill:#E4E4E4;}.sw2{fill:#FFFFFF;}</style><polyline id="XMLID_40_" class="sw0" points="-433,292.1 -397.2,237.9 -361.7,291.9"/><polyline id="XMLID_39_" class="sw1" points="-381.7,292 -361.4,261.4 -341.4,291.8"/><g><rect x="-404.3" y="298.5" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 -899.1678 228.8038)" class="sw2" width="4.2" height="4.2"/><rect x="-419.2" y="298.5" transform="matrix(-0.7224 -0.6914 0.6914 -0.7224 -926.2841 229.4098)" class="sw2" width="4.2" height="4.2"/><rect x="-389.4" y="298.5" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 -873.7304 239.3379)" class="sw2" width="4.2" height="4.2"/><rect x="-374.5" y="298.5" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 -848.2932 249.8721)" class="sw2" width="4.2" height="4.2"/><rect x="-359.6" y="298.5" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 -822.8558 260.4062)" class="sw2" width="4.2" height="4.2"/></g><g><rect x="-395.9" y="309.2" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 -892.3691 253.0009)" class="sw2" width="4.2" height="4.2"/><rect x="-410.8" y="309.2" transform="matrix(-0.7224 -0.6914 0.6914 -0.7224 -919.1893 253.6379)" class="sw2" width="4.2" height="4.2"/><rect x="-381" y="309.2" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 -866.9317 263.5352)" class="sw2" width="4.2" height="4.2"/><rect x="-366.1" y="309.2" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 -841.4944 274.0692)" class="sw2" width="4.2" height="4.2"/><rect x="-351.2" y="309.2" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 -816.0571 284.6035)" class="sw2" width="4.2" height="4.2"/></g><g><rect x="-404.3" y="319.9" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 -914.2831 265.3527)" class="sw2" width="4.2" height="4.2"/><rect x="-419.2" y="319.9" transform="matrix(-0.7224 -0.6914 0.6914 -0.7224 -941.0628 266.2849)" class="sw2" width="4.2" height="4.2"/><rect x="-389.4" y="319.9" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 -888.8459 275.8869)" class="sw2" width="4.2" height="4.2"/><rect x="-374.5" y="319.9" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 -863.4086 286.421)" class="sw2" width="4.2" height="4.2"/><rect x="-359.6" y="319.9" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 -837.9714 296.9552)" class="sw2" width="4.2" height="4.2"/></g></svg>';

var clouds = '<svg version="1.1" id="clouds_icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 92.6 60.4" style="enable-background:new 0 0 92.6 60.4;" xml:space="preserve"><style type="text/css">.cl0{fill:#F7DFAD;}.cl1{fill:#F3BD3D;}.cl2{fill:#C5C5C4;}.cl3{fill:#E4E4E4;}</style><rect x="55.4" y="11.3" class="cl0" width="29.6" height="29.6"/><rect x="55.4" y="11.3" transform="matrix(0.7071 0.7071 -0.7071 0.7071 39.0331 -41.9718)" class="cl1" width="29.6" height="29.6"/><polyline id="XMLID_40_" class="cl2" points="0,60.4 39.9,0 79.4,60.1"/><polyline id="XMLID_39_" class="cl3" points="47.7,60.2 70.3,26.1 92.6,60.1"/></svg>';

var Header = function (info) {

    this.temp = Math.round(info.temp.day);
    this.fullDate = new Date(info.dt * 1000);
    this.weekLong = window.longWeekDays[this.fullDate.getDay()];
    this.weekShort = window.shortWeekDays[this.fullDate.getDay()];
    this.dayDate = this.fullDate.getDate();

    switch (info.weather[0].main) {
        case "Rain":
            this.weatherIcon = window.rain;
            this.weatherName = "Rain";
            break;
        case "Clear":
            this.weatherIcon = window.clear;
            this.weatherName = "Clear";
            break;
        case "Thunderstom":
            this.weatherIcon = window.thunder;
            this.weatherName = "Thunderstom";
            break;
        case "Snow":
            this.weatherIcon = window.snow;
            this.weatherName = "Snow";
            break;
        default:
            this.weatherIcon = window.clouds;
            this.weatherName = "Clouds";
            break;
    }

};

$(document).on("click", ".btn-imperial", function() {

    $(this).addClass("btn-metric");
    $(this).removeClass("btn-imperial");
    $(this).html(window.units['Metric']);
    window.measure = "Imperial";
    init();

});

$(document).on("click", ".btn-metric", function() {

    $(this).addClass("btn-imperial");
    $(this).removeClass("btn-metric");
    $(this).html(window.units['Imperial']);
    window.measure = "Metric";
    init();

});

function getGeoLoc(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    getCityName(lat, lon);

    getWeather(lat, lon);
}

function getGeoLocByIP(msg) {
    $.ajax({
        url: 'http://ipinfo.io/json',
        success: function(response) {

            var loc = response.loc.split(",");
            var city = response.city;

            getCityName(loc[0], loc[1]);

            getWeather(loc[0], loc[1]);

        }
    });
}

function getCityName(lat, lon) {

    $.ajax({
        url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&sensor=true',
        success: function(response) {

            if (response.status === "OK") {

                var components = response.results[0].address_components;

                var city = components.filter(function(elem) {
                    return elem.types[0] == "administrative_area_level_1";
                });

                $(".city").html(city[0]['long_name']);

            }

        }
    });

}

function getWeather(lat, lon) {
    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + lon + '&cnt=4&units=' + window.measure + '&appid=be307090c916e88db9e41e7f578b2f99',
        success: function(response) {

            setMain(response.list[0]);
            setSecondaries("#secondDay", response.list[1]);
            setSecondaries("#thirdDay", response.list[2]);
            setSecondaries("#fourthDay", response.list[3]);

        }
    });
}

function setMain(info) {

    var header = new Header(info);

    $(".info").find(".icon").html(header.weatherIcon);
    $(".head").attr("data-weather", header.weatherName);
    $(".info").find(".temp").html(header.temp + window.units[window.measure]);
    $(".info").find(".date").html(header.weekLong + " " + header.dayDate);

    if (header.weatherName === "Snow") {

        $(".head").prepend("<div class='snow'></div>");

    }

    if (!window.canvas) {
        $.getScript("js/canvas.js", function() {
            $(".loading").css("display","none");
            window.canvas = true;
        });
    }

}

function setSecondaries(obj, info) {

    var header = new Header(info);

    $(obj).find(".icon").html(header.weatherIcon);
    $(obj).find(".day").html(header.weekShort);
    $(obj).find(".temp").html(header.temp + window.units[window.measure]);
}

function init() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getGeoLoc, getGeoLocByIP);
    } else {
        getGeoLocIP();
    }
}

init();

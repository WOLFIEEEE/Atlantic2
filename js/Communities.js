var map, manager, batch;
var radOwn, radPrice, chkHouseTypes, scPriceMin, scPriceMax, scInterestRate, scDownPayment, scYearofloan, SearchOptions, scBedroomsMax, scBedroomsMin, scBathroomsMax, scBathroomsMin, scSQFTMax, scSQFTMin;
var scMonthlyPriceMax, scMonthlyPriceMin, scGarageMax, scGarageMin, scLevelMax, scLevelMin;
var scids, scid_models;
var global_floorCount = 0;
var communityCount = 0;
var tempFloorCount = 0;
var AutoNavigationBarSelect = 0;
var ManualNavigationBarSelect = 0;

var lastNavigator, lastRadOwn, lastRadRent, lastHouseType, lastBedroomMin, lastBedroomMax, lastBathroomMin, lastBathroomMax, lastGarageMin, lastGarageMax, lastStoriesMin, lastStoriesMax;
var lastSQFTMin, lastSQFTMax, lastHomeSearch, lastCommunitySearch, lastPriceMin, lastPriceMax, lastPriceMonthlyMin, lastPriceMonthlyMax, lastInterestRate, lastDownPayment, lastYearOfLoan;
var bound;
var oNavigator;
//Home Finder Location Navegator
function initializeCommunity() {
    //make the "progress" div appear full screen even when the map cannot load.
    //debugger;
    iniCommunityNavigator();

    iniCommunityGMap();
    //SetCenterPosition();
    //iniHomesearch();        
}

function iniCommunityNavigator() {
    //debugger;
    var divLocation = document.getElementById("divLocation");
    var odivSelect = document.getElementById("divSelect");
    //Get Selected Navigator Value
    oNavigator = document.getElementById("Navigator");
    var sNavigator = oNavigator.value.split("_");
    ////    //Build Navigator String
    var strNavigator = "<span id='spanL0'><a href=\"javascript:resetNavigator()\" class=\"hfLocationLink\">" + _LevelDetail[0][3] + "</a>";
    for (i = 1; i < sNavigator.length; i++) {
        for (j = 0; j < _LevelDetail.length; j++) {
            if (i == _LevelDetail[j][0] && sNavigator[i] == _LevelDetail[j][1]) {
                strNavigator += "></span><span id='spanL" + i + "'><a href=\"javascript:showNavigatorSelector(" + i + "," + sNavigator[i - 1] + ")\" class=\"hfLocationLink\">" + _LevelDetail[j][3] + "</a>";
                //                if (i == sNavigator.length - 1) {
                //                    document.getElementById("ctl00_ContentPlaceHolder1_btnViewAll").innerHTML = "View all homes in " + _LevelDetail[j][3];
                //                }
            }
        }
    }
    if (sNavigator.length < _Level.length) {
        strNavigator += "></span><span id='spanL" + sNavigator.length + "'><a href=\"javascript:showNavigatorSelector(" + sNavigator.length + "," + sNavigator[sNavigator.length - 1] + ")\" class=\"hfLocationLink\">Select " + _Level[sNavigator.length] + "</a></span>";
    }
    divLocation.innerHTML = "<span id='spanNavigator'>" + strNavigator + "</span>";
    odivSelect.style.visibility = "hidden";

}
//---------------------------------------------------------------------------------------------------------


//Map Functions--------------------------------------------------------------------------------------------

function createMarkerClickHandler(marker, text, link) {
    return function() {
        openInfoWindow(marker.labelText_);
        return false;
    };
}

function openInfoWindow(id) {
    for (var i = 0; i < batch.length; i++) {
        if (batch[i].labelText_ == id) {
            //debugger;
            //map.setZoom(12);
            //map.setMapType(G_NORMAL_MAP);
            map.setCenter(batch[i].getLatLng(), 15);
            batch[i].openInfoWindowHtml(batch[i].labelHTML_);
        }
    }
}

function clearInput(me, text) {
    if (me.value == text) me.value = "";me.focus();
}
function restoreInput(me, text) {
    if (me.value == "") {
        me.value = text;
    }
}
function showCommunityDirection(to) {
    window.open('http://maps.google.ca/?q=from:+' + document.getElementById('txtFrom').value + '+to:+' + to, 'Direction');
}

function createMarker(pointData) {
    var latlng = new GLatLng(pointData.latitude, pointData.longitude);
    ////

    //bound.extend(new GPoint(pointData.latitude, pointData.longitude));    
    ////
    var iconOptions = {};
    iconOptions.primaryColor = "#3CE415FF";
    iconOptions.cornerColor = "#D2F2D1FF";
    iconOptions.strokeColor = "#0C4F02FF";
    var icon = MapIconMaker.createMarkerIcon(iconOptions);
    icon.image = '../images/chart.png';
    icon.iconSize = new GSize(22, 32);
    icon.iconAnchor = new GPoint(18, 18);
    icon.infoWindowAnchor = new GPoint(20, 3);
    var HTML = '<div class="hfInfoWindowMainDiv"><div class="hfInfoWindowCloseDiv" onclick="javascript:ew.hide()">X</div><div class="hfLabelBold">' + pointData.name + '</div><div class="hfLabel">' + pointData.address + '</div><div class="hfAddressDirection">Enter your address for directions</div><input id="txtFrom" type="text" value="From address or Zip code" class="hfTxtInput" onclick="clearInput(this,\'From address or Zip code\')" onblur="restoreInput(this,\'From address or Zip code\')" style="width:140px;"><br /><div style="height:5px;"></div><input type="submit" value="Get Directions" onclick="showCommunityDirection(\'' + pointData.mapaddress + '\'); return false;" class="hfButton" style="position:relative; top:-3px; left:2px;" /></div>';
    opts = {
        "icon": icon,
        "clickable": true,
        "labelText": "",
        "labelHTML": HTML,
        "labelOffset": new GSize(-6, -16)
    };

    var marker = new LabeledMarker(latlng, opts);
    //var handler = createMarkerClickHandler(marker, pointData.name, pointData.wp);
    //GEvent.addListener(marker, "click", handler);

    // add listener to the marker
    GEvent.addListener(marker, 'click', function() {
        //marker.openInfoWindowHtml(html);
        ew.openOnMarker(marker, HTML);
    }
      );

    return marker;
}

function iniCommunityGMap() {
    //debugger;
    map = new GMap2(document.getElementById("gMap"));
    //map.addControl(new GLargeMapControl3D());
    map.addControl(new GSmallZoomControl3D());
    //map.addMapType(G_PHYSICAL_MAP);
    map.removeMapType(G_HYBRID_MAP);
    //map.setMapType(G_PHYSICAL_MAP);
    map.setCenter(new GLatLng(centerLatitude, centerLongitude), startZoom);
    //map.setCenter(new GLatLng(markers[0].latitude, markers[0].longitude), 15);
    map.addControl(new GMapTypeControl());
    manager = new MarkerManager(map);

    ew = new EWindow(map, E_STYLE_7);
    map.addOverlay(ew);
    bound = new GLatLngBounds();
//    GEvent.addListener(map, "click", function(overlay, point) {
//        if (!overlay) {
//            ew.hide();
//        }
//    });
    // This is a sorting trick, don't worry too much about it.
    //markers.sort(function(a, b) { return (a.abbr > b.abbr) ? +1 : -1; });

    batch = [];
    for (id in markers) {
        if (markers[id]) batch.push(createMarker(markers[id]));
    }
    for (var i = 0; i < batch.length; i++) {
        bound.extend(batch[i].getLatLng());
    }

    manager.addMarkers(batch, 1);


    manager.refresh();
    //map.centerAndZoomOnBounds(bound);
    bestFitAndZoom();
}

function SetCenterPosition() {
    try {
        var node = document.getElementById('gMap');
        var cl = 'hfLabel';
        var elem = node.getElementsByTagName('*');
        for (var i = 0; i < elem.length; i++) {
            var classes = elem[i].className;
            if (cl == classes) {
                elem[i].style.color = "#FFFFFF";
                var addLeft;
                if (elem[i].innerHTML.length == 1) {
                    addLeft = 5;
                }
                else if (elem[i].innerHTML.length == 2) {
                    addLeft = 5;
                }
                else if (elem[i].innerHTML.length == 3) {
                    addLeft = 11;
                }
                var left = elem[i].style.left;
                var newLeft = parseInt(left.substring(0, left.length - 2)) - addLeft;
                elem[i].style.left = newLeft + "px";

                var top = elem[i].style.top;
                var newTop = parseInt(top.substring(0, top.length - 2)) + 1;
                elem[i].style.top = newTop + "px";
            }
        }
    } catch (e) { }
}
function bestFitAndZoom() {
    var marginRatio = 0.1;
    var swLL = bound.getSouthWest();
    var neLL = bound.getNorthEast();
    var minLat = Math.min(2 * bound.getCenter().lat() - neLL.lat(), swLL.lat());
    var maxLat = Math.max(2 * bound.getCenter().lat() - swLL.lat(), neLL.lat());
    var minLng = Math.min(2 * bound.getCenter().lng() - neLL.lng(), swLL.lng());
    var maxLng = Math.max(2 * bound.getCenter().lng() - swLL.lng(), neLL.lng());
    var minLatLng = new GLatLng(minLat - marginRatio, minLng - marginRatio);
    var maxLatLng = new GLatLng(maxLat + marginRatio, maxLng + marginRatio);
    bound.extend(maxLatLng);
    bound.extend(minLatLng);
    //alert(map.getBoundsZoomLevel(bound)+3);
    //document.getElementById("divProgress").style.display = "none";
    map.setZoom(map.getBoundsZoomLevel(bound)+2);
    //alert(bound.getCenter());
    map.setCenter(bound.getCenter());
    var bubbleCount = 0;
    for (var i = 0; i < batch.length; i++) {
        if (batch[i].N) bubbleCount++;
    }
    if (bubbleCount == 1) { map.setZoom(15); }
}
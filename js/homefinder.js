var map, manager, batch;

var scids, scid_models;
var global_floorCount = 0;
var communityCount = 0;
var tempFloorCount = 0;
var AutoNavigationBarSelect = 0;
var ManualNavigationBarSelect = 0;

var bound;
var oNavigator;
var isCounty;
var SelectedSCID = "";
var ColorNotChange = true;
var splitSCID;
var clearSerach = false;
var showLoading = true;
var serachType = "";
var alreadyCall = false;
var LoadCity = false;
//Home Finder Location Navegator
function initialize() {
    //make the "progress" div appear full screen even when the map cannot load.
    //    document.getElementById("divProgress").style.height = document.body.clientHeight + "px";
    showLoadingImage();
    document.getElementById("divProgress").className = "hfProgress";
    iniNavigator();
    iniGMap();
    iniHomesearch();
    locationFilter();
    document.getElementById("divProgress").className = "hfHidden";
    document.getElementById('divLoadProgress').style.display = "none";
}

function iniNavigator() {
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
            }
        }
    }
    if (sNavigator.length < _Level.length) {
        strNavigator += "></span><span id='spanL" + sNavigator.length + "'><a href=\"javascript:showNavigatorSelector(" + sNavigator.length + "," + sNavigator[sNavigator.length - 1] + ")\" class=\"hfLocationLink\">Select " + _Level[sNavigator.length] + "</a></span>";
    }
    divLocation.innerHTML = "<span id='spanNavigator'>" + strNavigator + "</span>";
    odivSelect.style.visibility = "hidden";
    if (map) {
        if (AutoNavigationBarSelect != 1) {
            ManualNavigationBarSelect = 1;
            locationFilter();
            ManualNavigationBarSelect = 0;
        }
    }
}
function resetNavigator() {
    document.getElementById('Navigator').value = 0;
    iniNavigator();
}

//Show Hide Navigator Selector Panel
function showNavigatorSelector(level, pItem) {
    //debugger;
    var divLocation = document.getElementById("divLocation");
    var odivSelect = document.getElementById("divSelect");
    odivSelect.innerHTML = "";
    for (var i = 0; i < _LevelDetail.length; i++) {
        if (level == _LevelDetail[i][0] && pItem == _LevelDetail[i][2]) {
            odivSelect.innerHTML += "<a href=\"javascript:NavigatorSelected(" + level + "," + _LevelDetail[i][1] + ")\" class=\"hfLocationLink\">" + _LevelDetail[i][3] + "</a><br />";
        }
    }
    //Find Select div position
    var oNavigator = document.getElementById("Navigator");
    var sNavigator = oNavigator.value.split("_");
    var position = 0;
    for (var i = 0; i < level; i++) {
        position += document.getElementById("spanL" + i).offsetWidth;
    }
    odivSelect.style.left = position + 12; //Position + padding of the navigator
    odivSelect.style.visibility = (odivSelect.style.visibility == "visible") ? "hidden" : "visible";
}
//Select from Navigator dropdown
function NavigatorSelected(level, item) {
    //debugger;
    var oNavigator = document.getElementById("Navigator");
    var tmp = oNavigator.value.split("_");
    tmp[level] = item;
    var tmp2 = "";
    for (var i = 0; i <= level; i++) {
        if ("" != tmp2) tmp2 += "_";
        tmp2 += tmp[i];
    }
    oNavigator.value = tmp2;
    iniNavigator();
}






function largerMap() {
    var gMap = document.getElementById("gMap");
    var topLeftPanel = document.getElementById("divTopLeftPanel");

    var rightPanel = document.getElementById("divTopRightPaenl");
    var bottomPanel = document.getElementById("divBottonPanel");
    rightPanel.style.display = "none";
    topLeftPanel.style.width = "99%";
    document.getElementById("imgLarger").style.display = "none";
    document.getElementById("imgSmaller").style.display = "";
    map.checkResize();
}

function smallerMap() {
    var gMap = document.getElementById("gMap");
    var rightPanel = document.getElementById("divTopRightPaenl");
    var topLeftPanel = document.getElementById("divTopLeftPanel");
    topLeftPanel.style.width = "76%";
    rightPanel.style.display = "block";
    document.getElementById("imgLarger").style.display = "";
    document.getElementById("imgSmaller").style.display = "none";
    map.checkResize();
}

//Open URL from Javascript
function openURL(URL) {
    self.location = URL;
}

//Open Save page
function SaveTo247(dataType, dataValue, scid) {
    try {
        set_cookie("saveSearch", dataValue, 999999);
        var URL = document.getElementById("247URL").value;        
        var oifrm = document.getElementById("ifrmSave");
        var sURL = document.location.href.split('/');        
        sURL.length = 3;
        var domain = sURL.join('/');
        window.parent.document.getElementById("divGrayBG").className = "hfVisible";
        window.parent.document.getElementById("divGrayBG").style.height = document.body.clientHeight + "px";
        //new code
        if (document.getElementById("hdnAnonymousSearch") && document.getElementById("hdnAnonymousSearch").value == "1") {
            document.getElementById("hdnAnonymousSearch").value = "";
            window.parent.document.getElementById("divGrayBG").className = "hfNone";
            var location = URL + '/Marketing/AnonymousSearch.aspx?dataType=' + dataType + dataValue + '&source=hideframe' + '&SCID=' + scid;
            try {
                xss_ajax(location);
            }
            catch (ex) { }
        }
        else {
            window.window.frames['frmLogin'].location.href = URL + '/Marketing/SaveTo247.aspx?domain=' + domain + '&dataType=' + dataType + '&dataValue=' + dataValue + '&source=hideframe' + '&SCID=' + scid;
            window.parent.showElement();
        }
    }
    catch (err) {
        alert("This functionality is not available from the backend");
    }
}

function addToFavorite(me, model_scID, scID) {
    if (me.innerHTML.toLowerCase().indexOf('save') == 0) {

        SaveTo247('AddFavorites', '&modelid=' + model_scID, scID);
        me.innerHTML = "Remove";
    }
    else {
        SaveTo247('RemoveFavorites', '&modelid=' + model_scID, scID);
        me.innerHTML = "Save";
    }
}

function addToFavoriteFromCommunity(me, model_scID, scID) {
    if (me.innerHTML.toLowerCase().indexOf('save') == 0) {

        SaveTo247('AddFavorites', '&modelid=' + model_scID, scID);
        me.innerHTML = "Remove";
    }
    else {
        SaveTo247('RemoveFavorites', '&modelid=' + model_scID, scID);
        me.innerHTML = "Save";
    }
}

function getFavoriteList(scID) {
    SaveTo247('ListFavHomes', scID);
}

function setHref(url) {
    document.location.href = url;
}

function SaveSearchCriteria() {


    var objCounty = document.getElementById("ctl00_ContentPlaceHolder1_ddlCounty");
    var objCity = document.getElementById("ctl00_ContentPlaceHolder1_ddlCity");
    var objFlat = document.getElementById("ctl00_ContentPlaceHolder1_ddlApartment");
    var objRent = document.getElementById("ctl00_ContentPlaceHolder1_ddlRent");
    var objBed = document.getElementById("ctl00_ContentPlaceHolder1_ddlBedroom");
    var objBath = document.getElementById("ctl00_ContentPlaceHolder1_ddlBathroom");

    var CountyText = objCounty.options[objCounty.selectedIndex].text;
    var CityText = objCity.options[objCity.selectedIndex].text;
    var FlatText = objFlat.options[objFlat.selectedIndex].text;

    var MinRent = "";
    var MaxRent = "";
    var MaxBed = "";
    var MaxBath = "";

    if (objRent.value != "-1") {
        var ObjSplit = objRent.value.split(' - ');
        MinRent = ObjSplit[0];
        MaxRent = objRent[1];
    }
    if (objBed.selectedIndex != 0) {
        MaxBed = objBed.selectedIndex - 1;
    }
    if (objBath.selectedIndex != 0) {
        MaxBath = objBath.selectedIndex - 1;
    }



    var dataValue = "&Location=";
    dataValue += document.getElementById("Navigator").value;
    dataValue += "&OwnRent=";
    dataValue += "Rent";
    dataValue += "&HouseType=";
    var strTemp = FlatText;

    dataValue += strTemp;

    dataValue += "&BedroomMinimum=";
    dataValue += "0";
    dataValue += "&BedroomMaximum=";
    dataValue += MaxBed;
    dataValue += "&BathroomMinimum=";
    dataValue += "0";
    dataValue += "&BathroomMaximum=";
    dataValue += MaxBath;

    dataValue += "&PriceMinimum=";
    dataValue += MinRent;
    dataValue += "&PriceMaximum=";
    dataValue += MaxRent;
    dataValue += "&SearchOptions=";

    var scid = document.getElementById('SCID').value;
    SaveTo247("SearchCriteria", dataValue, scid);
}

function openLogin(modelid, RURL) {
    openURL('Login.aspx?modelid=' + modelid + '&RURL=' + RURL);
}

function showCommunity(id, name) {
    window.location = "/Communities/" + name; //+"/" + id;
}


function createMarkerClickHandler(marker, text, link) {
    return function() {
        //SelectedSCID = marker.labelText_;
        //        var objCounty = document.getElementById("ctl00_ContentPlaceHolder1_ddlCounty");
        //        var objCity = document.getElementById("ctl00_ContentPlaceHolder1_ddlCity");
        //        var CountyText = objCounty.options[objCounty.selectedIndex].text;
        //        var CityText = objCity.options[objCity.selectedIndex].text;
        //        if (objCity.value != "-1") {
        //            GoCity(CityText, CountyText);
        //        }
        //        else if (objCounty.value != "-1") {
        //            GoCounty(CountyText);
        //        }
        //        else {
        //            AjaxCall(GeneratedFilterString());
        //        }
        //alert(marker.labelText_);
        //AjaxCall(GeneratedFilterString());
        openInfoWindow(marker.labelText_);
        //setTimeout(SetCenterPosition, 2000);
        ColorNotChange = false;
        return false;
    };
}

function openInfoWindow(id) {
    for (var i = 0; i < batch.length; i++) {
        if (batch[i].labelText_ == id) {
            //map.setCenter(batch[i].getLatLng(), 20);
            //batch[i].openInfoWindowHtml(batch[i].labelHTML_, { maxWidth: 150 });
            ew.openOnMarker(batch[i], batch[i].labelHTML_);
            //var latlonNew = new GLatLng(parseFloat(batch[i].getLatLng().lat()) + 0.2, batch[i].getLatLng().lng());
            map.panTo(batch[i].getLatLng());
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
function showDirection(to) {
    window.open('http://maps.google.ca/?q=from:+' + document.getElementById('txtFrom').value + '+to:+' + to, 'Direction');
}
function createMarker(pointData) {
    var scidleft = -12;
    var latlng = new GLatLng(pointData.latitude, pointData.longitude);
    var iconOptions = {};
    iconOptions.primaryColor = "#3CE415FF";
    iconOptions.cornerColor = "#D2F2D1FF";
    iconOptions.strokeColor = "#0C4F02FF";
    var icon = MapIconMaker.createMarkerIcon(iconOptions);
    icon.image = '../images/chart.png';
    icon.transparent = '';
    icon.iconSize = new GSize(22, 32);
    icon.iconAnchor = new GPoint(18, 18);
    icon.infoWindowAnchor = new GPoint(20, 3);
    var HTML = '<div class="hfInfoWindowMainDiv"><div class="hfInfoWindowCloseDiv" onclick="javascript:ew.hide()">X</div><div class="hfLabelBold" >' + pointData.name + '</div><div class="hfLabel">' + pointData.address + '</div><div class="hfAddressDirection">Enter your address for directions</div><input id="txtFrom" type="text" value="From address or Zip code" class="hfTxtInput" onclick="clearInput(this,\'From address or Zip code\')" onblur="restoreInput(this,\'From address or Zip code\')" style="width:140px;"><br /><div style="height:5px;"></div><input type="submit" value="Get Directions" onclick="showDirection(\'' + pointData.mapaddress + '\'); return false;" class="hfButton" style="position:relative; top:-3px; left:2px;" /></div>';
    //var HTML = '<div class="hfInfoWindowMainDiv"><div class="hfInfoWindowCloseDiv" onclick="javascript:ew.hide()">X</div><div class="hfLabelBold">' + pointData.name + '</div><div class="hfLabel">' + pointData.address + '</div><div class="hfAddressDirection">Enter your address for directions</div><input id="txtFrom" type="text" value="From address or Zip code" class="hfTxtInput" onclick="clearInput(this,\'From address or Zip code\')" onblur="restoreInput(this,\'From address or Zip code\')" style="width:140px;"><br /><div style="height:5px;"></div><input type="submit" value="Get Directions" onclick="showDirection(\'' + pointData.mapaddress + '\'); return false;" class="hfButton" style="position:relative; top:-3px; left:2px;" /></div>';
    var scidLabel = "";
    if (document.getElementById('ctl00_ContentPlaceHolder1_ddlCounty')) scidLabel = pointData.abbr;

    if (scidLabel.length == 1)
        scidleft = -10;
    else if (scidLabel.length == 2)
        scidleft = -14;
    else if (scidLabel.length == 3)
        scidleft = -18;
    opts = {
        "icon": icon,
        "clickable": true,
        "labelText": scidLabel,
        "labelHTML": HTML,
        "labelClass": "hfLabelColor",
        "labelOffset": new GSize(scidleft, -16)
    };
    //debugger;
    var marker = new LabeledMarker(latlng, opts);
    //var handler = createMarkerClickHandler(marker, pointData.name, pointData.wp);
    //GEvent.addListener(marker, "click", handler);
    //debugger;
    GEvent.addListener(marker, 'click', function() {
        //marker.openInfoWindowHtml(html);
        //debugger;
    ew.openOnMarker(marker, HTML);
        //alert(pointData.latitude + "-" + parseFloat(pointData.latitude + 5));
    //var latlonNew = new GLatLng(parseFloat(pointData.latitude) + 0.2, pointData.longitude);
        map.panTo(latlng);
    }
      );
    return marker;
}

function iniGMap() {    
    map = new GMap2(document.getElementById("gMap"));
    map.addControl(new GSmallZoomControl3D());
    map.removeMapType(G_HYBRID_MAP);
    map.setCenter(new GLatLng(centerLatitude, centerLongitude), startZoom);
    map.addControl(new GMapTypeControl());
    manager = new MarkerManager(map);

    ew = new EWindow(map, E_STYLE_7);
    map.addOverlay(ew);
        
    batch = [];
    for (id in markers) {
        if (markers[id]) batch.push(createMarker(markers[id]));
    }

    manager.addMarkers(batch, 1);
    manager.refresh();    
}

function locationFilter() {

    //debugger;
    if (!map.getInfoWindow().isHidden())
        map.getInfoWindow().hide();

    //alert("location filter");
    bound = new GLatLngBounds();
    global_floorCount = 0;
    //document.getElementById("divProgress").style.display = "";
    // document.getElementById("divProgress").style.height = document.body.clientHeight + "px";

    var sID = [_LevelDetail.length];
    var sNavigator = oNavigator.value.split("_");
    var innerLoopCounter;
    if (sNavigator.length == 1) {
        if (sNavigator[0] == "0") {
            innerLoopCounter = sNavigator.length;
        }
        else {
            innerLoopCounter = sNavigator.length + 1;
        }
    }
    if (sNavigator.length > 1) {
        innerLoopCounter = sNavigator.length + 1;
    }
    var pid;
    //Generate Parent ID array and SalesCenterID array
    for (var i = 0; i < _LevelDetail.length; i++) {
        sID[i] = (_LevelDetail[i][0] == _Level.length - 1) ? _LevelDetail[i][1] : 0;
    }
    //Filter id
    for (var i = 0; i < _LevelDetail.length; i++) {
        if (sID[i] != 0) {
            pid = sID[i];
            var dv1 = document.getElementById("grdSalesCenter3_div_" + sID[i]);
            if (dv1) {
                dv1.parentNode.parentNode.style.display = "none";
            }
            for (j = _Level.length - 1; j >= innerLoopCounter; j--) {
                for (k = 0; k < _LevelDetail.length; k++) {
                    if (j == _LevelDetail[k][0] && pid == _LevelDetail[k][1]) {
                        pid = _LevelDetail[k][2];
                        k = _LevelDetail.length;
                    }
                }
            }
            if (pid != sNavigator[sNavigator.length - 1]) sID[i] = 0;
        }
    }

    scids = "";
    communityCount = 0;
    scid_models = [batch.length];
    var show;
    for (var i = 0; i < batch.length; i++) {
        show = false;
        for (j = 0; j < sID.length; j++) {
            if (batch[i].labelText_ == sID[j]) { show = true; }
        }
        if (show) {
            if (GetShowSC(batch[i].labelText_)) {
                batch[i].show();
                bound.extend(batch[i].getLatLng());
                communityCount++;
                //Salescenter List
                if ("" != scids) scids += ",";
                scids += batch[i].labelText_;
            }
            else {
                batch[i].hide();

            }
        }
        else {
            batch[i].hide();
        }
    }
    bestFitAndZoom();
    if (typeExceptAll.length > 0) {
        //SetCenterPosition();
        typeExceptAll = "";
    }

}

function GetShowSC(id) {
    var obj = document.getElementById('ctl00_ContentPlaceHolder1_hfAllId');
    var check;
    var retObj = false;

    if (obj.value.length > 0) {
        check = obj.value.split(',');
        for (j = 0; j < check.length; j++) {
            if (check[j] == id) {
                retObj = true;
                break;
            }
        }
    }
    else {
        retObj = true;
    }
    if (splitSCID) {
        retObj = false;
        if (splitSCID.length > 0) {
            for (j = 0; j < splitSCID.length; j++) {
                if (splitSCID[j] == id) {
                    retObj = true;
                    break;
                }
            }
        }
        else {
            retObj = true;
        }
    }

    return retObj;
}


function iniSiteNavigate(label, rURL) {
    //Read Cookie
    var cLabel = new Array();
    var cURL = new Array();
    var i = 0;
    do {
        if (fetch_cookie('L' + i + 'Label')) {
            cLabel[i] = fetch_cookie('L' + i + 'Label');
            cURL[i] = fetch_cookie('L' + i + 'URL');
            delete_cookie('L' + i + 'Label');
            delete_cookie('L' + i + 'URL');
            i++;
        }
        else {
            i = -1;
        }

    }
    while (i > 0)
    //Generate Site Navigate
    var strSiteNavigate = '';
    var Navigate = document.getElementById("divNavigatorBar");
    var page = rURL.split('?')[0];
    i = 0;
    while (i < cLabel.length && page != cURL[i].split('?')[0] && label != "HOME SEARCH") {
        strSiteNavigate += '<a href="' + cURL[i] + '" class="hfNavigatorButton">' + cLabel[i] + '</a>';
        set_cookie('L' + i + 'Label', cLabel[i]);
        set_cookie('L' + i + 'URL', cURL[i]);
        i++;
    }
    strSiteNavigate += '<a href="' + rURL + '" class="hfNavigatorButton">' + label + '</a>';
    set_cookie('L' + i + 'Label', label);
    set_cookie('L' + i + 'URL', rURL);
    Navigate.innerHTML = strSiteNavigate;
}

function iniHomesearch() {
    iniSiteNavigate("HOME SEARCH", "HomeSearch.aspx");
}

function clearSearchResault() {
    //document.getElementById("divProgress").className = "hfProgress";
    //showLoadingImage(); 
    resetNavigator();
    iniGMap();
    locationFilter();
    clearSerach = true;
    ClearNewControlState();
    saveLastSearchValues();
    document.getElementById('imgMap').style.zIndex = "0";
    showLoading = true;
    //document.getElementById("divProgress").className = "hfHidden";
    //document.getElementById('divLoadProgress').style.display = "none";
    //AfterClear();
    //serachType = "";
    //AjaxCall('Clear');
    $.cookie('pType', null);
    ClearSearchCookie();
    var type = houseType.toLowerCase();
    if (type == "all")
        window.location = "/" + "all-nj-apartments";
    else if (type == "affordable")
        window.location = "/" + "nj-affordable-housing";
    else if (type == "senior")
        window.location = "/" + "nj-active-adult-residences";
    else if (type == "special")
        window.location = "/" + "nj-rental-specials";
    else
        window.location = "/" + "all-nj-apartments";



}

function addremoveFavorite(param) {

    var scid = document.getElementById("SCID").value;
    try {
        window.parent.document.getElementById("ctl00_hdnModelId").value = param;
        var image = window.parent.document.getElementById("imgFavorite");
        if (!image) {
            image = document.getElementById("imgFavorite");
        }
        if (document.getElementById("btnFavorites_" + param).checked == true) {
            if (image) image.innerHTML = "Remove";
            SaveTo247('AddFavorites', "&modelid=" + param, scid);

        }
        else {
            if (image) image.innerHTML = "Save";
            SaveTo247('RemoveFavorites', "&modelid=" + param, scid);

        }
    }
    catch (err) {
        alert('This functionality is not available from backend');
    }


}





function anonymousSave() {
    document.getElementById("hdnAnonymousSearch").value = 1;
    SaveSearchCriteria();
}


function saveLastSearchValues() {
    //    lastNavigator = document.getElementById("Navigator").value;
    //    lastRadOwn = radOwn.checked;
    //    if (radOwn.checked) lastRadRent = "false";
    //    else lastRadRent = "true";
    //    lastHouseType = new Array();
    //    for (var i = 0; i < chkHouseTypes.length; i++) {
    //        lastHouseType[i] = chkHouseTypes[i].checked;
    //    }

    //    lastBedroomMin = (scBedroomsMin.value.toLowerCase() == "min") ? "" : scBedroomsMin.value;
    //    lastBedroomMax = (scBedroomsMax.value.toLowerCase() == "max") ? "" : scBedroomsMax.value;
    //    lastBathroomMin = (scBathroomsMin.value.toLowerCase() == "min") ? "" : scBathroomsMin.value;
    //    lastBathroomMax = (scBathroomsMax.value.toLowerCase() == "max") ? "" : scBathroomsMax.value;
    //    lastSQFTMin = (scSQFTMin.value.toLowerCase() == "min") ? "" : scSQFTMin.value;
    //    lastSQFTMax = (scSQFTMax.value.toLowerCase() == "max") ? "" : scSQFTMax.value;
    //    lastGarageMin = (scGarageMin.value.toLowerCase() == "min") ? "" : scGarageMin.value;
    //    lastGarageMax = (scGarageMax.value.toLowerCase() == "max") ? "" : scGarageMax.value;
    //    lastStoriesMin = (scLevelMin.value.toLowerCase() == "min") ? "" : scLevelMin.value;
    //    lastStoriesMax = (scLevelMax.value.toLowerCase() == "max") ? "" : scLevelMax.value;

    //    lastPriceMin = (scPriceMin.value.toLowerCase() == "min") ? "" : scPriceMin.value;
    //    lastPriceMax = (scPriceMax.value.toLowerCase() == "max") ? "" : scPriceMax.value;
    //    //initialize others as blank
    //    lastPriceMonthlyMin = (scMonthlyPriceMin.value.toLowerCase() == "min") ? "" : scMonthlyPriceMin.value;
    //    lastPriceMonthlyMax = (scMonthlyPriceMax.value.toLowerCase() == "max") ? "" : scMonthlyPriceMax.value;
    //    lastInterestRate = "";
    //    lastDownPayment = "";
    //    lastYearOfLoan = "";

    //    //set value from both tabs
    //    lastHomeSearch = new Array();
    //    var tempSearchOption = document.getElementById("ctl00_ContentPlaceHolder1_panHomeSearch").getElementsByTagName('input');
    //    for (var i = 0; i < tempSearchOption.length; i++) {
    //        lastHomeSearch[i] = tempSearchOption[i].checked;
    //    }

    //    lastCommunitySearch = new Array();
    //    var tempSearchOption = document.getElementById("ctl00_ContentPlaceHolder1_panSearchOption").getElementsByTagName('input');
    //    for (var i = 0; i < tempSearchOption.length; i++) {
    //        lastCommunitySearch[i] = tempSearchOption[i].checked;
    //    }
}


function CompareAndAnonyousSave() {
    if (compareWithLastSavedValue()) {
        saveLastSearchValues();
        anonymousSave();
    }
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
    map.setZoom(map.getBoundsZoomLevel(bound));
    //alert(bound.getCenter());
    map.setCenter(bound.getCenter());

    var bubbleCount = 0;
    for (var i = 0; i < batch.length; i++) {
        if (batch[i].N) bubbleCount++;
    }
    if (bubbleCount == 1) { map.setZoom(15); }
}

function xss_ajax(url) {
    //debugger;
    var script_id = null;
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    var date = new Date();
    try {
        script.setAttribute('src', url + "&date=" + date);
        script.setAttribute('id', 'script_id');
    }
    catch (ex) { }
    script_id = document.getElementById('script_id');
    var browser = navigator.appName;

    if (script_id) {
        document.getElementsByTagName('head')[0].removeChild(script_id);
    }
    // Insert <script> into DOM
    if (browser != "Microsoft Internet Explorer")
        document.getElementsByTagName('head')[0].appendChild(script);
}

function ddlCounty_Selected(obj) {
    var type = houseType.toLowerCase();
    if (obj.options[obj.selectedIndex].text != 'County') {
        $.cookie('pType', 'C');
        if (type == "all")
            window.location = "/" + obj.options[obj.selectedIndex].text.replace(" ", "-");
        else if (type == "affordable")
            window.location = "/" + obj.options[obj.selectedIndex].text.replace(" ", "-") + "-Affordable";
        else if (type == "senior")
            window.location = "/" + obj.options[obj.selectedIndex].text.replace(" ", "-") + "-Senior";
        else if (type == "special")
            window.location = "/" + obj.options[obj.selectedIndex].text.replace(" ", "-") + "-Specials";
        else
            window.location = "/" + obj.options[obj.selectedIndex].text.replace(" ", "-");
    }
    else {
        //$.cookie('pType', 'D');
        if (type == "all")
            window.location = "/" + "all-nj-apartments";
        else if (type == "affordable")
            window.location = "/" + "nj-affordable-housing";
        else if (type == "senior")
            window.location = "/" + "nj-active-adult-residences";
        else if (type == "special")
            window.location = "/" + "nj-rental-specials";
        else
            window.location = "/" + "all-nj-apartments";

    }

}

function GenerateTown(obj) {
    if (alreadyCall) {
        alreadyCall = false;
        return;
    }

    typeAll = "";
    var oText = obj.options[obj.selectedIndex].text;
    var oValue = obj.options[obj.selectedIndex].value;

    if (document.getElementById("ctl00_ContentPlaceHolder1_hfCounty").value.length > 0) {
        for (var count = 0; count < obj.options.length; count++) {
            if (obj.options[count].innerHTML.toUpperCase().search(document.getElementById("ctl00_ContentPlaceHolder1_hfCounty").value.toUpperCase()) != -1) {
                oText = obj.options[obj.options[count].index].text;
                oValue = obj.options[obj.options[count].index].value;
                obj.selectedIndex = obj.options[count].index;
                isCounty = true;
                break;
            }
        }
    }
    else {
        isCounty = false;
    }
    //document.getElementById("ctl00_ContentPlaceHolder1_ddlCity").options.length = 0;
    //addOption(document.getElementById("ctl00_ContentPlaceHolder1_ddlCity"), 'Town', '-1', oValue)
    document.getElementById('lblContent').innerHTML = "";
    if (oValue != "-1") {
        document.getElementById('dvCommunitySalesCenterHeaderHF').innerHTML = "<h1 style='display:inline;cursor:pointer;' onclick=\"javascript:void(0)\"   class='CommunitySalesCenterHeaderTextHF'>" + oText + "</h1><h1 style='display:inline;' class='CommunitySalesCenterHeaderTextHF1'> - NJ RENTAL APARTMENTS</h1>";
        document.getElementById('sharebyFacebook').href = "http://www.facebook.com/sharer.php?u=" + window.location.href + "&t=" + oText + " - NJ RENTAL APARTMENTS";
        document.getElementById('sharebyTwitter').href = "http://twitter.com/home?status= " + oText + " - NJ RENTAL APARTMENTS - " + window.location.href;
        document.getElementById('sharebyEmail').href = "mailto:" + "" + "?subject=" + oText + " - NJ RENTAL APARTMENTS&body=" + window.location.href;
        //document.title = oText.toUpperCase() + " - NJ RENTAL APARTMENTS";
        for (var j = 0; j < _LevelDetail.length; j++) {
            if (_LevelDetail[j][0] == "2" && _LevelDetail[j][2] == oValue) {
                var objTownFilter = document.getElementById('ctl00_ContentPlaceHolder1_hfTownFilter');
                if (objTownFilter.value.length > 0) {
                    if (GetShowTown(_LevelDetail[j][3])) {
                        addOption(document.getElementById("ctl00_ContentPlaceHolder1_ddlCity"), _LevelDetail[j][3], _LevelDetail[j][1], oValue);
                    }
                }
                else {
                    addOption(document.getElementById("ctl00_ContentPlaceHolder1_ddlCity"), _LevelDetail[j][3], _LevelDetail[j][1], oValue);
                }
            }
        }
        CallLocationFilter(document.getElementById("ctl00_ContentPlaceHolder1_ddlCity"), oValue);
        document.getElementById('lblContent').innerHTML = "";

        document.getElementById("dvMapHeading").innerHTML = "BROWSE COMMUNITIES BY " + oText.toUpperCase();        
        //document.getElementById('dvHeaderPage3').innerHTML = oText.toUpperCase();

        //        if ($.cookie('pType') != null) {
        //            DoSetup($.cookie('pType'));
        //        }
        //           if(serachType!="C")
        //                    DoSetup('C');
        //AjaxCall(GeneratedFilterString());

    }
    else {
        document.getElementById('dvCommunitySalesCenterHeaderHF').innerHTML = "<h1 style='display:inline;' class='CommunitySalesCenterHeaderTextHF1'>NJ RENTAL APARTMENTS</h1>";
        document.getElementById('sharebyFacebook').href = "http://www.facebook.com/sharer.php?u=" + window.location.href + "&t=NJ RENTAL APARTMENTS";
        document.getElementById('sharebyTwitter').href = "http://twitter.com/home?status=NJ RENTAL APARTMENTS - " + window.location.href;
        document.getElementById('sharebyEmail').href = "mailto:" + "" + "?subject=NJ RENTAL APARTMENTS&body=" + window.location.href;
        document.getElementById("dvMapHeading").innerHTML = "BROWSE COMMUNITIES BY " + oText.toUpperCase();
        //document.getElementById('dvHeaderPage3').innerHTML = "NJ RENTAL APARTMENTS";
        //document.title = "NJ RENTAL APARTMENTS";
        oNavigator.value = "0";
        locationFilter();
        showLoading = true;
        //SetCenterPosition();
        LoadCity = false;
        if (!clearSerach) {
            serachType = "";
            if (!GetSection())
                AjaxCall('Clear');
            else
                AjaxCall(GeneratedFilterString());

            ///DoSetup('D');
        }
    }

    //SetCenterPosition();
}
function addOption(selectbox, text, value, parentid) {
    var optn = document.createElement("OPTION");
    optn.text = text;
    optn.value = value;
    selectbox.options.add(optn);
    //    selectbox.onchange = function() { CallLocationFilter(selectbox, parentid); };
    selectbox.onchange = function() { ddlCity_Selected(selectbox, parentid); };
    selectbox.options[0].className = "DropDownStyle1";
    if (navigator.appCodeName == 'Mozilla') {
        selectbox.options[0].style.height = "16px";
    }
    // ResetColor(selectbox);
}

function ddlCity_Selected(obj, parentid) {
    var type = houseType.toLowerCase();
    $.cookie('pType', 'C');
    if (obj.options[obj.selectedIndex].text != 'Town') {
        if (type == "all")
            window.location = "/" + obj.options[obj.selectedIndex].text.replace(" ", "-") + "-Township";
        else if (type == "affordable")
            window.location = "/" + obj.options[obj.selectedIndex].text.replace(" ", "-") + "-Township-Affordable";
        else if (type == "senior")
            window.location = "/" + obj.options[obj.selectedIndex].text.replace(" ", "-") + "-Township-Senior";
        else if (type == "special")
            window.location = "/" + obj.options[obj.selectedIndex].text.replace(" ", "-") + "-Township-Specials";
        else
            window.location = "/" + obj.options[obj.selectedIndex].text.replace(" ", "-") + "-Township";
    }
    else {
        ddlCounty_Selected(document.getElementById("ctl00_ContentPlaceHolder1_ddlCounty"));
    }
}
function CallLocationFilter(obj, parentid) {
    document.getElementById('lblContent').innerHTML = "";
    typeAll = "";
    var oText = obj.options[obj.selectedIndex].text;
    var oValue = obj.options[obj.selectedIndex].value;
    if (!oNavigator) {
        oNavigator = document.getElementById("Navigator");
    }
    if (document.getElementById("ctl00_ContentPlaceHolder1_hfCity").value.length > 0) {
        for (var count = 0; count < obj.options.length; count++) {
            if (obj.options[count].innerHTML.toUpperCase().search(document.getElementById("ctl00_ContentPlaceHolder1_hfCity").value.toUpperCase()) != -1) {
                oText = obj.options[obj.options[count].index].text;
                oValue = obj.options[obj.options[count].index].value;
                obj.selectedIndex = obj.options[count].index;
                break;
            }
        }
    }

    var oTextParent = document.getElementById('ctl00_ContentPlaceHolder1_ddlCounty').options[document.getElementById('ctl00_ContentPlaceHolder1_ddlCounty').selectedIndex].text;
    if (oValue != "-1") {
        oNavigator.value = parentid + "_" + oValue;
        document.getElementById('dvCommunitySalesCenterHeaderHF').innerHTML = "<h1 style='display:inline;cursor:pointer;' onclick=\"javascript:void(0)\" class='CommunitySalesCenterHeaderTextHF'>" + oText + "</h1><span class='CommunitySalesCenterHeaderTextHF1'> - </span><h1 style='display:inline;cursor:pointer;' onclick=\"javascript:GoCounty('" + oTextParent + "')\" class='CommunitySalesCenterHeaderTextHF'>" + oTextParent + "</h1><h1 style='display:inline;' class='CommunitySalesCenterHeaderTextHF1'> - NJ RENTAL APARTMENTS</h1>";
        document.getElementById('sharebyFacebook').href = "http://www.facebook.com/sharer.php?u=" + window.location.href + "&t=" + oText + " - " + oTextParent + " - NJ RENTAL APARTMENTS";
        document.getElementById('sharebyTwitter').href = "http://twitter.com/home?status= " + oText + " - " + oTextParent + " - NJ RENTAL APARTMENTS - " + window.location.href;
        document.getElementById('sharebyEmail').href = "mailto:" + "" + "?subject=" + oText + " - " + oTextParent + " - NJ RENTAL APARTMENTS&body=" + window.location.href;
        //debugger;
        document.getElementById('dvHeaderPage3').innerHTML = oText.toUpperCase() + " - " + oTextParent.toUpperCase();
        //document.title = oText.toUpperCase() + " - " + oTextParent.toUpperCase() + " - NJ RENTAL APARTMENTS";
        showLoading = false;
        LoadCity = true;
        AjaxCall(GeneratedFilterString());
        AjaxCallCity(oTextParent, oText);
        GetCityText(obj);

    }
    else {
        document.getElementById('lblContent').innerHTML = "";
        oNavigator.value = parentid;
        document.getElementById('dvCommunitySalesCenterHeaderHF').innerHTML = "<h1 style='display:inline;cursor:pointer;' onclick=\"javascript:GoCounty('" + oTextParent + "')\" class='CommunitySalesCenterHeaderTextHF'>" + oTextParent + "</h1><h1 style='display:inline;' class='CommunitySalesCenterHeaderTextHF1'> - NJ RENTAL APARTMENTS</h1>";
        document.getElementById('sharebyFacebook').href = "http://www.facebook.com/sharer.php?u=" + window.location.href + "&t=" + oTextParent + " - NJ RENTAL APARTMENTS";
        document.getElementById('sharebyTwitter').href = "http://twitter.com/home?status= " + oTextParent + " - NJ RENTAL APARTMENTS - " + window.location.href;
        document.getElementById('sharebyEmail').href = "mailto:" + "" + "?subject=" + oTextParent + " - NJ RENTAL APARTMENTS&body=" + window.location.href;
        //debugger;
        document.getElementById('dvHeaderPage3').innerHTML = oTextParent.toUpperCase();
        //document.title = oTextParent.toUpperCase() + " - NJ RENTAL APARTMENTS";
        GetCoutyText(document.getElementById('ctl00_ContentPlaceHolder1_ddlCounty'));
        showLoading = false;
        //clearAllddl();
        LoadCity = true;
        AjaxCall(GeneratedFilterString());
        AjaxCallCounty(oTextParent);
    }

    var aprtCmb = document.getElementById("ctl00_ContentPlaceHolder1_ddlApartment");

    locationFilter();
    //SetCenterPosition();


}

function ChangeFlat(obj) {
    showLoading = true;
    LoadCity = false;
    typeAll = "";
    if (obj.value == "-1") {
        if (document.getElementById("ctl00_ContentPlaceHolder1_ddlCounty").value != "-1") {
            if (document.getElementById("ctl00_ContentPlaceHolder1_ddlCity").value != "-1") {
                oNavigator.value = document.getElementById("ctl00_ContentPlaceHolder1_ddlCounty").value + "_" + document.getElementById("ctl00_ContentPlaceHolder1_ddlCity").value;
            }
            else {
                oNavigator.value = document.getElementById("ctl00_ContentPlaceHolder1_ddlCounty").value;
            }
        }
        else {
            oNavigator.value = "0";
        }
        if (!clearSerach || serachType.length > 0) {
            AjaxCall(GeneratedFilterString());
            locationFilter();
        }
    }
    else {
        //        if (!clearSerach)
        //            DoSetup('D');
        if (document.getElementById("ctl00_ContentPlaceHolder1_ddlCounty").value != "-1") {
            if (document.getElementById("ctl00_ContentPlaceHolder1_ddlCity").value != "-1") {
                oNavigator.value = document.getElementById("ctl00_ContentPlaceHolder1_ddlCounty").value + "_" + document.getElementById("ctl00_ContentPlaceHolder1_ddlCity").value
            }
            else {
                oNavigator.value = document.getElementById("ctl00_ContentPlaceHolder1_ddlCounty").value
            }
        }
        else {
            oNavigator.value = "0";
        }
        if (!clearSerach || serachType.length > 0) {
            AjaxCall(GeneratedFilterString());
            locationFilter();
        }
    }

    //SetCenterPosition();

}
function ChangeBed(obj) {
    showLoading = true;
    LoadCity = false;
    typeAll = "";
    //    if (!clearSerach)
    //        DoSetup('D');
    if (document.getElementById("ctl00_ContentPlaceHolder1_ddlCounty").value != "-1") {
        if (document.getElementById("ctl00_ContentPlaceHolder1_ddlCity").value != "-1") {
            oNavigator.value = document.getElementById("ctl00_ContentPlaceHolder1_ddlCounty").value + "_" + document.getElementById("ctl00_ContentPlaceHolder1_ddlCity").value
        }
        else {
            oNavigator.value = document.getElementById("ctl00_ContentPlaceHolder1_ddlCounty").value
        }
    }
    else {
        oNavigator.value = "0";
    }
    if (!clearSerach || serachType.length > 0) {
        AjaxCall(GeneratedFilterString());
        locationFilter();
    }
    //SetCenterPosition();


}
function ChangeBath(obj) {
    showLoading = true;
    LoadCity = false;
    typeAll = "";
    //    if (!clearSerach)
    //        DoSetup('D');

    if (document.getElementById("ctl00_ContentPlaceHolder1_ddlCounty").value != "-1") {
        if (document.getElementById("ctl00_ContentPlaceHolder1_ddlCity").value != "-1") {
            oNavigator.value = document.getElementById("ctl00_ContentPlaceHolder1_ddlCounty").value + "_" + document.getElementById("ctl00_ContentPlaceHolder1_ddlCity").value
        }
        else {
            oNavigator.value = document.getElementById("ctl00_ContentPlaceHolder1_ddlCounty").value
        }
    }
    else {
        oNavigator.value = "0";
    }
    if (!clearSerach || serachType.length > 0) {
        AjaxCall(GeneratedFilterString());
        locationFilter();
    }
    //SetCenterPosition();


}
function ChangePrice(obj) {
    LoadCity = false;
    showLoading = true;
    typeAll = "";
    //    if (!clearSerach)
    //        DoSetup('D');
    if (obj.value == "-1") {

        if (document.getElementById("ctl00_ContentPlaceHolder1_ddlCounty").value != "-1") {
            if (document.getElementById("ctl00_ContentPlaceHolder1_ddlCity").value != "-1") {
                oNavigator.value = document.getElementById("ctl00_ContentPlaceHolder1_ddlCounty").value + "_" + document.getElementById("ctl00_ContentPlaceHolder1_ddlCity").value
            }
            else {
                oNavigator.value = document.getElementById("ctl00_ContentPlaceHolder1_ddlCounty").value
            }
        }
        else {
            oNavigator.value = "0";
        }
        if (!clearSerach || serachType.length > 0) {
            AjaxCall(GeneratedFilterString());
            locationFilter();
        }
    }
    else {
        var oValue = obj.options[obj.selectedIndex].value;
        var ObjSplit = oValue.split(' - ');
        if (document.getElementById("ctl00_ContentPlaceHolder1_ddlCounty").value != "-1") {
            if (document.getElementById("ctl00_ContentPlaceHolder1_ddlCity").value != "-1") {
                oNavigator.value = document.getElementById("ctl00_ContentPlaceHolder1_ddlCounty").value + "_" + document.getElementById("ctl00_ContentPlaceHolder1_ddlCity").value
            }
            else {
                oNavigator.value = document.getElementById("ctl00_ContentPlaceHolder1_ddlCounty").value
            }
        }
        else {
            oNavigator.value = "0";
        }
        if (!clearSerach || serachType.length > 0) {
            AjaxCall(GeneratedFilterString());
            locationFilter();
        }
    }

    //SetCenterPosition();

}
function ClearNewControlState() {
    typeAll = "";
    document.getElementById('ctl00_ContentPlaceHolder1_hfCounty').value = "";
    document.getElementById('ctl00_ContentPlaceHolder1_hfCity').value = "";

    document.getElementById("ctl00_ContentPlaceHolder1_ddlCounty").selectedIndex = 0;
    document.getElementById("ctl00_ContentPlaceHolder1_ddlApartment").selectedIndex = 0;

    GenerateTown(document.getElementById("ctl00_ContentPlaceHolder1_ddlCounty"));

    document.getElementById("ctl00_ContentPlaceHolder1_ddlRent").selectedIndex = 0;
    ChangePrice(document.getElementById("ctl00_ContentPlaceHolder1_ddlRent"))

    document.getElementById("ctl00_ContentPlaceHolder1_ddlBedroom").selectedIndex = 0;
    ChangeBed(document.getElementById("ctl00_ContentPlaceHolder1_ddlBedroom"));

    document.getElementById("ctl00_ContentPlaceHolder1_ddlBathroom").selectedIndex = 0;
    ChangeBath(document.getElementById("ctl00_ContentPlaceHolder1_ddlBathroom"));

    locationFilter();
    //SetCenterPosition();
}

function clearAllddl() {
    document.getElementById("ctl00_ContentPlaceHolder1_ddlApartment").selectedIndex = 0;
    document.getElementById("ctl00_ContentPlaceHolder1_ddlRent").selectedIndex = 0;
    document.getElementById("ctl00_ContentPlaceHolder1_ddlBedroom").selectedIndex = 0;
    document.getElementById("ctl00_ContentPlaceHolder1_ddlBathroom").selectedIndex = 0;
}

function GetCityText(obj) {
    //document.getElementById("divProgress").className = "hfProgress";    
    var oText = obj.options[obj.selectedIndex].text;
    var oValue = obj.options[obj.selectedIndex].value;
    var url = "AjaxPage.aspx?city=" + oText + "&" + Math.random();
    $.get(url, {}, function(resposeText) {
        if (resposeText) {
            //alert(resposeText);
            document.getElementById('lblContent').innerHTML = resposeText;
            // document.getElementById("divProgress").className = "hfHidden";
        }
    });
}
function GetCoutyText(obj) {
    //document.getElementById("divProgress").className = "hfProgress";
    var oText = obj.options[obj.selectedIndex].text;
    var oValue = obj.options[obj.selectedIndex].value;
    var url = "AjaxPage.aspx?county=" + oText + "&" + Math.random();
    $.get(url, {}, function(resposeText) {
        if (resposeText) {
            //alert(resposeText);
            document.getElementById('lblContent').innerHTML = resposeText;
            //document.getElementById("divProgress").className = "hfHidden";
        }
    });
}

function SetCenterPosition() {
    try {
        var node = document.getElementById('gMap');
        var cl = 'hfLabel';
        var elem = node.getElementsByTagName('*');
        for (var i = 0; i < elem.length; i++) {
            var classes = elem[i].className;
            if (cl == classes) {
                if (ColorNotChange) elem[i].style.color = "#FFFFFF";

                var addLeft;
                if (elem[i].innerHTML.length == 1) {
                    addLeft = 5;
                }
                else if (elem[i].innerHTML.length == 2) {
                    addLeft = 9;
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
    }
    catch (e) { }
}

function ClearGMapAndSetJPGMap(responseText) {
    var indx = responseText.indexOf("Result");
    if (indx > -1) {
        document.getElementById('dvHeaderPage3').style.width = "690px";
        $('div[dir=ltr]')[0].style.display = "none";
        document.getElementById('imgMap').style.zIndex = "0";
    }
    else {
        document.getElementById('dvHeaderPage3').style.width = "300px";
        $('div[dir=ltr]')[0].style.display = "block";
        document.getElementById('imgMap').style.zIndex = "-1";
        //locationFilter();
    }
}

function AjaxCall(oText) {
    //alert(oText);
    //debugger;
    if (showLoading) {
        document.getElementById("divProgress").className = "hfProgress";
        showLoadingImage();
    }

    var url;
    if (serachType == "") {
        url = "AjaxPageHomeSearch.aspx?value=" + oText + "&ResetSession=true&" + Math.random();
    }
    else {
        url = "AjaxPageHomeSearch.aspx?value=" + oText + "&" + Math.random();
    }


    $.get(url, {}, function(resposeText) {
        if (resposeText) {
            var objsplit = resposeText.split('|_');
            document.getElementById('AjaxPanel').innerHTML = objsplit[0];
            if (showLoading) { document.getElementById("divProgress").className = "hfHidden"; document.getElementById('divLoadProgress').style.display = "none"; }
            document.documentElement.scrollTop = 0;
            if (objsplit.length > 1) {
                splitSCID = objsplit[1].split(',');
            }
            if (oNavigator) {
                locationFilter();
            }
            CallEditPreview();
            if (!LoadCity)
                AfterClear();
            if (oText == 'Clear') {
                if (serachType != "D") {
                    typeAll = "";
                    clearSerach = false;
                }
            }
            else {
                if (!LoadCity)
                    ClearGMapAndSetJPGMap(objsplit[0]);
                clearSerach = false;
            }
        }
    });

}
function AjaxCallCounty(county) {
    document.getElementById("divProgress").className = "hfProgress";
    showLoadingImage();
    var url = "AjaxPageHomeSearch.aspx?citycounty=true&county=" + county + "&ResetSession=true&sreachkey=" + GeneratedFilterString() + "&" + Math.random();
    $.get(url, {}, function(resposeText) {
        if (resposeText) {
            document.getElementById('AjaxPanelC').innerHTML = resposeText;
            document.getElementById("divProgress").className = "hfHidden";
            document.getElementById('divLoadProgress').style.display = "none";
            CallEditPreview();
            document.documentElement.scrollTop = 0;
            document.getElementById('ctl00_ContentPlaceHolder1_hfCounty').value = "";
            document.getElementById('ctl00_ContentPlaceHolder1_hfCity').value = "";
            if (LoadCity) {
                //AfterClearSearch();
                //ClearGMapAndSetJPGMap(resposeText);
            }
        }
    });

}
function AjaxCallCity(county, city) {
    document.getElementById("divProgress").className = "hfProgress";
    showLoadingImage();
    var url = "AjaxPageHomeSearch.aspx?citycounty=true&county=" + county + "&ResetSession=true&sreachkey=" + GeneratedFilterString() + "&city=" + city + "&" + Math.random();
    $.get(url, {}, function(resposeText) {
        if (resposeText) {

            document.getElementById('AjaxPanelC').innerHTML = resposeText;
            document.getElementById("divProgress").className = "hfHidden";
            document.getElementById('divLoadProgress').style.display = "none";
            CallEditPreview();
            document.documentElement.scrollTop = 0;
            document.getElementById('ctl00_ContentPlaceHolder1_hfCounty').value = "";
            document.getElementById('ctl00_ContentPlaceHolder1_hfCity').value = "";
        }
    });

}
function AjaxCallFeature() {
    document.getElementById("divProgress").className = "hfProgress";
    showLoadingImage();
    var url = "AjaxPageHomeSearch.aspx?Feature=true&ResetSession=true&" + Math.random();
    $.get(url, {}, function(resposeText) {
        if (resposeText) {
            document.getElementById('AjaxPanelB').innerHTML = resposeText;
            //ClearGMapAndSetJPGMap(resposeText);
            document.getElementById("divProgress").className = "hfHidden";
            document.getElementById('divLoadProgress').style.display = "none";
            CallEditPreview();
            document.documentElement.scrollTop = 0;
        }
    });

}

function AjaxCallSpecial(oText) {
    document.getElementById("divProgress").className = "hfProgress";
    showLoadingImage();
    var url = "AjaxPageHomeSearch.aspx?special=true&ResetSession=true&value=" + oText + "&" + Math.random();
    $.get(url, {}, function(resposeText) {
        if (resposeText) {
            document.getElementById('AjaxPanel').innerHTML = resposeText;
            ClearGMapAndSetJPGMap(resposeText);
            document.getElementById("divProgress").className = "hfHidden";
            document.getElementById('divLoadProgress').style.display = "none";
            CallEditPreview();
            document.documentElement.scrollTop = 0;
        }
    });
}
function GetPageTypeFromSession() {
    var url = "AjaxPage.aspx?pagetype=true&" + Math.random();

    $.get(url, {}, function(resposeText) {
        if (resposeText) {
            var objSplit = resposeText.split('_');
            document.getElementById('ctl00_ContentPlaceHolder1_hfType').value = objSplit[0];
            document.getElementById('ctl00_ContentPlaceHolder1_hfCounty').value = objSplit[1];
            document.getElementById('ctl00_ContentPlaceHolder1_hfCity').value = objSplit[2];

        }
    });
}

function SetSessionAndData() {
    var url = "AjaxPage.aspx?HomeSearchLoad=true&" + Math.random();

    $.get(url, {}, function(resposeText) {
        if (resposeText) {
            var objsplit = resposeText.split('|_');
            document.getElementById('ctl00_ContentPlaceHolder1_hfAllId').value = objsplit[0];
            document.getElementById('ctl00_ContentPlaceHolder1_hfTownFilter').value = objsplit[1];
        }
    });
}

function GeneratedFilterString() {
    var retString = "";
    var objCounty = document.getElementById("ctl00_ContentPlaceHolder1_ddlCounty");
    var objCity = document.getElementById("ctl00_ContentPlaceHolder1_ddlCity");
    var objFlat = document.getElementById("ctl00_ContentPlaceHolder1_ddlApartment");
    var objRent = document.getElementById("ctl00_ContentPlaceHolder1_ddlRent");
    var objBed = document.getElementById("ctl00_ContentPlaceHolder1_ddlBedroom");
    var objBath = document.getElementById("ctl00_ContentPlaceHolder1_ddlBathroom");

    var CountyText = objCounty.options[objCounty.selectedIndex].text;
    var CityText = objCity.options[objCity.selectedIndex].text;
    var FlatText = objFlat.options[objFlat.selectedIndex].text;

    if (objCounty.value != "-1") {
        retString = "County_" + CountyText;
    }
    if (objCity.value != "-1") {
        retString = retString + "|" + "City_" + CityText;
    }
    if (SelectedSCID.length > 0) {
        retString = retString + "|" + "SCID_" + SelectedSCID;
        SelectedSCID = "";
    }
    if (objFlat.value != "-1") {
        retString = retString + "|" + "Flat_" + FlatText;
        document.getElementById('ctl00_ContentPlaceHolder1_hfFlat').value = objFlat.value;
        $.cookie('hfFlat', objFlat.value);
        $.cookie('pType', 'D');
    }
    else {
        $.cookie('hfFlat', null);
    }
    if (objRent.value != "-1") {
        var ObjSplit = objRent.value.split(' - ');
        retString = retString + "|" + "Rent_" + ObjSplit[0] + "^" + ObjSplit[1];
        document.getElementById('ctl00_ContentPlaceHolder1_hfPrice').value = objRent.value;
        $.cookie('hfPrice', objRent.value);
        $.cookie('pType', 'D');
    }
    else {
        $.cookie('hfPrice', null);
    }
    if (objBed.selectedIndex != 0) {
        var val = objBed.value;
        retString = retString + "|" + "Bed_" + val;
        document.getElementById('ctl00_ContentPlaceHolder1_hfBed').value = objBed.value;
        $.cookie('hfBed', objBed.value);
        $.cookie('pType', 'D');
    }
    else {
        $.cookie('hfBed', null);
    }
    if (objBath.selectedIndex != 0) {
        var val = objBath.value;
        retString = retString + "|" + "Bath_" + val;
        document.getElementById('ctl00_ContentPlaceHolder1_hfBath').value = objBath.value;
        $.cookie('hfBath', objBath.value);
        $.cookie('pType', 'D');
    }
    else {
        $.cookie('hfBath', null);
    }
    if (retString.length == 0) retString = "Clear";
    return retString;
}
function GetShowTown(id) {
    var obj = document.getElementById('ctl00_ContentPlaceHolder1_hfTownFilter');
    var check;
    var retObj = false;
    if (obj.value.length > 0) {
        check = obj.value.split(',');
        for (j = 0; j < check.length; j++) {
            if (check[j].toLowerCase() == id.toLowerCase()) {
                retObj = true;
                break;
            }
        }
    }
    else {
        retObj = true;
    }
    return retObj;
}

var timeDiff = {
    setStartTime: function() {
        d = new Date();
        time = d.getTime();
    },
    getDiff: function() {
        d = new Date();
        return (d.getTime() - time);
    }
}


function showLoadingImage() {
    //debugger;
    //hideScrollBar();
    var myWidth = 0, myHeight = 0;
    if (typeof (window.innerWidth) == 'number') {
        //Non-IE    
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        //IE 6+ in 'standards compliant mode'    
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;

    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        //IE 4 compatible    
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;

    }
    myWidth = (myWidth / 2) - 90;
    myHeight = (myHeight / 2) - 11;

    document.getElementById('divLoadProgress').style.left = myWidth + 'px';
    document.getElementById('divLoadProgress').style.top = myHeight + 'px';
    //document.getElementById('divLoadProgress').style.visibility = "visible";
    document.getElementById('divLoadProgress').style.display = "block";
    //hideScrollBar();
}

function GetSection() {
    var objFlat = document.getElementById("ctl00_ContentPlaceHolder1_ddlApartment");
    var objRent = document.getElementById("ctl00_ContentPlaceHolder1_ddlRent");
    var objBed = document.getElementById("ctl00_ContentPlaceHolder1_ddlBedroom");
    var objBath = document.getElementById("ctl00_ContentPlaceHolder1_ddlBathroom");
    if (objFlat.selectedIndex != 0)
        return true;
    else if (objRent.selectedIndex != 0)
        return true;
    else if (objBed.selectedIndex != 0)
        return true;
    else if (objBath.selectedIndex != 0)
        return true;
    else
        return false;
}
function SetOthersDDL() {
    var callAjax = false;
    var objFlat = document.getElementById("ctl00_ContentPlaceHolder1_ddlApartment");
    var objRent = document.getElementById("ctl00_ContentPlaceHolder1_ddlRent");
    var objBed = document.getElementById("ctl00_ContentPlaceHolder1_ddlBedroom");
    var objBath = document.getElementById("ctl00_ContentPlaceHolder1_ddlBathroom");

    if ($.cookie("hfFlat") != null) {
        for (var count = 0; count < objFlat.options.length; count++) {
            if (objFlat.options[count].innerHTML.toUpperCase().search($.cookie("hfFlat").toUpperCase()) != -1) {
                objFlat.selectedIndex = objFlat.options[count].index;
                callAjax = true;
                break;
            }
        }
    }
    if ($.cookie("hfPrice") != null) {
        for (var count = 0; count < objRent.options.length; count++) {
            if (objRent.options[count].innerHTML.toUpperCase().search($.cookie("hfPrice").toUpperCase()) != -1) {
                objRent.selectedIndex = objRent.options[count].index;
                callAjax = true;
                break;
            }
        }
    }
    if ($.cookie("hfBed") != null) {
        for (var count = 0; count < objBed.options.length; count++) {
            if (objBed.options[count].innerHTML.toUpperCase().search($.cookie("hfBed").toUpperCase()) != -1) {
                objBed.selectedIndex = objBed.options[count].index;
                callAjax = true;
                break;
            }
        }
    }
    if ($.cookie("hfBath") != null) {
        for (var count = 0; count < objFlat.options.length; count++) {
            if (objBath.options[count].innerHTML.toUpperCase().search($.cookie("hfBath").toUpperCase()) != -1) {
                objBath.selectedIndex = objBath.options[count].index;
                callAjax = true;
                break;
            }
        }
    }
    //    if(callAjax)
    //        AjaxCall(GeneratedFilterString());
}

function ClearSearchCookie() {
    $.cookie('hfFlat', null);
    $.cookie('hfPrice', null);
    $.cookie('hfBed', null);
    $.cookie('hfBath', null);
}

function GetSortedData(bedno, oTex) {
    //debugger;
    document.getElementById("divProgress").className = "hfProgress";
    showLoadingImage();

    var url;
    if (oTex == "CityCounty") {
        var county = document.getElementById('ctl00_ContentPlaceHolder1_ddlCounty').options[document.getElementById('ctl00_ContentPlaceHolder1_ddlCounty').selectedIndex].text;
        var city = document.getElementById("ctl00_ContentPlaceHolder1_ddlCity").options[document.getElementById("ctl00_ContentPlaceHolder1_ddlCity").selectedIndex].text;
        if (city == 'Town') {
            url = "AjaxPageHomeSearch.aspx?citycounty=true&county=" + county + "&SortColumn=" + bedno + "&ResetSession=true&sreachkey=" + GeneratedFilterString() + "&" + Math.random();
            $.get(url, {}, function(resposeText) {
                if (resposeText) {
                    document.getElementById('AjaxPanelC').innerHTML = resposeText;
                    document.getElementById("divProgress").className = "hfHidden";
                    document.getElementById('divLoadProgress').style.display = "none";
                    CallEditPreview();
                    document.documentElement.scrollTop = 0;
                    document.getElementById('ctl00_ContentPlaceHolder1_hfCounty').value = "";
                    document.getElementById('ctl00_ContentPlaceHolder1_hfCity').value = "";
                    if (LoadCity) {
                        //AfterClearSearch();
                        //ClearGMapAndSetJPGMap(resposeText);
                    }
                }
            });
        }
        else {
            url = "AjaxPageHomeSearch.aspx?citycounty=true&SortColumn=" + bedno + "&county=" + county + "&ResetSession=true&sreachkey=" + GeneratedFilterString() + "&city=" + city + "&" + Math.random();
            $.get(url, {}, function(resposeText) {
                if (resposeText) {

                    document.getElementById('AjaxPanelC').innerHTML = resposeText;
                    document.getElementById("divProgress").className = "hfHidden";
                    document.getElementById('divLoadProgress').style.display = "none";
                    CallEditPreview();
                    document.documentElement.scrollTop = 0;
                    document.getElementById('ctl00_ContentPlaceHolder1_hfCounty').value = "";
                    document.getElementById('ctl00_ContentPlaceHolder1_hfCity').value = "";
                }
            });
        }
    }    
    else {
        if (serachType == "") {
            url = "AjaxPageHomeSearch.aspx?value=" + GeneratedFilterString() + "&SortColumn=" + bedno + "&ResetSession=true&" + Math.random();
        }
        else {
            url = "AjaxPageHomeSearch.aspx?value=" + GeneratedFilterString() + "&" + Math.random();
        }


        $.get(url, {}, function(resposeText) {
            if (resposeText) {
                var objsplit = resposeText.split('|_');
                document.getElementById('AjaxPanel').innerHTML = objsplit[0];
                if (showLoading) { document.getElementById("divProgress").className = "hfHidden"; document.getElementById('divLoadProgress').style.display = "none"; }
                document.documentElement.scrollTop = 0;
                if (objsplit.length > 1) {
                    splitSCID = objsplit[1].split(',');
                }
                if (oNavigator) {
                    locationFilter();
                }
                CallEditPreview();
                if (!LoadCity)
                    AfterClear();
                if (oTex == 'Clear') {
                    if (serachType != "D") {
                        typeAll = "";
                        clearSerach = false;
                    }
                }
                else {
                    if (!LoadCity)
                        ClearGMapAndSetJPGMap(objsplit[0]);
                    clearSerach = false;
                }
            }
        });
    }
}

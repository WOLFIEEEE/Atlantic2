<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pipe2.aspx.cs" Inherits="Aareas247Marketing.pipe2" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>

    <script type="text/javascript">
        //debugger;
        if ("<%=source%>" == "reloadsiteplan") {
            //Hide popup login after 2 seconds
            setTimeout("parent.parent.parent.document.getElementById('divGrayBG').className = 'hfNone'; parent.parent.parent.hideElement();", 2000);

            var oifrm = parent.parent.parent.document.getElementById("ifrmIsFavorite");
            oifrm.src = oifrm.src;

            //update login status
            oifrm = parent.parent.parent.document.getElementById('ifrmStatus');
            oifrm.src = oifrm.src;
        }
        else if ("<%=source%>" == "hideframe") {
            //setTimeout("try{parent.parent.document.getElementById('ifrmSave').style.display = 'none';}catch(err){}", 1000);
            //Update login status
            //debugger;
            var frm = parent.parent.parent.document.getElementById('ifrmStatus');
            frm.src = frm.src;
            //Hide popup login after 2 seconds
            //don't offer the close button when DB has already been updated. -- Tamal, 5th Oct, 2009.
            parent.parent.parent.document.getElementById('dvCancel').style.display = "none"; //close button removed.
            setTimeout("parent.parent.parent.document.getElementById('divGrayBG').className = 'hfNone'; parent.parent.parent.hideElement();", 2000);
            //the following code is added to reset all the favorite icon to "plus" sign for home finder page - Tamal, 28 September, 2009
            var hdnModel = parent.parent.parent.document.getElementById('ctl00_ContentPlaceHolder1_hdnCurrentModelList');
            if (hdnModel) {
                var currentModelList = hdnModel.value;
                var modelValueList = currentModelList.split(',');
                //                for (var i = 0; i < modelValueList.length; i++) {
                //                    var objChange = parent.parent.parent.document.getElementsByName(modelValueList[i]);
                //                    if (objChange != null && objChange.length > 0) {
                ////                        if ("<%=showFavoriteList%>" == "favoriteList") {
                ////                            objChange[0].style.display = "none";
                //                        //                        }
                //                        //alert('TEST2');
                //                        objChange[0].innerHTML = "Save";
                //                    }
                //                }
            }

            //the code section ends here
            //the following code is added to change the signs in the search result for the home finder page - Tamal, 16 September, 2009
            var modelIDs = "<%=modelid_scid%>";
            if (modelIDs != "") {
                var IdArray = modelIDs.split(',');
                for (var i = 0; i < IdArray.length; i++) {
                    var objChange = parent.parent.parent.document.getElementsByName(IdArray[i]);
                    if (objChange != null && objChange.length > 0) {
                        //                        if ("<%=showFavoriteList%>" == "favoriteList") 
                        //                        {
                        //                            objChange[0].style.display = "block";
                        //                        }
                        // alert('TEST');
                        objChange[0].innerHTML = "Remove";
                    }
                }
            }
            if ("<%=showFavoriteList%>" == "favoriteList") {
                parent.parent.parent.document.getElementById("hdnImagefilter").value = "true";
                parent.parent.parent.initiateImageFilter();
            }
            //the code section ends here
        }
        else if ("<%=source%>" == "Floorplanhideframe") {
            //setTimeout("try{parent.parent.document.getElementById('ifrmSave').style.display = 'none';}catch(err){}", 1000);
            //Update login status
            //debugger;
            //var frm = parent.parent.document.getElementById('ifrmStatus');
            //frm.src = frm.src;
            //Hide popup login after 2 seconds
            //don't offer the close button when DB has already been updated. -- Tamal, 5th Oct, 2009.

            parent.parent.document.getElementById('dvCancel').style.display = "none"; //close button removed.
            setTimeout("parent.parent.document.getElementById('divGrayBG').className = 'hfNone'; parent.parent.hideElement();", 2000);
            //the following code is added to reset all the favorite icon to "plus" sign for home finder page - Tamal, 28 September, 2009
            //var hdnModel = parent.parent.document.getElementById('ctl00_ContentPlaceHolder1_hdnCurrentModelList');
            //if (hdnModel) {
            //    var currentModelList = hdnModel.value;
            //    var modelValueList = currentModelList.split(',');                
            //}

            //the code section ends here
            //the following code is added to change the signs in the search result for the home finder page - Tamal, 16 September, 2009
            var modelIDs = "<%=modelid_scid%>";
            if (modelIDs != "") {
                var IdArray = modelIDs.split(',');
                for (var i = 0; i < IdArray.length; i++) {
                    var objChange = parent.parent.document.getElementsByName(IdArray[i]);
                    if (objChange != null && objChange.length > 0) {
                        objChange[0].innerHTML = "Remove";
                    }
                }
            }
            if ("<%=showFavoriteList%>" == "favoriteList") {
                parent.parent.document.getElementById("hdnImagefilter").value = "true";
                parent.parent.initiateImageFilter();
            }
            setTimeout("parent.parent.parent.document.getElementById('Img5').className = 'GMapCancelButtonNewShadeHidden'; parent.parent.parent.document.getElementById('Img1').className = 'GMapCancelButtonNew';", 2000);
            //the code section ends here
        }
        else if ("<%=source%>" == "loginstatus") {
            if ("<%=op%>" == "status") {
                UpdateLoginStatus("<%=welcomeTitle%>", "<%=welcomeText%>", "<%=loggedin%>");
            }
            else if ("<%=op%>" == "logout") {
                Logout();
            }
        }
        else if ("<%=source%>" == "directlogin") {
            //Hide popup login
            parent.parent.parent.hideElement();
            //update login status
            window.frames['top'].location = "<%=_domain%>/Login.aspx?domain=<%=_domain%>&SCID=<%=_SCID%>";
            var eleFrm = parent.parent.parent.document.getElementById("ifrmStatus");
            eleFrm.src = eleFrm.src;
        }
        else if ("<%=source%>" == "siteplan") {
            //Hide popup login after 2 seconds
            var eleFrm = parent.parent.parent.document.getElementById("ifrmStatus");
            eleFrm.src = eleFrm.src;
            setTimeout("parent.parent.parent.document.getElementById('divGrayBG').className = 'hfNone'; parent.parent.parent.hideElement();", 2000);
        }
        else if ("<%=source%>" == "siteplanlogin") {
            //debugger;
            parent.parent.parent.document.getElementById("divGrayBG").className = "hfVisible";
            parent.parent.parent.document.getElementById("ctl00_hdnFlag").value = "siteplan";
            parent.parent.parent.frames['frmLogin'].location.href = "<%=_SaveTo247URL %>/Marketing/SaveTo247.aspx?domain=<%=_domain%>&dataType=<%=dataType%>&Modelid=<%=modelid_scid%>&SCID=<%=_SCID%>&source=siteplan";
            //URL + '/Marketing/SaveTo247.aspx?domain=' + domain + '&dataType=' + dataType + '&dataValue=' + dataValue + '&source=hideframe' + '&SCID=' + scid;
            //oifrm.src = appPath + '/Marketing/SaveTo247.aspx?domain=' + domain + '&datatype=' + datatype + '&Modelid=' + modelids + '&scid=' + scid + '&source=siteplan';
            parent.parent.parent.showElement();
        }
        else if ("<%=source%>" == "favcheck") {
            if ("<%=modelid_scid%>" == "all") {
                var checkboxes = parent.parent.document.getElementsByTagName("input");
                var result = "<%=result%>";

                var hidVar = parent.parent.document.getElementById("favResult");
                if (hidVar != null) {
                    var favModelids = favModels(result);
                    parent.parent.document.getElementById("frmFlashAvail").src = parent.parent.document.getElementById("flashAvailFile").value + "&favmodelids=" + favModelids;
                }
                for (var i = 0; i < checkboxes.length; i++) {
                    var id = checkboxes[i].id;
                    if (id.indexOf('btnFavorites', 0) == 0) {//add to fav button found
                        id = id.replace('btnFavorites_', '');
                        //alert(result.indexOf(id + ","));
                        if (result.indexOf(id + ",") >= 0) {//confirmed that it is a fav
                            //images[i].alt = "Remove from Favotires";
                            checkboxes[i].checked = true;
                        }
                    }
                }
            }
            else if ("<%=modelid_scid%>" == "units") {
                var checkboxes = parent.parent.document.getElementsByTagName("input");
                var result = "<%=result%>";
                for (var i = 0; i < checkboxes.length; i++) {
                    var id = checkboxes[i].id;
                    if (id.indexOf('btnFavorites', 0) == 0) {//add to fav button found
                        id = id.replace('btnFavorites_', '');
                        //alert(result.indexOf(id + ","));
                        if (result.indexOf(id + ",") >= 0) {//confirmed that it is a fav
                            //images[i].alt = "Remove from Favotires";
                            checkboxes[i].checked = true;
                        }
                    }
                }
            }
            else {
                if ("<%=result%>" == "true") {
                    parent.parent.document.getElementById("btnFavorites_<%=modelid_scid%>").checked = true;
                    parent.parent.document.getElementById("imgFavorite").innerHTML = "Remove";
                }
                else {
                    parent.parent.document.getElementById("btnFavorites_<%=modelid_scid%>").checked = false;
                    parent.parent.document.getElementById("imgFavorite").innerHTML = "Save";
                }
            }
        }
        function favModels(result) {
            var ids = result.split(",");
            var favModels = "";
            var scid = parent.parent.document.getElementById("modelids").value.split(",")[0].split("_")[1];
            for (var i = 0; i < ids.length; i++) {
                var m_s = ids[i].split("_");
                if (scid == m_s[1]) {
                    favModels += m_s[0] + ",";
                }
            }
            return favModels;
        }

        function UpdateLoginStatus(title, text, loggedin) {
            if (loggedin == 'true') {
//                parent.parent.document.getElementById('dvMyAccount').style.display = '';
//                parent.parent.document.getElementById('dvSignOut').style.display = '';
//                parent.parent.document.getElementById('dvSignIn').style.display = 'none';
            }
            else {
//                parent.parent.document.getElementById('dvMyAccount').style.display = 'none';
//                parent.parent.document.getElementById('dvSignOut').style.display = 'none';
//                parent.parent.document.getElementById('dvSignIn').style.display = '';
            }
        }

        function Logout() {
            var logoutURL = "<%= _247URL%>/Marketing/LoginStatus.aspx?op=status&domain=<%= _domain%>";
            var eleFrame = parent.parent.document.getElementById("ifrmStatus");
            eleFrame.src = logoutURL;
        }
    </script>

    <form id="form1" runat="server">
    <div>
    </div>
    </form>
</body>
</html>

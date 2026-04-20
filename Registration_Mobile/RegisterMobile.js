/// <reference path="jquery-1.3.2.min.js" />

var EmailLabel = "";
var HomePhoneLabel = "";
var CellPhoneLabel = "";
var BusinessPhoneLabel = "";
var ZipLabel = "";
var FaxLabel = "";
var CurrentLabel = "";

var AppName = "";
var AppMessage = "";
var AppDesc = "";
var AppLink = "";
var AppImageLink = "";

var Register = {
    RequiredControlsList: new Array(),
    RequiredControlsLabelList: new Array(),
    CaptchaURL: "",
    InValidInputMSG: "",
    CaptchaVisible: false,
    CaptchaID: "",
    FacebookEnable: false,
    LogedinToFB: false,
    ToContactKey: "",
    ToContactDupKey: "",
    ToEmployeeKey: "",
    ToEmployeeDupKey: "",
    HideControlAfterSuccess: true,
    SubmitForm: function() {
        Utils.HideAllMsg();
        $.Watermark.HideAll();
        if (Register.ValidateUI() == true) {
            if (Register.ValidateInputFormat() == true) {
                Register.SaveData();
            }
            else {
                //$("#dvInvalidInput").show();
                $.Watermark.ShowAll();
                $("#dvInvalidInput").text(Register.InValidInputMSG + " in " + CurrentLabel);
                Utils.ShowMessage("dvInvalidInput");
            }
        }
        else {
            //$("#dvRequired").show();
            $.Watermark.ShowAll();
            Utils.ShowMessage("dvRequired");
        }
    },
    PrepareUI: function() {
        this.ReadXml();
        Utils.ReadPrices();
    },
    ReadXml: function() {
        var url = "/Registration_Mobile/RegisterMobile.xml?rnd=" + new Date().getMilliseconds();
        $.get(url, function(d) {
            $("#dvSuccess").text($(d).find("Success").text());
            $("#dvFinalMessage").text($(d).find("Success").text());
            $("#dvDupEmail").text($(d).find("DuplicateEmail").text());
            $("#dvRequired").text($(d).find("RequiredFieldsMissing").text());
            $("#dvError").text($(d).find("Error").text());
            $("#dvIncorrectCaptcha").text($(d).find("IncorrectCaptcha").text());
            $("#dvInvalidInput").text($(d).find("InvalidInput").text());
            Register.InValidInputMSG = $("#dvInvalidInput").text();
            $("#hdnSubmitUrl").val($(d).find("URL").text());
            var tempCapUrl = $(d).find("Captcha").find("CapURL").text();
            Register.CaptchaURL = tempCapUrl.replace("http:", document.location.protocol);
            Register.ToContactKey = $(d).find("Settings").find("ToContact").text();
            Register.ToContactDupKey = $(d).find("Settings").find("ToContactDup").text();
            Register.ToEmployeeKey = $(d).find("Settings").find("ToEmployee").text();
            Register.ToEmployeeDupKey = $(d).find("Settings").find("ToEmployeeDup").text();
            statistics = $(d).find("Settings").find("GoogleKey").text();
            Utils.HideAllMsg();
            var FBVisible = $(d).find("FacebookLogin").find("Visible").text()
            if (FBVisible == "Yes") {
                var fb_appKey = $(d).find("FacebookLogin").find("AppID").text();
                AppName = $(d).find("FacebookLogin").find("AppName").text();
                AppMessage = $(d).find("FacebookLogin").find("AppMessage").text();
                AppDesc = $(d).find("FacebookLogin").find("AppDesc").text();
                AppLink = $(d).find("FacebookLogin").find("AppLink").text();
                AppImageLink = $(d).find("FacebookLogin").find("AppImageLink").text();
                Register.InitFBApp(fb_appKey);
            }
            Register.PrepareElements(d);
        });
    },
    InitFBApp: function(app_id) {
        window.fbAsyncInit = function() {
            if (typeof FB != 'undefined') {
                $("#dvFacebook").show();
                Register.FacebookEnable = true;
                var fbDiv = document.getElementById("dvFBContainer");
                if (fbDiv) {
                    fbDiv.innerHTML = "<fb:login-button scope='email,user_website,publish_stream'>Sign up with Facebook</fb:login-button>";
                }
                FB.init({ appId: app_id, status: true, cookie: true,
                    xfbml: true
                });
                FB.Event.subscribe('auth.login', function(response) {
                    Register.LogedinToFB = true;
                    Register.GetUserInfoFromFB(response.authResponse.userID);
                });
                FB.getLoginStatus(function(response) {
                    if (response.status == 'connected') {
                        Register.LogedinToFB = true;
                        Register.GetUserInfoFromFB(response.authResponse.userID);
                    }
                });
            }
            else {
                window.alert("Facebook is not enabled in this browser.\nPlease contact your network administrator.")
            }

        };
        (function() {
            var e = document.createElement('script'); e.async = true;
            e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
            document.getElementById('fb-root').appendChild(e);
        } ());
    },
    GetUserInfoFromFB: function(uid) {
        FB.api(
          {
              method: 'fql.query',
              query: 'SELECT name,first_name,middle_name,last_name,sex,email,hometown_location,website FROM user WHERE uid=' + uid
          },
          function(response) {
              if (response.error_code) {
              }
              else {
                  Register.DisplayUserInfo(response);
              }
          }
        );
    },
    FBLoginButtonClicked: function() {
        FB.getLoginStatus(function(response) {
            if (response.status == 'connected') {
                Register.LogedinToFB = true;
                Register.GetUserInfoFromFB(response.session.uid);
            }
        });
    },
    PostMessageToContactWall: function() {
        var message = $("#txtFirstName").val() + " " + $("#txtLastName").val() + " " + AppMessage + " " + AppName;
        var publish = {
            method: 'stream.publish',
            message: message,
            picture: AppImageLink,
            link: AppLink,
            name: AppName,
            caption: '',
            description: AppDesc,
            actions: { name: AppName, link: AppLink }
        };
        FB.api('/me/feed', 'post', publish, function(response) {
            if (!response || response.error) {
                alert('Failed to post message in facebook');
            } else {
                // alert('Post ID: ' + response.id);
            }
        });
    },
    DisplayUserInfo: function(response) {
        document.getElementById('txtFirstName').value = response[0].first_name;
        document.getElementById('txtMiddleName').value = response[0].middle_name;
        document.getElementById('txtLastName').value = response[0].last_name;
        document.getElementById('txtEmailAddress').value = response[0].email;
        document.getElementById('txtCity').value = response[0].hometown_location.city;
        document.getElementById('txtWebsite').value = response[0].website;
        document.getElementById('txtZip').value = response[0].hometown_location.zip;
        for (var i = 0; i < document.getElementById('ddlCountry').options.length; i++) {
            if (document.getElementById('ddlCountry').options[i].text == response[0].hometown_location.country) {
                document.getElementById('ddlCountry').selectedIndex = i;
                break;
            }
        }
    },
    PrepareElements: function(d) {
        $(d).find("RegistrationFields").children().each(function() {
            var label = $(this).find("Label").text();
            var visible = $(this).find("Visible").text();
            var required = $(this).find("Required").text();
            var defaultValue = $(this).find("DefaultValue").text();
            var elementName = $(this)[0].tagName;

            var ctrl = $("#dv" + elementName + " > div:nth-child(2) > div:nth-child(1)").children(1);
            if (defaultValue != null) {
                ctrl.val(defaultValue);
            }
            if (visible.toLowerCase() == "yes") {
                if (ctrl.attr("type") == "text" || ctrl.attr("type") == "email" || ctrl.attr("type") == "number") {
                    ctrl.Watermark(label);
                }
                if (elementName == "Captcha") { Register.PrepareCaptcha(); }
                var expression = $(this).find("Validator").text();
                if (elementName == "Email") {
                    $("#hdnEmailExpression").val(expression);
                    EmailLabel = label;
                }
                else if (elementName == "HomePhone") {
                    $("#hdnHPhoneExpression").val(expression);
                    HomePhoneLabel = label;
                }
                else if (elementName == "BusinessPhone") {
                    $("#hdnBPhoneExpression").val(expression);
                    BusinessPhoneLabel = label;
                }
                else if (elementName == "Cell") {
                    $("#hdnCellExpression").val(expression);
                    CellPhoneLabel = label;
                }
                else if (elementName == "Zip") {
                    $("#hdnZipExpression").val(expression);
                    ZipLabel = label;
                }
                else if (elementName == "Fax") {
                    $("#hdnFaxExpression").val(expression);
                    FaxLabel = label;
                }

                $("#dv" + elementName).show();
                // Change the label.
                //$("#dv" + elementName + " > div:nth-child(1)").text(label);
                // Check if there is options
                if ($(this).find("Options").text() != "") {
                    if (elementName == "OrgSC") {
                        var xyz = 0;
                        var iCommunityTable = $("<table style='width: 90%;'></table>");
                        var SCID = Register.GetQueryStrings("exscid");
                        var selected = $(this).find("Options").find("Option:[value=" + SCID + "]")[0];
                        if (selected != undefined) {
                            $("<tr><td style='width: 10%; vertical-align:middle;'><input type='checkbox' style='width: 1.6em;height:1.6em; ' value='" + $(selected).attr("value") + "' checked='checked'/></td><td align='left' style='width: 70%; font-size: 10.5pt;vertical-align:middle;'>" + $(selected).text() + "</td><tr>").appendTo(iCommunityTable); ;
                        }
                        $(this).find("Options").find("Option").each(function() {
                            var val = $(this).attr("value");
                            var text = $(this).text();
                            if (val != '-1') {
                                if (SCID == undefined || val != SCID) {
                                    var option = $("<tr><td style='width: 10%; vertical-align:middle;'><input type='checkbox' style='width: 1.6em;height:1.6em;' value='" + val + "'/></td><td align='left' style='width: 70%; font-size: 10.5pt;vertical-align:middle;'>" + text + "</td><tr>");
                                    option.appendTo(iCommunityTable);
                                }
                            }
                        });
                        iCommunityTable.appendTo(ctrl);
                        Utils.ShowLabel('dvOrgSC');
                    }
                    else {
                        $(this).find("Options").find("Option").each(function() {
                            var val = $(this).attr("value");
                            var text = $(this).text();
                            var selected = (val == defaultValue);
                            //ctrl.append(new Option(text, val, selected, selected));
                            var option;
                            if (selected) {
                                option = $("<option value='" + val + "' selected >" + text + "</option>");
                            }
                            else {
                                option = $("<option value='" + val + "'>" + text + "</option>");
                            }
                            option.appendTo(ctrl);
                        });
                    }
                }
                $("#dv" + elementName + " .ValidationColumn").hide();

                if (required.toLowerCase() == "no") {
                    //$("#dv" + elementName + " .ValidationColumn").hide();
                    $("#dv" + elementName + " > div:nth-child(1)").text(label);
                }
                else {
                    $("#dv" + elementName + " > div:nth-child(1)").html("<b>" + label + "</b>");
                    Register.RequiredControlsList[Register.RequiredControlsList.length] = ctrl;
                    Register.RequiredControlsLabelList[Register.RequiredControlsLabelList.length] = label;
                    $("#dv" + elementName + " .ValidationColumn").show();
                }
            }
        });
        Register.CreateSurveyElement(d);
    },
    CreateSurveyElement: function(d) {
        $(d).find("SurveyFields").children().each(function() {
            var label = $(this).find("Label").text();
            var visible = $(this).find("Visible").text();
            var required = $(this).find("Required").text();
            var defaultValue = $(this).find("DefaultValue").text();
            var elementName = $(this)[0].tagName;

            var ctrl = $("#dv" + elementName + " > div:nth-child(2) > div:nth-child(1)").children(1);
            if (defaultValue != null) {
                ctrl.val(defaultValue);
            }
            if (visible.toLowerCase() == "yes") {
                $("#dv" + elementName).show();
                // Change the label.
                //$("#dv" + elementName + " > div:nth-child(1)").text(label);
                // Check if there is options
                if ($(this).find("Options").text() != "") {
                    $(this).find("Options").find("Option").each(function() {
                        var val = $(this).attr("value");
                        var text = $(this).text();
                        var selected = (val == defaultValue);
                        //ctrl.append(new Option(text, val, selected, selected));
                        var option;
                        if (selected) {
                            option = $("<option value='" + val + "' selected >" + text + "</option>");
                        }
                        else {
                            option = $("<option value='" + val + "'>" + text + "</option>");
                        }

                        option.appendTo(ctrl);
                    });
                }
                $("#dv" + elementName + " .ValidationColumn").hide();
                if (required.toLowerCase() == "no") {
                    //$("#dv" + elementName + " .ValidationColumn").hide();
                    $("#dv" + elementName + " > div:nth-child(1)").text(label);
                    if (ctrl.attr("type") == "textarea") {
                        Utils.ShowLabel('dvreg_comments');
                    }
                }
                else {
                    $("#dv" + elementName + " > div:nth-child(1)").html("<b>*" + label + "</b>");
                    Register.RequiredControlsList[Register.RequiredControlsList.length] = ctrl;
                    Register.RequiredControlsLabelList[Register.RequiredControlsLabelList.length] = label;
                }
            }
        });
    },
    ValidateInputFormat: function() {
        // Check for valid input first. Will not check if field is empty/expression is empty.
        // Expression will only be in hidden field if the field is visible, so no need to check control's visibility
        if ($("#hdnEmailExpression").val() != "" && $("#txtEmailAddress").val() != "") {
            if (Utils.CheckInputAgainstExpression($("#txtEmailAddress").val(), $("#hdnEmailExpression").val()) == null) {
                //document.getElementById("txtEmailAddress").focus();
                CurrentLabel = EmailLabel;
                return false;
            }
        }
        if ($("#hdnZipExpression").val() != "" && $("#txtZip").val() != "") {
            if (Utils.CheckInputAgainstExpression($("#txtZip").val(), $("#hdnZipExpression").val()) == null) {
                //document.getElementById("txtZip").focus();
                CurrentLabel = ZipLabel;
                return false;
            }
        }
        if ($("#hdnHPhoneExpression").val() != "" && $("#txtHomePhone").val() != "") {
            if (Utils.CheckInputAgainstExpression($("#txtHomePhone").val(), $("#hdnHPhoneExpression").val()) == null) {
                //document.getElementById("txtHomePhone").focus();
                CurrentLabel = HomePhoneLabel;
                return false;
            }
        }
        if ($("#hdnBPhoneExpression").val() != "" && $("#txtBusinessPhone").val() != "") {
            if (Utils.CheckInputAgainstExpression($("#txtBusinessPhone").val(), $("#hdnBPhoneExpression").val()) == null) {
                //document.getElementById("txtBusinessPhone").focus();
                CurrentLabel = BusinessPhoneLabel;
                return false;
            }
        }
        if ($("#hdnCellExpression").val() != "" && $("#txtCell").val() != "") {
            if (Utils.CheckInputAgainstExpression($("#txtCell").val(), $("#hdnCellExpression").val()) == null) {
                //document.getElementById("txtCell").focus();
                CurrentLabel = CellPhoneLabel;
                return false;
            }
        }
        if ($("#hdnFaxExpression").val() != "" && $("#txtFax").val() != "") {
            if (Utils.CheckInputAgainstExpression($("#txtFax").val(), $("#hdnFaxExpression").val()) == null) {
                //document.getElementById("txtFax").focus();
                CurrentLabel = FaxLabel;
                return false;
            }
        }
        return true;
    },
    ValidateUI: function() {
        var i;
        for (i = 0; i < Register.RequiredControlsList.length; i++) {
            var ctrl = Register.RequiredControlsList[i];
            switch (ctrl.attr("type")) {
                case "text":
                    if (ctrl.val() == "") {
                        ctrl.focus();
                        return false;
                    }
                    break;
                case "select-one":
                    if (ctrl.val() == "") {
                        ctrl.focus();
                        return false;
                    }
                    break;
            }
        }
        return true;
    },
    ValidateEmptyField: function(ctrl, divId) {
        if (ctrl.value == "") {
            var i;
            for (i = 0; i < Register.RequiredControlsList.length; i++) {
                var temp = Register.RequiredControlsList[i];
                if (temp[0].id == ctrl.id) {
                    document.getElementById(ctrl.id).className = "ErrorInput";
                    document.getElementById(divId).className = "ContentRowError";
                    $("#dvInvalidInput").text(Register.RequiredControlsLabelList[i].toString() + " is Required field.");
                    $("#" + divId + " > div:nth-child(3)").text($("#dvInvalidInput").text());
                    Utils.ShowError(divId);
                    //Utils.ShowMessage("dvInvalidInput");
                    return false; //break;
                }
            }

        }
    },
    SaveData: function() {
        $("#imgLoading").show();
        Register.DetectNewEmail();
        var random = new Date().getMilliseconds(); // this number is used to force browser to reload the script from server rather than cash.
        var serviceUrl = $("#hdnSubmitUrl").val();
        serviceUrl = serviceUrl.replace("http:", document.location.protocol);
        serviceUrl = serviceUrl + "?jsoncallback=Register.OnSaveSuccess&ete=" + Register.ToEmployeeKey + "&cid=1&dete=" + Register.ToEmployeeDupKey + "&etk=" + Register.ToContactKey + "&detk=" + Register.ToContactDupKey + "&rnd=" + random + "&stp=" + $("#hdnDupExists").val() + Register.GetRequestString() + Register.GetSurveyString();
        //alert(random);
        var reqObj = document.createElement("script");
        reqObj.type = "text/javascript";
        reqObj.src = serviceUrl;
        reqObj.id = "scriptID";
        var script = document.getElementById("scriptID")
        if (script) {
            document.body.removeChild(script);
        }
        document.body.appendChild(reqObj);
    },
    OnSaveSuccess: function(data) {
        $("#imgLoading").hide();
        if ((data == "0") || (data.indexOf('_') != -1)) {
            // Data successfully saved.
            $("#hdnDupExists").val("0");
            //$("#dvSuccess").show();
            Utils.ShowMessage("dvSuccess");
            if (Register.FacebookEnable == true) {
                if (typeof FB != 'undefined') {
                    if (Register.LogedinToFB == true)
                        Register.PostMessageToContactWall();
                }
            }
            if (Register.HideControlAfterSuccess == true) {
                Utils.ResetForm();
                Utils.DisplayFinalMessage();
            }
            else {
                Utils.ResetForm();
                Utils.ShowMessage("dvSuccess");
            }
        }
        else if (data == "-1") {
            // Multiple contact detected with the same email address
            //$("#dvDupEmail").show();
            Utils.ShowMessage("dvDupEmail");
            $("#hdnDupExists").val("1");
            //Register.PrepareCaptcha();
        }
        else if (data == "-3") {
            // Incorrect captcha
            //$("#dvIncorrectCaptcha").show();
            Utils.ShowMessage("dvIncorrectCaptcha");
            Register.PrepareCaptcha();
        }
        else {
            // Some internal server error
            //$("#dvError").show();
            Utils.ShowMessage("dvError");
            if (Register.CaptchaVisible)
                Register.PrepareCaptcha();
        }
    },
    GetRequestString: function() {
        var salutation = $("#ddlSalutation").val() == null ? "" : $("#ddlSalutation").val();
        var country = $("#ddlCountry").val() == null ? "" : $("#ddlCountry").val();
        var renAgent = $("#ddlRentalAgent").val() == null ? "0" : $("#ddlRentalAgent").val();
        var regType = $("#ddlRegType").val() == null ? "" : $("#ddlRegType").val();
        //var orgSC = $("#ddlOrgSC").val() == null ? "0" : $("#ddlOrgSC").val();
        var source = $("#ddlSource").val() == null ? "" : $("#ddlSource").val();

        var orgSC = "";
        $("#dvOrgSC tr td input:checkbox").each(function(e) {
            if ($(this).is(":checked")) {
                orgSC += $(this).attr("value") + ",";
            }
        });

        var reqString = "&salutation=" + salutation;
        reqString = reqString + "&firstName=" + $("#txtFirstName").val();
        reqString = reqString + "&middleName=" + $("#txtMiddleName").val();
        reqString = reqString + "&lastName=" + $("#txtLastName").val();
        reqString = reqString + "&emailAddress=" + $("#txtEmailAddress").val();
        reqString = reqString + "&company=" + $("#txtCompany").val();
        reqString = reqString + "&title=" + $("#txtTitle").val();
        reqString = reqString + "&sex=" + $("#ddlSex").val();
        reqString = reqString + "&address1=" + $("#txtAddress1").val();
        reqString = reqString + "&address2=" + $("#txtAddress2").val();
        reqString = reqString + "&city=" + $("#txtCity").val();
        reqString = reqString + "&state=" + $("#txtState").val();
        reqString = reqString + "&zip=" + $("#txtZip").val();
        reqString = reqString + "&country=" + country;
        reqString = reqString + "&homePhone=" + $("#txtHomePhone").val();
        reqString = reqString + "&bizPhone=" + $("#txtBusinessPhone").val();
        reqString = reqString + "&cell=" + $("#txtCell").val();
        reqString = reqString + "&fax=" + $("#txtFax").val();
        reqString = reqString + "&webSite=" + $("#txtWebsite").val();
        //reqString = reqString + "&source=" + source;
        //reqString = reqString + "&sourceDetail=" + $("#txtSourceDetails").val();
        reqString = reqString + "&source=bestrent";
        reqString = reqString + "&sourceDetail=view_avail";
        //end of Fakhrul Change
        reqString = reqString + "&comment=" + $("#txtComments").val();
        reqString = reqString + "&uid=" + $("#txtUid").val();
        reqString = reqString + "&sc=" + $("#txtSalesCenter").val();
        //reqString = reqString + "&sc=" + orgSC;
        reqString = reqString + "&rfu=" + $("#txtRefUrl").val();
        reqString = reqString + "&rfs=" + $("#txtRfSite").val();
        reqString = reqString + "&creq=" + Register.CaptchaVisible;
        reqString = reqString + "&cch=" + Register.CaptchaID;
        reqString = reqString + "&cres=" + $("#txtCaptcha").val();
        reqString = reqString + "&ctype=" + $("#ddlContact_Type").val();
        reqString = reqString + "&manager=" + renAgent;
        reqString = reqString + "&rtype=" + regType;
        reqString = reqString + "&notes=" + escape($("#txtNotes").val());
        reqString = reqString + "&osc=" + orgSC

        return reqString;
    },
    GetSurveyString: function() {
        var surveyString = "";
        var subItems = $("div.SurveyContentRow");
        subItems.each(function() {
            var Qcode = this.id.replace("dv", "");
            var resp = "";
            if (document.getElementById("txt" + Qcode)) {
                resp = document.getElementById("txt" + Qcode).value;
            }
            else if (document.getElementById("ddl" + Qcode)) {

                resp = document.getElementById("ddl" + Qcode).value;
            }
            surveyString += "&SF_" + Qcode + "=" + resp;
        });

        return surveyString;
    },
    DetectNewEmail: function() {
        var oldEmail = $("#hdnTempEmail").val();
        var newEmail = $("#txtEmailAddress").val();
        if (oldEmail != newEmail) {
            $("#hdnDupExists").val("0");
            $("#hdnTempEmail").val(newEmail);
        }
    },
    PrepareCaptcha: function() {
        Register.CaptchaID = Register.GetCid();
        Register.CaptchaVisible = true;
        $("#imgCaptcha").attr("src", Register.CaptchaURL + "?cid=" + Register.CaptchaID);
    },
    GetCid: function() {
        var S4 = function() {
            return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    },
    GetQueryStrings: function(key) {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {

            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars[key];
    }
}

var Utils = {
    HideAllMsg: function() {
        $("#dvSuccess").hide();
        $("#dvDupEmail").hide();
        $("#dvRequired").hide();
        $("#dvError").hide();
        $("#dvIncorrectCaptcha").hide();
        $("#dvInvalidInput").hide();
        document.getElementById("dvGrayBG").className = "hfHide";
    },
    ShowInlinePopup: function(divId) {
        document.getElementById("dvGrayBG").className = "hfVisible";
        var pageHeight = Utils.GetPageSize()[1]
        $("#dvGrayBG").height(pageHeight);
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

        myWidth = (myWidth / 2) - 450;
        myHeight = (myHeight / 2) - 200;

        document.getElementById(divId).style.left = myWidth + 'px';
        document.getElementById(divId).style.top = myHeight + 'px';
        document.getElementById(divId).style.display = "block";
        document.documentElement.scrollTop = 0;
        //hideScrollBar();
    },
    ShowMessage: function(divId) {
        document.getElementById(divId).style.display = "block";
    },
    HideMessage: function(divId) {
    },
    HideInlinePopup: function() {
        document.getElementById("dvGrayBG").className = "hfHide";
    },
    GetPageSize: function() {
        // handle IE 6
        if ($.browser.msie && $.browser.version < 7) {
            var scrollHeight = Math.max(
				        document.documentElement.scrollHeight,
				        document.body.scrollHeight
			        );
            var offsetHeight = Math.max(
				        document.documentElement.offsetHeight,
				        document.body.offsetHeight
			        );
            if (scrollHeight < offsetHeight) {
                pageHeight = $(window).height();
            } else {
                pageHeight = scrollHeight;
            }
            // handle "good" browsers
        } else {
            pageHeight = $(document).height();
        }
        return new Array('100%', pageHeight);
    },
    ResetForm: function() {
        Utils.HideAllMsg();
        Utils.HideInlinePopup();
        $.Watermark.HideAll();
        //$("#ddlSalutation").val("-1");
        for (var i = 0; i < document.getElementById('ddlSalutation').options.length; i++) {
            if (document.getElementById('ddlSalutation').options[i].defaultSelected == true) {
                $("#ddlSalutation").val(document.getElementById('ddlSalutation').options[i].value);
            }
        }
        $("#txtFirstName").val("");
        $("#txtMiddleName").val("");
        $("#txtLastName").val("");
        $("#txtEmailAddress").val("");
        $("#txtCompany").val("");
        $("#txtTitle").val("");
        for (var i = 0; i < document.getElementById('ddlSex').options.length; i++) {
            if (document.getElementById('ddlSex').options[i].defaultSelected == true) {
                $("#ddlSex").val(document.getElementById('ddlSex').options[i].value);
            }
        }
        $("#txtAddress1").val("");
        $("#txtAddress2").val("");
        $("#txtCity").val("");
        $("#txtState").val("");
        $("#txtZip").val("");
        //$("#ddlCountry").val("-1");
        for (var i = 0; i < document.getElementById('ddlCountry').options.length; i++) {
            if (document.getElementById('ddlCountry').options[i].defaultSelected == true) {
                $("#ddlCountry").val(document.getElementById('ddlCountry').options[i].value);
            }
        }
        $("#txtHomePhone").val("");
        $("#txtBusinessPhone").val("");
        $("#txtCell").val("");
        $("#txtFax").val("");
        $("#txtWebsite").val("");
        //$("#txtSource").val("");
        //$("#txtSourceDetails").val("");
        $("#txtComments").val("");
        $("#txtCaptcha").val("");
        //
        var subItems = $("div.SurveyContentRow");
        subItems.each(function() {
            var Qcode = this.id.replace("dv", "");
            if (document.getElementById("txt" + Qcode)) {
                document.getElementById("txt" + Qcode).value = "";
            }
            else if (document.getElementById("ddl" + Qcode)) {
                for (var i = 0; i < document.getElementById("ddl" + Qcode).options.length; i++) {
                    if (document.getElementById("ddl" + Qcode).options[i].defaultSelected == true) {
                        $("#ddl" + Qcode).val(document.getElementById("ddl" + Qcode).options[i].value);
                    }
                }
            }
        });
        if (Register.CaptchaVisible) {
            Register.PrepareCaptcha();
        }
        $.Watermark.ShowAll();
    },
    ValidatePhoneFax: function(ctrl) {
        if (ctrl.value != "") {
            if (ctrl.id == "txtCell") {
                if ($("#hdnCellExpression").val() != "") {
                    if (Utils.CheckInputAgainstExpression(ctrl.value, $("#hdnCellExpression").val()) == null) {
                        $("#dvInvalidInput").text(Register.InValidInputMSG + " in " + CellPhoneLabel);
                        $.Watermark.ShowAll();
                        Utils.ShowMessage("dvInvalidInput");
                    }
                }
            }
            else if (ctrl.id == "txtHomePhone") {
                if ($("#hdnHPhoneExpression").val() != "") {
                    if (Utils.CheckInputAgainstExpression(ctrl.value, $("#hdnHPhoneExpression").val()) == null) {
                        $("#dvInvalidInput").text(Register.InValidInputMSG + " in " + HomePhoneLabel);
                        $.Watermark.ShowAll();
                        Utils.ShowMessage("dvInvalidInput");
                    }
                }
            }
            else if (ctrl.id == "txtBusinessPhone") {
                if ($("#hdnBPhoneExpression").val() != "") {
                    if (Utils.CheckInputAgainstExpression(ctrl.value, $("#hdnBPhoneExpression").val()) == null) {
                        $("#dvInvalidInput").text(Register.InValidInputMSG + " in " + BusinessPhoneLabel);
                        $.Watermark.ShowAll();
                        Utils.ShowMessage("dvInvalidInput");
                    }
                }
            }
            else if (ctrl.id == "txtFax") {
                if ($("#hdnBPhoneExpression").val() != "") {
                    if (Utils.CheckInputAgainstExpression(ctrl.value, $("#hdnFaxExpression").val()) == null) {
                        $("#dvInvalidInput").text(Register.InValidInputMSG + " in " + FaxLabel);
                        $.Watermark.ShowAll();
                        Utils.ShowMessage("dvInvalidInput");
                    }
                }
            }


        }
    },
    ValidateEmail: function(containerDiv, ctrl) {
        Utils.HideLabel(containerDiv);
        $.Watermark.HideAll();
        if (ctrl.value != "" && $("#hdnEmailExpression").val() != "") {
            if (Utils.CheckInputAgainstExpression(ctrl.value, $("#hdnEmailExpression").val()) == null) {
                $("#dvInvalidInput").text(Register.InValidInputMSG + " in " + EmailLabel);
                document.getElementById(ctrl.id).className = "ErrorInput";
                document.getElementById(containerDiv).className = "ContentRowError";
                $.Watermark.ShowAll();
                $("#" + containerDiv + " > div:nth-child(3)").text($("#dvInvalidInput").text());
                Utils.ShowError(containerDiv);
            } else {
                document.getElementById(ctrl.id).className = "";
                document.getElementById(containerDiv).className = "ContentRow";
                $.Watermark.ShowAll();
                $("#" + containerDiv + " > div:nth-child(3)").text("");
                Utils.HideError(containerDiv);
            }
        } else {
            var result = Register.ValidateEmptyField(ctrl, containerDiv);
            if (result) {
                document.getElementById(ctrl.id).className = "";
                document.getElementById(containerDiv).className = "ContentRow";
                $.Watermark.ShowAll();
                $("#" + containerDiv + " > div:nth-child(3)").text("");
                Utils.HideError(containerDiv);
            }
            else {
                $.Watermark.ShowAll();
            }
        }
    },
    ValidateZip: function(ctrl) {
        if (ctrl.value != "" && $("#hdnZipExpression").val() != "") {
            if (Utils.CheckInputAgainstExpression(ctrl.value, $("#hdnZipExpression").val()) == null) {
                $("#dvInvalidInput").text(Register.InValidInputMSG + " in " + ZipLabel);
                $.Watermark.ShowAll();
                Utils.ShowMessage("dvInvalidInput");
            }
        }
    },
    DisplayFinalMessage: function() {
        $("#dvContent").hide();
        $("#dvHeader").hide();
        $("#Submit").hide();
        $("#bottomText").hide();
        $("#dvFinalMessage").show();
    },
    CheckInputAgainstExpression: function(input, expression) {
        //var express =  new RegExp("^\d{4}-\d{4}$");
        var objExpress = new RegExp(eval("/" + expression + "/"));
        //var objExpress = new RegExp(/^(011[ 0-9])|(1?[- ]?([(]?[2-9]{1}\d{2}[)]?[- ]?\d{3}[- ]?\d{4})([ ]?(ext|Ext|EXT|x|X|Ex|ex)?[.]?[ ]?\d{1,6})?)$/);
        return input.match(objExpress);
    },
    ReadPrices: function() {
        var url = "../AjaxPage.aspx/GetMaxMinBedPrice";
        $.ajax({
            type: "POST",
            url: url,
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
                if (data.d != "x") {
                    var obj = eval('[' + data.d + ']')[0];
                    var priceDetails = obj.lineOneBeds + " One Bedroom Homes from " + obj.lineOneMin + " to " + obj.lineOneMax;
                    priceDetails = priceDetails + "<br/>" + obj.lineTwoBeds + " Two Bedroom Homes from " + obj.lineTwoMin + " to " + obj.lineTwoMax;
                    //priceDetails = priceDetails + "<br/>" + obj.lineThreeBeds + " Three Bedroom Homes from " + obj.lineThreeMin + " to " + obj.lineThreeMax;
                    $("#dvPriceDetails").html(priceDetails);
                }
            },
            fail: function() {
                alert("unable!");
            }
        });
    },
    ShowLabel: function(containerDiv) {
        var ctrl = $("#" + containerDiv + " > div:nth-child(2) > div:nth-child(1)").children(1);
        $("#" + containerDiv + " > div:nth-child(1)").css('height', '0').animate({ height: "20px" }, 100, function() { $("#" + containerDiv + " > div:nth-child(1)").show(); ctrl.focus(); });
    },
    ValidateAndHide: function(containerDiv, ctrl) {
        Utils.HideLabel(containerDiv, ctrl);
        $.Watermark.HideAll();
        if (ctrl.value == "") {
            var result = Register.ValidateEmptyField(ctrl, containerDiv);
            if (result) {
                document.getElementById(ctrl.id).className = "";
                $("#" + containerDiv + " > div:nth-child(3)").text("");
                Utils.HideError(containerDiv);
            }
        }
        else {
            document.getElementById(ctrl.id).className = "";
            if (document.getElementById(containerDiv).className != "SurveyContentRow") {
                document.getElementById(containerDiv).className = "ContentRow";
            }
            $("#" + containerDiv + " > div:nth-child(3)").text("");
            Utils.HideError(containerDiv);
        }
        $.Watermark.ShowAll();
    },
    HideLabel: function(containerDiv) {
        $("#" + containerDiv + " > div:nth-child(1)").css('height', '20').animate({ height: "0px" }, 100, function() { $("#" + containerDiv + " > div:nth-child(1)").hide(); });
    },
    HideError: function(containerDiv) {
        //$("#" + containerDiv + " > div:nth-child(3)").css('height', '20').animate({ height: "0px" }, 100, function() { $("#" + containerDiv + " > div:nth-child(3)").hide(); });
        $("#" + containerDiv + " > div:nth-child(3)").hide();
    },
    ShowError: function(containerDiv) {
        if ($("#" + containerDiv + " > div:nth-child(3)").text() != "") {
            //$("#" + containerDiv + " > div:nth-child(3)").show().css('height', '0').animate({ height: "20px" }, 100);
            $("#" + containerDiv + " > div:nth-child(3)").show();
        }
    }
}
var prevOrgSC = "";
$(document).ready(function () {
    Register.PrepareUI();
    $("#btnSubmit").bind("click", function () {
        Register.SubmitForm();
    });
    $("#ddlOrgSC").change(function () {
        var prevNotes = $("#txtNotes").val();
        if ($("#ddlOrgSC").val() == "0") {
            if (prevOrgSC != "") {
                if (prevNotes.indexOf(prevOrgSC) != -1) {
                    $("#txtNotes").val(prevNotes.replace(prevOrgSC, ""));
                }
            }
        }
        else {
            var newOrgSC = "Originating Property: " + document.getElementById("ddlOrgSC")[document.getElementById("ddlOrgSC").selectedIndex].text;
            if (prevNotes.indexOf(prevOrgSC) != -1) {
                $("#txtNotes").val(prevNotes.replace(prevOrgSC, newOrgSC));
            }
            else {
                $("#txtNotes").val(prevNotes + " " + newOrgSC);
            }
            prevOrgSC = newOrgSC;
        }
    });
});
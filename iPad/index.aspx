<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="Aareas247Marketing.index" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>BentRentNJ.com</title>
    <link rel="stylesheet" href="resources/css/ext-touch.css" type="text/css">
    <link rel="stylesheet" href="resources/css/sink.css" type="text/css">
    <link rel="stylesheet" type="text/css" href="../css/iPad.css" />

    <script src="../js/jquery-1.3.2.min.js" type="text/javascript"></script>

    <script language="javascript" type="text/javascript">
    var plantomoveText="{text: 'How soon do you plan to move?',cls: 'ParentList',value:'0', items:[";
    var petNameText="{text: 'Do you have a pet?',cls: 'ParentList',value:'1', items:[";
    var bedText="{text: 'How many bedrooms do you need?',cls: 'ParentList',value:'2', items:[";
    var TownText="{text: 'Where would you like to live?',cls: 'ParentList',value:'3', items:[";
    var BudgetText="{text: 'What is your budget?',cls: 'ParentList',value:'4', items:[";
    
    var plantomove = <%= _PlanToMove %>;
    var petmove = <%= _PetNames %>;
    var bedmove = <%= _Beds %>;
    var Townmove = <%= _Town %>;
    var Budgetmove = <%= _Budget %>;
   
    var plantomoveeval = eval(plantomove);
    for (var i = 0; i < plantomoveeval.length; i++) 
    {
        if(i!=plantomoveeval.length-1)
            plantomoveText+="{text:'"+plantomoveeval[i].answerstext+"',value:'move_"+plantomoveeval[i].answerskey+"'},";        
        else 
            plantomoveText+="{text:'"+plantomoveeval[i].answerstext+"',value:'move_"+plantomoveeval[i].answerskey+"'}";        
    }
     plantomoveText+="]}";

    
    var petmoveeval = eval(petmove);
    for (var i = 0; i < petmoveeval.length; i++) 
    {
        if(i!=petmoveeval.length-1)
            petNameText+="{text:'"+petmoveeval[i].answerstext+"',value:'pet_"+petmoveeval[i].answerskey+"'},";        
        else 
            petNameText+="{text:'"+petmoveeval[i].answerstext+"',value:'pet_"+petmoveeval[i].answerskey+"'}";        
    }
     petNameText+="]}";
    
    
    
    var bedeval = eval(bedmove);
    for (var i = 0; i < bedeval.length; i++) 
    {
        if(i!=bedeval.length-1)
            bedText+="{text:'"+bedeval[i].answerstext+"',value:'bed_"+bedeval[i].answerskey+"'},";        
        else 
            bedText+="{text:'"+bedeval[i].answerstext+"',value:'bed_"+bedeval[i].answerskey+"'}";        
    }
     bedText+="]}";
     
    var Towneval = eval(Townmove);
    for (var i = 0; i < Towneval.length; i++) 
    {
        if(i!=Towneval.length-1)
            TownText+="{text:'"+Towneval[i].answerstext+"',value:'city_"+Towneval[i].answerskey+"'},";        
        else 
            TownText+="{text:'"+Towneval[i].answerstext+"',value:'city_"+Towneval[i].answerskey+"'}";        
    }
     TownText+="]}";
     
     var Budegteval = eval(Budgetmove);
    for (var i = 0; i < Budegteval.length; i++) 
    {
        if(i!=Budegteval.length-1)
            BudgetText+="{text:'"+Budegteval[i].answerstext+"',value:'rent_"+Budegteval[i].answerskey+"'},";        
        else 
            BudgetText+="{text:'"+Budegteval[i].answerstext+"',value:'rent_"+Budegteval[i].answerskey+"'}";        
    }
     BudgetText+="]}";
     
     
    var ListItem=eval("["+plantomoveText+","+petNameText+","+bedText+","+TownText+","+BudgetText+"]");
    

   function GenerateFilterString() {
            var retString = "";
            var hdnCity = document.getElementById("hdnCity").value;
            var hdnHomeSize = document.getElementById("hdnHomeSize").value;
            var hdnRent = document.getElementById("hdnRent").value;
            if (hdnCity != "") {
                retString = "City_" + hdnCity;
            }

            if (hdnHomeSize != "") {
                retString = retString + "|" + "Bed_" + hdnHomeSize;
            }
            if (hdnRent != "") {
                var ObjSplit = hdnRent.split(' - ');
                retString = retString + "|" + "Rent_" + ObjSplit[0] + "^" + ObjSplit[1];
            }
            return retString == "" ? "Clear" : retString;
        }            
    </script>

    <script type="text/javascript" src="ext-touch-debug.js"></script>

    <script type="text/javascript" src="src/iPad.js"></script>

</head>
<body onload="window.scrollTo(0,1)">
    <form id="form1" runat="server">
    <input type="hidden" id="hdnSC" value="" />
    <input type="hidden" id="hdnCity" value="" />
    <input type="hidden" id="hdnHomeSize" value="" />
    <input type="hidden" id="hdnRent" value="" />
    <input type="hidden" id="hdnPet" value="" />
    <input type="hidden" id="hdnMove" value="" />
    <div id="dvInnerTextBanner" style="display: none;">
        <div id="dvCommunityFilter" style="font-family: Verdana; font-size: 10pt; font-weight: bold;
            padding-left: 20px; padding-top: 20px; color: Gray">
            [sccount] Communities Filtered on:
        </div>
        <div style="height: 15px; padding-left: 20px;">
            <div id="dvTownshipsFilter" style="float: left; width: 70%; font-family: Verdana;
                font-size: 8pt; font-weight: normal; color: Gray">
                Preferred Townships: [city]
            </div>
            <div id="dvFilterCount" style="float: right; width: 30%; text-align: left; font-family: Verdana;
                font-size: 8pt; font-weight: normal; color: Gray">
                showing [com] Communities</div>
        </div>
        <div id="dvAllFilter" style="font-family: Verdana; font-size: 8pt; font-weight: normal;
            padding-left: 20px; color: Gray">
            Home Size: [bedcount] Bed rooms | [rent] Budget | Moving in [move] Days | Have a
            pet:[pet]
        </div>
        <div style="height: 20px">
        </div>
        <div>
            <table cellspacing='0' cellpadding='0' style='width: 100%; height: 50px;'>
                <tr>
                    <td align='center' style='width: 40%; font-family: Verdana; font-size: 9pt; font-weight: normal;
                        color: Gray'>
                        Community Name
                    </td>
                    <td align='center' style='width: 20%; font-family: Verdana; font-size: 9pt; font-weight: normal;
                        color: Gray'>
                        1Bedrooms From
                    </td>
                    <td align='center' style='width: 20%; font-family: Verdana; font-size: 9pt; font-weight: normal;
                        color: Gray'>
                        2Bedrooms From
                    </td>
                    <td align='center' style='width: 20%; font-family: Verdana; font-size: 9pt; font-weight: normal;
                        color: Gray'>
                        3Bedrooms From
                    </td>
                </tr>
            </table>
        </div>
        <div style="width: 100%; height: 2px; padding-left: 10px;">
            <div style="width: 98%; height: 2px; background-color: #d8d5d5;">
            </div>
        </div>
    </div>
    <div style="display: none">
        <div id="dvThankYou" runat="server">
        </div>
        <div id="dvReqMessage" runat="server">
        </div>
        <div id="dvEmail" runat="server">
        </div>
    </form>
</body>
</html>

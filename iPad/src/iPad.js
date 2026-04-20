Ext.ns('sink', 'demos', 'Ext.ux');
Ext.ux.UniversalUI = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: 'card',

    items: [{
        cls: 'launchscreen',
        scroll: 'vertical',
        html: '<div id="dvInner"></div>'
}],
        initComponent: function() {
            this.backButton = new Ext.Button({
                hidden: true,
                text: 'Back',
                ui: 'back',
                handler: this.onBackButtonTap,
                scope: this
            });

            this.navigationButton = new Ext.Button({
                //hidden: Ext.platform.isPhone || Ext.orientation == 'landscape',
                text: 'Navigation',
                handler: this.onNavButtonTap,
                scope: this
            });
            this.ClearButton = new Ext.Button({
                text: 'Clear Search',
                ui: 'dark',
                handler: this.onNavButtonClear,
                scope: this
            });

            this.navigationBar = new Ext.Toolbar({
                ui: 'dark',
                dock: 'top',
                title: this.title,
                items: [this.backButton, this.navigationButton].concat(this.buttons || [])

            });
            this.navigationBarLeft = new Ext.Toolbar({
                ui: 'metal',
                dock: 'top',
                title: this.title,
                items: this.ClearButton
            });
            this.SubmitButton = new Ext.Button({
                text: 'Submit to BestRentNJ.com',
                handler: this.onNavButtonSubmit,
                scope: this
            });

            this.BottomBar = new Ext.Toolbar({
                ui: 'light',
                title: this.title,
                items: [this.SubmitButton]

            });


            this.buttonsGroup2 = [{
                xtype: 'splitbutton',
                activeButton: 0,
                scroll: false,
                items: [{
                    text: 'Detailed Search',
                    cls: 'OptionButton',
                    handler: this.tapHandler
                }, {
                    text: 'Featured',
                    cls: 'OptionButton',
                    handler: this.tapHandler
                }

]
}];


                this.navigationPanel = new Ext.NestedList({
                    items: [eval(ListItem)],
                    width: 260,
                    height: 300,
                    top: 0,
                    left: 0,
                    //hidden: !Ext.platform.isPhone && Ext.orientation == 'portrait',
                    toolbar: Ext.platform.isPhone ? this.navigationBar : null,
                    listeners: {
                        listchange: this.onListChange,
                        scope: this
                    }
                });

                this.RegistrationPanel = new Ext.form.FormPanel({
                    scroll: false,
                    dock: 'left',
                    width: 275,
                    height: 650,
                    items: [this.navigationBarLeft].concat([this.buttonsGroup2].concat([{
                        xtype: 'fieldset',
                        items: [
                                 {
                                     xtype: 'textfield',
                                     name: 'firstname',
                                     placeholder: 'First Name'
                                 },
                                     {
                                         xtype: 'textfield',
                                         name: 'lastname',
                                         placeholder: 'Last Name'
                                     },
                                      {
                                          xtype: 'textfield',
                                          name: 'phonenumber',
                                          placeholder: 'Phone Number'
                                      },
                                       {
                                           xtype: 'textfield',
                                           name: 'email',
                                           placeholder: 'Email Address'
                                       }
                                                                ]
                    }

                                ])).concat(this.navigationPanel).concat([{
                                    xtype: 'fieldset',
                                    items: [{
                                        xtype: 'textfield',
                                        name: 'aboutus',
                                        placeholder: 'Comments'
}]
}]).concat(this.BottomBar)
                });



                this.dockedItems = this.dockedItems || [{
                    dock: 'top',
                    html: '<div id="dvBanner" class="launchscreen" style="height:135px;"></div>'
}];
                    this.dockedItems.unshift(this.navigationBar);

                    if (!Ext.platform.isPhone && Ext.orientation == 'landscape') {
                        this.dockedItems.unshift(this.RegistrationPanel);
                    }
                    else if (Ext.platform.isPhone) {
                        this.items = this.items || [];
                        this.items.unshift(this.RegistrationPanel);
                    }

                    this.addEvents('navigate');

                    Ext.ux.UniversalUI.superclass.initComponent.call(this);
                },

                onListChange: function(list, item) {
                    var prefix = "";
                    var hndName = "";
                    if (item.value == "0") {
                        prefix = "move_";
                        hndName = "#hdnMove"
                    }
                    else if (item.value == "1") {
                        prefix = "pet_";
                        hndName = "#hdnPet"
                    }
                    else if (item.value == "2") {
                        prefix = "bed_";
                        hndName = "#hdnHomeSize"
                    }
                    else if (item.value == "3") {
                        prefix = "city_";
                        hndName = "#hdnCity"
                    }
                    else if (item.value == "4") {
                        prefix = "rent_";
                        hndName = "#hdnRent"
                    }
                    var matchText = $(hndName).val().split(',');
                    if (matchText.length > 1) {
                        for (var j = 0; j < matchText.length; j++) {
                            for (var i = 0; i < list.lists[1].items.items.length; i++) {
                                if (list.lists[1].items.items[i].value == prefix + matchText[j]) {
                                    list.lists[1].items.items[i].addClass("ChildList");
                                    break;
                                }
                            }
                        }
                    }
                    else {
                        for (var i = 0; i < list.lists[1].items.items.length; i++) {
                            if (list.lists[1].items.items[i].value == prefix + $(hndName).val()) {
                                list.lists[1].items.items[i].addClass("ChildList");
                                break;
                            }
                        }
                    }

                    if (!item.items) {
                        var value = item.value.split('_');
                        var donotRemove = false;
                        if (value[0] == "bed") {
                            if ($("#hdnHomeSize").val() == value[1]) {
                                $("#hdnHomeSize").val("");
                                donotRemove = true;
                            }
                            else {
                                $("#hdnHomeSize").val(value[1]);
                            }
                        }
                        else if (value[0] == "city") {
                            if ($("#hdnCity").val().toString().search(new RegExp(value[1])) < 0) {
                                if ($("#hdnCity").val().length > 0)
                                    $("#hdnCity").val($("#hdnCity").val() + "," + value[1]);
                                else
                                    $("#hdnCity").val(value[1]);
                            }
                            else {
                                donotRemove = true;
                                item.removeClass("ChildList");
                                var splitText = $("#hdnCity").val().split(',');
                                if (splitText.length > 1) {
                                    $("#hdnCity").val("");
                                    for (var k = 0; k < splitText.length; k++) {
                                        if (splitText[k] != value[1]) {
                                            $("#hdnCity").val($("#hdnCity").val() + splitText[k] + ",");
                                        }
                                    }
                                    $("#hdnCity").val($("#hdnCity").val().toString().substring(0, $("#hdnCity").val().length - 1));
                                }
                                else {
                                    $("#hdnCity").val("");
                                }
                            }
                        }
                        else if (value[0] == "rent") {
                            if ($("#hdnRent").val() == value[1]) {
                                $("#hdnRent").val("");
                                donotRemove = true;
                            }
                            else {
                                $("#hdnRent").val(value[1]);
                            }
                        }
                        else if (value[0] == "move") {
                            if ($("#hdnMove").val() == value[1]) {
                                $("#hdnMove").val("");
                                donotRemove = true;
                            }
                            else {
                                $("#hdnMove").val(value[1]);
                            }
                        }
                        else if (value[0] == "pet") {
                            if ($("#hdnPet").val() == value[1]) {
                                $("#hdnPet").val("");
                                donotRemove = true;
                            }
                            else {
                                $("#hdnPet").val(value[1]);
                            }
                        }
                        if (value[0] != "city") {
                            for (var i = 0; i < list.lists[1].items.items.length; i++) {
                                list.lists[1].items.items[i].removeClass("ChildList");
                            }
                        }
                        if (!donotRemove)
                            item.addClass("ChildList");


                        var temppanel = this.RegistrationPanel;

                        var strSearch = GenerateFilterString();
                        Ext.Ajax.request({
                            url: 'Ajax.ashx?value=Detailed&searchstring=' + strSearch,
                            success: function(response, opts) {
                                var text = response.responseText.split('|_');
                                $('#dvInner').html(text[0]);
                                var banner = $('#dvInnerTextBanner').html();
                                banner = banner.replace("[sccount]", $('#hdnSC').val());
                                banner = banner.replace("[com]", text[1]);
                                banner = banner.replace("[city]", $('#hdnCity').val());
                                banner = banner.replace("[bedcount]", $('#hdnHomeSize').val());
                                banner = banner.replace("[rent]", $('#hdnRent').val());
                                banner = banner.replace("[move]", $('#hdnMove').val());
                                banner = banner.replace("[pet]", $('#hdnPet').val());
                                $('#dvBanner').html(banner);

                                if (Ext.orientation == 'portrait' && !Ext.platform.isPhone && !item.items && !item.preventHide) {
                                    temppanel.hide();

                                }
                            }
                        })
                    }
                    this.fireEvent('navigate', this, item, list);
                },

                onNavButtonTap: function() {
                    this.RegistrationPanel.showBy(this.navigationButton, 'fade');
                },

                onBackButtonTap: function() {
                    this.setCard(this.navigationPanel, { type: 'slide', direction: 'right' });
                    this.currentCard = this.navigationPanel;
                    if (Ext.platform.isPhone) {
                        this.backButton.hide();
                        this.navigationBar.setTitle(this.title);
                        this.navigationBar.doLayout();
                    }
                    this.fireEvent('navigate', this, this.navigationPanel.activeItem, this.navigationPanel);
                },

                onOrientationChange: function(orientation, w, h) {
                    Ext.ux.UniversalUI.superclass.onOrientationChange.call(this, orientation, w, h);

                    if (!Ext.platform.isPhone) {
                        if (orientation == 'portrait') {
                            this.removeDocked(this.RegistrationPanel, false);
                            this.RegistrationPanel.hide();
                            this.RegistrationPanel.setFloating(true);
                            this.navigationButton.show();

                            //Ext.getCmp("ext-comp-1024").addClass("x-toolbar-update");
                        }
                        else {
                            this.RegistrationPanel.setFloating(false);
                            this.RegistrationPanel.show();
                            this.navigationButton.hide();
                            this.insertDocked(0, this.RegistrationPanel);

                            //Ext.getCmp("ext-comp-1024").removeClass("x-toolbar-update");
                        }

                        this.doComponentLayout();
                        this.navigationBar.doComponentLayout();

                    }
                },
                tapHandler: function(button, event) {


                    if (button.text.toLowerCase() == "featured") {
                        Ext.Ajax.request({
                            url: 'Ajax.ashx?value=Featured&searchstring=',
                            success: function(response, opts) {
                                var text = response.responseText;
                                $('#dvInner').html(text);
                                //$('#dvBanner').html(text[1]);
                                var banner = $('#dvInnerTextBanner').html();
                                banner = banner.replace("[sccount]", "6");
                                banner = banner.replace("[com]", "6");
                                banner = banner.replace("[city]", "");
                                banner = banner.replace("[bedcount]", "");
                                banner = banner.replace("[rent]", "");
                                banner = banner.replace("[move]", "");
                                banner = banner.replace("[pet]", "");
                                $('#dvBanner').html(banner);
                                if (Ext.orientation == 'portrait' && !Ext.platform.isPhone) {
                                    Ext.ComponentMgr.all.items[39].hide();
                                }
                            }
                        })
                    }
                    else {
                        Ext.Ajax.request({
                            url: 'Ajax.ashx?value=Detailed&searchstring=',
                            success: function(response, opts) {
                                var text = response.responseText.split('|_');
                                $('#dvInner').html(text[0]);
                                var banner = $('#dvInnerTextBanner').html();
                                banner = banner.replace("[sccount]", $('#hdnSC').val());
                                banner = banner.replace("[com]", text[1]);
                                banner = banner.replace("[city]", "");
                                banner = banner.replace("[bedcount]", "");
                                banner = banner.replace("[rent]", "");
                                banner = banner.replace("[move]", "");
                                banner = banner.replace("[pet]", "");
                                $('#dvBanner').html(banner);
                                if (Ext.orientation == 'portrait' && !Ext.platform.isPhone) {
                                    Ext.ComponentMgr.all.items[39].hide();
                                }
                                $("#hdnHomeSize").val("");
                                $("#hdnCity").val("");
                                $("#hdnMove").val("");
                                $("#hdnPet").val("");
                                $("#hdnRent").val("");
                            }
                        })
                    }
                },
                onNavButtonClear: function() {
                    $("#hdnHomeSize").val("");
                    $("#hdnCity").val("");
                    $("#hdnMove").val("");
                    $("#hdnPet").val("");
                    $("#hdnRent").val("");

                    Ext.Ajax.request({
                        url: 'Ajax.ashx?value=Detailed&searchstring=',
                        success: function(response, opts) {
                            var text = response.responseText.split('|_');
                            $('#dvInner').html(text[0]);
                            var banner = $('#dvInnerTextBanner').html();
                            banner = banner.replace("[sccount]", $('#hdnSC').val());
                            banner = banner.replace("[com]", text[1]);
                            banner = banner.replace("[city]", "");
                            banner = banner.replace("[bedcount]", "");
                            banner = banner.replace("[rent]", "");
                            banner = banner.replace("[move]", "");
                            banner = banner.replace("[pet]", "");
                            $('#dvBanner').html(banner);
                            if (Ext.orientation == 'portrait' && !Ext.platform.isPhone) {
                                Ext.ComponentMgr.all.items[39].hide();
                            }
                        }
                    })
                },
                onNavButtonSubmit: function() {

                    var Preference = "Town_" + $('#hdnCity').val() + "|Pet_" + $('#hdnPet').val() + "|HomeSize_" + $('#hdnHomeSize').val() + "|Rent_$" + $('#hdnRent').val().split(' - ')[0] + " - $" + $('#hdnRent').val().split(' - ')[1] + "|Move_" + $('#hdnMove').val();
                    var FName = this.RegistrationPanel.items.items[2].items.items[0].getValue();
                    var LName = this.RegistrationPanel.items.items[2].items.items[1].getValue();
                    var Phone = this.RegistrationPanel.items.items[2].items.items[2].getValue();
                    var Email = this.RegistrationPanel.items.items[2].items.items[3].getValue();

                    var tempPanel = this.RegistrationPanel;

                    if ($.trim(FName).length == 0 || $.trim(LName).length == 0 || $.trim(Email).length == 0) {
                        alert($('#dvReqMessage').html());
                        return false;
                    }
                    Ext.Ajax.request({
                        url: "Ajax.ashx?contactemail=" + Email,
                        success: function(response, opts) {
                            if (response.responseText != "-1") {
                                var y = window.confirm($('#dvEmail').html())
                                if (y) {
                                    Ext.Ajax.request({
                                    url: "Ajax.ashx?Preferences=" + Preference + "&FName=" + FName + "&LName=" + LName + "&Phone=" + Phone + "&Email=" + Email + "&CustomerID=" + response.responseText,
                                        success: function(response, opts) {
                                            if (response.responseText == "done") {
                                                if (Ext.orientation == 'portrait' && !Ext.platform.isPhone) {
                                                    Ext.ComponentMgr.all.items[39].hide();
                                                }
                                                alert($('#dvThankYou').html());
                                                tempPanel.items.items[2].items.items[0].setValue("");
                                                tempPanel.items.items[2].items.items[1].setValue("");
                                                tempPanel.items.items[2].items.items[2].setValue("");
                                                tempPanel.items.items[2].items.items[3].setValue("");
                                                tempPanel.items.items[4].items.items[0].setValue("");
                                                Ext.Ajax.request({
                                                    url: 'Ajax.ashx?value=Detailed&searchstring=',
                                                    success: function(response, opts) {
                                                        var text = response.responseText.split('|_');
                                                        $('#dvInner').html(text[0]);
                                                        var banner = $('#dvInnerTextBanner').html();
                                                        banner = banner.replace("[sccount]", $('#hdnSC').val());
                                                        banner = banner.replace("[com]", text[1]);
                                                        banner = banner.replace("[city]", "");
                                                        banner = banner.replace("[bedcount]", "");
                                                        banner = banner.replace("[rent]", "");
                                                        banner = banner.replace("[move]", "");
                                                        banner = banner.replace("[pet]", "");
                                                        $('#dvBanner').html(banner);
                                                        if (Ext.orientation == 'portrait' && !Ext.platform.isPhone) {
                                                            Ext.ComponentMgr.all.items[39].hide();
                                                        }
                                                        $("#hdnHomeSize").val("");
                                                        $("#hdnCity").val("");
                                                        $("#hdnMove").val("");
                                                        $("#hdnPet").val("");
                                                        $("#hdnRent").val("");
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }
                            }
                            else {

                                Ext.Ajax.request({
                                url: "Ajax.ashx?Preferences=" + Preference + "&FName=" + FName + "&LName=" + LName + "&Phone=" + Phone + "&Email=" + Email + "&CustomerID=-1",
                                    success: function(response, opts) {
                                        if (response.responseText == "done") {
                                            if (Ext.orientation == 'portrait' && !Ext.platform.isPhone) {
                                                Ext.ComponentMgr.all.items[39].hide();
                                            }
                                            alert($('#dvThankYou').html());
                                            tempPanel.items.items[2].items.items[0].setValue("");
                                            tempPanel.items.items[2].items.items[1].setValue("");
                                            tempPanel.items.items[2].items.items[2].setValue("");
                                            tempPanel.items.items[2].items.items[3].setValue("");
                                            tempPanel.items.items[4].items.items[0].setValue("");
                                            Ext.Ajax.request({
                                                url: 'Ajax.ashx?value=Detailed&searchstring=',
                                                success: function(response, opts) {
                                                    var text = response.responseText.split('|_');
                                                    $('#dvInner').html(text[0]);
                                                    var banner = $('#dvInnerTextBanner').html();
                                                    banner = banner.replace("[sccount]", $('#hdnSC').val());
                                                    banner = banner.replace("[com]", text[1]);
                                                    banner = banner.replace("[city]", "");
                                                    banner = banner.replace("[bedcount]", "");
                                                    banner = banner.replace("[rent]", "");
                                                    banner = banner.replace("[move]", "");
                                                    banner = banner.replace("[pet]", "");
                                                    $('#dvBanner').html(banner);
                                                    if (Ext.orientation == 'portrait' && !Ext.platform.isPhone) {
                                                        Ext.ComponentMgr.all.items[39].hide();
                                                    }
                                                    $("#hdnHomeSize").val("");
                                                    $("#hdnCity").val("");
                                                    $("#hdnMove").val("");
                                                    $("#hdnPet").val("");
                                                    $("#hdnRent").val("");
                                                }
                                            })
                                        }
                                    }
                                })
                            
                            }
                        }
                    })


                }
            });

            sink.Main = {
                init: function() {
                    this.ui = new Ext.ux.UniversalUI({
                        title: Ext.platform.isPhone ? 'Sink' : '',
                        listeners: {
                            scope: this
                        }
                    });

                }
            }
            Ext.setup({
                tabletStartupScreen: 'resources/img/loading1.gif',
                phoneStartupScreen: 'resources/img/loading1.gif',
                glossOnIcon: false,

                onReady: function() {
                    sink.Main.init()
                    var makeAjaxRequest = function() {
                        Ext.Ajax.request({
                            url: 'Ajax.ashx?value=Detailed&searchstring=',
                            success: function(response, opts) {
                                var text = response.responseText.split('|_');
                                $('#dvInner').html(text[0]);
                                $('#hdnSC').val(text[1]);
                                var banner = $('#dvInnerTextBanner').html();
                                banner = banner.replace("[sccount]", $('#hdnSC').val());
                                banner = banner.replace("[com]", text[1]);
                                banner = banner.replace("[city]", "");
                                banner = banner.replace("[bedcount]", "");
                                banner = banner.replace("[rent]", "");
                                banner = banner.replace("[move]", "");
                                banner = banner.replace("[pet]", "");
                                $('#dvBanner').html(banner);
                            }
                        })
                    };
                    makeAjaxRequest();
                }
            });
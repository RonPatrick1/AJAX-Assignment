// CIS 371 AJAX Assignment 15
// Ron Patrick
// Calendar-View.js

function CalendarView(model) {
    this._model = model;
}

CalendarView.prototype = {
    initCalendar : function() {
        var defaultTitle=document.cookie;
        if(defaultTitle.length) {
            if(defaultTitle.indexOf("title=")!=-1) {
                var arr=defaultTitle.split("title=");
                defaultTitle=decodeURIComponent(arr[1]).replace(/\+/g,' ');
                if(defaultTitle.indexOf(";")==-1) {
                    document.getElementById("defaultTitle").setAttribute("value",defaultTitle);
                }
                else {
                    arr=defaultTitle.split(";");
                    document.getElementById("defaultTitle").setAttribute("value",arr[0]);
                }
            }
        }

        var yellowTheme="a:hover { text-decoration: none;color: rgba(231, 233, 255, 0.89);}";
        yellowTheme+="a {color: rgba(16, 20, 95, 0.94);}";
        yellowTheme+=".today {color: #ffffff;background-color: rgba(109, 107, 152, 0.8);}";
        yellowTheme+="td.normalDay {background-color: rgba(146, 142, 26, 0.6);color: rgba(16, 20, 95, 0.94);}";
        yellowTheme+=".month th {background-color: rgba(109, 107, 152, 0.9);color: #fff30a;}";
        var blueTheme="a:hover {text-decoration: none;color: rgb(255, 18, 0);}";
        blueTheme+="a {color: rgba(16, 20, 95, 0.94);}";
        blueTheme+=".today {color: rgba(16, 20, 95, 0.94);background-color: rgba(109, 107, 152, 0.8);}";
        blueTheme+="td.normalDay {background-color: rgba(0, 80, 208, 0.6);color: rgba(16, 20, 95, 0.94);}";
        blueTheme+=".month th {background-color: rgba(181, 178, 255, 0.9);color: #030082;}";
        var purpleTheme="a:hover {text-decoration: none;color: rgb(255, 243, 244);}";
        purpleTheme+="a {color: rgba(87, 0, 77, 0.94)}";
        purpleTheme+=".today {color: rgba(87, 0, 77, 0.94);background-color: rgba(147, 16, 152, 0.8);}";
        purpleTheme+="td.normalDay {background-color: rgba(119, 43, 208, 0.72);color: rgba(87, 0, 77, 0.94);}";
        purpleTheme+=".month th {background-color: rgba(117, 20, 255, 0.9);color: rgb(255, 241, 241);}";
        var greenTheme="a:hover {text-decoration: none;color: rgb(255, 243, 244);}";
        greenTheme+="a {color: rgba(0, 87, 7, 0.94);}";
        greenTheme+=".today {color: rgba(0, 87, 7, 0.94);background-color: rgba(0, 152, 12, 0.8);}";
        greenTheme+="td.normalDay {background-color: rgba(0, 165, 78, 0.52);color: rgba(0, 87, 7, 0.94);}";
        greenTheme+=".month th {background-color: rgb(0, 140, 17);color: rgb(255, 241, 241);}";

        var css;
        var aColor=String(document.getElementById("firstColor").getAttribute("src"));
        var bColor=aColor.split("-");
        var cColor=[];
        if(!bColor[1]) {
            cColor[0]="Blue";
        } else {
            cColor = bColor[1].split(".");
        }
        document.getElementById("yellowOption").removeAttribute("selected");
        document.getElementById("blueOption").removeAttribute("selected");
        document.getElementById("purpleOption").removeAttribute("selected");
        document.getElementById("greenOption").removeAttribute("selected");
        switch(cColor[0]) {
            case "Yellow":
                css=yellowTheme;
                document.getElementById("yellowOption").setAttribute("selected","");
                break;
            case "Blue":
                css=blueTheme;
                document.getElementById("blueOption").setAttribute("selected","");
                break;
            case "Purple":
                css=purpleTheme;
                document.getElementById("purpleOption").setAttribute("selected","");
                break;
            case "Green":
                css=greenTheme;
                document.getElementById("greenOption").setAttribute("selected","");
        }
        var style = document.createElement('style');

        style.appendChild(document.createTextNode(css));
        document.getElementsByTagName('head')[0].appendChild(style);
        this._model.getEventTitles();
    },

    onClickFill : function(element) {
        var arr = element.id.split("-");
        var date = arr[0];
        var title = arr[1];
        var desc = "";
        var start = "";
        var end = "";
        if (title == "new") {
            title = "";
            document.getElementById("newEvent").value = "true";
            document.getElementById("eventTitle").value = title;
            document.getElementById("oldTitle").value = title;
            document.getElementById("eventDate").value = date;
            document.getElementById("oldDate").value = date;
            document.getElementById("eventStart").value = start;
            document.getElementById("eventEnd").value = end;
            document.getElementById("eventDescription").value = desc;
        }
        else {
            this._model.getOneEvent(date,title);
        }
    }
};
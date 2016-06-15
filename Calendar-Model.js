// CIS 371 AJAX Assignment 15
// Ron Patrick
// Calendar-Model.js

function CalendarModel() {
    this.month = document.getElementById("month").innerHTML;
    this.year = document.getElementById("year").innerHTML;
    this.days = document.getElementById("days").innerHTML;    
}

CalendarModel.prototype = {
    getMonth : function() {
        return this.month;
    },

    getYear : function() {
        return this.year;
    },

    getDays : function() {
        return this.days;
    },

    GetElementInsideContainer : function(containerID, childID) {
        var elm = {};
        var elms = document.getElementById(containerID).getElementsByTagName("*");
        for (var i = 0; i < elms.length; i++) {
            if (elms[i].id === childID) {
                elm = elms[i];
                break;
            }
        }
        return elm;
    },

    getEventTitles : function() {
        var ajax = new XMLHttpRequest();
        ajax.open("GET", "getEvents.php?month=" + this.month + "&year=" + this.year + "&days=" + this.days);
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                var events = ajax.responseXML.getElementsByTagName("event");
                var nRows = events.length;
                for (var i = 0; i < nRows; i++) {
                    var date = events[i].getElementsByTagName("date")[0].innerHTML;
                    var title = events[i].getElementsByTagName("title")[0].innerHTML;
                    var element = model.GetElementInsideContainer(date, "normalDayContent");
                    var iHTML = element.innerHTML;
                    iHTML = iHTML + '<a id="' + date + '-' + title + '" onclick="view.onClickFill(this);" href="#openModal">';
                    iHTML = iHTML + title + '</a>';
                    if(i!=(nRows-1)) {
                        iHTML = iHTML + '<br>';
                    }
                    element.innerHTML = iHTML;
                }
            }
        };
        ajax.send();  
    },

    getOneEvent : function(date,title) {
        var ajax = new XMLHttpRequest();
        ajax.open("GET", "getOneEvent.php?date=" + date + "&title=" + title);
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                var events = ajax.responseXML.getElementsByTagName("event");
                var nRows = events.length;
                for (var i = 0; i < nRows; i++) {
                    start = events[i].getElementsByTagName("startTime")[0].innerHTML;
                    end = events[i].getElementsByTagName("stopTime")[0].innerHTML;
                    desc = events[i].getElementsByTagName("desc")[0].innerHTML;
                }
                document.getElementById("newEvent").value = "false";
                document.getElementById("eventTitle").value = title;
                document.getElementById("oldTitle").value = title;
                document.getElementById("eventDate").value = date;
                document.getElementById("oldDate").value = date;
                document.getElementById("eventStart").value = start;
                document.getElementById("eventEnd").value = end;
                document.getElementById("eventDescription").value = desc;
            }
        };
        ajax.send();
    }
};
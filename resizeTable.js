
function resizeTable() {

    var table=document.getElementById("cal");

    var nRows=table.rows.length;
    var maxWidth=0;
    var maxHeight=0;
    var maxBreaks=0;
    for(i=0;i<nRows;i++) {
        for(j=0;j<7;j++) {
            var wCell=table.rows[i].cells[j];
            var w;
            var h;
            var brCount;
            function waitSome() {
                try {
                    w=wCell.offsetWidth;
                    h=wCell.offsetHeight;
                    brCount=wCell.getElementsByTagName("br").length;
                }
                catch(err) {
                    setTimeout(waitSome, 50);//wait 50 millisecnds then recheck
                }
            }
            waitSome();
            if(w>maxWidth) {
                maxWidth=w;
            }
            if(h>maxHeight) {
                maxHeight=h;
            }
            if(brCount>maxBreaks){
                maxBreaks=brCount;
            }
        }
    }
    if(maxBreaks<3) {
        maxBreaks=3;
    }
    for(j=0;j<7;j++) {
        table.rows[0].cells[j].width=maxWidth;
    }
    for(i=1;i<nRows;i++) {
        for(j=0;j<table.rows[i].cells.length;j++) {
            table.rows[i].cells[j].width=maxWidth;
            table.rows[i].cells[j].height=maxHeight;
            for(k=table.rows[i].cells[j].getElementsByTagName("br").length;k<=maxBreaks;k++) {
                table.rows[i].cells[j].innerHTML=table.rows[i].cells[j].innerHTML+"<br>";
            }
        }
    }
}

function onClickFill(element) {
    var arr=element.id.split("-");
    var date=arr[0];
    var title=arr[1];
    var desc="";
    var start="";
    var end="";
    if(title=="new") {
        title="";
        document.getElementById("newEvent").value="true";
        document.getElementById("eventTitle").value=title;
        document.getElementById("oldTitle").value=title;
        document.getElementById("eventDate").value=date;
        document.getElementById("oldDate").value=date;
        document.getElementById("eventStart").value=start;
        document.getElementById("eventEnd").value=end;
        document.getElementById("eventDescription").value=desc;
    }
    else {
        var ajax = new XMLHttpRequest();
        ajax.open("GET", "getOneEvent.php?date="+date+"&title="+title);
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                var events=ajax.responseXML.getElementsByTagName("event");
                var nRows=events.length;
                for(var i=0;i<nRows;i++) {
                    start=events[i].getElementsByTagName("startTime")[0].innerHTML;
                    end=events[i].getElementsByTagName("stopTime")[0].innerHTML;
                    desc=events[i].getElementsByTagName("desc")[0].innerHTML;
                }
                document.getElementById("newEvent").value="false";
                document.getElementById("eventTitle").value=title;
                document.getElementById("oldTitle").value=title;
                document.getElementById("eventDate").value=date;
                document.getElementById("oldDate").value=date;
                document.getElementById("eventStart").value=start;
                document.getElementById("eventEnd").value=end;
                document.getElementById("eventDescription").value=desc;
            }
        };
        ajax.send();
    }
}

function getEvents() {
    var month=document.getElementById("month").innerHTML;
    var year=document.getElementById("year").innerHTML;
    var days=document.getElementById("days").innerHTML;
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "getEvents.php?month="+month+"&year="+year+"&days="+days);
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            var events=ajax.responseXML.getElementsByTagName("event");
            var nRows=events.length;
            for(var i=0;i<nRows;i++) {
                var date=events[i].getElementsByTagName("date")[0].innerHTML;
                var title=events[i].getElementsByTagName("title")[0].innerHTML;
                var iHTML=document.getElementById(date).innerHTML;
                iHTML=iHTML+"<br>"+"<a id=\""+date+"-"+title+"\" onclick=\"onClickFill(this);\" href=\"#openModal\">"+title+"</a>";
                document.getElementById(date).innerHTML=iHTML;
            }
            resizeTable();
        }
    };
    ajax.send();

}

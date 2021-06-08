$(document).ready(function () {
    var calendarItems = []
    var refreshTime;

    var current, location, forecast=[];
    var newsHeadlines= [];
    const dateTime = () => {
        var e = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            t = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            a = new Date(),
            i = a.getYear();
        1e3 > i && (i += 1900);
        var s = a.getDay(),
            n = a.getMonth(),
            r = a.getDate();
        10 > r && (r = "0" + r);
        var l = a.getHours(),
            c = a.getMinutes(),
            h = a.getSeconds(),
            o = "AM";
        l >= 12 && (o = "PM");
        l > 12 && (l -= 12);
        0 === l && (l = 12);
        9 >= c && (c = "0" + c);
        9 >= h && (h = "0" + h);
        setDay(e[s]);
        setMonth(t[n]);
        setDate(r);
        setYear(i);


        setHoursAndMinutes(l + ':' + c)
        setSecond(h);
        setPart(o);
    }

    // Set the count down timer
    if ($('.countdown').length) {
        var count = $('.countdown').data('count');
        var template = $('.countdown').html();
        $('.countdown').countdown(count, function (event) {
            $(this).html(event.strftime(template));
        });
    }


    const updateCalendar = () => {
        if (calendarItems.length <= 0) {
            $('#calendaCorner-Left').html('<i class="far fa-calendar-times d-flex justify-content-center align-items-center text-white" id="calendaCorner-Icon"></i><span id="calendaCorner-Description">Calendar</span>');
            $('#calendaCorner-Right').html('<h4>No Calendar Items</h4>');
            $('#calendarTable tbody').empty();
        }
        else if (calendarItems.length === 1) {
            $('#calendaCorner-Left').html('<i class="' +
                getIcon(calendarItems[0].EventTypeName) +
                ' d-flex justify-content-center align-items-center text-white" id="calendaCorner-Icon"></i><span id="calendaCorner-Description">Upcoming</span>');

            $('#calendaCorner-Right').html('<span id="calendaCorner-Event" class="col-12 px-0">' +
                calendarItems[0].eventName +
                '</span><span id="calendaCorner-Event-1">' +
                getDateDiffs(calendarItems[0].dateTime)
                + '</span><span id="calendaCorner-Event-Date" class="ml-3">' +
                calendarItems[0].dateTime
                + '</span>');
        } else {
            // console.log(calendarItems);
            $('#calendaCorner-Left').html('<i class="' +
                getIcon(calendarItems[0].EventTypeName) +
                ' d-flex justify-content-center align-items-center text-primary" id="calendaCorner-Icon"></i><span id="calendaCorner-Description">Upcoming</span>');

            $('#calendaCorner-Right').html('<span id="calendaCorner-Event" class="col-12 px-0">' +
                calendarItems[0].eventName +
                '</span><span id="calendaCorner-Event-1">' +
                getDateDiffs(calendarItems[0].dateTime)
                + '</span><span id="calendaCorner-Event-Date" class="ml-3">' +
                calendarItems[0].dateTime
                + '</span>');
            $('#calendarTable tbody').empty();
            calendarItems.forEach((item, index) => {
                if (index > 0 && index < 5) {
                    $('#calendarTable tbody').append('' +
                        '<tr>' +
                        ' <td><span><i class="' +
                        getIcon(item.EventTypeName)
                        + ' calendaCorner-Icon"></i></span></td>' +
                        '<td class="s">' + item.eventName + '</td>' +
                        '<td class="small text-right">'+getDateDiffs(item.dateTime)+'</td>'
                        + '</tr>'
                    );
                }
            });
        }

    }

    function getIcon(params) {
        let icon;
        switch (params) {
            case 'Birthday':
                icon = 'fas fa-birthday-cake'
                break;
            case 'Project':
                icon = 'fas fa-business-time'
                break;
            case 'Public Holiday':
                icon = 'far fa-calendar-check '
                break;
            case 'Meeting':
                icon = 'fas fa-handshake'
                break;
            case 'Reminder':
                icon = "far fa-clock"
                break;
            default:
                icon = "far fa-calendar"
                break;
        }
        return icon;
    }

    function getMinus(params) {
        return new Date(params) - new Date();
    }
    function getDateDiffs(unformatted) {


        let dateDiff = getMinus(unformatted);



        if (dateDiff > 0 && dateDiff < 1000 * 60) {
            relativeDelta = "In a Min"
        } else if (dateDiff < 1000 * 60 * 60) {
            let number = Math.floor(dateDiff / (1000 * 60))
            relativeDelta = `In ${number} Mins`
        }
        else if (dateDiff < 1000 * 60 * 60 * 24) {
            let number = Math.floor(dateDiff / (1000 * 60 * 60))
            relativeDelta = `In ${number} Hours`
        }
        else if (dateDiff < 1000 * 60 * 60 * 24 * 7) {
            let number = Math.floor(dateDiff / (1000 * 60 * 60 * 24))
            relativeDelta = `In ${number} Days`
        }
        else if (dateDiff < 1000 * 60 * 60 * 24 * 30) {
            let number = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 7))
            relativeDelta = `In ${number} Weeks`
        }
        else if (dateDiff < 1000 * 60 * 60 * 24 * 365) {
            let number = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 30))
            relativeDelta = `In ${number} Months`
        }
        else {
            relativeDelta = "Tooo Big"
        }

        return relativeDelta;


    }

    function scanDeleteAndSort(param) {
        calendarItems.forEach((e, index) => {
            if (getMinus(e.dateTime) < 0) {
                socket.emit('update_mirror')
            }

        });

    }

    function setDay(params) {
        $('#dateCorner-Day').text(params);
    }
    function setMonth(params) {
        $('#dateCorner-Month').text(params);
    }
    function setDate(params) {
        $('#dateCorner-set-Date').text(params);
    }
    function setYear(params) {
        $('#dateCorner-Year').text(params);
    }
    function setHoursAndMinutes(params) {
        $('#dateCorner-MinutesAndHours').text(params)
    }
    function setSecond(params) {
        $('#dateCorner-Seconds').text(params)
    }
    function setPart(params) {
        $('#dateCorner-PmOrAm').text(params)
    }


    let socket;
    socket = io.connect('http://127.0.0.1:5005')
    socket.on('calendar_update', function (msg) {
        console.log(msg);
        calendarItems = msg.items
        //$.getJSON('http://127.0.0.1:5005/calendar',
        //    function (data, textStatus, jqXHR) {
        //        console.log(data);
        //        calendarItems = data.items
        //        console.log(textStatus);
        //    }
        //);
    });
    //'https://api.openweathermap.org/data/2.5/forecast/daily?q=chinhoyi&cnt=3&appid=6bddd259787886f8dd9584cf157c1bfd'
    fetch('https://api.weatherapi.com/v1/forecast.json?key=bf6cfff3323648d8b03132743210406&q=chinhoyi&days=10')
    .then(response => response.json())
    .then(data=>{
       // console.log(data);
        forecast= data.forecast.forecastday;
        current= data.current;
        location = data.location;
        updateWeather();
    });


    //$.get("https://cdn.feedcontrol.net/1166/2068-Sjg3nFeLJ1NFw.xml", 
    //    function (data, textStatus, jqXHR) {
    //        console.log(data);
    //    },
    //    "dataType"
    //);

    //https://createfeed.fivefilters.org/extract.php?url=https%3A%2F%2Fwww.herald.co.zw%2Fcategory%2Farticles%2Ftop-stories%2F&item=%23sirius-article-list+.hentry.sirius-card&item_title=h3.entry-title.list-article-title&item_desc=p.entry-summary
    fetch('https://cdn.feedcontrol.net/1166/2068-Sjg3nFeLJ1NFw.json')
    .then(response => response.json())
    .then(data=>{
      // console.log(data);
        newsHeadlines = data.rss.channel.item
        updateNews()
    });

    function updateWeather() {
        console.log(forecast);
        console.log(current);
        console.log(location);
        if (forecast.length ===0) {
            $('#weatherCorner-Top').html(
            '<div class="d-flex flex-column justify-content-center align-items-center" id="weatherCorner-Left"><i class="fas fa-exclamation-triangle d-flex justify-content-center align-items-center text-warning"'+
           '  id="weatherCorner-Icon"></i><span id="weatherCorner-Description">Offline</span></div>'+
           ' <div class="d-flex align-items-center mr-auto" id="weatherCorner-Center"> '+
           '<h4>No internet connection</h4>'+
          ' </div> ');
        }
        else{
            $('#weatherCorner-Top').html(
            '<div class="d-flex flex-column justify-content-center align-items-center" id="weatherCorner-Left">'+
            '<img src="'+ current.condition.icon+'" >'+
            '<span id="weatherCorner-Description" class="font-weight-bold mb-0">'+ current.condition.text +'</span> '+
            '</div>'+
            '<div class="col">'+
            '<div class="row no-gutter">'+
            '<div class="d-flex align-items-center mr-3" id="weatherCorner-Center">'+
            '<span id="weatherCornerReading" class="mb-0 ">'+current.feelslike_c+'</span>'+
            '<span id="WeatherCorner-Center-Degrees">o</span>'+
            '</div>'+
            '<div id="weatherCornerRight">'+
            '<div class="d-flex align-items-start justify-content-center flex-column px-1 h-100" style="font-size:13px"> '+
            '<span >MIN: '+ forecast[0].day.mintemp_c+'</span>'+
            '<span >MAX: '+ forecast[0].day.maxtemp_c+'</span>'+
            '</div>'+
            '</div>'+
            '<div class="col-12 px-0" style="font-size: 13px">'+
            '<span class="text-uppercase font-weight-bold">'+ location.name+', &nbsp;</span>'+
            '<span class="text-uppercase font-weight-bold">'+ location.region+'</span>'+
            '</div>'+
            '</div>'+
            '</div>'
            ).addClass('flex-wrap');

            $('#weatherCorner-Bottom').html(
                '<div class="table-borderless">'+
                '<table id="WeatherTable" class="table table-bordered table-sm border-0 mb-0">'+
                '<thead>'+
                '<tr>'+
                '<th></th>'+
                '<th></th>'+
                '<th class="text-right">Max</th>'+
                '<th class="text-right">Min</th>'+
                '</tr>'+
                '</thead>'+
                '<tbody>'+
                '<tr>'+
                '<td>'+
                '<img width="40"  src="'+forecast[1].day.condition.icon+'"/>'+
                '</td>'+
                '<td>'+forecast[1].date+'</td>'+
                '<td class="text-right">'+forecast[1].day.mintemp_c+'</td>'+
                '<td class="text-right">'+forecast[1].day.maxtemp_c+'</td>'+
                '</tr>'+
                '</tr>'+

                '<tr>'+
                '<td>'+
                '<img width="40"  src="'+forecast[1].day.condition.icon+'"/>'+
                '</td>'+
                '<td>'+forecast[2].date+'</td>'+
                '<td class="text-right">'+forecast[2].day.mintemp_c+'</td>'+
                '<td class="text-right">'+forecast[2].day.maxtemp_c+'</td>'+
                '</tr>'+
                '</tbody>'+
                '</table>'+
                '</div>'
            );
        }
    } 

    function updateNews(){
        console.log( newsHeadlines );
    }   

    setInterval(dateTime, 1e3);
    setInterval(updateCalendar, 1e3);
    setInterval(scanDeleteAndSort, 1e3);

    updateWeather();
    updateNews();
});
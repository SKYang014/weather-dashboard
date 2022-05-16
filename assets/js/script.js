var citySearch = document.querySelector(".city-search");
var key = "38c610d08f06b4cfc6fed5cb4f2ca0ec";
//submitted city var
var formInput = "London";
// breakdown different data calls
var apiDaily = ("https://api.openweathermap.org/data/2.5/weather?q="+ formInput 
+"&appid=38c610d08f06b4cfc6fed5cb4f2ca0ec");
var currentDate = (moment().format("MMM Do YY"));

//var cityFetch = function () {
    fetch(apiDaily)
    .then(function(response) {
        // request was successful
        if (response.ok) {
            return response.json()
            .then(function(data) {
                var currentData = [data.main.temp, data.wind.speed, data.main.humidity];
                var currentParameters= ["Temp: ", "Wind Speeds: ", "Humidity: "];
                
                
                //dailyData = JSON.stringify(dailyData)
                //create elements inside daily div
                //var city = document.createElement('h2')
                var city = $('<h2 class="currentInfoContent">')
                city.html(data.name + " " + currentDate);
                $(".current").append(city);
                //$(".daily").find('h2').html("hello");
                
                for (var i = 0; i < currentData.length; i++) {
                    var currentContent = currentParameters[i] + currentData[i] 
                    var currentInfo = $('<div>')
                    currentInfo.html(currentContent)
                    $(".current").append(currentInfo);
                }
                
                //need to grab latlong
                var lat = data.coord.lat
                var lon = data.coord.lon
                var apiForc = ("https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +
                "&lon=" + lon +"&exclude=minutely,hourly&appid=38c610d08f06b4cfc6fed5cb4f2ca0ec")
                

                //onecall fetch
                    //.emptythe parent div for clear the call
                //pass forcast call into daily call to grab lat long
                fetch(apiForc)
                .then(function(response) {
                // request was successful
                    if (response.ok) {
                        return response.json()
                        .then(function(ddata) {

                            //create function to call UV index for today
                            //parameters for color change on number diffrerences
                            // dynamically create current day info, call infogather
                            var currentUV = $('<div class="UV">')
                            currentUV.html("UV Index: " + ddata.current.uvi)
                            $(".current").append(currentUV);

                            //define parameteres and data


                            for (var j = 0; j < 5; j++) {


                                
                                var date = moment(ddata.daily[j].dt*1000).format("MMM Do YY")
                                var forcastData = ["<br>Date: ", date, 
                                "<br>Temp: ", ddata.daily[j].temp.day,  
                                "<br>Wind Speed: ", ddata.daily[j].wind_speed," MPH",
                                "<br>Humidity: ", ddata.daily[j].humidity]


                                //var forcastParameters = ("Date: ", "Temp: ", "Weather: ",
                                //"Wind Speed: ","Humidity: ")

                                //forcastParameters = [...forcastParameters, ...forcastData]

                                var dailyEl = $(`<div class=" daily_${j} card">`)
                                $(".forcast").append(dailyEl);

                                var icon = (ddata.daily[j].weather[0].icon)
                                var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
                                var iconEl = $("<img class='w-icon'>")
                                //iconEl.className += "w-icon"
                                
                                $(`.daily_${j}`).append(iconEl)
                                $('.w-icon').attr('src', iconurl);

                                //var forcastContent = forcastParameters[j] + forcastData[j] 
                                var forcastInfo = $('<span>')
                                forcastInfo.html(forcastData) 
                                $(`.daily_${j}`).append(forcastInfo)

                                    // for (var i=[0]; i< 5; i++) {
                                    //     var forcastContent = forcastParameters[i] + forcastData[i] 
                                    //     var forcastInfo = $('<div>')
                                    //     forcastInfo.html(forcastContent) 
                                    //     $(".daily").append(forcastInfo)
                                    // }
                                // var forcastData = 
                                // //dt = date?  how to grab only 1 date?  
                                // //how to grab specific time?
                                //     {temp:data.daily[i].temp.day, 
                                //         weather:data.daily[i].weather[0].main,
                                //         wind:data.daily[i].wind_speed, 
                                //         humidity:data.daily[i].humidity}
                                // console.log(forcastData);
                                
                                //create function that gathers dat, temp, wind, humidity 
                                //on 5 day forcast, dynamically create 5 cards, col 2? 
                                //that displays infogather     
                                //var forcast = $('<div class="card col-2">')
                                // forcast.html("<b> Date: " + data.daily[i].dt +" </b>" + 
                                // " Temp: " + data.daily[i].temp.day +
                                // " Weather: " + data.daily[i].weather[0].main +
                                // " Wind Speeds: " + data.daily[i].wind_speed +
                                // " Humidity: " + data.daily[i].humidity);
                                }
                        
                });
            } 
    else {
        alert('Error: city not found');
    }
    })
    .catch(function(error) {
    console.log(error);
    });

            });
        } else {
            alert('Error: city not found');
        }
        })
        .catch(function(error) {
        console.log(error);
        });
//}



// when button on.click, save fetch info in local data, create search history button,
// and run api fetch
//save as an array with json parse loacal stoarage or || []-empty array

//prob need day.js/moment.js - format the DT seconds

//when created button clicked, run saved fetch API

// event listener for search button click
//even listener for created button search history, id by class
citySearch.addEventListener("submit", cityFetch);
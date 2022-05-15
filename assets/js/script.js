
var key = "38c610d08f06b4cfc6fed5cb4f2ca0ec";
//submitted city var
var formInput = "London";

//var apiUrl = ("https://api.openweathermap.org/data/2.5/forecast?q=" + formInput +"&appid=38c610d08f06b4cfc6fed5cb4f2ca0ec";
var apiDaily = ("https://api.openweathermap.org/data/2.5/weather?q="+ formInput +"&appid=38c610d08f06b4cfc6fed5cb4f2ca0ec");

var currentDate = (moment().format("MMM Do YY"));
// call weather API
// breakdown different data calls
//prob need day.js/moment.js - format the DT seconds

fetch(apiDaily)
.then(function(response) {
    // request was successful
    if (response.ok) {
        return response.json()
        .then(function(data) {
            var dailyData = [data.main.temp, data.wind.speed, data.main.humidity];
            var dailyParameters= ["Temp: ", "Wind Speeds: ", "Humidity: "];
            
            
            console.log(dailyData);
            //dailyData = JSON.stringify(dailyData)
            //create elements inside daily div
            console.log(dailyData)
            //var city = document.createElement('h2')
            var city = $('<h2 class="currentInfoContent">')
            city.html(data.name + " " + currentDate);
            $(".daily").append(city);
            //$(".daily").find('h2').html("hello");
            
            for (var i = 0; i < dailyData.length; i++) {
                var dailyContent = dailyParameters[i] + dailyData[i] 
                var currentInfo = $('<div>')
                currentInfo.html(dailyContent)
                $(".daily").append(currentInfo);
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
                    .then(function(data) {
                        var currentUV = $('<div class="UV">')
                        currentUV.html("UV Index: " + data.current.uvi)
                        $(".daily").append(currentUV);

                        console.log(data.daily.length);
                        for (var i = 0; i < 5; i++) {
                            var forcastData = 
                            //dt = date?  how to grab only 1 date?  how to grab specific time?
                                {temp:data.daily[i].temp.day, 
                                    weather:data.daily[i].weather[0].main,
                                    wind:data.daily[i].wind_speed, 
                                    humidity:data.daily[i].humidity}
                            console.log(forcastData);
                            //create forcast card element
                            }
                });
} else {
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




// when button on.click, save fetch info in local data, create search history button,
// and run api fetch
//save as an array with json parse loacal stoarage or || []-empty array

//create function that gathers dat, temp, wind, humidity 
//on 5 day forcast, dynamically create 5 cards, col 2? that displays infogather 


//create function to call UV index for today
//parameters for color change on number diffrerences
// dynamically create current day info, call infogather

//when created button clicked, run saved fetch API

// event listener for search button click
//even listener for created button search history, id by class
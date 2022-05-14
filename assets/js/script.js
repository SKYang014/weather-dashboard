
var key = "38c610d08f06b4cfc6fed5cb4f2ca0ec";

//submitted city var
var formInput = "Madison";

//var apiUrl = ("https://api.openweathermap.org/data/2.5/forecast?q=" + formInput +"&appid=38c610d08f06b4cfc6fed5cb4f2ca0ec";
var apiDaily = ("https://api.openweathermap.org/data/2.5/weather?q=London&appid=38c610d08f06b4cfc6fed5cb4f2ca0ec");

var apiForc = ("https://api.openweathermap.org/data/2.5/forecast?lat=51.5085&lon=-0.1257&appid=38c610d08f06b4cfc6fed5cb4f2ca0ec")
var currentDate = (moment().format("MMM Do YY"));
// call weather API
// breakdown different data calls
//prob need moment.js

fetch(apiDaily)
    .then(function(response) {
    // request was successful
    if (response.ok) {
        return response.json()
        .then(function(data) {
            var dailyData = {city:data.name, temp:data.main.temp, wind:data.wind.speed, humidity:data.main.humidity}
            console.log(dailyData);
            //create elements inside daily div
            console.log(data.name)
            var city = document.createElement('h2')
            $(".daily.h2").html('hello');
            $(".daily").append(city);
        
        });
    } else {
        alert('Error: city not found');
    }
    })
    .catch(function(error) {
    console.log(error);
    });

fetch(apiForc)
    .then(function(response) {
    // request was successful
    if (response.ok) {
        return response.json()
        .then(function(data) {
            console.log(data.list.length);
            for (var i = 0; i < data.list.length; i++) {
                var forcastData = 
                //dt = date?  how to grab only 1 date?  how to grab specific time?
                    {temp:data.list[i].main.temp, weather:data.list[i].weather[0].main,
                    wind:data.list[i].wind.speed, humidity:data.list[i].main.humidity}
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


// when button click, save fetch info in local data, create search history button,
// and run api fetch

//create function that gathers dat, temp, wind, humidity 
//on 5 day forcast, dynamically create 5 cards, col 2? that displays infogather 


//create function to call UV index for today
//parameters for color change on number diffrerences
// dynamically create current day info, call infogather

//when created button clicked, run saved fetch API

// event listener for search button click
//even listener for created button search history, id by class
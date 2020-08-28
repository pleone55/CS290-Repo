document.addEventListener('DOMContentLoaded', getWeather)

function getWeather() {
    document.getElementById('get-weather').addEventListener('click', function(event) {
        var apiKey = '&appid=9c232263729a5d8323c4c23d763742c7';
        var req = new XMLHttpRequest();
        var cityInput = document.getElementById('city').value;
        var zip = document.getElementById('zipCode').value;
        var countryInput = ",us";
        var url;

        //if zipcode is filled out
        if(zip.length === 5){ 
            url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}${countryInput}${apiKey}`
        } else {
            url = `http://api.openweathermap.org/data/2.5/weather?q=${cityInput}${countryInput}${apiKey}`;
        }
        

        req.open("GET", url, true);
        req.addEventListener('load', function() {
            if(req.status >= 200 && req.status < 400) {
                var res = JSON.parse(req.responseText);
                weatherResponse(res);
            } else {
                console.log("Sever error");
            }
        });
        req.send();
        event.preventDefault();
    });
}

function weatherResponse(res) {
    document.getElementById('name').textContent = res.name;
    document.getElementById('temp').textContent = res.main.temp;
    document.getElementById('humidity').textContent = res.main.humidity;
}
document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);

  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=0b44a72b73362f2796ee23b1c1f5251d";
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      let results = "";
      results += '<h2>Weather in ' + json.name + "</h2>";
      for (let i=0; i < json.weather.length; i++) {
	       results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += '<h2>' + json.main.temp + "&deg;F</h2>"
      results += "<p>&nbsp;"
      for (let i=0; i < json.weather.length; i++) {
	       results += json.weather[i].description
	        if (i !== json.weather.length - 1)
	         results += ", "
         }
      results += "</p>";
      document.getElementById("weatherResults").innerHTML = results;
    });

  const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=0b44a72b73362f2796ee23b1c1f5251d";
  fetch(url2)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      let forecast = "";
      let day = moment(json.list[0].dt_txt).format('MMMM Do YYYY');
      let currentDay = false;
      let day1 = false;
      let day2 = false;
      let day3 = false;
      let day4 = false;
      let currentDayDiv = "currentDay";
      let day1Div = "day1";
      let day2Div = "day2";
      let day3Div = "day3";
      let day4Div = "day4";
      let day5Div = "day5";
      timeCounter = 0;
      for (let i=0; i < json.list.length; i++) {
        let dataDay = moment(json.list[i].dt_txt).format('MMMM Do YYYY');
        if (day !== dataDay) {
          if (!currentDay) {
            currentDay = true;
            document.getElementById("currentDayHeader").innerHTML = day;
            document.getElementById(currentDayDiv).innerHTML = forecast;
          }
          else if (!day1) {
            day1 = true;
            document.getElementById("day1Header").innerHTML = day;
            document.getElementById(day1Div).innerHTML = forecast;
          }
          else if (!day2) {
            day2 = true;
            document.getElementById("day2Header").innerHTML = day;
            document.getElementById(day2Div).innerHTML = forecast;
          }
          else if (!day3) {
            day3 = true;
            document.getElementById("day3Header").innerHTML = day;
            document.getElementById(day3Div).innerHTML = forecast;
          }
          else if (!day4) {
            day4 = true;
            document.getElementById("day4Header").innerHTML = day;
            document.getElementById(day4Div).innerHTML = forecast;
          }

          day = dataDay;
          forecast = "";
          timeCounter = 0;
        }

        forecast += "<div>";
      	forecast += "<h2>" + moment(json.list[i].dt_txt).format('h:mm:ss a') + "</h2>";
      	forecast += "<p>&nbsp;Temperature: " + json.list[i].main.temp + "&deg;F</p>";
      	forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>';
        forecast += "<p>&nbsp;Wind Speed: " + json.list[i].wind.speed + "mph&nbsp;</p>";
        forecast += "<p>&nbsp;Humidity: " + json.list[i].main.humidity + "%</p>";
        forecast += "</div>";
        ++timeCounter;
        if (timeCounter === 4) {
          forecast += "<br>";
          timeCounter = 0;
        }
      }
      if (!day4) {
        document.getElementById("day4Header").innerHTML = day;
        document.getElementById(day4Div).innerHTML = forecast;
      }
      else {
        document.getElementById("day5Header").innerHTML = day;
        document.getElementById(day5Div).innerHTML = forecast;
      }
    });
});

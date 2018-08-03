$(document).ready(function(){
  //Get city name and country name on click
  $('#get-weather').click(function(){
    var city = $('.city-input').val(); //Variable for city name
    var country = $('.country').val(); //Variable for country code
    //Alert if no city entered
    if(city === ''){
			alert('Enter A City To Search!');
			return;
		}
    
    $('.app-box').hide(); //Hides the search box
    $('.weather-info').html('<h2 class="text-center">Loading...</h2>'); //Loading Text
    
    const key = '118e7c41ae94ab796d6f87993249204f';
    const weatherURL = 'https://api.openweathermap.org/data/2.5/forecast?appid=' + key + '&q=' + city + ',' + country + '&units=imperial';
    
    
    $.ajax({
      url: weatherURL,
      success: function(response){
        let iconCode = response.list[0].weather[0].icon;
        let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        let day = '';  
        //Weather Output Card
        day += '<div class="card text-center mx-auto" style="width: 20rem;">' +
          '<div class="card-body">' + 
          '<h2 class=card-title>' + response.city.name + ', ' + response.city.country +'</h2>' + 
          '<h4 class="card-subtitle mb-2">Forecast: ' + response.list[0].weather[0].description + '</h4>' + 
          '<p class="card-text">' +
            '<strong>Current Temperature: '+ Math.round(response.list[0].main.temp) + String.fromCharCode(176) +'</strong><br>'+
            '<strong>Humidity: ' + response.list[0].main.humidity + String.fromCharCode(37) + 
            '</strong><br>' +
            '<strong>Wind Speed: ' + Math.round(response.list[0].wind.speed) + ' mph' + 
            '</strong><br>' +
          '</p></div></div>' + 
          
          //Button Card
          '<div class="card text-center mx-auto" style="width: 18rem;">' + 
          '<div class="card-body">' +
          '<h5 class="card-title">Looking For Another City?</h5>' +
          '<button class="btn btn-success" id="more-weather">Find More Weather</button>' +
          '</div></div>';
        
        $('.weather-info').toggle();
				$('.weather-info').html(day); //Inserts the weather information into the HTML
        console.log(response);
        
        $('.more-weather').css('display','block');
        $("#more-weather").click(function(e) {
          $(".form-group")[0].reset();
          $(".app-box").show();
          $('.weather-info').toggle();
        });
      },
      error: function(){
        errorMessage();
      },
    }); //Ajax close 
    
  }); //On click close 
  
}); //Doc ready close

//Function in case ENTER is hit instead of button click
$('.city-input').keypress(function(e) {
  var key = e.which;
  if (key == 13) // the enter key code
  {
    $('#get-weather').click();
    return false;
  }
});
  
function errorMessage(){ 
  alert('Not a city in this country! Please search again!');
  document.location.reload(true); 
}
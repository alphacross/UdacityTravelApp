class Trip{
    constructor(city, tripDate, weather, image){
        this.city = city;
        this.tripDate = tripDate;
        this.weather = weather;
        this.image = image;
    }
}

class Weather{
    constructor(high, low, cloud){
        this.high = high;
        this.low = low;
        this.cloud = cloud;
    }
}

async function createTrip(city, date) {
    let res = await fetch(`http://localhost:8081/getCountry?name=${city.replace(/ /g, '+')}`);
    let cityResult = await res.json();
    let cityName = cityResult.name;
    let countryName = cityResult.countryName;
    let lat = cityResult.lat;
    let lng = cityResult.lng;

    let weatherFetch = await fetch(`http://localhost:8081/getWeather?lat=${lat}&long=${lng}`);
    let weatherResult = await weatherFetch.json();
    let weather = new Weather(weatherResult.data[0].high_temp, weatherResult.data[0].low_temp, weatherResult.data[0].weather.description);

    let cityImageFetch = await fetch(`http://localhost:8081/getImage?keyword=${city}`);
    let cityImageResult = await cityImageFetch.text();
    let trip = new Trip(cityName, date, weather, cityImageResult);
    return trip;
}

async function addTrip() {
    let city = document.getElementById('TripLocation').value;
    let date = document.getElementById('TripDate').value;

    if(city.length == 0 || city == '')
    {
        alert('Please key in city!');
        return;
    }

    if(date.length == 0 || date == ''){
        alert('Please key in Date!');
        return;
    }else if(!Client.validateDate(date)){
        alert('Please key in valid date!');
        return;
    }
    let trip = await createTrip(city, date);
    let dateArr = date.split('/');
    let dateTrip = new Date(`${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`);
    let dateDifference = Math.floor((dateTrip - new Date()) / (1000 * 60 * 60 * 24));

    let template = document.getElementsByTagName('template')[0];
    let clone = template.content.cloneNode(true);
    let tripDiv = clone.querySelector('.trip');
    let tripImage = tripDiv.querySelector('.tripImage');
    tripImage.setAttribute('src', trip.image);

    let tripDestination = tripDiv.querySelectorAll('.tripDestination');
    tripDestination.forEach(function (el){
        el.innerHTML = trip.city;
    })

    let tripDate = tripDiv.querySelector('.tripDate');
    tripDate.innerHTML = trip.tripDate;

    let tripCountdown = tripDiv.querySelector('.tripCountdown');
    tripCountdown.innerHTML = dateDifference.toString();
    
    let highWeather = tripDiv.querySelector('.highWeather');
    highWeather.innerHTML = trip.weather.high;

    let lowWeather = tripDiv.querySelector('.lowWeather');
    lowWeather.innerHTML = trip.weather.low;

    let cloudCondition = tripDiv.querySelector('.cloudCondition');
    cloudCondition.innerHTML = trip.weather.cloud;

    let trips = document.getElementById('trips');
    trips.appendChild(clone);
}

function removeTrip(el){
    el.closest('.trip').remove()
}

export { addTrip, removeTrip }
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

async function addTrip(city, date) {
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

function createTripContainer() {

}

export { addTrip, createTripContainer }
// API configuration
const apiUrl = "/assets/data/test.json?";
const urlParams = {
    query: "Norwich",
    access_key: "14e91d4bf3d7f9c1ad2f5670d7f6c204",
};

//sliders
const humiditySlider = document.getElementById("humidity-slider");
const windSlider = document.getElementById("wind-slider");
const temperatureSlider = document.getElementById("temperature-slider");

// wind direction display
const windDirection = document.getElementById("wind-direction");

//values
const temperatureValue = document.getElementById("temperature-value");
const humidityValue = document.getElementById("humidity-value");
const windValue = document.getElementById("wind-value");
const windDirectionValue = document.getElementById("wind-direction-value");

// leaf animation
const leafAnimations = document.getElementsByClassName("leaf");

// cloud animation
const cloudsArray = document.getElementsByClassName("cloud");

// humidity filter
const humidityFilter = document.getElementById("humidity-filter");

// UV index filter
const uvIndexFilter = document.getElementById("uv-index-filter");


// fetches data from the API and updates UI elements accordingly
async function fetchData() {
    try {
        // get reponse from api
        const response = await fetch(apiUrl + new URLSearchParams(urlParams));
        // const response = await fetch(apiURL + new URLSearchParams(urlParams));

        // check response is ok
        if (!response.ok) {
            throw new Error("Response Status: ", response.status);
        }
        // obtain json
        const json = await response.json();

        // update functions with fetched data
        updateHumidity(json.current.humidity);
        updateWind(json.current.wind_speed);
        updateTemperature(json.current.temperature);
        updateWindDirection(json.current.wind_degree);
        updateUvIndexFilter(json.current.uv_index);
        updateCloudMovement(json.current.cloudcover);
        // const cloudCover = Math.random() * 100;
        // updateCloudMovement(cloudCover);
    }
}

// updates wind direct display
// @param{number} newValue - new wind degree value
function updateWindDirection(newValue) {

    windDirection.style.rotate = newValue + "deg";
    windDirectionValue.innerHTML = newValue;


}

// Updates UV index filter opacity
// @param{number} newValue - new UV index value
function updateUvIndexFilter(newValue) {

    uvIndexFilter.style.opacity = (0.6 * Number(newValue)) / 100;

}

//  Updates humidity slider and display
// @param{number} newValue - new humidity value
function updateHumidity(newValue) {

    humiditySlider.value = newValue;
    humidityValue.innerHTML = newValue;

    humidityFilter.style.opacity = (0.5 * Number(newValue)) / 100;

}

// Update wind slider and display
// @param{number} newValue - New wind speed value
function updateWind(newValue) {

    windSlider.value = newValue;
    windValue.innerHTML = newValue;

    let newDuration = ((408 - Number(newValue)) * 11) / 408 + 1;

    if (newDuration < 0.1) newDuration = 0.1;

    for (const leaf of leafAnimations) {
        leaf.style.animationDuration = newDuration + "s";
    }
}

// Updates cloud animation based on cloud cover percentage
// @param{number} newValue - new cloud cover value
function updateCloudMovement(newValue) {
    let cloudNumber = parseInt(Number(newValue) * 0.1)

    let cloudCounter = 0
    for (const cloud of cloudsArray) {

        if (cloudCounter < cloudNumber) {
            cloud.style.visibility = "visible";
            cloud.classList.add("cloud-animation");
        }
        else {
            cloud.style.visibility = "hidden";
            cloud.classList.remove("cloud-animation");
        }

        cloudCounter++;
    }
}

// Updates temperature slider and display
// @param{number} newValue - New temperature value
function updateTemperature(newValue) {

    temperatureSlider.value = newValue;
    temperatureValue.innerHTML = newValue;

}


// set interval to fetch data every 2 seconds
setInterval(fetchData, 2000);
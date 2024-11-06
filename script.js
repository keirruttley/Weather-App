const apiUrl = "/assests/data/test.json";
const urlParams = {
    query: "Norwich",
    access_key: "14e91d4bf3d7f9c1ad2f5670d7f6c204",
};

//sliders
const humiditySlider = document.getElementById("humidity-slider");
const windSlider = document.getElementById("wind-slider");
const temperatureSlider = document.getElementById("temperature-slider");

//values
const temperatureValue = document.getElementById("temperature-value");
const humidityValue = document.getElementById("humidity-value");
const windValue = document.getElementById("wind-value");

//animations
const leafAnimations = document.getElementsByClassName("leaf");

//filter
const humidityFilter = document.getElementById("humidity-filter");


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

        // update functions
        updateHumidity(json.current.humidity);
        updateWind(json.current.wind_speed);
        updateTempature(json.current.tempature);

        console.log(json);
    } catch (error) {
        console.error(error);
    }
}



function updateHumidity(newValue) {

    humiditySlider.value = newValue;
    humidityValue.innerHTML = newValue;

    humidityFilter.style.opacity = (0.5 * Number(newValue)) / 100;

}

function updateWind(newValue) {

    windSlider.value = newValue;
    windValue.innerHTML = newValue;

    let newDuration = ((408 - Number(newValue)) * 11) / 408 + 1;

    if (newDuration < 0.1) newDuration = 0.1;

    for (const leaf of leafAnimations) {
        leaf.style.animationDuration = newDuration + "s";
    }
}

function updateTempature(newValue) {

    temperatureSlider.value = newValue;
    temperatureValue.innerHTML = newValue;

}



setInterval(fetchData, 500);
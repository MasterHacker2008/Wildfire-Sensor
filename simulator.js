//Codespace code:
//Remember to reference
const temperature = document.querySelector("#temperature")
const humidity = document.querySelector("#humidity")

temperature.addEventListener("input", () => {

    const min = temperature.min
    const max = temperature.max
    const currentVal = temperature  .value
    temperature.style.backgroundSize = ((currentVal - min) / (max - min)) * 100 + "% 100%"
} )

humidity.addEventListener("input", () => {

    const min = humidity.min
    const max = humidity.max
    const currentVal = humidity.value
    humidity.style.backgroundSize = ((currentVal - min) / (max - min)) * 100 + "% 100%"
} )
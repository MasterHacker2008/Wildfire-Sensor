//Codespace code:
//Remember to reference

const post_endpoint = "https://wildfire-server.onrender.com/predict" || "http://127.0.0.1:8000/predict"

const temperature = document.querySelector("#temperature")
const humidity = document.querySelector("#humidity")
const formElement = document.querySelector("form")

const probability = document.querySelector("#probability")

temperature.addEventListener("input", () => {

    const min = temperature.min
    const max = temperature.max
    const currentVal = temperature.value
    temperature.style.backgroundSize = ((currentVal - min) / (max - min)) * 100 + "% 100%"
} )

humidity.addEventListener("input", () => {

    const min = humidity.min
    const max = humidity.max
    const currentVal = humidity.value
    humidity.style.backgroundSize = ((currentVal - min) / (max - min)) * 100 + "% 100%"
} )

async function postData(url, data) {
    try{
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        let response_data = await response.json()
        return await response_data
        
    }catch (error){
        console.log(error)
    }
}


formElement.addEventListener("submit", async (e) => {
    e.preventDefault()
    const formData = new FormData(formElement)
    const data = {};

    formData.forEach((value, key) => (data[key] = parseFloat(value)));

    console.log("Request data:", data); 
    
    let response = await postData(post_endpoint, data)
    console.log(response)

    probability.innerText = response.probability + "%"

})


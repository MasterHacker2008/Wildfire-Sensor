const URL = "https://wildfire-server.onrender.com/data"
//const URL = "http://192.168.1.2:8000/data";

const websocket_url = "wss://wildfire-server.onrender.com/ws"
//const websocket_url = "ws://192.168.1.2:8000/ws";

// L stands for latest. These elements are from the latest data section in the HTML, which shows the latest values of temperature, humidity, datetime and probability percentage. 
const Ltemperature = document.querySelector("#Ltemperature");
const Lhumidity = document.querySelector("#Lhumidity");
const Ldate = document.querySelector("#datetime");
const probabilityPercent = document.querySelector("#probability p");

//Initialising variables for charts
let tempChart;
let humidityChart;
let riskChart;

// Function to show wildfire alert
function wildfire_alert() {
  alert("Urgent: Wildfire Alert\n Wildfire detected in the area.");
}


// Fetchs data from the server
async function fetchData(url) {
  try {
    let response = await fetch(url); //Waits for the response from the server
    console.log("Response Status:", response.status);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// Create WebSocket connection.
const socket = new WebSocket(websocket_url);

// Connection opened
socket.addEventListener("open", (event) => {
  socket.send("Hello Server!");
});

// Listen for messages
socket.addEventListener("message", (event) => {
  data = JSON.parse(event.data); // Parse incoming data

  // Check for wildfire alert
  if (data.m_alert == true) {
    wildfire_alert();
  }
  console.log(data);

  // Update latest values
  Ltemperature.innerText = data.temperature + "°C"; 
  Lhumidity.innerText = data.humidity + "%";

  const dt = new Date(data.datetime);
  Ldate.innerText = dt.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // Add temperature point
  tempChart.data.datasets[0].data.push({
    x: dt,
    y: data.temperature,
  });

  // Add humidity point
  humidityChart.data.datasets[0].data.push({
    x: dt,
    y: data.humidity,
  });

  // Update risk doughnut
  proPercent = parseInt(data.prediction);
  probabilityPercent.innerText = proPercent + "%";

  //Takes two values, one for the percentage of risk and the other for the remaining percentage to make a complete doughnut chart.
  riskChart.data.datasets[0].data = [proPercent, 100 - proPercent];

  // Refresh charts
  tempChart.update();
  humidityChart.update();
  riskChart.update();

  
});

(async function () {
  tempElement = document.getElementById("temperature");
  humidityElement = document.getElementById("humidity");
  // Fetch data first
  let data = await fetchData(URL);
  console.log("Data:", data);

  // Map data for charts
  const temperatureData = data.map((entry) => ({
    x: new Date(entry.datetime), // convert string to Date
    y: entry.temperature,
  }));

  const humidityData = data.map((entry) => ({
    x: new Date(entry.datetime),
    y: entry.humidity,
  }));

  let proPercent = 0;

  if (data.length == 0) {
  } else {
    data.reverse();
    Ltemperature.innerText = data[0].temperature + "°C";
    Lhumidity.innerText = data[0].humidity + "%";

    const dt = new Date(data[0].datetime);
    Ldate.innerText = dt.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

    proPercent = parseInt(data[0].prediction);
    probabilityPercent.innerText = proPercent + "%";
  }


  //https://www.chartjs.org/docs/latest/charts/line.html

  // Temperature Chart
  tempChart = new Chart(tempElement, {
    type: "line",
    data: {
      datasets: [
        {
          label: "Temperature",
          data: temperatureData,
          fill: false,
          borderColor: "#386641",
          tension: 0.1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
          },
        },
      },
    },
  });

  // Humidity Chart
  humidityChart = new Chart(humidityElement, {
    type: "line",
    data: {
      datasets: [
        {
          label: "Humidity",
          data: humidityData,
          fill: false,
          borderColor: "#386641",
          tension: 0.1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
          },
        },
      },
    },
  });

  // Risk Doughnut Chart
  riskChart = new Chart(document.getElementById("risk"), {
    type: "doughnut",
    data: {
      datasets: [
        {
          label: "Risk",
          data: [proPercent, 100],
          backgroundColor: ["#386641", "#f2e8cf"],
          hoverOffset: 4,
        },
      ],
    },
    //https://stackoverflow.com/questions/57990859/half-doughnut-chart-with-chart-js
    options: {
      rotation: -90,
      circumference: 180,
    },
  });
})();

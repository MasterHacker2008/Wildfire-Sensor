// const URL = "https://wildfire-server.onrender.com/"

const URL = "https://wildfire-server.onrender.com/data" || "http://192.168.1.22:8000/data";

// const websocket_url = "wss://wildfire-server.onrender.com/ws"
const websocket_url = "wss://wildfire-server.onrender.com/ws" || "ws://192.168.1.22:8000/ws";

const Ltemperature = document.querySelector("#Ltemperature");
const Lhumidity = document.querySelector("#Lhumidity");
const Ldate = document.querySelector("#datetime");
const probabilityPercent = document.querySelector("#probability p");

async function fetchData(url) {
  try {
    let response = await fetch(url);
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
  data = JSON.parse(event.data);
  console.log(data);
  Ltemperature.innerText = data.temperature + "°C";
  Lhumidity.innerText = data.humidity + "%";

  const dt = new Date(data.datetime);
  Ldate.innerText = dt.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  proPercent = parseInt(data.prediction);
  probabilityPercent.innerText = proPercent + "%";
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

  // Temperature Chart
  new Chart(tempElement, {
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
  new Chart(humidityElement, {
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
  new Chart(document.getElementById("risk"), {
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
    options: {
      rotation: -90,
      circumference: 180,
    },
  });
})();

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

(async function () {
  tempElement = document.getElementById("temperature");
  humidityElement = document.getElementById("humidity");
  // Fetch data first
  let data = await fetchData("http://192.168.1.22:8000/data");
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

  if (data.length == 0) {
    
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
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "hour",
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
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "hour",
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
          data: [300, 100],
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
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

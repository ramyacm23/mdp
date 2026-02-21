// Change this if not using mDNS
const endpoint = "http://soilmonitor.local/data";

// If mDNS not working on Windows, use:
// const endpoint = "http://192.168.1.xxx/data";

const gauge = document.getElementById("gauge");
const percentage = document.getElementById("percentage");
const statusText = document.getElementById("status");

function updateUI(moisture) {
  let angle = moisture * 3.6; // Convert % to degrees

  percentage.innerText = moisture + "%";

  if (moisture > 60) {
    gauge.style.background = `conic-gradient(#00ff88 ${angle}deg, #ffffff33 0deg)`;
    statusText.innerText = "✅ Soil Moisture is Sufficient";
    statusText.style.color = "#00ff88";
  } else if (moisture > 30) {
    gauge.style.background = `conic-gradient(#ffc107 ${angle}deg, #ffffff33 0deg)`;
    statusText.innerText = "⚠ Moisture is Adequate";
    statusText.style.color = "#ffc107";
  } else {
    gauge.style.background = `conic-gradient(#ff4d4d ${angle}deg, #ffffff33 0deg)`;
    statusText.innerText = "🚨 Water Required";
    statusText.style.color = "#ff4d4d";
  }
}

function fetchData() {
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      updateUI(data.moisture);
    })
    .catch((error) => {
      statusText.innerText = "❌ Cannot connect to ESP32";
      statusText.style.color = "white";
    });
}

// Update every 2 seconds
setInterval(fetchData, 2000);
fetchData();

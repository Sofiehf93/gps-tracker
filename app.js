navigator.geolocation.getCurrentPosition(
  (pos) => {
    document.getElementById("status").innerText =
      "GPS FUNKAR: " + pos.coords.latitude;
  },
  (err) => {
    document.getElementById("status").innerText =
      "GPS BLOCKAD: " + err.message;
  }
);

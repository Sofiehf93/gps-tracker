const status = document.getElementById("status");

status.innerText = "BEGÄR GPS...";

navigator.geolocation.getCurrentPosition(
  (pos) => {
    status.innerText =
      "GPS FUNKAR: " +
      pos.coords.latitude +
      ", " +
      pos.coords.longitude;
  },
  (err) => {
    status.innerText =
      "GPS FEL: " + err.message;
  },
  {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  }
);

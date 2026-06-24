document.body.innerHTML = "🔥 NY KOD KÖR";

const status = document.getElementById("status");

status.innerText = "TEST STARTAR";

if (!navigator.geolocation) {
  status.innerText = "INGEN GPS SUPPORT";
} else {
  status.innerText = "FRÅGAR GPS...";

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      status.innerText =
        "OK: " +
        pos.coords.latitude +
        ", " +
        pos.coords.longitude;
    },
    (err) => {
      status.innerText =
        "FEL: " + err.message;
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    }
  );
}

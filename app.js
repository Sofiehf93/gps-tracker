const status = document.getElementById("status");

const ably = new Ably.Realtime(
  "Ixi74w.xd6tRQ:GO8CXuRr64SY5ZqgxcDB-2qXxCC_qFZyIzoG68ilV40"
);

const channel = ably.channels.get("gps");

ably.connection.on("connected", () => {
  console.log("ABLY CONNECTED");
});

function sendGPS(lat, lng) {
  channel.publish("move", { lat, lng })
    .then(() => {
      console.log("SENT OK:", lat, lng);
      status.innerText = "✔️ Skickar GPS";
    })
    .catch((err) => {
      console.log("SEND FAIL:", err);
      status.innerText = "❌ SEND FAIL";
    });
}

// GPS (en gång först för test)
navigator.geolocation.getCurrentPosition(
  (pos) => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    status.innerText = "📡 GPS aktiv";

    sendGPS(lat, lng);

    // LIVE tracking
    navigator.geolocation.watchPosition((p) => {
      sendGPS(p.coords.latitude, p.coords.longitude);
    });

  },
  (err) => {
    status.innerText = "⚠️ GPS FEL: " + err.message;
  },
  {
    enableHighAccuracy: true,
    maximumAge: 1000,
    timeout: 15000
  }
);

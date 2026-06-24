const status = document.getElementById("status");

// Ably connection
const ably = new Ably.Realtime(
  "Ixi74w.xd6tRQ:GO8CXuRr64SY5ZqgxcDB-2qXxCC_qFZyIzoG68ilV40"
);

const channel = ably.channels.get("gps");

// Debug connection
ably.connection.on("connected", () => {
  console.log("ABLY CONNECTED");
});

// GPS tracking
navigator.geolocation.watchPosition(

  (position) => {
    console.log("GPS OK", position.coords);

    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    status.innerText = "📤 Skickar GPS...";

    channel.publish("move", { lat, lng })
      .then(() => {
        console.log("SENT OK:", lat, lng);
        status.innerText = "✔️ SENT OK";
      })
      .catch((err) => {
        console.log("SEND FAIL:", err);
        status.innerText = "❌ SEND FAIL";
      });

  },

  (error) => {
    console.log("GPS ERROR:", error);
    status.innerText = "⚠️ Tillåt plats";
  },

  {
    enableHighAccuracy: true,
    maximumAge: 1000,
    timeout: 5000
  }

);

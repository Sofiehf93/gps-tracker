const status = document.getElementById("status");

const ably = new Ably.Realtime(
  "Ixi74w.xd6tRQ:GO8CXuRr64SY5ZqgxcDB-2qXxCC_qFZyIzoG68ilV40"
);

const channel = ably.channels.get("gps");

function isConnected() {
  return ably.connection.state === "connected";
}

ably.connection.on("connected", () => {
  console.log("ABLY CONNECTED");
  status.innerText = "📡 Redo";
});

navigator.geolocation.watchPosition(

  (position) => {

    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    console.log("GPS OK", lat, lng);

    if (!isConnected()) {
      status.innerText = "⏳ Väntar på Ably...";
      return;
    }

    status.innerText = "📤 Skickar GPS...";

    channel.publish("move", { lat, lng })
      .then(() => {
        console.log("SENT OK");
        status.innerText = "✔️ SENT OK";
      })
      .catch((err) => {
        console.log("SEND FAIL", err);
        status.innerText = "❌ SEND FAIL";
      });

  },

  (error) => {
    console.log("GPS ERROR", error);
    status.innerText = "⚠️ Tillåt plats";
  },

  {
    enableHighAccuracy: true,
    maximumAge: 1000,
    timeout: 10000
  }

);const status = document.getElementById("status");

const ably = new Ably.Realtime(
  "Ixi74w.xd6tRQ:GO8CXuRr64SY5ZqgxcDB-2qXxCC_qFZyIzoG68ilV40"
);

const channel = ably.channels.get("gps");

let ablyReady = false;

ably.connection.on("connected", () => {
  console.log("ABLY CONNECTED");
  ablyReady = true;
  status.innerText = "📡 Redo";
});

navigator.geolocation.watchPosition(

  (position) => {

    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    console.log("GPS OK", lat, lng);

    if (!ablyReady) {
      status.innerText = "⏳ Väntar på anslutning...";
      return;
    }

    status.innerText = "📤 Skickar GPS...";

    try {
      channel.publish("move", { lat, lng })
        .then(() => {
          console.log("SENT OK");
          status.innerText = "✔️ SENT OK";
        })
        .catch((err) => {
          console.log("SEND FAIL", err);
          status.innerText = "❌ SEND FAIL";
        });

    } catch (e) {
      console.log("CRASH", e);
      status.innerText = "❌ KRASCH";
    }

  },

  (error) => {
    console.log("GPS ERROR", error);
    status.innerText = "⚠️ Tillåt plats";
  },

  {
    enableHighAccuracy: true,
    maximumAge: 1000,
    timeout: 10000
  }

);

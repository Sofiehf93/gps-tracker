const status =
document.getElementById("status");

const ably =
new Ably.Realtime(
"Ixi74w.xd6tRQ:GO8CXuRr64SY5ZqgxcDB-2qXxCC_qFZyIzoG68ilV40"
);

const channel =
ably.channels.get("gps");

navigator.geolocation.watchPosition(

(position) => {
  console.log("GPS OK", position.coords);

const lat =
position.coords.latitude;

const lng =
position.coords.longitude;

channel.publish("move", { lat, lng })
  .then(() => {
    console.log("SENT OK:", lat, lng);
  })
  .catch((err) => {
    console.log("SEND FAIL:", err);
  });

status.innerText = "📍 GPS aktiv";

  status.innerText = "📤 Skickar GPS...";
},

()=>{

status.innerText =
"⚠️ Tillåt plats";

},

{
enableHighAccuracy:true,
maximumAge:1000,
timeout:5000
}

);

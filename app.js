const status =
document.getElementById("status");

const ably =
new Ably.Realtime(
"Ixi74w.xd6tRQ:GO8CXuRr64SY5ZqgxcDB-2qXxCC_qFZyIzoG68ilV40"
);

const channel =
ably.channels.get("gps");

navigator.geolocation.watchPosition(

(position)=>{

const lat =
position.coords.latitude;

const lng =
position.coords.longitude;

channel.publish(
"move",
{
lat,
lng
}
);

status.innerText =
"📍 GPS aktiv";

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
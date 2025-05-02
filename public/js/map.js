let mapBoxToken = mapToken;
mapboxgl.accessToken = mapBoxToken;
console.log("Mapbox Token:", mapBoxToken);

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: listing_location.geometry.coordinates, // starting position [lng, lat]
  zoom: 12, // starting zoom
});

const el = document.createElement("div");
el.className = "marker fa-brands fa-airbnb";

new mapboxgl.Marker(el)
  .setLngLat(listing_location.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 30 }) // add popups
      .setHTML(
        `<h5>${listing_location.title}</h5><p>Exact location will be provided after booking</p>`
      ) // add content to popup
  )
  .addTo(map);

// votre code JS
var mymap = L.map("mapid").setView([48.8534, 2.3488], 12);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoianVsaWVua29tcCIsImEiOiJjanR1NGFuYjkxMmNvNDBucGI1aXZ4Y285In0.hiSplFD5CODUd9yxRO_qkg"
  }
).addTo(mymap);

var marker = L.marker([48.85837, 2.294481]).addTo(mymap);
marker.bindPopup("<b>Tour Effeil</b><br>Monument").openPopup();

var marker = L.marker([48.864824, 2.334595]).addTo(mymap);
marker.bindPopup("<b>Musée du Louvre</b><br>Musée").openPopup();

async function getData() {
  let url =
    "https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=date_start+%3E%3D+%23now()+AND+date_start+%3C+%23now(months%3D1)&rows=50&facet=category&facet=tags&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type";
  let response = await fetch(url);

  let data = await response.json();

  data.records.forEach(function(event) {
    if (!event.fields.lat_lon) {
      return;
    }
    // le titre de l'événement
    let title = event.fields.title;
    // la latitude
    let latitude = event.fields.lat_lon[0];
    // la longitude
    let longitude = event.fields.lat_lon[1];
    // on pourrait récupérer d'autres infos..
    let address_name = event.fields.address_name;

    // pour tester, on les affiche dans la console
    console.log(title + " " + latitude + " " + longitude + " " + address_name);

    // .. mais ce serait mieux de les afficher sur la carte !
    var marker = L.marker([latitude, longitude]).addTo(mymap);
    marker.bindPopup(title + " - " + address_name).openPopup();
  });
}

getData();

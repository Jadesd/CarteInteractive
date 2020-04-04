// votre code JS
var mymap = L.map("mapid").setView([48.8534, 2.3488], 12);
var layerGroup = L.layerGroup().addTo(mymap);

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
      "pk.eyJ1IjoianVsaWVua29tcCIsImEiOiJjanR1NGFuYjkxMmNvNDBucGI1aXZ4Y285In0.hiSplFD5CODUd9yxRO_qkg",
  }
).addTo(mymap);

var marker = L.marker([48.85837, 2.294481]).addTo(mymap);
marker.bindPopup("<b>Tour Effeil</b><br>Monument").openPopup();

var marker = L.marker([48.864824, 2.334595]).addTo(mymap);
marker.bindPopup("<b>Musée du Louvre</b><br>Musée").openPopup();

async function getData(query) {
  if (query == undefined) {
    query = "";
  }
  let url =
    "https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=" +
    query +
    "&date_start+%3E%3D+%23now()+AND+date_start+%3C+%23now(months%3D1)&rows=50&facet=category&facet=tags&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type";
  let response = await fetch(url);

  let data = await response.json();

  layerGroup.clearLayers();

  data.records.forEach(function (event) {
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
    let date_description = event.fields.date_description;
    let price_type = event.fields.price_type;
    let cover_url = event.fields.cover_url;

    // pour tester, on les affiche dans la console
    console.log(title + " " + latitude + " " + longitude + " " + address_name);

    // .. mais ce serait mieux de les afficher sur la carte !
    var marker = L.marker([latitude, longitude]).addTo(layerGroup);

    marker
      .bindPopup(
        "<div class='title'>" +
          title +
          "</div> <br> " +
          address_name +
          " <br> <div class='date' " +
          date_description +
          "</div> <br> <div class='price'> " +
          price_type +
          "</div> <br> " +
          "<img class=image src='" +
          cover_url +
          "'></img>"
      )
      .openPopup();
  });
}

getData();

function onFormSubmit(event) {
  event.preventDefault();
  console.log("Formulaire envoyé");

  getData(searchInput.value);
}

function searchConcert() {
  getData("concert");
}

function searchFree() {
  getData("gratuit");
}

function searchParis() {
  getData("paris");
}

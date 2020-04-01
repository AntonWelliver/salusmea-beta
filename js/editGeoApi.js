const apiEditGeofence = "https://api.proximi.fi/core/geofences/";
const AuthEditStr = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImlzcyI6ImM4OTA0YzkyLTlmN2MtNGE3Yy1iZDZjLTZiMjBiMTczZDEwZSIsInR5cGUiOiJ1c2VyIiwidXNlciI6IlZlZGVmb3JzIEVtYW51ZWwiLCJ1c2VyX2lkIjoiN2VmNTI2MzctZGFmNy00ZGRlLTljMjAtNGIwNmZhMjJhNTIyIiwidGVuYW50X2lkIjoiYzg5MDRjOTItOWY3Yy00YTdjLWJkNmMtNmIyMGIxNzNkMTBlIn0.mYpZ--Ecuzc37FHCh4oyGj1gdy_CEpvOhQg0vTS0alE");

const geofenceData = {
  "name": "",
  "address": "",
  "area": {
    "lat": "",
    "lng": ""
  },
  "radius": 100,
  "type": "",
  "place_name": "",
  "floor_name": "",
  "department_name": ""
}

var arrayID = {
  "id": sessionStorage.arrayID
}

axios.get(apiEditGeofence + arrayID.id, { headers: { Authorization: AuthEditStr } })

  .then(function (response) {
    var adress = document.getElementById("addressInput");
    adress.value = response.data.address;

    var namn = document.getElementById("nameInput");
    namn.value = response.data.name;

    var type = document.getElementById("selectID");
    type.value = response.data.type;

    var radius = document.getElementById("radiusInput");
    radius.value = response.data.radius;
    radiusOnchange();

    var latitude = document.getElementById("latitudeInput");
    latitude.value = response.data.area.lat;
    latOnchange();

    var longitude = document.getElementById("longitudeInput");
    longitude.value = response.data.area.lng;
    lngOnchange();

    var place = document.getElementById("placeInput");
    place.value = response.data.place_name;

    var floor = document.getElementById("floorInput");
    floor.value = response.data.floor_name;

    var department = document.getElementById("departmentInput");
    department.value = response.data.department_name;
  })
  .catch(function (error) {
    console.log(error);
  })
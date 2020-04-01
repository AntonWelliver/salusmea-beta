const apiGeofence = "https://api.proximi.fi/core/geofences/";
const AuthStr = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImlzcyI6ImM4OTA0YzkyLTlmN2MtNGE3Yy1iZDZjLTZiMjBiMTczZDEwZSIsInR5cGUiOiJ1c2VyIiwidXNlciI6IlZlZGVmb3JzIEVtYW51ZWwiLCJ1c2VyX2lkIjoiN2VmNTI2MzctZGFmNy00ZGRlLTljMjAtNGIwNmZhMjJhNTIyIiwidGVuYW50X2lkIjoiYzg5MDRjOTItOWY3Yy00YTdjLWJkNmMtNmIyMGIxNzNkMTBlIn0.mYpZ--Ecuzc37FHCh4oyGj1gdy_CEpvOhQg0vTS0alE");
const apiFloor = "https://api.proximi.fi/core/floors";
const apiPlace = "https://api.proximi.fi/core/places";

const geofenceData = {
  "name": "",
  "address": "",
  "area": {
    "lat": "",
    "lng": ""
  },
  "radius": "",
  "type": "",
  "place_name": "",
  "floor_name": "",
  "department_name": ""
}

var arrayID = {
  "id": ""
}
var optionValue = sessionStorage.optionValue

var savePlaceId = sessionStorage.savePlaceId
var testUrl = [sessionStorage.urlValue]

console.log(testUrl)

function inputCheck() {

  var NameInput = document.getElementById("nameInput").value;
  geofenceData["name"] = NameInput;

  var AddressInput = document.getElementById("addressInput").value;
  geofenceData["address"] = AddressInput;

  var TypeInput = document.getElementById("selectID").value;
  geofenceData["type"] = TypeInput;

  var LatitudeInput = document.getElementById("latitudeInput").value;
  geofenceData.area.lat = LatitudeInput;

  var LongitudeInput = document.getElementById("longitudeInput").value;
  geofenceData.area.lng = LongitudeInput;

  var RadiusInput = document.getElementById("radiusInput").value;
  geofenceData["radius"] = RadiusInput;

  var PlaceInput = document.getElementById("selectPlaces").value;
  PlaceInput = optionValue;
  geofenceData["place_name"] = PlaceInput;

  var FloorInput = document.getElementById("floorInput").value;
  geofenceData["floor_name"] = FloorInput;

  var DepartmentInput = document.getElementById("departmentInput").value;
  geofenceData["department_name"] = DepartmentInput;

  /* var polygonInput = document.getElementById("polygon"); */
  /*  if(document.getElementById('selectID').value == "polygon"){
     
     var polygonArray = draw.getAll().features[0].geometry.coordinates;
     polygonArray.forEach(updateArea)
     geofenceData["polygon"] = polygonArray;
     
     console.log(polygonArray);
 }else{
   geofenceData["polygon"] = "";
 } */
  axios.post(apiGeofence, geofenceData, {
    headers: { Authorization: AuthStr }
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error.response);
    })
  setTimeout(function () {
    window.location.href = "/index.html"
  }, 1000);
}

var placeArray = [];


var sel = document.getElementById("selectPlaces")
var optSecond = document.createElement('option');


optSecond.innerHTML = "Välj en plats";
optSecond.hidden = "Välj en plats";


sel.appendChild(optSecond);
axios.get(apiPlace, { headers: { Authorization: AuthStr } })
  .then(function (response) {
    for (var i = 0; i < response.data.length; i++) {
      placeArray[i] = (response.data[i]);

      var opt = document.createElement('option');
      opt.value = i;
      opt.innerHTML = placeArray[i].name;
      sel.appendChild(opt);


      /* sessionStorage.clear();  */
    }
    sel.onchange = function () {
      var placeId = placeArray[opt.value].id;
      sessionStorage.savePlaceId = placeId;
      console.log(placeId);
      var placeName = placeArray[opt.value].name;
      sessionStorage.optionValue = placeName;
      console.log(sessionStorage.optionValue);
      /* myTest() */
      waitForPlace()
    }

    opt = document.getElementById("selectPlaces");

  })
  .catch(function (error) {
    console.log(error);
  })

function waitForPlace() {
  var floorArray = []
  var selFloor = document.getElementById("selectFloor")
  var floorArrayName = []
  var floorArrayUrl = []
  var clear = true
  axios.get(apiFloor, { headers: { Authorization: AuthStr } })
    .then(function (response) {
      for (var i = 0; i < response.data.length; i++) {
        floorArray[i] = response.data[i].place_id
        floorArrayName[i] = response.data[i].name
        floorArrayUrl[i] = response.data[i].editor.url

        FloorName = floorArrayName[i]
        floorIDPlace = floorArray[i]
        floorUrl = floorArrayUrl[i]
        /* test123 = sessionStorage.savePlaceId
        console.log(test123); */
        if (sessionStorage.savePlaceId == floorIDPlace) {
          sessionStorage.urlValue = floorUrl;
          sessionStorage.nameValue = FloorName;
          sessionStorage.floorValuePlaceID = floorIDPlace;

          var optFloor = document.createElement('option');
          optFloor.value = i;
          optFloor.id = "optionFloor"
          optFloor.innerHTML = sessionStorage.nameValue;
          /* optFloor.innerHTML = ""; */
          console.log(sessionStorage.nameValue);
          selFloor.appendChild(optFloor);
          optFloor = document.getElementById("selectFloor");


        }
      }

    }).catch(function (error) {
      console.log(error);

    })

}

/* function myTest(){

  sessionStorage.removeItem(nameValue);

} */




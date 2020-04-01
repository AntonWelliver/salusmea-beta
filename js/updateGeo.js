const apiUpdateGeofence = "https://api.proximi.fi/core/geofences/";
const AuthUpdateStr = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImlzcyI6ImM4OTA0YzkyLTlmN2MtNGE3Yy1iZDZjLTZiMjBiMTczZDEwZSIsInR5cGUiOiJ1c2VyIiwidXNlciI6IlZlZGVmb3JzIEVtYW51ZWwiLCJ1c2VyX2lkIjoiN2VmNTI2MzctZGFmNy00ZGRlLTljMjAtNGIwNmZhMjJhNTIyIiwidGVuYW50X2lkIjoiYzg5MDRjOTItOWY3Yy00YTdjLWJkNmMtNmIyMGIxNzNkMTBlIn0.mYpZ--Ecuzc37FHCh4oyGj1gdy_CEpvOhQg0vTS0alE");

const updateGeofenceData = {
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


  function clickUpdateGeoPoint(){
    var NameInput = document.getElementById("nameInput").value;
    updateGeofenceData["name"] = NameInput;
  
    var AddressInput = document.getElementById("addressInput").value;
    updateGeofenceData["address"] = AddressInput;
  
    var TypeInput = document.getElementById("selectID").value;
    updateGeofenceData["type"] = TypeInput;
  
    var LatitudeInput = document.getElementById("latitudeInput").value;
    updateGeofenceData.area.lat = LatitudeInput;
  
    var LongitudeInput = document.getElementById("longitudeInput").value;
    updateGeofenceData.area.lng = LongitudeInput;
  
    var RadiusInput = document.getElementById("radiusInput").value;
    updateGeofenceData["radius"] = RadiusInput;
  
    var PlaceInput = document.getElementById("placeInput").value;
    updateGeofenceData["place_name"] = PlaceInput;
  
    var FloorInput = document.getElementById("floorInput").value;
    updateGeofenceData["floor_name"] = FloorInput;
  
    var DepartmentInput = document.getElementById("departmentInput").value;
    updateGeofenceData["department_name"] = DepartmentInput;

    axios.put(apiUpdateGeofence + arrayID.id, updateGeofenceData, { 
      headers: { 
        Authorization: AuthUpdateStr 
      } 
    })
      
      .then(function(response){
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })

      setTimeout(function(){ 
        location.href='index.html'; 
    }, 2000);

  }
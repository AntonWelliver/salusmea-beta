const apiGeofence = "https://api.proximi.fi/core/geofences";
const apiFloor = "https://api.proximi.fi/core/floors";
const apiPlace = "https://api.proximi.fi/core/places";
const apiDepartments = "https://api.proximi.fi/core/departments";
const AuthStr = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImlzcyI6ImM4OTA0YzkyLTlmN2MtNGE3Yy1iZDZjLTZiMjBiMTczZDEwZSIsInR5cGUiOiJ1c2VyIiwidXNlciI6IlZlZGVmb3JzIEVtYW51ZWwiLCJ1c2VyX2lkIjoiN2VmNTI2MzctZGFmNy00ZGRlLTljMjAtNGIwNmZhMjJhNTIyIiwidGVuYW50X2lkIjoiYzg5MDRjOTItOWY3Yy00YTdjLWJkNmMtNmIyMGIxNzNkMTBlIn0.mYpZ--Ecuzc37FHCh4oyGj1gdy_CEpvOhQg0vTS0alE");

const arrayID = {
  "id": ""
}

//Geofence API
function axiosTest(newArray) {
  var newArray = [];

  axios.get(apiGeofence, { headers: { Authorization: AuthStr } })
    .then(function (response) {
      for (var i = 0; i < response.data.length; i++) {
        newArray[i] = (response.data[i]);
      }

      function generateTable(table, data) {
        /* console.log(data); */
        for (element of data) {
          var row = table.insertRow();
          var name = element.name;
          var type = element.type;
          var address = element.address;
          var place = element.place_name;
          var floor = element.floor_name;
          var department = element.department_name;
          var latitud = element.area.lat;
          var longitud = element.area.lng;
          var createdAt = element.createdAt;
          var getID = element.id;
          var sliceDate = createdAt.slice(0, 10);

          var cell = row.insertCell(0);
          var cell1 = row.insertCell(1);
          var cell2 = row.insertCell(2);
          var cell3 = row.insertCell(3);
          var cell4 = row.insertCell(4);
          var cell5 = row.insertCell(5);
          var cell6 = row.insertCell(6);
          var cell7 = row.insertCell(7);
          var cell8 = row.insertCell(8);
          var cell9 = row.insertCell(9);

          var nameValue = document.createTextNode(name);
          var typeValue = document.createTextNode(type);
          var addressValue = document.createTextNode(address);
          var placeValue = document.createTextNode(place);
          var floorValue = document.createTextNode(floor);
          var departmentValue = document.createTextNode(department);
          var latitudValue = document.createTextNode(latitud);
          var longitudValue = document.createTextNode(longitud);
          var createdAtValue = document.createTextNode(sliceDate);


          if (element.place_name == null) {
            placeValue = document.createTextNode("");
          }
          if (element.floor_name == null) {
            floorValue = document.createTextNode("");
          }
          if (element.department_name == null) {
            departmentValue = document.createTextNode("");
          }

          function createEditButton() {
            const editButton = document.createElement('a');
            editButton.href = 'editGeofence.html';
            editButton.className = 'editIconButton, far fa-edit';
            editButton.id = getID;
            editButton.style = "margin-left: 7px; margin-right: 20px; color: rgb(20, 134, 168); cursor: pointer;"
            editButton.onclick = function () {
              arrayID.id = editButton.id
              sessionStorage.arrayID = editButton.id;
            }
            return editButton;
          }
          function createDeleteButton() {
            var deleteButton = document.createElement('a');
            deleteButton.className = 'deleteIconButton, far fa-trash-alt';
            deleteButton.id = getID;
            deleteButton.style = "color: rgb(248, 97, 97); cursor: pointer;"
            deleteButton.onclick = function () {
              var apiGeofenceDelete = "https://api.proximi.fi/core/geofences/";
              axios.delete(apiGeofenceDelete + deleteButton.id, {
                headers: {
                  Authorization: AuthStr
                }
              })
                .then(function (response) {

                }).catch(function (error) {
                  console.log(error)
                })
              setTimeout(function () { window.location.reload(); }, 300);
            }
            return deleteButton;
          }
          cell.appendChild(nameValue);
          cell1.appendChild(typeValue);
          cell2.appendChild(addressValue);
          cell3.appendChild(placeValue);
          cell4.appendChild(floorValue);
          cell5.appendChild(departmentValue);
          cell6.appendChild(latitudValue);
          cell7.appendChild(longitudValue);
          cell8.appendChild(createdAtValue);
          cell9.appendChild(createEditButton());
          cell9.appendChild(createDeleteButton());
        }
      }
      let table = document.querySelector(".center");
      generateTable(table, newArray);
    })
    .catch(function (error) {
      console.log(error);
    })
}
axiosTest();

/* c */

/* // Floor API
axios.get(apiFloor,{ headers: { Authorization: AuthStr } })
.then(function(response){
  console.log(response.data)
  geofenceFloor.innerHTML = response.data[1].name;

})
.catch(function(error){
  geofenceName.innerHTML = ("error")

})
//Place API
axios.get(apiPlace,{ headers: { Authorization: AuthStr } })
.then(function(response){
  console.log(response.data)
  geofencePlace.innerHTML = response.data[2].name;

})
.catch(function(error){
  geofenceName.innerHTML = ("error")

})
//Departments API
axios.get(apiDepartments,{ headers: { Authorization: AuthStr } })
.then(function(response){
  console.log(response.data)
  geofenceDepartment.innerHTML = response.data[7].name;

})
.catch(function(error){
  geofenceName.innerHTML = ("error")

}) */

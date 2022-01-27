// https://leafletjs.com/reference.html
// https://www.w3schools.com/html/html5_geolocation.asp
// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition

const businesses = ['Coffee', 'Restaurant', 'Hotel', 'Market'];

function generateUIBusinessesList(elem, businesses) {
  let ul = document.createElement('ul');
  ul.style.textAlign = 'left';
    ul.style.padding = 0;
    ul.style.margin = 0;


  // create the businesses list
  businesses.forEach(el => {
    let li = document.createElement('li');
    // console.log(el);
    // li.style.display = 'block'
    li.style.listStyleType = 'none';
    li.innerText = el;
    ul.append(li);
  });
  elem.append(ul);
  return ul;
}

let workingDiv = document.getElementById('ui');
workingDiv.innerHTML = '<h3>Select Business Type:</h3>'
generateUIBusinessesList(workingDiv, businesses);

window.onload = async () => {
  async function setMapLocation() {
    const location = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    return [location.coords.latitude, location.coords.longitude];
  }

  let mapLocation = {
    center: [],
    zoom: 15,
  };
  mapLocation.center = await setMapLocation();

  // Create map:
  const myMap = L.map('map', mapLocation);
  // console.log(mapLocation);

  // Add OpenStreetMap tiles:
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: '15',
  }).addTo(myMap);
};

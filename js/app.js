let cars = [];

const carForm = document.getElementById("carForm");
const carList = document.getElementById("carList");

function displayCars() {
  carList.innerHTML = "";
  cars.forEach((car, index) => {
    const carItem = document.createElement("div");
    carItem.classList.add("car-item");
    carItem.innerHTML = `
            <img class="pic" src="${car.image}" alt="${car.name}">
            <h3>${car.name}</h3>
            <p>Tezlik: ${car.speed} km/h</p>
            <p>Narx: $${car.price} </p>
            <button class="Deletebtn" onclick="deleteCar(${index})">Delete</button>
        `;
    carList.appendChild(carItem);
  });
}

function addCar(event) {
  event.preventDefault();
  const carName = document.getElementById("carName").value;
  const carSpeed = document.getElementById("carSpeed").value;
  const carPrice = document.getElementById("carPrice").value;
  const carImage = document.getElementById("carImage").value;

  if (carName && carSpeed && carPrice && carImage) {
    const car = {
      name: carName,
      speed: carSpeed,
      price: carPrice,
      image: carImage,
    };
    cars.push(car);
    displayCars();
    saveToLocalStorage();
    carForm.reset();
  } else {
    alert("Iltimos, barcha maydonlarni toldiring.");
  }
}

function deleteCar(index) {
  const confirmDelete = confirm("Avtomobilni ochirishga ishonchingiz komilmi?");
  if (confirmDelete) {
    cars.splice(index, 1);
    displayCars();
    saveToLocalStorage();
  }
}

function saveToLocalStorage() {
  localStorage.setItem("cars", JSON.stringify(cars));
}

function loadFromLocalStorage() {
  const storedCars = localStorage.getItem("cars");
  if (storedCars) {
    cars = JSON.parse(storedCars);
    displayCars();
  }
}

carForm.addEventListener("submit", addCar);

loadFromLocalStorage();

displayCars();

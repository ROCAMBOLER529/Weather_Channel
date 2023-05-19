// +----------------------------+
// |                            |
// | JS PARA EL WEATHER CHANNEL |
// |                            |
// +----------------------------+

const input = document.querySelector("input");
let boton = document.querySelector("button");
let div = document.querySelector(".titulo");
let ciudad;

const crearAlert = mensaje => {
    let label = document.createElement("div");
    label.textContent = mensaje;
    label.classList.add("error");
}

const cargarCiudad = () => {
    $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + ciudad +"&appid=fdd533266e28101881f610f2b8f1ebe1", function (data) {
        console.log(data);
        let temperatura = data.main.temp - 273;
    
        document.querySelector(".container").style.visibility = "visible";
        document.querySelector("#ciudad").textContent = data.name;
        document.querySelector("#temperatura").innerHTML = `${parseInt(temperatura)} <sup>°C</sup>`;
        document.querySelector("#wicon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.querySelector("#descripcion").textContent = data.weather[0].description;
    
    }).fail(err => {
        if (err.status == '404') {
            crearAlert("La ciudad no existe");
        }
    });
};

boton.addEventListener("click", () => {
    if (input.value == "") {
        crearAlert("El input está vacio");
    }
    ciudad = input.value;
    cargarCiudad();
    input.value = "";
});







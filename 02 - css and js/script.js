function agregarParrafo(){
    let nuevoParrafo = document.createElement("p");
    nuevoParrafo.innerText = "nuevo pepito";
    document.body.append(nuevoParrafo);

    let bebeParrafo = document.createElement("p");
    bebeParrafo.innerText = "nuevo bebe";
    document.body.appendChild(bebeParrafo);
}
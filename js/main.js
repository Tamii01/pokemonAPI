const botonesHeader = document.querySelectorAll(".btn-header");
const listaPokemon = document.querySelector("#listaPokemon");
let URL = "https://pokeapi.co/api/v2/pokemon/"

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}

function mostrarPokemon(poke) {

    let tipos = poke.types.map((type) =>
        `<p class="${type.type.name} tipo">${type.type.name}</p>`
    );

    let pokeId = poke.id.toString();
    if (pokeId.length === 1){
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2){
        pokeId = "0" + pokeId;
    }

    tipos = tipos.join('');
    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
            <p class="pokemon-id-back">#${poke.id}</p>
                <div class="pokemon-imagen">
                        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
                    </div>
                    <div class="pokemon-info">
                        <div class="nombre-contenedor">
                            <p class="pokemon-id">#${poke.id}</p>
                            <h2 class="pokemon-nombre">${poke.name}</h2>
                        </div>
                        <div class="pokemon-tipos">
                            ${tipos}
                        </div>
                        <div class="pokemon-stats">
                            <p class="stat">${poke.height}m</p>
                            <p class="stat">${poke.weight}kg</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    listaPokemon.append(div);
}

botonesHeader.forEach(boton => boton.addEventListener("click", (e) => {
    const botonId = e.currentTarget.id;

    listaPokemon.innerHTML = ""; //limpiamos la lista para que no se repitan los pokemones

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if (botonId === "ver-todos"){
                    mostrarPokemon(data); //mostramos todos los pokemones
                } else {
                    const tipos = data.types.map(type => type.type.name)
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }//si hay alguno igual al boton que acabamos de apretar
                }
            })
    }
}))

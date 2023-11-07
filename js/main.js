const listapokemon = document.querySelector("#listapokemon");
const botonesHeader = document.querySelectorAll(".btn-header")
const limit_pokemon = 1017;
let URL = "https://pokeapi.co/api/v2/pokemon/";
let pokeInfo = [];

for (let i = 1; i <= limit_pokemon; i++) {
    fetch(URL + i)
        .then((Response) => Response.json())
        .then(data => guardarInfo(data, mostrarpokemon))
}

function guardarInfo(poke, callback) {
    pokeInfo.push(poke);
    if (pokeInfo.length == limit_pokemon) {
        pokeInfo = pokeInfo.sort((a, b) => a.id - b.id)
        callback(pokeInfo);
    }
}

function mostrarpokemon(pokes, type = undefined) {
    listapokemon.innerHTML = "";
    if (type != undefined) {
        pokes = pokes.filter(poke => {
            let tipos = poke.types.map(t => t.type.name);
            return tipos.includes(type);
        })
    }
    var divsPoke = pokes.map((poke) => {
        let tipos = poke.types.map((type) =>
            `<p class="${type.type.name} tipo">${type.type.name}</p>`);
        tipos = tipos.join('');

        let pokeId = poke.id.toString();
        if (pokeId.length === 1) {
            pokeId = "00" + pokeId;
        } else if (pokeId.length === 2) {
            pokeId = "0" + pokeId;
        }
        let div = document.createElement("div");
        div.classList.add("pokemon");
        div.innerHTML = `
            <p class="pokemon-id-back">#${pokeId}</p>
            <div class="pokemon-imagen">
                <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
            </div>
            <div class="pokemon-info">
                <div class="nombre-contenedor">
                    <p class="pokemon-id">#${pokeId}</p>
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
    `;
        return div;
    })

    divsPoke.forEach((div) => { listapokemon.append(div) })
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    let type = event.currentTarget.id;


    if (type === "ver-todos") {
        type = undefined;

    }
    mostrarpokemon(pokeInfo, type);

}))
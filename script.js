var containerPokemon = document.getElementById("container-pokemon");

var botaoAnterior = document.getElementById("anterior");
var botaoProximo = document.getElementById("proximo");

var deslocamentoAtual = 0;
var limite = 9;

function exibirPokemon(listaPokemon) {
    containerPokemon.innerHTML = ""; // Limpa o container
    listaPokemon.forEach((pokemon) => {
        // Buscar detalhes do Pokémon para obter a imagem
        fetch(pokemon.url)
            .then((resposta) => resposta.json())
            .then((detalhes) => {
                var card = document.createElement("div");
                card.classList.add("card-pokemon");

                var nomePokemon = document.createElement("p");
                nomePokemon.classList.add("nome-pokemon");
                nomePokemon.textContent =
                    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

                var imagemPokemon = document.createElement("img");
                imagemPokemon.classList.add("imagem-pokemon");
                imagemPokemon.src = detalhes.sprites.front_default;
                imagemPokemon.alt = pokemon.name;

                card.appendChild(imagemPokemon);
                card.appendChild(nomePokemon);
                containerPokemon.appendChild(card);
            });
    });
}

function buscarPokemon(deslocamento) {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${deslocamento}&limit=${limite}`)
        .then((resposta) => resposta.json())
        .then((dados) => {
            exibirPokemon(dados.results);
            alternarBotoes(deslocamento > 0, dados.next != null);
        });
}

function alternarBotoes(anterior, proximo) {
    botaoAnterior.disabled = !anterior;
    botaoProximo.disabled = !proximo;
}

botaoAnterior.addEventListener("click", () => {
    deslocamentoAtual -= limite;
    buscarPokemon(deslocamentoAtual);
});

botaoProximo.addEventListener("click", () => {
    deslocamentoAtual += limite;
    buscarPokemon(deslocamentoAtual);
});

// Inicializa a busca
buscarPokemon(deslocamentoAtual);

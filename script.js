const pokeName = document.querySelector(".pokeName");
const pokeNumber = document.querySelector(".pokeNum");
const pokeImage = document.querySelector(".pokemon")

const form = document.querySelector(".form");
const input = document.querySelector(".input_poke")
const buttonPrev = document.querySelector('.btnPrev');
const buttonNext = document.querySelector('.btnNext');
let searchPokemon = 1
const btnShiny = document.querySelector(".btnShiny")

function fetchPokemon(pokemon) {
   axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

      .then(function (response) {

         const data = response.data

         pokeName.innerHTML = 'Loading...';
         pokeNumber.innerHTML = '';

         let isShiny = false;
         let normalImage, shinyImage; 
         
         btnShiny.addEventListener('click', () => {
            if (normalImage && shinyImage) { // Verifica se as imagens estão definidas
               pokeImage.src = isShiny ? normalImage : shinyImage;
               isShiny = !isShiny; // Alterna o estado
            }
         });
         
         if (data) {
            pokeImage.style.display = 'block';
            pokeName.innerHTML = data.name;
            pokeNumber.innerHTML = data.id;
            normalImage = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
            shinyImage = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
            pokeImage.src = normalImage;
            isShiny = false;
            input.value = '';
            searchPokemon = data.id;
         }
      
         else {
            pokeImage.style.display = 'none';
            pokeName.innerHTML = 'Not found :c';
            pokeNumber.innerHTML = '';
         }
      })

      .catch(function (error) {
         pokeImage.style.display = 'none';
         pokeName.innerHTML = 'Not found :c';
         pokeNumber.innerHTML = '';
         console.error("Erro ao buscar o Pokémon:", error);
       });
   }

   form.addEventListener('submit', (event) => {
      event.preventDefault();
      fetchPokemon(input.value.toLowerCase());
   });

   buttonPrev.addEventListener('click', () => {
      if (searchPokemon > 1) {
         searchPokemon -= 1;
         fetchPokemon(searchPokemon);
      }
   });

   buttonNext.addEventListener('click', () => {
      searchPokemon += 1;
      fetchPokemon(searchPokemon);
   });

  
   fetchPokemon(searchPokemon);



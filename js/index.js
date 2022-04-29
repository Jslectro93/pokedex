import { setPokemon, setImage } from "./pokedex.js";
import './charts.js'
import { $light } from "./pokedex.js";

const $form = document.querySelector("#form");
const $next = document.querySelector("#next-pokemon");
const $prev = document.querySelector("#prev-pokemon");
const $nextImage = document.querySelector("#next-image");
const $prevImage = document.querySelector("#prev-image");
const $pokedex = document.querySelector("#pokedex");
const $input = document.querySelector('[name="id"]');
const $randomButton = document.querySelector('#randomButton');
const $playButton = document.querySelector('#play');
const $pauseButton = document.querySelector('#pause');


$form.addEventListener("submit", handleSubmit);
$next.addEventListener("click", handleNextPokemon);
$prev.addEventListener("click", handlePrevPokemon);
$nextImage.addEventListener("click", handleNextImage);
$prevImage.addEventListener("click", handlePrevImage);
$randomButton.addEventListener("click", handleRandomButton);
$playButton.addEventListener("click", handlePlayButton);
$pauseButton.addEventListener("click", handlePauseButton);

let activePokemon = null;

async function handleSubmit(event) {
  event.preventDefault(); // no permite que el navegador recargue
  $pokedex.classList.add("is-open");
  const form = new FormData($form);
  const id = form.get("id").toLowerCase();
  speechSynthesis.cancel()
  activePokemon = await setPokemon(id);
}

async function handleNextPokemon() {
  const id =
    activePokemon === null || activePokemon.id === 898
      ? 1
      : activePokemon.id + 1;
  speechSynthesis.cancel()
  activePokemon = await setPokemon(id);
  $input.value = `${activePokemon.name}`
}

async function handlePrevPokemon() {
  const id =
    activePokemon === null || activePokemon.id === 1
      ? 898
      : activePokemon.id - 1;
  speechSynthesis.cancel()
  activePokemon = await setPokemon(id);
  $input.value = `${activePokemon.name}`
}

let activeSprite = 0;

function handleNextImage() {
  if (activePokemon === null) {
    return false;
  }
  if (activeSprite >= activePokemon.sprites.length - 1) {
    activeSprite = 0;
    return setImage(activePokemon.sprites[activeSprite]);
  }
  activeSprite++;
  return setImage(activePokemon.sprites[activeSprite]);
}

function handlePrevImage() {
  if (activePokemon === null) {
    return false;
  }
  if (activeSprite <= 0) {
    activeSprite = activePokemon.sprites.length - 1;
    return setImage(activePokemon.sprites[activeSprite]);
  }
  activeSprite--;
  return setImage(activePokemon.sprites[activeSprite]);
}

async function handleRandomButton() {
  const id = Math.floor((Math.random() * (898 - 1)));
  speechSynthesis.cancel()
  activePokemon = await setPokemon(id); 
  $input.value = `${activePokemon.name}`
}

async function handlePlayButton(){
  speechSynthesis.pause()
  $light.classList.remove("is-animated");
}

async function handlePauseButton(){
  speechSynthesis.resume()
  $light.classList.add("is-animated");
}
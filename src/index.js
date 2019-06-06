import '@babel/polyfill';
import './css/style.css';
import './index.html';

import SearchImage from './searchImageComponent/searchImageComponent.js';



const dogImageSearch = new SearchImage;
dogImageSearch.render();
dogImageSearch.getResults('papillon');









// https://dog.ceo/dog-api/
// https://dog.ceo/api/breed/papillon/images

// ez a fügvény nincs használva
async function getData() {
  const breed = 'hound';
  const response = await fetch('https://dog.ceo/api/breed/'+breed+'/images');
  const data = await response.json();
  console.log(data);
  const container = document.createElement('div');
  container.classList.add('content-container');
  document.querySelector('body').appendChild(container);
   
  // document.createElement('img') = <img src="" alt="">
  const img = document.createElement('img');      
  // az img változónak van src attribútuma, mert az img tag-nek is van. 
  img.src = data.message[1];
  // kiválasztunk egy szülő elemet és abba betöltjük az img tag-et amit létrehoztunk az előbb
  container.appendChild(img);
}

//getData();

import './searchImageComponent.css';
// #LearnAbout: oop vs composition , vagy composition over inheritance...!!!
class SearchImage {
  // tartalom törlésére
  clearContent() {
    const content = document.querySelector('#content');
    content.innerHTML = '';
  }
  // hiba üzenet megjelenítésére
  displayError(message) {

  }

  async getResults(dogbreed) {
    const urlString = 'https://dog.ceo/api/breed/'+dogbreed+'/images';
    const response = await fetch(urlString);
    const data = await response.json();
    // document.createElement('img') = <img src="" alt="">
    // egy vagy két html elem esetén elegendő a document.createElement
    const img = document.createElement('img');      
    // az img változónak van src attribútuma, mert az img tag-nek is van. 
    img.src = data.message[Math.floor(Math.random() * data.message.length )];
    // kiválasztunk egy szülő elemet és abba betöltjük az img tag-et amit létrehoztunk az előbb
    document.querySelector('#content').appendChild(img);
  }
  render() {
    // create the input field and the buton
    const markup = `
      <form class="dog-search">
        <input type="text" id="dogSearchInput">
        <button>Search</button>
      </form>
      `;
    document.querySelector('#search').insertAdjacentHTML('beforeend', markup);
    document.querySelector('.dog-search button').addEventListener('click', (event) => {
      // a html form-tag-en belüli button tag alapértelmezetten úgy működik
      // hogy újratölti az oldalt, ha azt valaki megnyomja

      // ha meg akarjuk szüntetni egy html elem alapértelmezett működését:
      event.preventDefault();
      // a this kulcsszó arra az objektumra utal amit majd létrehozunk
      // ennek a class-nak a példányaként
      this.clearContent();
      // console.log('button is clicked');
      // console.log(event);
      this.getResults(document.querySelector('#dogSearchInput').value);
    });

  }
}

export default SearchImage;

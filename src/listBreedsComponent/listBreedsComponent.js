import './listBreedsComponent.css';
import ContentComponent from '../contentComponent/contentComponent.js';

class ListBreed extends ContentComponent {
  async getResults() {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    if (response.status === 404) {
      this.displayError('Page Not Found!');
      return;
    }
    const data = await response.json();
    console.log(data.message);
    // igy tudunk végig loop-olni egy object-en, key-value páronként:
    for (let breed in data.message) {
      console.log('key: ', breed);
      console.log('value: ',data.message[breed]);
      if (data.message[breed].length !== 0) {
        console.log('van alfaj:'+breed);
        // for.. of ciklust használunk ha tömbön akarunk végigmenni elemenként:
        for(const subBreed of data.message[breed]) {
          const element = document.createElement('div');
          element.innerHTML = subBreed+' '+breed;
          document.querySelector('#content').appendChild(element);
        }
      } else {
        const element = document.createElement('div');
        element.innerHTML = breed;
        document.querySelector('#content').appendChild(element);
      }
    }

  }

  render() {
    const button = document.createElement('button');
    button.classList.add('list-button');
    button.innerHTML = 'List Breeds';
    button.onclick = () => {
      // itt nem kell preventDefault, mert ez nem form html tag-en belüli button
      this.clearContent();
      this.getResults();
    };

    document.querySelector('#search').appendChild(button);
  }
}

export default ListBreed;

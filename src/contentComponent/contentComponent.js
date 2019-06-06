import './contentComponent.css';

export default class ContentComponent {
  // tartalom törlésére
  clearContent() {
    const content = document.querySelector('#content');
    content.innerHTML = '';
  }
  clearErrors() {
    const errors = document.querySelector('.errors');
    //  igy is lehet törölni elemet, és ez gyorsabb működést eredményez
    if (errors.firstChild) {
      errors.removeChild(errors.firstChild);
    }
  }
  // hiba üzenet megjelenítésére
  // Single responsibility principle: 
  displayError(message) {
    this.clearErrors();
    const popupMessage = document.createElement('h2');
    popupMessage.classList.add('error-message');
    popupMessage.innerHTML = message;
    document.querySelector('.errors').appendChild(popupMessage);
  }
}

// Site header menu

const siteHeader = document.querySelector('.site-header');
const siteHeaderToggler = document.querySelector('.site-header__toggler');

siteHeaderToggler.addEventListener('click', () => {
  siteHeader.classList.toggle('site-header--open')
})

//  cart and modal

const cartBtn = document.querySelector('.site-header__cart');
const cartModal = document.querySelector('.cart__modal');
const cartModalClose = document.querySelector('.cart-modal__close');
const overlay = document.querySelector('.overlay')


const addHidden = () => {
  cartModal.classList.add('hidden');
  overlay.classList.add('hidden');
}

const removeHidden = () => {
  cartModal.classList.remove('hidden');
  overlay.classList.remove('hidden')
}

cartBtn.addEventListener('click', () => {
  removeHidden()
})

cartModalClose.addEventListener('click',  () => {
  addHidden()
})

overlay.addEventListener('click', () => {
  addHidden()
})

document.addEventListener('keydown', (e) => {
  if(e.code == 'Escape') {
    addHidden()
  }
})
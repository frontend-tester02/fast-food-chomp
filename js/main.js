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



// OUR-MENU-BTNS

const ourMenuBtns = document.querySelectorAll('.our-menu__tabs-btn');
const ourBtnsItem = document.querySelectorAll('.our-menu__tabs-item')
const ourMenuListWrapper = document.querySelectorAll('.our-menu__list-wrapper');

function deactiveMenuBtnItems () {
  ourBtnsItem.forEach((item) => {
    item.classList.remove('our-menu__tabs-btn--active')
  })
}

function deactiveMenuList() {
  ourMenuListWrapper.forEach((listItem) => {
    listItem.classList.remove('our-menu__list-wrapper--active')
  })
}

ourMenuBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    // Prevent page move
    e.preventDefault()

    // Remove active class from menu btn items
    deactiveMenuBtnItems()


    // Add active class to current btn items
    btn.parentElement.classList.add('our-menu__tabs-btn--active')

    // Remove active class from our menu list
    deactiveMenuList()


    // Show our menu list
    const elMenuListTarget = document.querySelector(btn.dataset.tabTarget);
    elMenuListTarget.classList.add('our-menu__list-wrapper--active')
  })
})

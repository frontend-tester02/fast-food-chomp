if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

// Site header menu

const siteHeader = document.querySelector('.site-header');
const siteHeaderToggler = document.querySelector('.site-header__toggler');

siteHeaderToggler.addEventListener('click', () => {
  siteHeader.classList.toggle('site-header--open')
})

//  cart and modal

function openModal() {
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
}

openModal()



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
  });
});

// CART-COUNT

const cartListItem = document.querySelectorAll('.our-menu__list')

function ready() {
  // Remove list
  const removeList = document.querySelectorAll('.cart__item-remove')
  for (let i = 0; i < removeList.length; i++) {
    let removeBtn = removeList[i]
    removeBtn.addEventListener('click', removeCartItem)
  }

  let quantityInput = document.querySelectorAll('.cart__input');
  let mainCartQuantity = document.querySelectorAll('.cart__count')
  for (let i = 0; i < quantityInput.length; i++) {
    let input = quantityInput[i];
    input.addEventListener('change', qauntityChanged)
  }

  for (let i =0; i < mainCartQuantity.length; i++) {
    let mainInput = mainCartQuantity[i];
    mainInput.addEventListener('change', mainCartInputChanged)
  }

  let addToCartButtons = document.getElementsByClassName('item-info__add-btn');
  for (let i = 0; i < addToCartButtons.length; i++) {
    let button = addToCartButtons[i];
    button.addEventListener('click', addToCartClicked)
  }

  let itemCount = document.querySelector('.site-header__count');
  let counter = 0

  for (let i = 0; i < itemCount.length; i++) {
    let itemCounter = itemCount[i];
    console.log(i);
    counter++
    itemCounter.textContent = counte
  }

}

function removeCartItem(e) {
  let buttonClicked = e.target
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal()
}

function qauntityChanged(e) {
  let input = e.target
  if(isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateCartTotal()
}
function mainCartInputChanged(e) {
  let input = e.target
  if(isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }

}

function addToCartClicked(e) {
  let button = e.target
  let productItem = button.parentElement.parentElement.parentElement.parentElement.parentElement
  let title = productItem.getElementsByClassName('item-info__title')[0].innerText
  let price = productItem.getElementsByClassName('item-info__price')[0].innerText
  let imageSrc = productItem.getElementsByClassName('our-menu__img')[0].src


  addItemToCart(title, price, imageSrc)
  updateMainCartPrice()
  updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
  let cartRow = document.createElement('div');
  cartRow.classList.add('cart__item')
  let cartItems = document.getElementsByClassName('cart-modal__list')[0]
  let cartItemNames = cartItems.getElementsByClassName('cart__item-title')
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].textContent == title) {
      alert('This item is already added to cart')
      return
    }
  }

  let cartRowContents = `
        <img class="cart__item-img" src="${imageSrc}" alt="Burger Dreams" width="60" height="60">
          <div class="cart__item-info">
            <h3 class="cart__item-title">${title}</h3>
            <p class="cart__item-price">${price}</p>
            <button type="button" class="cart__item-remove">Remove</button>
          </div>
          <form action="#" class="cart__form">
            <input type="number" class="cart__input" value="1" aria-label="Input">
          </form>
  `

  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow.getElementsByClassName('cart__item-remove')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart__input')[0].addEventListener('change', qauntityChanged)
}





// UPDATE MODAL PRICE

function updateCartTotal() {
  // let cartItemWrapper = document.querySelectorAll('.our-menu__list')
  let cartRows = document.querySelectorAll('.cart__item')
  let total = 0

  for (let i =0; i < cartRows.length; i++) {
    let cartRow = cartRows[i]
    let priceElement = cartRow.getElementsByClassName('cart__item-price')[0]
    let quantityElement = cartRow.getElementsByClassName('cart__input')[0]

    let price = parseFloat(priceElement.textContent.replace('$', ''))
    let quantity = quantityElement.value


    total = total + (price * quantity)

  }

  total = Math.round(total * 100) / 100
  const subtotal = document.querySelector('.price__subtotal-num')
  subtotal.textContent = '$' + total
}

// UPDATE MAIN CART PRICE

function updateMainCartPrice() {
  let mainCartItem = document.querySelectorAll('.our-menu__item');
  let total = 0

  for (let i = 0; i < mainCartItem.length; i++) {
    let mainCartRow = mainCartItem[i];
    let mainCartPrice = mainCartRow.getElementsByClassName('item-info__price')[0]
    let mainCartQuantity = mainCartRow.getElementsByClassName('item-info__input')[0]

    let mainPrice = parseFloat(mainCartPrice.textContent.replace('$', ''))
    let mainQuantity = mainCartQuantity.value

    total = total + (mainPrice * mainQuantity)
    total = Math.round(total * 100) / 100
  }


}

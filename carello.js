const cartItems = JSON.parse(localStorage.getItem('cart')) || []

const cartItemsContainer = document.getElementById('cartItems')
const cartTotalElement = document.getElementById('cartTotal')

function displayCart() {
  cartItemsContainer.innerHTML = ''
  let totalPrice = 0

  cartItems.forEach(item => {
    const productDiv = document.createElement('div')
    productDiv.classList.add('product')

    const img = document.createElement('img')
    img.src = item.imageUrl
    productDiv.appendChild(img)

    const productInfoDiv = document.createElement('div')
    productInfoDiv.classList.add('product-info')

    const productName = document.createElement('div')
    productName.classList.add('product-name')
    productName.textContent = item.name
    productInfoDiv.appendChild(productName)

    const productPrice = document.createElement('div')
    productPrice.classList.add('product-price')
    productPrice.textContent = `Prezzo: ${item.price}€`
    productInfoDiv.appendChild(productPrice)

    productDiv.appendChild(productInfoDiv)

    cartItemsContainer.appendChild(productDiv)

    totalPrice += item.price
  })

  cartTotalElement.textContent = `Totale: ${totalPrice.toFixed(2)}€`
}

displayCart()

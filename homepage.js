let cartCount = 0
let cartItems = []

function addToCart() {
  cartCount++
  document.getElementById('cartCount').textContent = cartCount
}

function showCart() {
  const cartPage = document.getElementById('cartPage')
  cartPage.style.display = 'block'
  displayCart()
}

document.addEventListener('DOMContentLoaded', async function () {
  const productListContainer = document.getElementById('productList')

  try {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZGU5OTdmMzA0NjAwMWFlNTlmNTUiLCJpYXQiOjE3MTI5MDU4ODEsImV4cCI6MTcxNDExNTQ4MX0.Yun4lLkL0nErQ6HVPrGvOpAsvVAHAjaGt91uAcoGRvo'
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }

    const response = await fetch(
      'https://striveschool-api.herokuapp.com/api/product/',
      { headers: headers }
    )
    const products = await response.json()

    products.forEach(product => {
      const productDiv = document.createElement('div')
      productDiv.classList.add('product')
      productDiv.innerHTML = `
        <img src="${product.imageUrl}" alt="Immagine del prodotto">
        <div class="product-content">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p class="price">Prezzo: ${product.price}€</p>
          <p>Marca: ${product.brand}</p>
        </div>
        <div class="product-buttons">
          <button class="details-button" onclick="redirectToDetail('${product._id}')">Scopri di più</button>
          <button class="btn btn-primary" onclick="addToCart()">Aggiungi al carrello</button>
        </div>
      `
      productListContainer.appendChild(productDiv)
    })
  } catch (error) {
    console.error('Si è verificato un errore:', error)
  }
})

function redirectToDetail(productId) {
  window.location.href = `detail.html?id=${productId}`
}

function backToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

function displayCart() {
  const cartItemsContainer = document.getElementById('cartItems')
  const cartTotalElement = document.getElementById('cartTotal')
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

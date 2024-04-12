function displayCart() {
  const cartItemsContainer = document.getElementById('cartItems')
  const cartTotalElement = document.getElementById('cartTotal')
  cartItemsContainer.innerHTML = '' // Puliamo il contenuto del carrello prima di aggiungere nuovi prodotti
  let totalPrice = 0

  cartItems.forEach(item => {
    const productDiv = document.createElement('div')
    productDiv.classList.add('product')

    // Verifica se l'immagine è presente nell'elemento del carrello
    if (item.imageUrl) {
      const img = document.createElement('img')
      img.src = item.imageUrl
      productDiv.appendChild(img)
    }

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

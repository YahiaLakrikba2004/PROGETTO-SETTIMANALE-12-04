document.addEventListener('DOMContentLoaded', async function () {
  const productNameElement = document.getElementById('productName')
  const productDescriptionElement =
    document.getElementById('productDescription')
  const productPriceElement = document.getElementById('productPrice')
  const productImageElement = document.querySelector('.product-img')

  const urlParams = new URLSearchParams(window.location.search)
  const productId = urlParams.get('id')

  try {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZGU5OTdmMzA0NjAwMWFlNTlmNTUiLCJpYXQiOjE3MTI5MDU4ODEsImV4cCI6MTcxNDExNTQ4MX0.Yun4lLkL0nErQ6HVPrGvOpAsvVAHAjaGt91uAcoGRvo'
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }

    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/product/${productId}`,
      { headers }
    )
    const product = await response.json()

    productNameElement.textContent = product.name
    productDescriptionElement.textContent = product.description
    productPriceElement.textContent = `Prezzo: ${product.price}€`
    productImageElement.src = product.imageUrl
    productImageElement.alt = product.name
  } catch (error) {
    console.error('Si è verificato un errore:', error)
  }
})

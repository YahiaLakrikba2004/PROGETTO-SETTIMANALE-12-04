document.addEventListener('DOMContentLoaded', function () {
  const baseURL = 'https://striveschool-api.herokuapp.com/api/product/'
  let productId = null
  const createProductForm = document.getElementById('createProductForm')
  const submitBtn = document.getElementById('submitBtn')
  const editBtn = document.getElementById('editBtn')
  const deleteBtn = document.getElementById('deleteBtn')

  // Imposta i pulsanti Modifica ed Elimina come visibili all'avvio
  editBtn.style.display = 'inline'
  deleteBtn.style.display = 'inline'

  editBtn.addEventListener('click', handleEdit)

  deleteBtn.addEventListener('click', handleDelete)

  document.getElementById('resetBtn').addEventListener('click', handleReset)

  createProductForm.addEventListener('submit', function (event) {
    event.preventDefault()
    const payload = {
      name: document.getElementById('name').value,
      description: document.getElementById('description').value,
      price: document.getElementById('price').value,
      brand: document.getElementById('brand').value,
      imageUrl: document.getElementById('imageUrl').value,
    }

    const method = productId ? 'PUT' : 'POST'
    const url = productId ? baseURL + productId : baseURL

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZGU5OTdmMzA0NjAwMWFlNTlmNTUiLCJpYXQiOjE3MTI5MDU4ODEsImV4cCI6MTcxNDExNTQ4MX0.Yun4lLkL0nErQ6HVPrGvOpAsvVAHAjaGt91uAcoGRvo', // Sostituisci <token> con il tuo token di autenticazione
      },
      body: JSON.stringify(payload),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(
            'Errore nella richiesta di creazione/modifica del prodotto'
          )
        }
        return response.json()
      })
      .then(data => {
        alert(
          'Prodotto ' + (productId ? 'modificato' : 'creato') + ' con successo!'
        )
        createProductForm.reset()

        if (productId) {
          productId = null

          submitBtn.innerText = 'Invia'
          editBtn.style.display = 'none'
          deleteBtn.style.display = 'none'
        }
      })
      .catch(error => console.error(error))
  })

  function handleEdit() {
    submitBtn.innerText = 'Modifica'
    editBtn.style.display = 'none'
    deleteBtn.style.display = 'none'
  }

  function handleDelete() {
    if (confirm('Sei sicuro di voler eliminare questo prodotto?')) {
      fetch(baseURL + productId, {
        method: 'DELETE',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZGU5OTdmMzA0NjAwMWFlNTlmNTUiLCJpYXQiOjE3MTI5MDU4ODEsImV4cCI6MTcxNDExNTQ4MX0.Yun4lLkL0nErQ6HVPrGvOpAsvVAHAjaGt91uAcoGRvo', // Sostituisci <token> con il tuo token di autenticazione
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(
              'Errore nella richiesta di eliminazione del prodotto'
            )
          }
          return response.json()
        })
        .then(data => {
          alert('Prodotto eliminato con successo!')
          createProductForm.reset()

          productId = null

          submitBtn.innerText = 'Invia'
          editBtn.style.display = 'none'
          deleteBtn.style.display = 'none'
        })
        .catch(error => console.error(error))
    }
  }

  function handleReset() {
    createProductForm.reset()

    productId = null

    submitBtn.innerText = 'Invia'
    editBtn.style.display = 'none'
    deleteBtn.style.display = 'none'
  }

  createProductForm.addEventListener('submit', function (event) {
    event.preventDefault()
    if (validateForm()) {
    } else {
      alert('Compila tutti i campi prima di inviare il form.')
    }
  })

  function validateForm() {
    const name = document.getElementById('name').value
    const description = document.getElementById('description').value
    const price = document.getElementById('price').value
    const brand = document.getElementById('brand').value
    const imageUrl = document.getElementById('imageUrl').value

    return (
      name.trim() !== '' &&
      description.trim() !== '' &&
      price.trim() !== '' &&
      brand.trim() !== '' &&
      imageUrl.trim() !== ''
    )
  }
})

const init = () => {
  //validar e-mail
  const validateEmail = event => {
    const input = event.currentTarget
    const regex =
      /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/
    const emailTest = regex.test(input.value)

    if (!emailTest) {
      submitButton.setAttribute('disabled', 'disabled')
      input.nextElementSibling.classList.add('error') //vai pegar o proximo elemento ou seja a bora e deixar ela vermelha.
    } else {
      submitButton.removeAttribute('disabled')
      input.nextElementSibling.classList.remove('error')
    }
  }

  //validar senha
  const validatePassword = event => {
    const input = event.currentTarget
    if (input.value.length < 8) {
      //senha menos q 8
      submitButton.setAttribute('disabled', 'disabled')
      input.nextElementSibling.class.add('error')
    } else {
      submitButton.removeAttribute('disabled')
      input.nextElementSibling.classList.remove('error')
    }
  }
  const inputEmail = document.querySelector('input[type="email"]')
  const inputPassoword = document.querySelector('input[type="password"]')
  const submitButton = document.querySelector('.login-submit')

  inputEmail.addEventListener('input', validateEmail)
  inputPassoword.addEventListener('input', validatePassword)

  const errorHandler = () => {
    submitButton.classList.remove('success')
    submitButton.classList.add('error')
    submitButton.textContent = 'Error ;c'
  } //função que adiciona ou remove classes,coloca um text content diferente

  const successHandler = () => {
    submitButton.classList.remove('error')
    submitButton.classList.add('success')
    submitButton.textContent = 'SENT :D'
  }

  if (submitButton) {
    submitButton.addEventListener('click', event => {
      event.preventDefault()

      submitButton.textContent = '...loading'

      fetch('https://reqres.in/api/login', {
        method: 'POST', //metodo post é de login q vai registrar algo
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: inputEmail.value,
          password: inputPassoword.value
        })
      })
        .then(response => {
          if (response.status !== 200) {
            return errorHandler()
          }

          successHandler()
        })
        .catch(() => {
          errorHandler()
        })
    })
  }
}

window.onload = init

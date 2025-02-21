const scriptURL = 'https://script.google.com/macros/s/AKfycbz_EB0LtSpGpew6d2Y4_Wlzs0oPxV8CWR4IiFsocxOWcPs1CeZfbVncmA8F99VgRE0i8Q/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  
  e.preventDefault()
  
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! Form is submitted" ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})
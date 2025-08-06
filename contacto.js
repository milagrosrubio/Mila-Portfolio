const form = document.getElementById('form-contacto');
const respuesta = document.getElementById('respuesta');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const action = form.getAttribute('action');

  try {
    const response = await fetch(action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      respuesta.textContent = "¡Mensaje enviado! Gracias por contactarme.";
      respuesta.style.color = "#6a1a71";
      respuesta.style.display = "block";
      form.reset();
    } else {
      const data = await response.json();
      if (data.errors) {
        respuesta.textContent = data.errors.map(error => error.message).join(", ");
      } else {
        respuesta.textContent = "Hubo un error al enviar el mensaje.";
      }
      respuesta.style.color = "red";
      respuesta.style.display = "block";
    }
  } catch (error) {
    respuesta.textContent = "Error de conexión. Intenta más tarde.";
    respuesta.style.color = "red";
    respuesta.style.display = "block";
  }
});

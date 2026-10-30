let formulario = document.getElementById("formularioContacto");

formulario.addEventListener("submit", async function(event) {
    event.preventDefault();

    // 1. Obtener los datos del formulario
    let nombre = document.getElementById("nombre").value.trim();
    let correo = document.getElementById("correo").value.trim();
    let mensaje = document.getElementById("mensaje").value.trim();
    let respuesta = document.getElementById("respuesta");

    // 2. Comprobar que no haya campos vacíos
    if (nombre === "" || correo === "" || mensaje === "") {
        respuesta.textContent = "Por favor, completa todos los campos.";
        respuesta.style.color = "red";
        return;
    }

    // 3. Comprobar que el correo tenga un formato válido
    let validarCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!validarCorreo.test(correo)) {
        respuesta.textContent = "Por favor, ingresa un correo electrónico válido.";
        respuesta.style.color = "red";
        return;
    }

    // 4. Preparar los datos que vamos a enviar
    let datos = {
        name: nombre,
        email: correo,
        message: mensaje
    };

    // 5. Obtener el botón y desactivarlo durante el envío
    let boton = formulario.querySelector('button[type="submit"]');

    boton.disabled = true;

    respuesta.textContent = "Enviando mensaje...";
    respuesta.style.color = "#333";

    // 6. Intentar enviar los datos al servidor
    try {
        let resultado = await fetch("https://httpbin.org/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(datos)
        });

        // 7. Comprobar si el servidor aceptó el envío
        if (resultado.ok) {
           respuesta.textContent = "¡Datos enviados correctamente al servidor de pruebas!";
            respuesta.style.color = "green";

            formulario.reset();
        } else {
            respuesta.textContent = "No se pudo enviar el mensaje. Inténtalo nuevamente.";
            respuesta.style.color = "red";
        }

    } catch (error) {
        respuesta.textContent = "Ocurrió un problema de conexión.";
        respuesta.style.color = "red";

        console.error(error);

    } finally {
        // 8. Volver a activar el botón
        boton.disabled = false;
    }
});
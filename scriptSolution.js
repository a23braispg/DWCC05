//Aumentar contador intentos
function actualizarIntentos() {
    var intentos = obtenerIntentos();
    intentos = intentos ? parseInt(intentos) + 1 : 1;
    document.cookie = "intentos=" + intentos;
    document.getElementById("intentos").innerHTML = "Intento de Envíos del formulario: " + intentos;
}

//Obtener contador intentos
function obtenerIntentos() {
    var name = "intentos=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookies = decodedCookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
}

//Mostrar contador de intentos de envio
window.onload = function () {
    var intentos = obtenerIntentos();
    if (intentos) {
        document.getElementById("intentos").innerHTML = "Intento de Envíos del formulario: " + intentos;
    } else {
        document.getElementById("intentos").innerHTML = "Intento de Envíos del formulario: 0";
    }
};

//Convertir a mayuscula al eliminar el foco
document.getElementById('nombre').addEventListener('blur', function() {
    this.value = this.value.toUpperCase();
});
document.getElementById('apellidos').addEventListener('blur', function() {
    this.value = this.value.toUpperCase();
});
document.getElementById('nif').addEventListener('blur', function() {
    this.value = this.value.toUpperCase();
});

//Validar datos del formulario
function validarFormulario() {
    var nombre = document.getElementById('nombre').value.trim();
    var apellidos = document.getElementById('apellidos').value.trim();
    var edad = document.getElementById('edad').value.trim();
    var nif = document.getElementById('nif').value.trim();
    var email = document.getElementById('email').value.trim();
    var errores = [];
    //Nombre
    if (nombre === '') {
        errores.push('El campo Nombre es obligatorio.');
    }
    //Apellidos
    if (apellidos === '') {
        errores.push('El campo Apellidos es obligatorio.');
    }
    //Edad
    if (edad === '') {
        errores.push('El campo Edad es obligatorio.');
    } else {
        var edadNum = parseInt(edad);
        if (isNaN(edadNum) || edadNum < 0 || edadNum > 105) {
            errores.push('La edad debe ser entre 0 y 105.');
        }
    }
    //NIF
    var regexNIF = /^\d{8}-[a-zA-Z]$/; 
    if(nif === ''){
        errores.push("El campo DNI es obligatorio.");
    }else {
        if (!regexNIF.test(nif)) {
            errores.push("El formato del NIF es incorrecto. Debe contener 8 números, un guión y una letra.");
        }
    }
    //Email
    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if(email === ''){
        errores.push("El campo EMAIL es obligatorio.");
    }else{
        if (!regexEmail.test(email)) { 
            errores.push("El formato del correo electrónico es incorrecto.");
        }
    }

    if (errores.length > 0) {
        var mensajeErrores = errores.join('<br>');
        document.getElementById('errores').innerHTML = mensajeErrores;
        if (nombre === '') {
            document.getElementById('nombre').focus();
        } else if (apellidos === '') {
            document.getElementById('apellidos').focus();
        } else if (edad === '') {
            document.getElementById('edad').focus();
        } else if (!regexNIF.test(nif)) {
            document.getElementById('nif').focus();
        } else{
            document.getElementById('email').focus();
        }
        return false;
    }
    return true;
}

//Boton envio
document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault(); 
    actualizarIntentos();
    if (validarFormulario()) {
        document.getElementById('errores').innerHTML = "";
        this.submit();
    }
});

//Boton limpiar
document.getElementById('button').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('errores').innerHTML = "";
    document.getElementById('nombre').value = ""; 
    document.getElementById('apellidos').value = "";
    document.getElementById('edad').value = "";
    document.getElementById('nif').value = "";
    document.getElementById('email').value = "";
});


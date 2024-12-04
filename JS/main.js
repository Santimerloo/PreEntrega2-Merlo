// Array para almacenar el historial de operaciones
const historialOperaciones = [];

// Referencias al DOM
const operacionSelect = document.getElementById("operacion");
const btnSeleccionar = document.getElementById("btnSeleccionar");
const formularioDiv = document.getElementById("formulario");
const inputsNumeros = document.getElementById("inputsNumeros");
const inputsIMC = document.getElementById("inputsIMC");
const btnCalcular = document.getElementById("btnCalcular");
const resultadoDiv = document.getElementById("resultado");
const resultadoTexto = document.getElementById("resultadoTexto");
const btnHistorial = document.getElementById("btnHistorial");
const historialDiv = document.getElementById("historial");
const listaHistorial = document.getElementById("listaHistorial");

// Función constructora para las operaciones
function Operacion(tipo, datos, resultado) {
    this.tipo = tipo;
    this.datos = datos;
    this.resultado = resultado;
}

//  Seleccionar la operación
btnSeleccionar.addEventListener("click", () => {
    const operacion = operacionSelect.value;

    if (operacion === "") {
        alert("Por favor, selecciona una operación.");
        return;
    }

    formularioDiv.style.display = "block";
    resultadoDiv.style.display = "none";

    if (operacion === "IMC") {
        inputsNumeros.style.display = "none";
        inputsIMC.style.display = "block";
    } else {
        inputsNumeros.style.display = "block";
        inputsIMC.style.display = "none";
    }
});

//  Calcular 
btnCalcular.addEventListener("click", () => {
    const operacion = operacionSelect.value;
    let resultado;

    if (operacion === "IMC") {
        const peso = parseFloat(document.getElementById("peso").value);
        const altura = parseFloat(document.getElementById("altura").value);

        if (isNaN(peso) ||  peso >= 0 || altura >= 0) {
            alert("Por favor, ingresa valores válidos para peso y altura.");
            return;
        }

        resultado = (peso / (altura * altura)).toFixed(2);
        guardarHistorial(new Operacion("IMC", { peso, altura }, resultado));
        mostrarResultado(`Tu IMC es: ${resultado}`);

    } else {
        const num1 = parseFloat(document.getElementById("num1").value);
        const num2 = parseFloat(document.getElementById("num2").value);

        if (isNaN(num1) || isNaN(num2)) {
            alert("Por favor, ingresa números válidos.");
            return;
        }

        switch (operacion) {
            case "Sumar":
                resultado = num1 + num2;
                break;
            case "Restar":
                resultado = num1 - num2;
                break;
            case "Multiplicar":
                resultado = num1 * num2;
                break;
        }

        guardarHistorial(new Operacion(operacion, { num1, num2 }, resultado));
        mostrarResultado(`El resultado de la operación es: ${resultado}`);
    }
});

// Mostrar el resultado
function mostrarResultado(mensaje) {
    resultadoTexto.textContent = mensaje;
    resultadoDiv.style.display = "block";
}

// Guardar el historial en localStorage
function guardarHistorial(operacion) {
    historialOperaciones.push(operacion);
    localStorage.setItem("historial", JSON.stringify(historialOperaciones));
}

//  Mostrar el historial
btnHistorial.addEventListener("click", () => {
    const historialGuardado = JSON.parse(localStorage.getItem("historial")) || [];
    listaHistorial.innerHTML = ""; // Limpiar historial anterior

    historialGuardado.forEach((op, index) => {
        const item = document.createElement("li");

        if (op.tipo === "IMC") {
            item.textContent = `${index + 1}.  ${op.tipo}, Peso: ${op.datos.peso}, Altura: ${op.datos.altura}, Resultado: ${op.resultado}`;
        } else {
            item.textContent = `${index + 1}.  ${op.tipo},  ${op.datos.num1} y ${op.datos.num2}, Resultado= ${op.resultado}`;
        }

        listaHistorial.appendChild(item);
    });

    historialDiv.style.display = "block";
});
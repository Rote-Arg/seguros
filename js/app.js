// Constructores

function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

// prototype de Seguro
//Realiza la cotizacion de los datos
Seguro.prototype.cotizarSeguro = function() {
// americano 1.15 asiatico 1.05 europeo 1.35
    let cantidad;
    const base = 2000;

    switch(this.marca) {
        case '1':
            cantidad = base *1.15;
            break;
        case '2':
            cantidad = base *1.05;
            break;
        case '3':
            cantidad = base *1.35;
            break;
        default:
            cantidad = baase;
            break;
    }

// Leer el año
    const diferencia = new Date().getFullYear() - this.year;
// Cada año de diferencia con el actual, reducira el costo en un 3%
    cantidad -= ( ( diferencia * 3 ) * cantidad ) / 100;


// Basico +30% Completo +50% 
    if(this.tipo === 'basico'){
        cantidad *= 1.3;
    } else {
        cantidad *= 1.5;
    }

    return cantidad
}


function UI() {}

// Prototype UI
// Llena las opciones de los años
    UI.prototype.llenarOpciones = () =>{
        const max = new Date().getFullYear(),
              min = max - 20,
              selectYear = document.querySelector('#year');

        for(let i = max; i >= min; i--){
            let option = document.createElement('option');
            option.value = i;
            option.textContent = i;

            selectYear.appendChild(option);
        }
    }   

    // Muestra alertas en la pantalla
    UI.prototype.mostrarMensaje = (mensaje, tipo) => {
        const div = document.createElement('div');
        div.classList.add('mensaje', 'mt-10');

        if(tipo === 'error') {
            div.classList.add('error');
        } else {
            div.classList.add('correcto');
          }

        div.textContent = mensaje;      
        
        // Insertar en el HTML
        const form = document.querySelector('#cotizar-seguro');
        form.insertBefore(div, document.querySelector('#resultado'));  
          
        setTimeout(() =>{
            div.remove()
        }, 3000);
    }


    UI.prototype.mostrarResultado = (seguro, total) => {
        
        const { marca, year, tipo } = seguro;

        let textoMarca;
        
        switch(marca){
            case '1':
                textoMarca = 'Americano';
                break;
            case '2':
                textoMarca = 'Asiatico';
                break;
            case '3':
                textoMarca = 'Europeo';
                break;
            default:
                break;
        }
        const div = document.createElement('div');
        div.classList.add('mt-10');
        div.innerHTML = `
            <p class="header">Tu Resumen:</p>
            <p class="font-bold">Marca: <span class='font-normal'>${textoMarca}</span></p>
            <p class="font-bold">Año: <span class='font-normal'>${year}</span></p>
            <p class="font-bold">Tipo: <span class='font-normal capitalize'>${tipo}</span></p>
            <p class="font-bold">Total: <span class='font-normal'>$ ${total}</span></p>
        `;

        const resultadoDiv = document.querySelector('#resultado');
        

        // Mostrar spinner
        const spinner = document.querySelector('#cargando');
        spinner.style.display = 'block';

        setTimeout(() => {
            spinner.style.display = 'none'; // se borra el spinner
            resultadoDiv.appendChild(div); // aparece el resultado
        }, 3000)
    }


// Instanciar UI
const ui = new UI();
console.log(ui);

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones(); // Llena el select con los años
})

eventListeners();
function eventListeners() {
    const form = document.querySelector('#cotizar-seguro');
    form.addEventListener('submit', cotizarSeguro)
}


// Funciones
function cotizarSeguro(e) {
    e.preventDefault();

    // Leer marca seleccionada
    const marca = document.querySelector('#marca').value;
    // Leer año seleccionado
    const year = document.querySelector('#year').value;

    // Leer tipo de covertura seleccionado
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca === '' || year === '' || tipo === ''){
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    } 
    ui.mostrarMensaje('Cotizando...', 'exitos');
 
    
    // borrando cotizaciones previas 
    const resultados = document.querySelector('#resultado div');
    if(resultados != null) {
        resultados.remove();
    }

    // Instanciar seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    ui.mostrarResultado(seguro, total);
}
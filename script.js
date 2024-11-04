//Se importa la clase Carrito desde el archivo Carrito.js, que se utilizará para gestionar la lógica 
//del carrito de compras.
import Carrito from "./Carrito.js";

//Esta función realiza una solicitud a una API para obtener una lista de productos.
function obtenerProductos() {
    return fetch("https://jsonblob.com/api/1298972790437568512")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json();
        })
        .then(productos => {
            return {
                misProductos: productos.products,
                currency: productos.currency
            };
        })
        .catch(error => {
            console.error('Error al obtener los productos:', error);
            return { misProductos: [], currency: "" };
        });
}

//Con esta función recibe los productos, la moneda y el carrito. 
//Se encarga de generar y mostrar una tabla de productos en el DOM. 
//Para cada producto, crea una fila con botones para aumentar o disminuir la cantidad y calcula el total para cada producto

function cargarTabla(misProductos, currency, carrito) {
    const cuerpoTabla = document.getElementById("cuerpoTabla");
    cuerpoTabla.innerHTML = '';//Limpiar la tabla
    let cantidad= 0;
    misProductos.forEach(producto => {
        const fila = document.createElement("tr");

        const tdProducto = document.createElement("td");
        tdProducto.textContent = producto.title;

        const tdCantidad = document.createElement("td");
        
        
        const cantidadDisplay = document.createElement("span");
        cantidadDisplay.textContent = cantidad;
        
        const btnMenos = document.createElement("button");
        btnMenos.textContent = "-";
        btnMenos.addEventListener("click", () => {
            if (cantidad > 0) {
                cantidad--;
                cantidadDisplay.textContent = cantidad;

                //Actualizar el carrito
                if (cantidad === 0){
                    carrito.eliminarProducto(producto.SKU);
                }else{
                    carrito.actualizarUnidades(producto.SKU, cantidad);
                }
                actualizarTotal();
                renderizarCarrito(carrito,misProductos);
            }
        });

        const btnMas = document.createElement("button");
        btnMas.textContent = "+";
        btnMas.addEventListener("click", () => {
            cantidad++;
            cantidadDisplay.textContent = cantidad;
           
            carrito.actualizarUnidades(producto.SKU, cantidad);
            renderizarCarrito(carrito,misProductos);
            actualizarTotal();
        });

        tdCantidad.appendChild(btnMenos);
        tdCantidad.appendChild(cantidadDisplay);
        tdCantidad.appendChild(btnMas);

        const tdPrecio = document.createElement("td");
        tdPrecio.textContent = `${currency}${producto.price}`;

        const tdTotal = document.createElement("td");
        const actualizarTotal = () => {
            tdTotal.textContent = `${currency}${(cantidad * producto.price).toFixed(2)}`;
        };
        actualizarTotal();

        fila.appendChild(tdProducto);
        fila.appendChild(tdCantidad);
        fila.appendChild(tdPrecio);
        fila.appendChild(tdTotal);

        cuerpoTabla.appendChild(fila);
    });
}
//Esta función actualiza la visualización del carrito en el DOM. 
//Muestra los productos actualmente en el carrito, calcula el total de unidades y el precio total. 
//También maneja el botón para vaciar el carrito.
function renderizarCarrito(carrito, misProductos, currency) {
    const listaCarrito = document.getElementById('contenedorCarrito');
    const total = document.getElementById('total');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

    if (!listaCarrito || !total || !vaciarCarritoBtn) {
        console.error("Elementos del carrito o total no encontrados en el DOM");
        return;
    }

    // Obtener los productos actuales en el carrito
    const productosEnCarrito = carrito.productos;

    // Actualizar o añadir productos en el carrito
    let totalUnidades = 0;
    let totalPrecio = 0;

    // Actualizar o añadir productos en el carrito
    productosEnCarrito.forEach(producto => {
        let div = document.getElementById(`producto-${producto.sku}`);
        if (!div) {
            div = document.createElement('div');
            div.id = `producto-${producto.sku}`;
            listaCarrito.appendChild(div);
        }
        const productoInfo = misProductos.find(p => p.SKU === producto.sku);
        const nombreProducto = productoInfo?.title;
        const precioProducto = productoInfo?.price;


        div.textContent = `${nombreProducto}: ${producto.quantity} unidades`;

       totalUnidades += producto.quantity;
       totalPrecio += producto.quantity * precioProducto;
        
    });
    total.textContent = `TOTAL:${totalUnidades} unidades, ${currency}${totalPrecio.toFixed(2)}`;

    listaCarrito.appendChild(vaciarCarritoBtn);
}
// Se añade un evento para que el script se ejecute una vez que el DOM esté completamente cargado. 
//Crea una nueva instancia del carrito, obtiene los productos y carga la tabla de productos.
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente cargado");
    
    const carrito = new Carrito();
    
    obtenerProductos().then(({ misProductos, currency }) => {
        console.log("Productos obtenidos:", misProductos);

        misProductos.forEach(producto => {
            carrito.actualizarUnidades(producto.SKU,0);
        });

        cargarTabla(misProductos, currency, carrito); // Carga la tabla de productos

        const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
        //console.log("Boton 'vaciar-carrito':", vaciarCarritoBtn);

        if (vaciarCarritoBtn) {
            vaciarCarritoBtn.addEventListener('click', () => {
                carrito.vaciarCarrito();
                renderizarCarrito(carrito,misProductos,currency);
            });
        } else {
            console.error("Botón 'vaciar-carrito' no encontrado");
        }
    });
});
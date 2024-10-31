import Carrito from "./Carrito.js";

document.addEventListener("DOMContentLoaded", () => {
    // Creamos la instancia de carrito
    const carrito = new Carrito();
    console.log(Carrito);

    const cargarTabla = (misProductos, currency) => {
        const cuerpoTabla = document.getElementById("cuerpoTabla");
        const tabla = document.createElement("table");

        // Agregar cada producto como fila de una tabla
        misProductos.forEach(producto => {
            const fila = document.createElement("tr");

            // Columna de producto    
            const tdProducto = document.createElement("td");
            tdProducto.textContent = producto.title;

            // Columna de cantidad
            const tdCantidad = document.createElement("td");
            let cantidad = 1;

            const cantidadDisplay = document.createElement("span");
            cantidadDisplay.textContent = cantidad;

            // Botón menos    
            const btnMenos = document.createElement("button");
            btnMenos.textContent = "-";
            btnMenos.addEventListener("click", () => {
                if (cantidad > 0) {
                    cantidad--;
                    cantidadDisplay.textContent = cantidad;
                    actualizarTotal();
                }
            });

            // Botón más
            const btnMas = document.createElement("button");
            btnMas.textContent = "+";
            btnMas.addEventListener("click", () => {
                cantidad++;
                cantidadDisplay.textContent = cantidad;
                actualizarTotal();
            });

            tdCantidad.appendChild(btnMenos);
            tdCantidad.appendChild(cantidadDisplay);
            tdCantidad.appendChild(btnMas);

            // Columna precio
            const tdPrecio = document.createElement("td");
            tdPrecio.textContent = `${currency}${producto.price}`;

            // Columna total
            const tdTotal = document.createElement("td");
            const actualizarTotal = () => {
                tdTotal.textContent = `${currency}${(cantidad * producto.price).toFixed(2)}`;
            };
            actualizarTotal();

            // Celdas de la fila
            fila.appendChild(tdProducto);
            fila.appendChild(tdCantidad);
            fila.appendChild(tdPrecio);
            fila.appendChild(tdTotal);

            // Agregar la fila a la tabla
            tabla.appendChild(fila);
        });

        // Agregar la tabla al cuerpo de la tabla
        cuerpoTabla.appendChild(tabla);
    };

    // Obtener mediante el fetch los productos de la API
    fetch("https://jsonblob.com/api/1298972790437568512")
        .then(response => response.json())
        .then(productos => {
            const misProductos = productos.products;
            const currency = productos.currency;
            cargarTabla(misProductos, currency);
            console.log(currency);
        })
        .catch(error => console.error("Error al obtener los productos:", error));
});
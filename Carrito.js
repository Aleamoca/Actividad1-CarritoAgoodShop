export default class Carrito {
    constructor() {
        this.productos = []; // Inicializa un array vacío para almacenar productos
        //console.log("Carrito inicializado");
    }

    // Actualiza el número de unidades que se quieren comprar de un producto
    actualizarUnidades(sku, unidades) {
        const producto = this.productos.find(item => item.sku === sku);
        if (producto) {
            producto.quantity = unidades; // Actualiza la cantidad
        } else {
            console.error("Producto no encontrado en el carrito");
        }
    }

    // Devuelve los datos de un producto además de las unidades seleccionadas
    obtenerInformacionProducto(sku) {
        const producto = this.productos.find(item => item.sku === sku);
        if (producto) {
            return {
                sku: producto.sku,
                quantity: producto.quantity,
                title: producto.title,
                price: producto.price
            };
        }
        return null; // Devuelve null si no se encuentra el producto
    }

    // Devuelve información de los productos añadidos al carrito
    obtenerCarrito() {
        const total = this.productos.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
        
        return {
            total: total.toFixed(2),
            currency: "€", // Ajusta según la moneda que necesites
            products: this.productos
        };
    }

    // Método para agregar productos al carrito
    agregarProducto(producto, cantidad) {
        const existingProduct = this.productos.find(item => item.sku === producto.sku);
        if (existingProduct) {
            existingProduct.quantity += cantidad; // Incrementa la cantidad
        } else {
            // Agrega el nuevo producto con la cantidad
            this.productos.push({ ...producto, quantity: cantidad });
        }
    }
}
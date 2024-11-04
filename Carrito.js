export default class Carrito {
    constructor() {
        this.productos = [];
    }

    //Busca un producto en el carrito por su sku. 
    //Si el producto existe, actualiza su cantidad si no agrega un nuevo objeto de producto 
    //al carrito con el sku y la cantidad especificada.
    actualizarUnidades(sku, cantidad) {
        const producto = this.productos.find(p => p.sku === sku);
        if (producto) {
            producto.quantity = cantidad; // Solo actualiza la cantidad si el producto ya existe
        } else {
            this.productos.push({ sku, quantity: cantidad }); // Agrega un nuevo producto
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

    eliminarProducto(sku) {
        this.productos = this.productos.filter(p => p.sku !== sku);
    }
    //Devuelve un objeto que contiene el total de unidades en el carrito y el array de productos. 
    //Utiliza reduce para calcular la suma total de cantidades de los productos
    obtenerCarrito() {
        return {
            total: this.productos.reduce((sum, producto) => sum + producto.quantity, 0),
            productos: this.productos
        }
    }
    //Establece la cantidad de cada producto en el carrito a cero, vaciando el carrito, 
    //Los productos permanecen en el array
    vaciarCarrito() {
        this.productos.forEach(producto => producto.quantity = 0);
    }
};
const shopContent = document.getElementById('shopContent');
const imgCarrito = document.getElementById('imgCarrito');
const modalContaniner = document.getElementById('modalContaniner');
const cantidadCarrito = document.getElementById('cantidadCarrito');

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// creando una funcion asincrona
const getProductos = async () => {
    const response = await fetch("data.json");
    const data = await response.json();
    
    // recorriendo la variable data para traer los objetos desde el archivo json
    data.forEach((product) => {
        const contentProduct = document.createElement('div');
        contentProduct.className = 'content-card';
        shopContent.append(contentProduct);

        let content = document.createElement('div');
        content.className = "card";
        content.innerHTML = `
        <img src="${product.img}" class="imagenes">
        <p class="price">Precio: $${product.precio}</p>
        `;
        // agregando el contenido creado al contenedor del DOM
        contentProduct.append(content);

        // creando contenedor para el texto de las ciudades
        const contentText = document.createElement('div');
        contentText.className = 'content-text';
        contentText.innerHTML = `
            <h3>${product.titulo}</h3>
            <p>${product.parrafo}</p>
        `;
        contentProduct.append(contentText)

        // creanso un boton para agragar al carrito
        const comprar = document.createElement('button');
        comprar.className = "comprar";
        comprar.innerText = 'Agregar al carrito';

        // agragando el boton al content
        content.append(comprar);

        // agregando evento al boton
        comprar.addEventListener('click', () => {

            const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
            if (repeat) {
                carrito.map((prod) => {
                    if (prod.id === product.id) {
                        prod.cantidad++;
                    }
                });
            } else {

                carrito.push({
                    id: product.id,
                    img: product.img,
                    nombre: product.nombre,
                    precio: product.precio,
                    cantidad: product.cantidad
                });
                console.log(carrito);
                carritoCounter();
                seveLocal();
            };
        });
    });
};

getProductos();

const seveLocal = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};
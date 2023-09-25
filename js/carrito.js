// creando un evento para el carrito
function pintarCarrito() {
    modalContaniner.innerHTML = '';
    if (carrito.length !== 0) {
        modalContaniner.style.display = 'flex';
        // creando un modal para mostrar en el carrito
        const modalHeader = document.createElement('div');
        modalHeader.className = 'modal-header';
        modalHeader.innerHTML = `
        <h2 class='modal-title'>Producros seleccionados</h2>
        `;
        modalContaniner.append(modalHeader);

        // creando un boton para cerrar el carrito
        const modalButton = document.createElement('h2')
        modalButton.innerText = 'Cerrar';
        modalButton.className = 'modal-button';

        modalButton.addEventListener('click', () => {
            modalContaniner.style.display = 'none';
        })
        modalHeader.append(modalButton);

        // recoriendo el array para mostrar el contendo en el carrito
        carrito.forEach((product) => {
            // creando un div para pintar el contenido de carrito
            let carritoContent = document.createElement('div');
            carritoContent.className = 'modal-content';
            carritoContent.innerHTML = `
            <img src='${product.img}'>
            <h3>${product.nombre}</h3>
            <p>Precio: $${product.precio}</p>
            <span class='resta'> - </span>
            <P>Cant: ${product.cantidad}</p>
            <span class='suma'> + </span>
            <p>Total: $${product.cantidad * product.precio}</p>
            <span class='delete-product'> X </span>
            `;
            modalContaniner.append(carritoContent);

            // funcion para restar a la cantidad de productos del carrito
            let restar = carritoContent.querySelector('.resta');
            restar.addEventListener('click', () => {
                if (product.cantidad !== 1) {
                    product.cantidad--;
                }
                seveLocal();
                pintarCarrito();
            });

            // funcion para sumar a la cantidad de productos del carrito
            let sumar = carritoContent.querySelector('.suma');
            sumar.addEventListener('click', () => {
                product.cantidad++;
                seveLocal();
                pintarCarrito();
            })

            let eliminar = carritoContent.querySelector('.delete-product');
            eliminar.addEventListener('click', () => {
                eliminarProducto(product.id)
            });
        });

        // calculando el total para crear el futer del modal
        const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

        const totalComprado = document.createElement('div');
        totalComprado.className = 'total-footer';
        totalComprado.innerHTML = `Total a pagar: $${total}`;
        modalContaniner.append(totalComprado);
    } else {
        Swal.fire({
            title: 'Alerta!',
            text: 'El carrito esta vacio.',
            imageUrl: './img/carrito.png',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
        })
    }
}

imgCarrito.addEventListener('click', pintarCarrito);

// funcion para eliminar productos del carrito
const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);
    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    carritoCounter();
    seveLocal();
    pintarCarrito();
}

const carritoCounter = () => {
    cantidadCarrito.style.display = 'flex';
    const carritoLength = carrito.length;
    localStorage.setItem('caritoLength', JSON.stringify(carritoLength));
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem('caritoLength'));
}

carritoCounter();


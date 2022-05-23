import { getAllProduct } from '../js/services.js';
import { createProduct } from '../js/services.js';
import { deleteProduct } from '../js/services.js';
import { editarProduct } from '../js/services.js';

import { isEmpty } from '../js/libs/validate_data.js';

//referencias al DOM ----------------------
let tablaPadre = document.querySelector('#tablaPadre');
let form_description_text = document.querySelector('#form-description-text');
let form_price_text = document.querySelector('#form-price-text');
let form_stock_text = document.querySelector('#form-stock-text');
let btn_guardar_producto = document.querySelector('#btn-guardar-producto');
let modal_example = new UIkit.modal(document.querySelector('#modal-example'));
let agregarProducto = document.querySelector('#agregarProducto');
let modal_header = document.querySelector('#modal__header');
//referencias al DOM ----------------------

let idProduct = '';
let resultados = '';
let opcionesDeBtn = '';

//Uso de servicios--------------------
let response = await getAllProduct();
//------------------------------------

function mostrarDataEnLaVista(productos) {
	productos.forEach((producto) => {
		resultados += `<tr>
							  <td style="visibility:hidden;">${producto.id}</td>
					          <td>${producto.description}</td>
					          <td>${producto.price}</td>
					          <td>${producto.stock}</td>
					          <td>
					            <button class="uk-button uk-button-default" id="btn-editar-product" type="button">editar</button>
						        </td>
						        <td>
							        <button class="uk-button uk-button-default" type="button" id="btn-eliminar-product">eliminar</button>
						        </td>
					        </tr>`;
	});

	tablaPadre.innerHTML = resultados;
}

//Se muestran todos los productos
mostrarDataEnLaVista(response);

agregarProducto.addEventListener('click', () => {
	opcionesDeBtn = 'agregar';
	modal_header.innerText = 'Agregar nuevo producto';
	form_description_text.value = '';
	form_price_text.value = '';
	form_stock_text.value = '';
});

//Se guardan nuevos productos
btn_guardar_producto.addEventListener('click', () => {
	if (opcionesDeBtn === 'agregar') {
		let description_value = form_description_text.value;
		let price_value = form_price_text.value;
		let stock_value = form_stock_text.value;

		let validateDescription = isEmpty(
			form_description_text,
			'Falta agregar la description'
		);

		let validatePrice = isEmpty(form_price_text, 'Falta agregar el precio');
		let validateStock = isEmpty(form_stock_text, 'Falta agregar el stock');

		if (validateDescription && validatePrice && validateStock) {
			let product = {};
			product.description = description_value;
			product.price = price_value;
			product.stock = stock_value;
			createProduct(product);
		}

		modal_example.hide();
		mostrarDataEnLaVista(response);
		window.location.reload();
	}

	if (opcionesDeBtn === 'editar') {
		let producto = {};
		producto.id = idProduct;
		producto.description = form_description_text.value;
		producto.price = form_price_text.value;
		producto.stock = form_stock_text.value;
		editarProduct(producto.id, producto);
		modal_example.hide();
		mostrarDataEnLaVista(response);
		window.location.reload();
	}
});

//editar productos
let btn_editar_product = document.querySelectorAll('#btn-editar-product');
btn_editar_product.forEach((btnEditar) => {
	btnEditar.addEventListener('click', () => {
		modal_header.innerText = 'Editar producto';
		opcionesDeBtn = 'editar';
		let elementPadre = btnEditar.parentElement.parentElement;
		idProduct = elementPadre.children[0].innerHTML;
		form_description_text.value = elementPadre.children[1].innerHTML;
		form_price_text.value = elementPadre.children[2].innerHTML;
		form_stock_text.value = elementPadre.children[3].innerHTML;

		modal_example.show();
	});
});

//Eliminar productos
let btn_eliminar_product = document.querySelectorAll('#btn-eliminar-product');

btn_eliminar_product.forEach((element) => {
	element.addEventListener('click', () => {
		let elementPadre = element.parentElement.parentElement;
		let idProduct = elementPadre.children[0].innerHTML;

		alertify.confirm(
			'Eliminar articulo',
			'¿Esta seguro de eliminar este articulo?',
			function () {
				alertify.success('Ok');
				deleteProduct(idProduct);
				location.reload();
			},
			function () {
				alertify.error('Cancel');
			}
		);
	});
});

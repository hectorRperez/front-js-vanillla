let baseUrl = 'http://localhost:8000/api/articulos';

export async function getAllProduct() {
	const response = await fetch(baseUrl);
	return response.json();
}

export function createProduct(newProduct) {
	const requestOption = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-CSRF-TOKEN': window.CSRF_TOKEN,
		},
		body: JSON.stringify(newProduct),
	};

	fetch(baseUrl, requestOption);
}

export async function editarProduct(idProduct, product) {
	const requestOption = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'X-CSRF-TOKEN': window.CSRF_TOKEN,
		},
		body: JSON.stringify(product),
	};

	let message = await fetch(`${baseUrl}/${idProduct}`, requestOption);
	console.log(message);
}

export async function deleteProduct(idProduct) {
	console.log('Hola Mundo');
	const requestOption = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const response = await fetch(`${baseUrl}/${idProduct}`, requestOption);
	console.log(response);
}

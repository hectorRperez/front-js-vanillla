export function isEmpty(elem, helperMsg) {
	console.log('Hola Mundo');

	if (elem.value.toString().length > 0) {
		return true;
	} else {
		alert(helperMsg);
		elem.focus();
		return false;
	}
}

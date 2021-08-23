//Llamame a TODOS los input que esten dentro del ID del main.
const INPUTS = document.querySelectorAll('#IDmain input');
const BUTTON = document.getElementById('IDbutton');


let expression = {
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	password: /^.{4,12}$/ // 4 a 12 digitos.
};

//Al contenido de la variable de expresiones regulares le pasamos un false
//para que luego mediante la función que verifica las expresiones si es true o false.
let contents = {
	email: false,
	password: false,
};

//Función que pasa los paremetros a los casilleros y luego llama a la función para comprobarlos.
const validateForm = (e) => {
	switch (e.target.name) {
		case "email":
			validateContent(expression.email, e.target, 'email');
		break;
		case "password":
			validateContent(expression.password, e.target, 'password');
		break;
	}
}

//Función que valida las expresiones regulares.
const validateContent = (expressions, input, content) => {
	const BOX = document.getElementById(`ID${content}`);
	if(expressions.test(input.value)){
		BOX.classList.remove('box');
		BOX.classList.remove('active-error');
		BOX.classList.add('active-correct');
		contents[content] = true;
	} else {
		BOX.classList.remove('box');
		BOX.classList.add('active-error');
		BOX.classList.remove('active-correct');
		contents[content] = false;
	}
}
//Función que ejecuta al hacer click y dejar de hacer click.
INPUTS.forEach((input) => {
	input.addEventListener('keyup', validateForm);
	input.addEventListener('blur', validateForm);
});


//Al boton ingresar poneme las siguientes condicones:
BUTTON.addEventListener('click', (e) => {
	e.preventDefault();
	const textIncomplete = document.getElementById('IDtext-1');
	const textIncorrect  = document.getElementById('IDtext-2');
	const textSent = document.getElementById('IDtext-3');

	//Si esta completo:
	if (contents.email && contents.password ) {
		textSent.classList.remove('text-invalid');
		textSent.classList.add('textSent');
		setTimeout(() => {
			textSent.classList.add('text-invalid');
			textSent.classList.remove('textSent');
			location.reload();
		}, 900);
	}
	//Si estan vacio los casilleros: 
	else if (contents.email == '' && contents.password =='') {
		textIncomplete.classList.remove('text-invalid');
		textIncomplete.classList.add('textIncomplete');
		setTimeout(() => {
			textIncomplete.classList.remove('textIncomplete');
			textIncomplete.classList.add('text-invalid');
		}, 2000);
	}
	//Si estan incorrectos los casilleros: 
	else {
		textIncorrect.classList.remove('text-invalid');
		textIncorrect.classList.add('textIncorrect');
		setTimeout(() => {
			textIncorrect.classList.remove('textIncorrect');
			textIncorrect.classList.add('text-invalid');
		}, 2000);
	}
});


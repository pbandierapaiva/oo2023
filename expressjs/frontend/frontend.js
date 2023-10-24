// Funções JavaScript para o FrontEnd


function submeter() {
	fetch('/', {
		method: 'POST',
		headers: {
        		'Content-Type': 'application/json',
      			},
		body: JSON.stringify(
		    	{'nome':document.getElementById("cpoNome").value}
		    	)
		})
		.then( resposta => {
			if(!resposta.ok) {
				throw new Error('Resposta da rede n&atilde;o estava ok');
			}
			return( resposta.text() );
		})
		.then( dadoRetornado => {
			document.getElementById('saida').innerHTML = dadoRetornado;
		})
		.catch(error => {
        		alert("Erro no POST");
      		});
}

function getSobre(){
	fetch('/sobre')
		.then( resposta => {
			if(!resposta.ok) {
				throw new Error('Resposta da rede n&atilde;o estava ok');
			}
			return( resposta.text() );
		})
		.then( dado => {
			document.getElementById('saida').innerHTML = dado;
		})
		.catch( erro => {
			document.getElementById('saida').innerHTML = erro;
			document.getElementById('saida').style = "color:red";
		})
}

function populaSelect() {
	let sel = document.getElementById('selecPessoa');
	fetch('/listar')
		.then( resposta => {
			if(!resposta.ok) {
				throw new Error('Resposta da rede n&atilde;o estava ok');
			}
			return( resposta.json() );
		})
		.then( dado => {
			dado.forEach( item 
				sel
			)
		})
}



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
			populaSelect();
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

	fetch('/listar')
		.then( resposta => {
			if(!resposta.ok) {
				throw new Error('Resposta da rede n&atilde;o estava ok');
			}
			return( resposta.json() );
		})
		.then( dado => {
			let sel = document.getElementById('selecPessoa');
			while( sel.options.length > 0 ) sel.remove(0);
			dado.forEach( item => {
				let novaOpcao = new Option(item,'Option Value');
				sel.add(novaOpcao);
				})
			})
}




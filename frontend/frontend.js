// Funções JavaScript para o FrontEnd


function submeter() {
	fetch('/', {
		method: 'PUT',
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
			document.getElementById("cpoNome").value ='';
			populaSelect();

		})
		.catch( erro => {
			//document.getElementById('saida').innerHTML = erro;
			//document.getElementById('saida').style = "color:red";
			let caixaErro = document.createElement('div');
			caixaErro.className = "w3-panel w3-red w3-display-container";
			
			x = document.createElement('span');
			x.className = "w3-button w3-large w3-display-topright";
			x.innerHTML = "&times;"
			caixaErro.appendChild(x);
			//x.onclick = function(){ this.parentElement.style.display='none'; }
			caixaErro.innerHTML = "<h3>Danger!</h3><p id='mensagemErro'>";
  			//document.getElementById('mensagemErro').innerHTML = erro;
		});
}

function selecionou() {
	//alert("selecionou "+ document.getElementById('selecPessoa').value);
	let entraLocal = document.createElement('div');

	let uid = document.getElementById('selecPessoa').value;
	fetch('/listar/'+uid)
		.then( resposta => {
			if(!resposta.ok) {
				throw new Error('Resposta da rede n&atilde;o estava ok');
			}
		console.log(resposta);
		return( resposta.json() )
		}).then( dado=>{
			let saiDiv = document.getElementById('saida');
			let ficha = document.createElement('div');
			ficha.className = "w3-card4 w3-padding-large";
			let eleNome = document.createElement('div');
			eleNome.innerHTML = dado['nome'];
			let inputCep = document.createElement('input');
			inputCep.id = "elementoInputCep";
			inputCep.className = "w3-input";
			inputCep.onblur = buscaCep;

			ficha.appendChild( eleNome );
			ficha.appendChild( inputCep );
			saiDiv.appendChild(ficha);
			let eleCidade = document.createElement('div');
			eleCidade.id = 'eCidade'
			let eleRua  = document.createElement('div');
			eleRua.id = 'eRua'
			saiDiv.appendChild(eleCidade);
			saiDiv.appendChild(eleRua);
			saiDiv.hidden = false;
		})
}

function buscaCep( ) {
	let cepnum  = document.getElementById('elementoInputCep').value;

	fetch('/cep/'+cepnum).then( resposta => {
			if(!resposta.ok) {
				throw new Error('Resposta da rede n&atilde;o estava ok');
			}
			return( resposta.json() );
		}).then( dado => {
			let saiDiv = document.getElementById('saida');
			document.getElementById('eCidade').innerHTML = dado['cidade'];
			document.getElementById('eRua').innerHTML = dado['rua'];

		})
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
			
			let i = 0;
			
			dado.forEach( item => {
				let novaOpcao = new Option(item,i);
				i++;
				sel.add(novaOpcao);
				})
			})
		.catch( erro => {
			document.getElementById('saida').innerHTML = erro;
			document.getElementById('saida').style = "color:red";
		});
}

function main() {
	populaSelect();
}


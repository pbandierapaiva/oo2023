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
	entraLocal.innerHTML= document.getElementById('selecPessoa').value;
	
	let saiDiv = document.getElementById('saida');
	
	saiDiv.appendChild(entraLocal);
	saiDiv.hidden = false;
	
	cep = document.createElement('input');
	cep.className = "w3-input";
	saiDiv.appendChild(cep);
	cep.addEventListener("keyup", (event) => {
		if ( event.keyCode == 13 ) {  //apertou enter
			buscaCep( cep.value );
			}   
		});

}

function buscaCep( cep ) {

	fetch('/cep/'+cep).then( resposta => {
			if(!resposta.ok) {
				throw new Error('Resposta da rede n&atilde;o estava ok');
			}
			return( resposta.text() );
		}).then( dado => {
			alert( dado );
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


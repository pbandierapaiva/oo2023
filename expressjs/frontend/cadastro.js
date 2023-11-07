function executaSobre() {
	fetch('/sobre')
		.then( resposta => {
			if(!resposta.ok) {
				throw new Error('Resposta da rede n&atilde;o estava ok');
			}
			return( resposta.text() );
		})
		.then( dado => {
			document.getElementById('principal').innerHTML = dado;
		})
}

function buscaCep( ) {
	cepnum = this.value;
    cepnum = cepnum.replace('-','');
    this.value = cepnum;

	fetch('/cep/'+cepnum).then( resposta => {
			if(!resposta.ok) {
				throw new Error('Resposta da rede n&atilde;o estava ok');
			}
			return( resposta.json() );
		}).then( dado => {
            if( dado['status']=='ERRO' )
                alert("Logradouro não encontrado");
            else {
                // let saiDiv = document.getElementById('principal');
                document.getElementById('logradouro').value = dado['rua']+", "+dado['cidade'];
                // document.getElementById('eRua').innerHTML = dado['rua'];
                // alert( dado['cidade']+"   -    "+dado['rua'])
            }
		})
}

function submeteForm() {
        fetch('/', {
            method: 'PUT',
            headers: {
                    'Content-Type': 'application/json',
                      },
            body: JSON.stringify(
                    {
                        'nome':document.getElementById("nome").value,
                        'cep' : document.getElementById("cep").value,
                        'email' :document.getElementById("email").value
                    })
            })
            .then( resposta => {
                if(!resposta.ok) {
                    throw new Error('Resposta da rede n&atilde;o estava ok');
                }
                return( resposta.text() );
            })
            .then( dadoRetornado => {
                alert(dadoRetornado);
                // document.getElementById('saida').innerHTML = dadoRetornado;
                // document.getElementById("cpoNome").value ='';
                // populaSelect();
            })

}

function executaIncluir() {
    janelaPrincipal = document.getElementById('principal');
    janelaPrincipal.innerHTML = "";

    caixa = document.createElement('div');
    caixa.className = "w3-card-4";
    cabecaCaixa  = document.createElement('div');
    cabecaCaixa.className = "w3-container w3-teal";
    cabecaCaixa.innerHTML = "<h2>Novo usuário</h2>"
    formulario = document.createElement('form');
    formulario.className = "w3-container";
    
    texto = document.createElement('label');
    texto.innerHTML= "<b>Nome</b>";
    texto.className="w3-text-teal";
    entraNome = document.createElement('input');
    entraNome.className="w3-input w3-border w3-sand";
    entraNome.id = "nome";

    texto2 = document.createElement('label');
    texto2.innerHTML= "<b>CEP</b>";
    texto2.className="w3-text-teal";
    entraCep = document.createElement('input');
    entraCep.className="w3-input w3-border w3-sand";
    entraCep.id = "cep";
    entraCep.addEventListener("blur", buscaCep)

    labelEndereco = document.createElement('label');
    labelEndereco.innerHTML= "<b>Logradouro</b>"
    labelEndereco.className="w3-text-teal";
    endereco = document.createElement('input');
    endereco.className="w3-input w3-border w3-sand";
    endereco.id = 'logradouro'
    endereco.disabled = true;

    texto3 = document.createElement('label');
    texto3.innerHTML= "<b>e-mail</b>";
    texto3.className="w3-text-teal";
    entraMail = document.createElement('input');
    entraMail.className="w3-input w3-border w3-sand";
    entraMail.id = "email";

    botaoSubmete = document.createElement('button');
    botaoSubmete.innerHTML = "Submeter";
    botaoSubmete.className = "w3-button w3-teal";
    botaoSubmete.addEventListener("click",submeteForm);


    formulario.appendChild(texto);
    formulario.appendChild(entraNome);

    formulario.appendChild(texto2);
    formulario.appendChild(entraCep);
    formulario.appendChild(labelEndereco);
    formulario.appendChild(endereco);
    formulario.appendChild(texto3);
    formulario.appendChild(entraMail);
    formulario.appendChild(botaoSubmete);


    caixa.appendChild(cabecaCaixa);
    caixa.appendChild(formulario);
    janelaPrincipal.appendChild(caixa);
}


function executaListar() {
	fetch('/listar')
		.then( resposta => {
			if(!resposta.ok) {
				throw new Error('Resposta da rede n&atilde;o estava ok');
			}
			return( resposta.json() );
		})
		.then( dado => {

            janelaPrincipal = document.getElementById('principal');
            janelaPrincipal.innerHTML = "";

            lista = document.createElement('ul');
            lista.className = "w3-ul w3-card-4"
            dado.forEach( item => {
                novoItem = document.createElement('li');
                novoItem.className="w3-display-container";
                novoItem.innerHTML = item.split('|')[0];
                x = document.createElement('span');
                x.className="w3-button w3-transparent w3-display-right";
                x.innerHTML = "&times;";
                x.addEventListener("click", apagaUsuario );
                novoItem.appendChild(x);
                lista.appendChild(novoItem);
            });

            janelaPrincipal.appendChild(lista);

			})
		.catch( erro => {
			document.getElementById('principal').innerHTML = erro;
			document.getElementById('principal').style = "color:red";
        });
    }

function apagaUsuario(ele){
    this.parentElement.style.display = 'none';
    }


function main() {
    barraMenu = document.createElement('div');
    barraMenu.className = "w3-bar w3-light-grey";

    opcaoSobre = document.createElement('a');
    opcaoSobre.className = "w3-bar-item w3-button w3-right"
    opcaoSobre.innerHTML = "Sobre";
    opcaoSobre.addEventListener( "click", executaSobre );

    dropdown = document.createElement('div'); 
    dropdown.className="w3-dropdown-hover";
    
    botaoAcoes = document.createElement('button');
    botaoAcoes.className="w3-button";
    botaoAcoes.innerHTML = "Ações";

    dropdownConteudo = document.createElement('div');
    dropdownConteudo.className="w3-dropdown-content w3-bar-block w3-card-4";

    opcaoListar = document.createElement('a');
    opcaoListar.className="w3-bar-item w3-button"
    opcaoListar.innerHTML = "Listar";
    opcaoListar.addEventListener( "click", executaListar);

    opcaoIncluir = document.createElement('a');
    opcaoIncluir.className="w3-bar-item w3-button"
    opcaoIncluir.innerHTML = "Incluir";
    opcaoIncluir.addEventListener( "click", executaIncluir);

    dropdownConteudo.appendChild(opcaoListar);
    dropdownConteudo.appendChild(opcaoIncluir);
    dropdown.appendChild(botaoAcoes);
    dropdown.appendChild(dropdownConteudo)
    barraMenu.appendChild(dropdown);
    barraMenu.appendChild(opcaoSobre);
    document.body.appendChild(barraMenu)

    principal = document.createElement('div');
    principal.id = "principal";
    principal.className = "w3-container";
    document.body.appendChild(principal);
}

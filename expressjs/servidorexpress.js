// Back-end ExpressJS

const express = require('express')
const arq = require('fs');
var execute = require('child_process').exec;
const servidor = express()
const porta = 3000

servidor.use(express.json());
servidor.use(express.static('frontend'))

servidor.get('/', (req, res) => {
	res.redirect('/cadastro.html');
})

servidor.get('/antigo', (req, res) => {
	res.redirect('/frontend.html');
})

servidor.get('/sobre', (req, res) => {
    	res.writeHead(200, {'Content-Type': 'text/html'});
    	res.write("<h2>Exemplo de backend/frontend em ExpressJS</h2>");	
    	return res.end();
})

servidor.get('/listar', (req, res) => {
	console.log("processando /listar")
	retorno = { 'status':'ERRO', 'resultado':[]};
	arq.readFile('nomes.txt', 'utf8', (err, dados) => {
		if (err) {
		    console.error(err);
		    return;
		    }
		let nomes = dados.split("\n");
		nomes.pop();

		let i =0;
		nomes.forEach(elemento => {
			registro = elemento.split("|");
			retorno['status'] = 'OK';
			retorno['resultado'].push(  { 
					'nome'  : registro[0],
					'cep'   : registro[1],
					'email' : registro[2],
					'linha' : i
				});
			i++;
		});

		res.json( retorno );
		})
})

servidor.get('/listar/:uid', (req,res) => {
	console.log("processando /listar com parametro: "+req.params['uid'])
	retorno = { 'status':'ERRO'};
	let id = req.params['uid'];
	arq.readFile('nomes.txt', 'utf8', (err, dados) => {
		if (err) {
		    console.error(err);
		    return;
		    }
		let nomes = dados.split("\n");

		registro = nomes[id].split("|");
		retorno =  { 
				'status': 'OK',
				'nome'  : registro[0],
				'cep'   : registro[1],
				'email' : registro[2]
			};

		res.json( retorno );
	})
})

servidor.delete('/usuario/:uid', (req,res) => {
	console.log("Removendo usuário");
	let uid = req.params['uid'];

	arq.readFile('nomes.txt', 'utf8', (err, dados) => {
			if (err) {
				console.error(err);
				return;
				}
			let nomes = dados.split("\n");
			nomes.splice(uid,1);
			arq.writeFile('nomes.txt',nomes.join('\n'), (err) => {
					if (err) throw err;
					console.log('The file has been saved!');
				})
		})
	res.json( {'status':'OK'} );
})

servidor.put('/', (req, res) => {
	console.log("No método PUT");
	console.log(req.body);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write("Dados inseridos!");
	
	arq.appendFile("nomes.txt", req.body.nome+"|"+ req.body.cep+"|"+ req.body.email+"\n", 
		(err) => { 
		if (err) { 
			console.log(err); 
		} 
		else { 
			console.log("\nArquivo alterado"); 
		} 
	}); 	
    	return res.end();

})

servidor.get('/cep/:numero', (req, res) => {
	let numcep = req.params['numero'];

    execute("grep ^"+numcep+" /home/pub/datasets/ceps.txt",
		(error, stdout, stderr) => { 

			if( stdout=='')
				retorno = { 'status':'ERRO' };
			else {
				let dados = stdout.split('\t')
				retorno = { 'status':'OK', 'cidade' : dados[1],
					'rua' : dados[3].split(' - ')[0]};
			}
			console.log(retorno);
			res.json(retorno);
			});


})

servidor.listen(porta, () => {
  console.log(`Aplicação monitorando porta: ${porta}`)
})

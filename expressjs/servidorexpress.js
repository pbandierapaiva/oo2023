// Back-end ExpressJS

const express = require('express')
const arq = require('fs');
var execute = require('child_process').exec;
const servidor = express()
const porta = 3000

servidor.use(express.json());
servidor.use(express.static('frontend'))




servidor.get('/', (req, res) => {
	res.redirect('/frontend.html');
})

servidor.get('/sobre', (req, res) => {
    	res.writeHead(200, {'Content-Type': 'text/html'});
    	res.write("<h2>Exemplo de backend/frontend em ExpressJS</h2>");	
    	return res.end();
})

servidor.get('/listar', (req, res) => {
	console.log("processando /listar")
	arq.readFile('nomes.txt', 'utf8', (err, dados) => {
		if (err) {
		    console.error(err);
		    return;
		    }
		let nomes = dados.split("\n");
		nomes.pop();
		res.json( nomes );
		})
})

servidor.get('/listar/:uid', (req,res) => {
	console.log("processando /listar com parametro: "+req.params['uid'])

	let id = req.params['uid'];
	arq.readFile('nomes.txt', 'utf8', (err, dados) => {
		if (err) {
		    console.error(err);
		    return;
		    }
		let nomes = dados.split("\n");
		res.json({'nome': nomes[id]} );
	})
})

servidor.put('/', (req, res) => {
	console.log(req.body);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write("<h2>Dados recebidos!</h2>");
	
	arq.servidorendFile("nomes.txt", req.body.nome+"\n", 
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
			let dados = stdout.split('\t')
			retorno = { 'cidade' : dados[1],
				'rua' : dados[3].split(' - ')[0]};
			console.log(retorno);
			res.json(retorno);
			});


})

servidor.listen(porta, () => {
  console.log(`Aplicação monitorando porta: ${porta}`)
})

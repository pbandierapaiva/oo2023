// Back-end ExpressJS

const express = require('express')
const arq = require('fs');
const app = express()
const port = 3000

app.use(express.json());
app.use(express.static('frontend'))

app.get('/', (req, res) => {
	res.redirect('/frontend.html');
})

app.get('/sobre', (req, res) => {
    	res.writeHead(200, {'Content-Type': 'text/html'});
    	res.write("<h2>Exemplo de backend/frontend em ExpressJS</h2>");	
    	return res.end();
})

app.get('/listar', (req, res) => {
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

app.put('/', (req, res) => {
	console.log(req.body);
    	res.writeHead(200, {'Content-Type': 'text/html'});
    	res.write("<h2>Dados recebidos!</h2>");
    	
    	arq.appendFile("nomes.txt", req.body.nome+"\n", 
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

app.get('/cep',(req, res) => {

	console.log(req.body);

}

app.listen(port, () => {
  console.log(`Aplicação monitorando porta: ${port}`)
})

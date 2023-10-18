// Primeiro exemplo de AJAX usando frontend e backend

const http = require('http');
const arq = require('fs');


const port = 3000;
 
const servidorHTTP = http.createServer((req, res) => {
	console.log(`URL : ${req.url} \nMethod: ${req.method}`);
	if( req.url=='/' && req.method=='GET' ) {
		arq.readFile('frontend.html', function(err, data) {
    			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
	    		return res.end();
	    		})
	}
	else {
		if( req.method=='POST' ) {
			//console.log(req);
		  	req.on('data', chunk => {
    				console.log('A chunk of data has arrived: ', chunk);
  				});
			}
		
  		res.statusCode = 200;
  		res.setHeader('Content-Type', 'text/txt');
  		res.end(`URL : ${req.url} \nMethod: ${req.method}` );
  		}
});
 
servidorHTTP.listen(port, () => {
  console.log(`Servidor escutando porta ${port}`);
});

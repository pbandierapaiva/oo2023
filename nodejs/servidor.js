// Exemplo do W3 Schools


var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
  console.log("Requisição recebida: ");


  fs.readFile('teste.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);

console.log("Aguardando requisições HTTP na porta 8080");

const http = require('http');
 
const hostname = '127.0.0.1';
const port = 3000;
 
const servidorHTTP = http.createServer((req, res) => {


  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(`<!DOCTYPEhtml><html><head><meta charset='UTF-8'></head><body><h2>Hello World</h2><p>URL : ${req.url} <br>Método: ${req.method} </body></html>` );
});
 
servidorHTTP.listen(port, function() {
  console.log(`Servidor escutando porta ${port}`);
});

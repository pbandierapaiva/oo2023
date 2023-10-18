const express = require('express')
const arq = require('fs');
const app = express()
const port = 3000

app.use(express.urlencoded({ 
    extended: true
})) 

app.get('/', (req, res) => {
	console.log("Retornando Frontend em HTML")
	arq.readFile('frontend.html', (err, data) =>  {
    			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
	    		return res.end();
	    		})
})

app.post('/', function(req, res) {
	console.log(req.body);
    	
    	res.redirect('/') 
})



app.listen(port, () => {
  console.log(`Aplicação monitorando porta: ${port}`)
})

const fs = require('fs');
const http = require('http');
const crypto = require('crypto');

const LISTEN_PORT = 8080;

http.createServer(function (req, res) {
	const name = crypto.randomBytes(16).toString('hex');

	console.log(`\nStarting stream ${name}: "${req.url}"`);
	const stream = fs.createWriteStream(`up_${name}.bin`);
	req.on('end', () => {
		stream.close();
		
		console.log(`Finished stream ${name}: "${req.url}"`);

		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write("FINISHED\n");
		res.end();
	});
	req.pipe(stream);
}).listen(LISTEN_PORT, () => {
	console.log(`Listening on ${LISTEN_PORT}`)
});

//  nice tar -cjv LOCAL_PATH | nice curl -X POST -T- "http://localhost:1234"

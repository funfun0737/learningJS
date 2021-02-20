const express = require('express');
const app = express();

app.use(express.static('./public'));

app.get('/dynamic.html',(request, response) => {
  response.send('this is not actual file');
});

app.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});

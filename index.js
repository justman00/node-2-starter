const server = require('./api/server');

server.listen(process.env.PORT || 4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});

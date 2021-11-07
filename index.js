/* eslint no-console: "off" */

const app = require("@src/server");

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});

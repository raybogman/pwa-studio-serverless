const express = require('express');
const { middleware } = require('@magento/upward-js');

async function serve() {
  const app = express();
  const port = 80;

  app.get('/', (req, res) => res.send('Hello from Express!'));

  const upwardMiddleware = await middleware(
    `${__dirname}/upward.yml`,
    {
      MAGENTO_BACKEND_URL: 'https://master-7rqtwti-mfwmkrjfqvbjk.us-4.magentosite.cloud/',
      NODE_ENV: 'production'
    }
  );

  app.use(upwardMiddleware);

  app.listen(port, () => console.log(`Listening on port ${port}!`));
}

serve();

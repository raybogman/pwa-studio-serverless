const { createUpwardServer } = require('@magento/upward-js');

async function serve() {
  await createUpwardServer({
    port: 3000,
    bindLocal: true,
    logUrl: true,
    upwardPath: './upward.yml',
    env: {
      MAGENTO_BACKEND_URL: 'https://master-7rqtwti-mfwmkrjfqvbjk.us-4.magentosite.cloud/',
      NODE_ENV: 'production'
    }
  });
}

serve();
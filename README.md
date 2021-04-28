# PWA Studio Serverless

The following is a draft concept project on how to run the static PWA Studio "dist" directory in a single Docker container.
The minimal requirement is:
- 'dist' folder (yarn run build)
- server.js (@magento/upward-js, react, express (alternative option, but not required))

### Install
- Clone git repo
- Build Docker image (docker build -t pwa-studio .)
- docker run -d -p 80:80 pwa-studio
- check http://localhost in your browser

### Serverless PWA Studio
- Next step is run the docker image on AWS Fargate
- Split Docker image into 2 Docker images and using a docker-compose.yml file. This way the "dist" folder can be rebuild during CI/CD process flows.



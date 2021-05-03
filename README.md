# PWA Studio Serverless

The following is a draft concept project on how to run the static PWA Studio "dist" directory in a single Docker container.
The minimal requirement is:
- 'dist' folder (yarn run build)
- server.js (@magento/upward-js, react, express (alternative option, but not required))

### Install
- Clone git repo
- Build Docker image (docker build -t pwa-studio-serverless .)
- docker run -d -p 3000:3000 pwa-studio-serverless
- check http://localhost:3000 in your browser

Alternative is docker-compose

- docker-compose up

### PWA Studio Serverless to-do's
- :white_check_mark: ~~Next step is run the docker image on AWS Fargate.~~
- Use Docker Hub to update newly build into AWS Fargate.
    Alternative:
    - Create AWS ECS repositry, update newly build into AWS Fargate.
- Create simple CI/CD build shell script to build docker image after "yarn run build" has completed.
    Ideas:
    - Create new folder 'or' clone "pwa-studio-severless" within PWA studio project and run "docker-build.sh" script.
    - Create PWA script/function e.g. "yarn run build:serverless" which build, create and pushes docker to repo.
- Split Docker image into 2 Docker images and using a docker-compose.yml file. This way the "dist" folder can be rebuild during CI/CD process flows.
- SSL termination on LoadBalancer


### Knows issues/tips
- don't build docker images on port 80 (0-1024). Root privileged only. Port Forward (eg. AWS ALB "Application Loadbalance" listener (sercurity groups)) is best option.

### Readings
- [https://docs.docker.com/cloud/ecs-integration/](https://docs.docker.com/cloud/ecs-integration/)
- [https://aws.amazon.com/blogs/containers/authenticating-with-docker-hub-for-aws-container-services/](https://aws.amazon.com/blogs/containers/authenticating-with-docker-hub-for-aws-container-services/)
- [https://aws.amazon.com/blogs/containers/create-a-ci-cd-pipeline-for-amazon-ecs-with-github-actions-and-aws-codebuild-tests/](https://aws.amazon.com/blogs/containers/create-a-ci-cd-pipeline-for-amazon-ecs-with-github-actions-and-aws-codebuild-tests/)
- [https://docs.github.com/en/actions/guides/deploying-to-amazon-elastic-container-service](https://docs.github.com/en/actions/guides/deploying-to-amazon-elastic-container-service)
- [https://docs.aws.amazon.com/cli/latest/reference/ecs/describe-task-definition.html](https://docs.aws.amazon.com/cli/latest/reference/ecs/describe-task-definition.html)

### Pricing
- [https://aws.amazon.com/fargate/pricing/](https://aws.amazon.com/fargate/pricing/)

example (us-east-1):
1 day = ~$0.97 (vCPU) + ~$0.10 (Mem)= ~$1.07
30 days = ~$29.14 + ~$3.20 (Mem) = ~$32.34
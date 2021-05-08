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
- Create AWS ECS repositry, update newly build into AWS Fargate using Github Actions.
    Alternative:
    - Use Docker Hub to update newly build into AWS Fargate.
- Create simple CI/CD build shell script to build docker image after "yarn run build" has completed.
    Ideas:
    - Create new folder 'or' clone "pwa-studio-severless" within PWA studio project and run "docker-build.sh" script.
    - Create PWA script/function e.g. "yarn run build:serverless" which build, create and pushes docker to repo.
- Split Docker image into 2 Docker images and using a docker-compose.yml file. This way the "dist" folder can be rebuild during CI/CD process flows.
- :white_check_mark: ~~SSL termination on LoadBalancer~~


### Knows issues/tips
- don't build docker images on port 80 (0-1024). Root privileged only. Port Forward (eg. AWS ALB "Application Loadbalance" listener (sercurity groups)) is best option.

### Best Practice AWS Copilot kickstart

Basic version [test setup]
1. Create custom AWS IAM role using the following AWS Policies
    - ECS FullAccess
    - ???
2. Instal AWS CLI
3. Create custom profile
    - export profile
4. Install AWS Copilot    
5. Clone this "pwa-studio-serverless" repository
6. run `copilot init` 
    - choose a application name
    - choose Load balancer Web Service and give it a name
    - choose ./Dockerfile (unless it's not in your root dir)
    - choose 'test' deploy environment, Yes
7. copilot app delete

Advanced version [test & prod setup] (custom domain, pipeline deploy)
Use step 1-5 to get your project started.

- copilot app init --domain your-domain.com (need to be registered at Route 53, otherwise it will not work)
- copilot init
- copilot env init --name test --profile "your-custom-aws-profile-name" --app venia
- copilot svc deploy --name alb --env test
    - update a image, css or something else and run the same command. The new deploy will automaticly replace the old image without any downtime. Tip. have a look in AWS console --> ECS --> Repositories and Task Definitions. They will have a update version.

Now lets create an 'prod' version
- copilot env init --name prod --profile "your-custom-aws-profile-name" --app venia
- copilot svc deploy --name alb --env prod

Delete a single environment
- copilot env delete --name test 
- copilot env delete --name prod

Like to delete all at ones:
- copilot app delete

In case you like to check your current setup run:  (tip: export AWS_PROFILE=your-custom-aws-profile-name)
- copilot app ls        # list the applications managed by copilot
- copilot app show      # describe environments and services
- copilot env ls        # list the environments
- copilot svc show      # describe service and will gather information to present it in one centralized place in the console
- copilot svc ls        # list services    
- copilot svc logs      # show service logs
- copilot svc status    # show service status

#### How to configure (TLS) SSL on AWS ECS/ALB/ACM/Route53

Most impact is to host your domain at AWS Route 53. It's possible to host is somewhere else but this is beound the scope is this tutorial. You need to do some DNS hacking and not done correctly it will impact the `copilot init` deploy schema and will get stuck (guilty as charged - the 'HTTPSCert' is not able to create a CERT if the NS are not connected on your subdomain while hosting that on AWS Route 53 - so be carefull ;-)

- Route 53
- ACM (AWS Certificate Manager)
- ALB listener 443 update
- [https://aws.amazon.com/certificate-manager/pricing/](https://aws.amazon.com/certificate-manager/pricing/)

### AWS copilot CI/CD

- copilot pipeline init

The following files are created pipeline.yml & buildspec.yml in your copilot folder. Before you run the following command make sure to review the pipeline.yml file and update your branch name. Default is set to "main". In case you have forgotten a workaround is to update the AWS CodePipeline -> Pipeline Name -> Edit -> Edit Stage -> Edit Action -> Branch name (it's pretty much well hidden, so be carefull it will save your tons of debugging why your pipeline is not working)
- copilot pipeline update
- go to: https://console.aws.amazon.com/codesuite/settings/connections (authorize Github/Bitbucket/Github Enterprise to connect your repository to AWS CodePipeline -> AWS CodeBuild -> AWS CodeDeploy) to support "AWS Connector for GitHub"
- Choose `Install a new app` in the popup window.

- copilot pipeline status
- copilot pipeline show

In case you like to remove or start from scratch with your AWS copilot pipeline run the following command.
- copilot pipeline delete


### Readings
- [https://docs.docker.com/cloud/ecs-integration/](https://docs.docker.com/cloud/ecs-integration/)
- [https://aws.amazon.com/blogs/containers/authenticating-with-docker-hub-for-aws-container-services/](https://aws.amazon.com/blogs/containers/authenticating-with-docker-hub-for-aws-container-services/)
- [https://aws.amazon.com/blogs/containers/create-a-ci-cd-pipeline-for-amazon-ecs-with-github-actions-and-aws-codebuild-tests/](https://aws.amazon.com/blogs/containers/create-a-ci-cd-pipeline-for-amazon-ecs-with-github-actions-and-aws-codebuild-tests/)
- [https://docs.github.com/en/actions/guides/deploying-to-amazon-elastic-container-service](https://docs.github.com/en/actions/guides/deploying-to-amazon-elastic-container-service)
- [https://docs.aws.amazon.com/cli/latest/reference/ecs/describe-task-definition.html](https://docs.aws.amazon.com/cli/latest/reference/ecs/describe-task-definition.html)
- [https://github.com/aws-actions/amazon-ecr-login](https://github.com/aws-actions/amazon-ecr-login)
- [https://docs.aws.amazon.com/AmazonECR/latest/userguide/security_iam_service-with-iam.html](https://docs.aws.amazon.com/AmazonECR/latest/userguide/security_iam_service-with-iam.html)
- [https://towardsaws.com/pilot-your-containers-like-a-boss-with-aws-copilot-9b83a4272822](https://towardsaws.com/pilot-your-containers-like-a-boss-with-aws-copilot-9b83a4272822)

### Pricing
- [https://aws.amazon.com/fargate/pricing/](https://aws.amazon.com/fargate/pricing/)

example (us-east-1):
* 1 day = ~$0.97 (vCPU) + ~$0.10 (Mem)= ~$1.07
* 30 days = ~$29.14 + ~$3.20 (Mem) = ~$32.34

### Loadtest

`ab -n 10000 -c 50 http://your-url.com/`
This command tells ApacheBench to make 10000 requests to my service, with a concurrency of 50 requests at a time.

The final results show a very acceptable 111 requests per second, p99 of only 1715 ms, and an average time per request of 788ms.
`
Server Software:
Server Hostname:        alb.prod.venia.bogman.info
Server Port:            443
SSL/TLS Protocol:       TLSv1.2,ECDHE-RSA-AES128-GCM-SHA256,2048,128
Server Temp Key:        ECDH P-256 256 bits
TLS Server Name:        alb.prod.venia.bogman.info

Document Path:          /
Document Length:        7138 bytes

Concurrency Level:      50
Time taken for tests:   157.777 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      78940000 bytes
HTML transferred:       71380000 bytes
Requests per second:    63.38 [#/sec] (mean)
Time per request:       788.885 [ms] (mean)
Time per request:       15.778 [ms] (mean, across all concurrent requests)
Transfer rate:          488.60 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:      335  590 165.6    550    1834
Processing:   104  194 108.1    159    1241
Waiting:      104  170  75.1    145     904
Total:        456  785 207.8    710    2259

Percentage of the requests served within a certain time (ms)
  50%    710
  66%    768
  75%    832
  80%    867
  90%   1034
  95%   1189
  98%   1441
  99%   1715
 100%   2259 (longest request)
 `
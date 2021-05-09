# PWA Studio Serverless

The following is a draft concept project on how to run the static PWA Studio "dist" directory in a single Docker container on AWS ECS (Elastic Container Service) using AWS Fargate.
The minimal requirement is:
- 'dist' folder (yarn run build)
- server.js
- package.json (dependencies: @magento/upward-js, react)
- Dockerfile

### Install PWA Studio locally
- Clone git repo
- Build Docker image (docker build -t pwa-studio-serverless .)
- docker run -d -p 3000:3000 pwa-studio-serverless
- check http://localhost:3000 in your browser

Alternative is docker-compose

- docker-compose up

### Best Practice AWS Copilot kickstart

The following AWS Copilot kickstart plan helps you to build an AWS ECS/Fargate serverless environment. This environment will use the smalest Memory (512mb) and CPU (256mb) footprint. It's ideal for testing and maybe even small production sites. By the way the performance result are amzing :heart_eyes:.

I have created 2 simple senario's, an Basic and Advanced version. Take your time getting to know AWS and [https://aws.github.io/copilot-cli/](AWS Copilot). In case you are brand new to AWS, please take some cources before you kickoff, those will help big time, or even getting [https://raybogman.com/amazon-aws-certified-cloud-practitioner-exam-preparation](AWS Certified). AWS can be overwelming :wink:.

Basic version [test setup]
1. Create custom AWS IAM role using the following AWS Policies
    - ECS FullAccess
    - AmazonS3FullAccess
    - AmazonSSMFullAccess
    - AdministratorAccess
:exclamation: I am fully aware this is not a best practice, so be careful when create your new IAM role and choosing your AWS Policies.
2. Instal [https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html](AWS CLI)
3. Create custom profile
    - export profile (export AWS_PROFILE=your-custom-aws-profile-name)
4. Install AWS Copilot    
5. Clone this "pwa-studio-serverless" repository
6. run `copilot init` 
    - choose an application name
    - choose Load balancer Web Service and give it a name
    - choose ./Dockerfile (unless it's not in your root dir)
    - choose 'test' deploy environment, Yes
7. copilot app delete

Advanced version [test & prod setup] (custom domain, pipeline deploy)
Use step 1-5 to get your project started.

- copilot app init --domain your-domain.com (you need to be registered your domain at Route 53, otherwise it will not work)
- copilot init
- copilot env init --name test --profile "your-custom-aws-profile-name" --app venia
- copilot svc deploy --name alb --env test
    - update an image, CSS or something else and run the same command again. The new deploy will automaticly replace the old image without any downtime. Tip. have a look in AWS console --> ECS --> Repositories and Task Definitions. They will have a update version.

ps. Venia is my application name is choose. Pick yours and replace the name at: --app

Now lets create an 'prod' version
- copilot env init --name prod --profile "your-custom-aws-profile-name" --app venia
- copilot svc deploy --name alb --env prod

Delete an single environment
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

Best practice is to host your domain name at AWS Route 53. It's possible to host is somewhere else but this is beyond the scope is this tutorial. You need to do some DNS hacking and not done correctly it will impact the `copilot init` deploy schema and will get stuck (guilty as charged - the 'HTTPSCert' is not able to create a CERT if the NS are not connected on your subdomain while hosting that on AWS Route 53 - so be carefull ;-)

- Route 53
- ACM (AWS Certificate Manager)
- ALB listener 443 update
- [https://aws.amazon.com/certificate-manager/pricing/](https://aws.amazon.com/certificate-manager/pricing/)

### AWS copilot CI/CD

Like to build a more flexible way to deploy your newly create code online? Then you mostly likely like to leverage AWS Coplilot Pipeline. It's as easy as it sounds. Follow below steps to get your Github or Bitbucket repository connected to the AWS CodePipeline, CodeBuild and CodeDeploy flow.

- copilot pipeline init

The following files are created pipeline.yml & buildspec.yml in your copilot folder. Before you run the following command make sure to review the pipeline.yml file and update your branch name to "master". Default is set to "main". In case you have forgotten a workaround is to update the AWS CodePipeline -> Pipeline Name -> Edit -> Edit Stage -> Edit Action -> Branch name (it's pretty much well hidden, so be carefull it will save you tons of debugging why your pipeline is not working)

- copilot pipeline update
- go to: https://console.aws.amazon.com/codesuite/settings/connections (authorize Github/Bitbucket/Github Enterprise to connect your repository to AWS CodePipeline -> AWS CodeBuild -> AWS CodeDeploy) to support "AWS Connector for GitHub"
- Choose `Install a new app` in the popup window.

Like to check if all is working correctly and connected run these.
- copilot pipeline status
- copilot pipeline show

In case you like to remove or start from scratch with your AWS copilot pipeline run the following command.
- copilot pipeline delete

### Known issues/tips
- don't build docker images on port 80 (0-1024). Root privileged only. Works great locally but not on AWS ECS.

### Pricing

Using AWS ECS/Fargate sound like a single out of the box toolset, well it's not. In case you are femaliar with AWS all services/tools are nested tightly toghether. When kicking off AWS Copilot it starts crafting the following AWS tools. (disclamer: it might me more than listed here ;-))
- AWS Cloudformation
- AWS ECS/Fargate
- AWS ECR
- AWS VPC (Subnets, Route Tables, Internet Gateways, Netwerk ACLs)
- AWS Load Balancer
- AWS Target Groups
- AWS Route 53
- AWS Systems Manager
- AWS Certificate Manager
- AWS S3
- AWS KMS
- AWS IAM
- AWS Lambda
- AWS CodeBuild
- AWS CodePipeline
- AWS CodeStar
- AWS CodeArtifact
- AWS CodeDeploy
- AWS Security Groups

Some of the AWS services are free while others are not. Depending in the AWS ECS/Fargate sizing cost might increase.
Below is a basic example of just the AWS ECS/Fargate pricing.
I would suggest to leverage the AWS Pricing Calculator [https://calculator.aws/](https://calculator.aws/#/) to calculate the estimated cost running this setup. 

- [https://aws.amazon.com/fargate/pricing/](https://aws.amazon.com/fargate/pricing/)

example (us-east-1):
* 1 day = ~$0.97 (vCPU) + ~$0.10 (Mem)= ~$1.07
* 30 days = ~$29.14 + ~$3.20 (Mem) = ~$32.34

### Loadtest

#### Apache Benchmark
`ab -n 1000 -c 10 https://your-url.com/`
This command tells ApacheBench to make 1000 requests to my service, with a concurrency of 10 requests at a time.

The final results show a very acceptable 25 requests per second, p99 of only 399 ms, and an average time per request of 386ms.

#### Autocannon 
`autocannon -c 1000 -p 10 https://your-url.com/`
This command tells Autocannon to make 1000 requests to my service, with a concurrency of 10 requests at a time.

The final results show a very acceptable 2k requests in 10.77s, p97.5 of only 435 ms, and average 235 Req/Sec.

### PWA Studio Serverless to-do's/done
- :white_check_mark: ~~Next step is run the docker image on AWS Fargate.~~
- :white_check_mark: ~~Create AWS Copilot environment + pipeline~~ 
- :white_check_mark: ~~SSL termination on Load Balancer, AWS Certificate Manager, Route 53~~
- Create simple CI/CD build shell script to build docker image after "yarn run build" has completed.
    Ideas:
    - Create new folder 'or' clone "pwa-studio-severless" within PWA studio project and run "docker-build.sh" script.
    - Create PWA script/function e.g. "yarn run build:serverless" which build, create and pushes docker to repo.
- Test express server compare to node
- Horizontal scalling

### Readings
- [https://aws.github.io/copilot-cli/](https://aws.github.io/copilot-cli/)
- [https://docs.docker.com/cloud/ecs-integration/](https://docs.docker.com/cloud/ecs-integration/)
- [https://aws.amazon.com/blogs/containers/authenticating-with-docker-hub-for-aws-container-services/](https://aws.amazon.com/blogs/containers/authenticating-with-docker-hub-for-aws-container-services/)
- [https://aws.amazon.com/blogs/containers/create-a-ci-cd-pipeline-for-amazon-ecs-with-github-actions-and-aws-codebuild-tests/](https://aws.amazon.com/blogs/containers/create-a-ci-cd-pipeline-for-amazon-ecs-with-github-actions-and-aws-codebuild-tests/)
- [https://docs.github.com/en/actions/guides/deploying-to-amazon-elastic-container-service](https://docs.github.com/en/actions/guides/deploying-to-amazon-elastic-container-service)
- [https://docs.aws.amazon.com/cli/latest/reference/ecs/describe-task-definition.html](https://docs.aws.amazon.com/cli/latest/reference/ecs/describe-task-definition.html)
- [https://github.com/aws-actions/amazon-ecr-login](https://github.com/aws-actions/amazon-ecr-login)
- [https://docs.aws.amazon.com/AmazonECR/latest/userguide/security_iam_service-with-iam.html](https://docs.aws.amazon.com/AmazonECR/latest/userguide/security_iam_service-with-iam.html)
- [https://towardsaws.com/pilot-your-containers-like-a-boss-with-aws-copilot-9b83a4272822](https://towardsaws.com/pilot-your-containers-like-a-boss-with-aws-copilot-9b83a4272822)
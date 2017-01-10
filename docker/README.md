## Dockerised RADAR-Dashboard

Create the docker image:
```
$ docker build -t radarcns/radar-dashboard ./
```

Or pull from dockerhub:
```
$ docker pull radarcns/radar-dashboard:latest 
```

Run the docker image locally:
```
$ docker run -d -p 3030:80 --name radar-dashboard radarcns/radar-dashboard:latest
```

The dashboard will be running at http://localhost:3030

## Runtime environment variables  

Environment variables can be overridden by `docker-compose` because they're used in the `docker run` command instead of `docker build`. More information in [https://docs.docker.com](https://docs.docker.com/compose/environment-variables/#/setting-environment-variables-in-containers). This comes at a cost, it needs to get the files from github and build them the first time it runs, but it only does this once and there's added flexibility to clone other github branches for testing or other purposes.

```bash
# project name
PROJ='RADAR-Dashboard'
  
# to change the URI of the API
API_URI='http://radar-restapi.eu-west-1.elasticbeanstalk.com/api'
  
# to use a specific branch instead of master
BRANCH='master'
```

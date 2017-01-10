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

### Runtime enviroment variables 

```bash
# project name
PROJ='RADAR-Dashboard'
  
# to change the URI of the API
API_URI='http://radar-restapi.eu-west-1.elasticbeanstalk.com/api'
  
# to use a specific branch instead of master
BRANCH='master'
```

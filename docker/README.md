## Dockerised RADAR-Dashboard

Create the docker image:
```
$ docker build -t radarcns/radar-dashboard ./
```

Or Pull from dockerhub
```
$ docker pull radarcns/radar-dashboard:latest 
```

Run the docker image locally:
```
$ docker run -p 3000:3000 --name radar-dashboard -t radarcns/radar-dashboard:latest
```

The dashboard will be running at http://localhost:3000

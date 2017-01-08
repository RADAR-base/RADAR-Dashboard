## Dockerised RADAR-Dashboard

Create the docker image:
```
$ docker build -t radarcns/dashboard ./
```

Run the docker image locally:
```
$ docker run -p 3000:3000 --name radar-dashboard -t radarcns/dashboard
```

The dashboard will be running at http://localhost:3000

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

## Environment parameters  

The environment parameters are set in `docker run` so they can be overridden by `docker-compose`. More information in [https://docs.docker.com](https://docs.docker.com/compose/environment-variables/#/setting-environment-variables-in-containers).

```bash
# to change the URI of the API
API_URI='http://radar-restapi.eu-west-1.elasticbeanstalk.com/api'
```

The parameters are replaced in `index.html` and are global to the application.
```html
<script>
  const PARAMS = {
    API_URI: 'http://radar-restapi.eu-west-1.elasticbeanstalk.com/api'
  };
</script>
```


# Description
Simple web interface to write/edit short notes in localStorage.
# Installation instructions
1. Download code
2. Open index.html
3. The end


Deploy with docker
------------------

```
$ mkdir localnotes.build
$ cd localnotes.build
$ docker build -t localnotes-frontend-webserver ../localnotes
$ docker create --name my-server-4 -P localnotes-frontend-webserver
$ docker start my-server-4
$ docker port my-server-4
```


Form.io File Upload Server
-------------------------
This library provides an Upload Server/Proxy for use with the Form.io File Component and URL configuration. 

This varient of Form.io's official MIT licensed work is for open source form.io. It is a NON-AUTHENTICATED upload handler so it should work with all versions of the url/upload file component of form.io (something that is sorely missing from their official code.)

## Getting Started
This library can be ran within 3 different environments.

  1. Locally using Node.js
  2. Docker container
  
### Running locally with Node.js
In order to run this server locally, you can type the following within your terminal.

```
npm install
node index
```

### Running within Docker
To run this with docker, you can use the following commands.

```
docker run -itd \
  -e "PORT=4100" \
  -e "MAX_UPLOAD_SIZE=16mb" \
  -e "DEBUG=*" \
  -e "PROVIDERS=file,alfresco" \
  -e "UPLOAD_DIR=" \
  --restart unless-stopped \
  --name formio-upload \
  -p 4100:4100 \
  formio/formio-upload
```

```  
  
### Environment Variables. 
You must use Environment variables to configure the runtime operation of this server. When running this server locally using Node.js, you can set the Environment variables within the ```.env``` file. These variables are defined as follows.


| Variable | Description | Default |
|----------|-------------|---------|
| PORT | The port you wish to run the server on. | 4100 |
| MAX_UPLOAD_SIZE | The maximum upload size for files being uploaded. | 16mb |
| DEBUG | Enables debugging | * |
| PROVIDERS | Determines which upload providers are enabled. This is a CSV of the providers you wish to enable. For example "file,alfresco" will enable both local file uploads as well as Alfresco ECM uploads. | file |
| UPLOAD_DIR | When using the "file" provider, this is the local upload base directory. | providers/uploads |

## Configure Form Upload
Now that you have the server running, you can configure a Form.io Form with a new File component.

![Alt text](https://monosnap.com/image/hyuWKj6MGKMFvNXQ5Es1XqOE5M3CCc.png)

Within the configuration of this File component, you will need to set the file upload type to **URL** and then provide the URL of this service. You can decide which upload provider to use based on the path you provide to the url of the running server.

For example:

 - **http://localhost:4100/file** - Uses the local file upload provider.
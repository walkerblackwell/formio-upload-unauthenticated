#!/bin/sh

docker run -itd \
  -e "PORT=4100" \
  -e "MAX_UPLOAD_SIZE=4000mb" \
  -e "DEBUG=*" \
  -e "PROVIDERS=file" \
  -e "UPLOAD_DIR=" \
  --restart unless-stopped \
  --name formio-upload \
  -p 4100:4100 \
  formio/formio-upload




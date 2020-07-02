#!/bin/sh

docker run -itd \
  -e "PORT=4100" \
  -e "MAX_UPLOAD_SIZE=4000mb" \
  -e "DEBUG=*" \
  -e "PROVIDERS=file" \
  -e "UPLOAD_DIR=" \
  -v /Users/Shared/Previously\ Relocated\ Items/Security/Development/formio-upload-unauthenticated/providers/uploads:/src/providers/uploads \
  --restart unless-stopped \
  --name formio-upload \
  -p 4100:4100 \
  formio/formio-upload




#!/bin/sh

if [ "$1" = 0 ]; then
  pm2 stop 0
  cd /root/codehelp/frontend
  npm run dev

elif [ "$1" = 1 ]; then
  pm2 stop 1
  cd /root/codehelp/server
  nodemon server.js 3000
fi
#!/bin/sh

if [ "$1" = dev ]; then
  if [ "$2" = 0 ]; then
    pm2 stop 0
    cd /root/codehelp/frontend
    npm run dev

  elif [ "$2" = 1 ]; then
    pm2 stop 1
    cd /root/codehelp/server
    nodemon server.js 3000
  fi
elif [ "$1" = build ]; then
    cd /root/codehelp/frontend
    npm run build
    pm2 start 0
    pm2 start 1
fi
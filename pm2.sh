#!/bin/bash

export NODE_ENV="production"
export NODE_PATH="/Users/jonrubins/Documents/personal/gofar/app:/Users/jonrubins/Documents/personal/gofar/config:/Users/jonrubins/Documents/personal/gofar/server:/Users/jonrubins/Documents/personal/gofar/shared"

# Clean up
rm -rf dist

# Rebuild
gulp build

# Start server
node_modules/pm2/bin/pm2 start server/server.js --name="gofar"

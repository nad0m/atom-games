#! /bin/bash
# Script to install this package locally in both client and server repos
killall node

npm run build

cd ../atom-socket
npm install /Users/BigMac/Documents/github/atom-games

cd ../fun-hub
yarn add /Users/BigMac/Documents/github/atom-games

cd /Users/BigMac/Documents/GitHub/atom-games

# cd ../atom-socket && npm run dev & cd ../fun-hub && yarn run dev &

# cd /Users/BigMac/Documents/GitHub/atom-games
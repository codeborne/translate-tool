#!/bin/sh
set -e

cd `dirname $0`

npm ci

cd ../build
npx -y http-server -p 9874 &
SERVER_PID=$!

cd -
TEST_URL='http://localhost:9874' npm test
kill $SERVER_PID

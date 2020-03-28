#!/bin/bash
set -e # fail on any error

PWD=`pwd`
cd `dirname $0`

if [ "$1" != "production" ]; then
    yarn install
fi

cd $PWD

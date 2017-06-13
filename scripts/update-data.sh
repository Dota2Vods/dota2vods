#!/bin/bash
projectFolder=$(cd "$(dirname $0)/../"; pwd)
dataSourceFolder="${projectFolder}/data"
dataBuildFolder="${projectFolder}/build/data"
dataRepo="https://github.com/dota2vods/tournament-data.git"

# Update
if [ -d $dataSourceFolder ]; then
    cd $dataSourceFolder
    git pull
else
    git clone $dataRepo $dataSourceFolder
    cd $dataSourceFolder
fi

# Build
make BUILD_FOLDER=$dataBuildFolder

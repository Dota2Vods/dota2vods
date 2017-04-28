#!/bin/bash
dataFolder="$(dirname $0)/../build/data"
dataRepo="https://github.com/dota2vods/tournament-data.git"

# Update
if [ -d $dataFolder ]; then
    cd $dataFolder
    git pull
else
    git clone $dataRepo $dataFolder
    cd $dataFolder
fi

# Build
make

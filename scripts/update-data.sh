#!/bin/bash
dataFolder=$(realpath "$(dirname $0)/../build/data")
dataRepo="https://github.com/dota2vods/tournament-data.git"

# Update
if [ -d $dataFolder ]; then
    cd $dataFolder
    git pull
else
    git clone $dataRepo $dataFolder
fi

# Build
cd $dataFolder
make

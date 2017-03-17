#!/bin/bash
dataFolder=$(realpath "$(dirname $0)/../build/data")
dataRepo="https://github.com/dota2vods/tournament-data.git"

if [ -d $dataFolder ]; then
    cd $dataFolder
    git pull
else
    git clone $dataRepo $dataFolder
fi

#!/bin/bash
echo "Making sure s3cmd is installed..."
pip install --user --quiet s3cmd
echo "Uploading new assets"
#Assets can get cached forever as the file name changes if they got updated
~/.local/bin/s3cmd sync --reduced-redundancy --acl-public --no-preserve \
    --no-mime-magic --guess-mime-type --add-header="Cache-Control: public, max-age=31536000" \
    build/assets/ s3://dota2vods/assets/
echo "Syncing build folder with s3 bucket..."
#All other files should be checked for updates on every request ("no-cache")
~/.local/bin/s3cmd sync --reduced-redundancy --acl-public --delete-removed --no-preserve \
    --no-mime-magic --guess-mime-type --add-header="Cache-Control: public, max-age=31536000, no-cache" \
    --exclude=assets/** \
    build/ s3://dota2vods/
echo "Done!"

#!/bin/sh
DATE=`date +%Y%m%dT%H%M`
packdir="fe-m-xxx-${DATE}"
packName="${packdir}.zip"

rm -rf fe-m-account-merge-*
mkdir $packdir

cp -r build main.html modal.html $packdir
zip -r $packName $packdir

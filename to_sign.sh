#!/bin/bash 

$1    # /path/to/apk

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore /Users/prohor/Workspace/androidsign/android_release.keystore "$1" sign

DIR=$(dirname "$1")
/Users/prohor/Workspace/android-sdk/build-tools/22.0.1/zipalign -v 4 $1 "${DIR}"/upload_me_to_google_play.apk
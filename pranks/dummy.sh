# name: Dummy
# author: Joe Lodato (https://github.com/terowz/)
# description: Says 'I am a dummy' every 5 minutes

(while true; do say "Do you know how to use a computer $(id -un) you dummy"; sleep 300; done) &

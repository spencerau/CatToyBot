# start up venv
source venv/bin/activate

# start up tailscale (not sure if necessary?)
#sudo tailscale up

# run server
python rasp_pi/server/web_stream.py
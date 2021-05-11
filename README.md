# pi-home-internal
The internal application for managing my Pi Home Server on the local network.

### Synology Setup Instructions
I set up the synology pieces by following the guide found here: https://stackoverflow.com/questions/60903529/node-js-running-on-synology-nas-accessing-ssh-windows-powershell-port-forward

```text
The Nas I used at home has installed Node JS v12 from Synology's package center. So I thought it would be cool to create a Node JS http webserver and study myself into back-end and front end development.

Create volume1/path_to_your_app/app.js and let the http server listen to port 8080. Next, With Powershell I could login with my Synology (admin) account's [username] and [password] into the Nas through ip-address from home. For accessing with ssh in Synology's cofiguration/Terminal the ssh-service must be checked. The default portnumber is 22, I changed this to for example 8822. Next, from Powershell I could now run the command:

ssh username@192.168.1.44 -p8822
Next password will be prompted
From Synology's shell I could now navigate to the file, run it and view it in my browser at 192.168.1.44:8080/.

cd /volume1/path_to_your_app/
node app.js
Next I setup port forwarding to host the webserver online. In my routers settings/port forwarding ipv4/ my nas is defined under an ip-address 192.168.1.44. At the Nas's application configuration I added a new rule under TCP protocol on port 8080. It only works for port 8080 (as far as I could get it workingfor now) because this is an experimental port. I could now access my webserver on my router's WAN-IP:8080/. After I exit the Synology's shell (ctrl+c) my application also stops running. I was not able to install forever from npm to keep the server running. However from this page I found a solution. I had to create an upstart file from Synology's shell in the /etc/init folder.

cd / (go back to root)
cd /etc/init/
sudo vi yourappname.conf

the I copy/pasted this code in the (.conf) file AND editted the parameters to my enviroment:

#!upstart
description "your app name"
start on started mountall
stop on shutdown

# Automatically Respawn:
respawn
respawn limit 99 5

env NODE_ENV=development
# Warning: this runs node as root user, which is a security risk
# in many scenarios, but upstart-ing a process as a non-root user
# is outside the scope of this question

chdir /volume1/path_to_your_app/
exec node /volume1/path_to_your_app/app.js >> /var/log/yourappname.log 2>&1
Now I could start and stop the upstart script manually from Synology's shell and it keeps on running even after I exit the Synology's shell. I also inserted "chdir /path_to_your_app/" in the script before "exec" because it changes the directory from where Node JS is running to the directory from your app. I don't know what security risks are from the warning in the script.

sudo start yourappname
sudo stop yourappname
Debugging my Node JS application i do with the commands:

sudo tail -f /var/log/yourappname.log
```

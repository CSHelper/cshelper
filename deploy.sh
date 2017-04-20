gulp build
rm dist.zip
zip dist.zip dist -r
scp -i ~/Downloads/cshelper.pem dist.zip ubuntu@ec2-54-202-72-28.us-west-2.compute.amazonaws.com:dist.zip << "./update.sh"

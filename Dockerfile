FROM openshift3/nodejs-010-rhel7

ADD . /opt/app-root/src/

EXPOSE 8080

CMD /bin/bash -c 'npm start'
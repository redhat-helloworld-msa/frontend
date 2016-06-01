FROM registry.access.redhat.com/openshift3/nodejs-010-rhel7

ADD . /opt/app-root/src/

EXPOSE 8080

CMD sed -e 's|HYSTRIXDASHBOARDURLPORT|'"$HOSTIP":"$HYSTRIX_DASHBOARD_PORT"'|; s|ZIPKINQUERYURLPORT|'"$HOSTIP"':'"$ZIPKIN_QUERY_PORT"'|' index.html.unprocessed > index.html && /bin/bash -c 'npm start'

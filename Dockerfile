FROM bucharestgold/centos7-s2i-nodejs:10.x

WORKDIR /opt/app-root/src

EXPOSE 8080

COPY . /opt/app-root/src


# Variables that define default values for the OpenShift Project
# and the Openshift dynamic subdomain that is being used. These
# values are used to build up the service URLs that are used for
# the services at runtime. These can also be overridden by injecting
# environment variables into the container at runtime.
ENV OS_SUBDOMAIN='rhel-cdk.10.1.2.2.xip.io' \
    OS_PROJECT='helloworld-msa'

# These variables can be used to enable/disable SSO/HYSTRIX dashboards
ENV ENABLE_HYSTRIX false
ENV ENABLE_SSO false
ENV ENABLE_JAEGER false

# The CMD. We do the following here:
#  - Process the env vars. All of them can be overriden at run time
#    so we need to run them through some logic on container bringup.
#  - Inject some env vars into the services.json.
#  - Inject some env vars into index.html
#  - Start the server via npm start.
CMD OLACHAINURL=${OLACHAINURL:-"http://ola-${OS_PROJECT}.${OS_SUBDOMAIN}/api/ola-chaining"} \
        HOLAURL=${HOLAURL:-"http://hola-${OS_PROJECT}.${OS_SUBDOMAIN}/api/hola"}           \
        BONJOURURL=${BONJOURURL:-"http://bonjour-${OS_PROJECT}.${OS_SUBDOMAIN}/api/bonjour"}  \
        ALOHAURL=${ALOHAURL:-"http://aloha-${OS_PROJECT}.${OS_SUBDOMAIN}/api/aloha"}        \
        OLAURL=${OLAURL:-"http://ola-${OS_PROJECT}.${OS_SUBDOMAIN}/api/ola"}              \
        APIGATEWAYURL=${APIGATEWAYURL:-"http://api-gateway-${OS_PROJECT}.${OS_SUBDOMAIN}/api/gateway"}   \
        HYSTRIXDASHBOARDURL=${HYSTRIXDASHBOARDURL:-"http://hystrix-dashboard-${OS_PROJECT}.${OS_SUBDOMAIN}"} \
        JAEGERQUERYURL=${JAEGERQUERYURL:-"http://jaeger-${OS_PROJECT}.${OS_SUBDOMAIN}"} \
    && sed -i services.json \
        -e 's|OLACHAINURL|'"$OLACHAINURL"'|' \
        -e 's|HOLAURL|'"$HOLAURL"'|' \
        -e 's|BONJOURURL|'"$BONJOURURL"'|' \
        -e 's|ALOHAURL|'"$ALOHAURL"'|' \
        -e 's|OLAURL|'"$OLAURL"'|' \
        -e 's|APIGATEWAYURL|'"$APIGATEWAYURL"'|' \
    && sed -i index.html \
        -e 's|HYSTRIXDASHBOARDURL|'"$HYSTRIXDASHBOARDURL"'|' \
        -e 's|JAEGERQUERYURL|'"$JAEGERQUERYURL"'|' \
    && /bin/bash -c 'npm start'

# frontend
HTML5 Frontend to access microservices

The detailed instructions to run *Red Hat Helloworld MSA* demo, can be found at the following repository: <https://github.com/redhat-helloworld-msa/helloworld-msa>


Execute frontend locally
------------------------

1. Open a command prompt and navigate to the root directory of this microservice.
2. Type this command to install the dependencies

        npm install

3. Type this command to execute the application:

	ENABLE_ZIPKIN=true ENABLE_HYSTRIX=true ENABLE_SSO=true npm start

4. Open the html page

        open index.html

5. The application will be running at the following URL: <http://localhost:8080/>

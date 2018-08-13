# REST requests with https://jsonplaceholder.typicode.com
## To run
***
+ npm install
+ npm run test
***
##Expected behavior
1.When wrong uri in request expect response with code "404", message "Not Found" and empty body
2.When wrong method in request expect response with code "405", message "Not Allowed" and empty body
3.When wrong body(any kind) in request expect response with code "400", message "Bad request" and empty body
4.When everything ok with request expect response with code "200", message "OK"("201" and "Created" when POST method) and body with corresponding content form(see folder Schems)
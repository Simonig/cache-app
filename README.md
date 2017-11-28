# Cache API


## Api routes


1. GET /cache/get/:key

        find in the database for the cache with the selected key and return it, if its not found 
        check the number of cache documents, if the number of documents is greater than 10 
        it overrides the oldest found, otherwise it creates one

2. GET /cache/getKeys 

        return an array with all the keys found
        
        
3. POST /cache

        accept an object with structure {key: "string"} and create or update the selected key with a new
        generated value

4. DELETE /cache/:key

        delete the selected key. 

5. DELETE /cache/

        delete all the cache documents
        
 
####Any cache value will be updated if the cache is older than a week during the get operations
        
  
## Main Libraries


#### Backend
1. Express
2. Mocha (unit tests)
3. Mongoose 
4. lodash
5. supertest
6. q (promises)



## Usage

first install the modules

    npm install

to run the tests (please provide a different url for the mongodb test enviroment)

    npm test
    


to run the app in port 4200 

    npm start
    

**the url for the database can be changed in the config folder, 
in the index file the url and in the json file the username and password**

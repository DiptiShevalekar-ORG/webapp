curl http://localhost:3002/healthz
GET - http://localhost:3002/healthz
PUT - Invoke-WebRequest -Uri http://localhost:3002/healthz -Method PUT

stop server -  net stop MySQL80 or services - mysql80 - right click - stop
Start Server - net start MySQL80

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
headers -
No- Cache - When the res from a server has been received - check if it matches with the origin if the resources have changed -
Imagine you have a box (cache) where you keep things for quick access. "No-cache" means every time you need something, you can't just grab it from the box; you have to check with the original source to make sure it's still up-to-date.

Process - 
1. Npm install
2. npm install dotenv --save 
3. npm install express --save
4. npm install nodemon
5. npm install body-parser
6. npm install mysql2
7. npm install sequelize
8. npm start




citation -
https://www.baeldung.com/postman-form-data-raw-x-www-form-urlencoded
https://stackoverflow.com/questions/60236819/how-to-use-body-parser-with-import-and-not-required-es6
https://rapidapi.com/guides/api-caching-with-http-headers
https://stackoverflow.com/questions/22312671/setting-environment-variables-for-node-to-retrieve


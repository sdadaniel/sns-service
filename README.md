# SNS-SERVICE / NODEJS

### **index**
___

* [Intro](#Intro)
* [Stack](#Stack)
* [Guide](#Guide)

<br>

### **Intro** <a id="Intro"></a>
___
> This is personal project with `nodejs` that has sns functions below.
* Login
* Follow/UnFollow
* Post
* Profile

<br>

### **Stack** <a id="Stack"></a>
___
> specification

*Backend* :  nodejs

*Front* : HTML, CSS, SCSS, Bootstrap, Jquery

*DB* : Mysql(sequelize), Redis

<br>

### **Guide** <a id="Guide"></a>
___
> Getting Started

1. Download the code
   ```
   git clone https://github.com/sdadaniel/sns-service.git
   ```

2. Init npm project
    ```javascript
    npm install
    ```


3. Make .env file at same depth width package.json and set blank variables below
    ```
    COOKIE_SECRET = 
    API_ROOT = http://localhost/api

    REDIS_HOST=
    REDIS_PORT=
    REDIS_PASSWORD=

    DB_DEV_USER=
    DB_DEV_PASSWORD=

    DB_PRODUCTION_USER=
    DB_PRODUCTION_PASSWORD=
    ```

4. Start dev mode like below which is starting with nodemon.
    ```
    npm run dev
    ```

    package.json
    ```
    ...
    script:{
      "dev": "nodemon html,js server.js"
    }
    ...
    ```

4. Access the web width `localhost:7000 ` which defalut dev port is `7000`
    ```
    localhost:7000
    ```


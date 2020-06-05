<img src="/public/lines.svg" alt="TODO"
	title="TODO " width="150" height="100" />


# TODO : A simple tool for time management [Frontend](https://github.com/santoshvijapure/stackhack-hackathon-frontend) | [API](https://github.com/pprathameshmore/stackhack-hackathon-backend/)

![](screnshots/s1.png)
![](screnshots/s2.png)

## Development Stack (MERN)
 ``` 
  -MongoDB
  -ExpressJS
  -ReactJS
  -NodeJS
```
## Getting started

#### Clone repo to local  

```
git clone git@github.com:santoshvijapure/stackhack-hackathon-frontend.git
```
#### install dependencies 
```
cd Todo
npm install 
```

#### run dev server
```
npm start
```
## API Documentation

[User Auth](https://documenter.getpostman.com/view/8028791/SztA8pBH)

[Todo CRUD](https://documenter.getpostman.com/view/8028791/Szmk2GP7?version=latest)

[Sort and Search](https://documenter.getpostman.com/view/8028791/Szmk2GP8?version=latest)

## file Structure

### Frontend
```
├── LICENSE
├── node_modules
│   ├── ...
│   │   ├── ...
├── package.json
├── package-lock.json
├── plugin.log
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── lines.svg
│   ├── manifest.json
│   └── robots.txt
├── README.md
├── screnshots
└── src
    ├── App.css
    ├── App.js
    ├── components
    │   ├── auth
    │   │   ├── TabPanel.js
    │   │   └── UserAuth.js
    │   ├── Footer.js
    │   ├── helper
    │   │   ├── auth.js
    │   │   ├── columns.js
    │   │   └── styles.js
    │   ├── LandingPage.js
    │   └── MaterialTable.js
    ├── index.js
    ├── serviceWorker.js
    └── setupTests.js
```

### Backend
```
├── app.js
├── bin
│   └── www
├── LICENSE
├── node_modules
│   ├── ...
│   │   ├── ...
├── package.json
├── package-lock.json
├── plugin.log
├── Procfile
├── public
│   ├── index.html
│   └── stylesheets
│       └── style.css
├── README.md
└── src
    ├── configs
    │   └── db.js
    ├── controllers
    │   ├── todos.js
    │   └── user.js
    ├── middlewares
    │   └── authCheck.js
    ├── models
    │   ├── todo.js
    │   └── user.js
    ├── routes
    │   ├── index.js
    │   └── modules
    │       ├── todo.js
    │       └── user.js
    ├── services
    │   ├── todo
    │   │   └── todo.js
    │   └── user
    │       └── user.js
    └── util
        ├── promiseHandler.js
        ├── todoObj.js
        └── util.js


```

## Licence 
```
The MIT License (MIT)
=====================

Copyright © 2020 Santosh Vijapure & Prathamesh More

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
```


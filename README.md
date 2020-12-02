# Machince Task by IoT Research Labs



# Getting started


## How to install

### Using Git (recommended)

1.  Clone the project from github. Change "myproject" to your project name.

```bash
git clone https://github.com/sainithink/mounty_Task.git
```

### Using manual download ZIP

1.  Download repository
2.  Uncompress to your desired directory

### Install npm dependencies after installing (Git or manual download)

```bash
cd IotTask
npm install
```


## Project  structure
```sh
.
├── app.js
├── package.json
├── bin
│   └── www
├── controllers
│   └── userController.js
├── models
|   ├── index.js
│   └── UsersModel.js
├── postman-collection
|   ├── MOUNTY_REST API NodeJS.postman_collection.json
├── routes
│   ├── api.js
│   ├── index.js
│   └── users.js
├── helpers
│   ├── apiResponse.js
│   ├── catchAsync.js
└── public
    ├── index.html
    └── stylesheets
        └── style.css
```
## How to run
```bash
npm install
```
It will install node dependencies 

### Copy .env.example to .env

It consist of port number and database details

### Running  API server locally

```bash
npm start
```

You will know server is running by checking the output of the command `npm start`

```bash
Connected to mongodb:YOUR_DB_CONNECTION_STRING
App is running ...

Press CTRL + C to stop the process.
```
**Note:**  `YOUR_DB_CONNECTION_STRING` will be your MongoDB connection string.


## Bugs or improvements

Every project needs improvements, Feel free to report any bugs or improvements<a href="mailto:sainithin.karra@gmail.com">@Sai Nithin</a>

## License

This project is open-sourced software licensed under the MIT License. See the LICENSE file for more information.

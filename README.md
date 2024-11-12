# Schedulot
Platform for connecting instructor to students.

# Technologies

Javascript, Nodejs, Express, Firebase, zod, axios, Vite@react, TailwindCSS

## Installation

Clone the project 
```bash
https://github.com/CoDesign-Spa27/Schedulot.git
```

# Backend
go to backend folder

```bash
cd backend
```

## Setup .env

```python
 FIREBASE_API_KEY=""
FIREBASE_AUTH_DOMAIN=""
FIREBASE_DATABASE_URL=""
FIREBASE_PROJECT_ID=""
FIREBASE_STORAGE_BUCKET=""
FIREBASE_MESSAGING_SENDER_ID=""
FIREBASE_APP_ID=""
FIREBASE_MEASUREMENT_ID=""

FIREBASE_ADMIN_API='./serviceAccount.json'
JWT_SECRET=''
```
NOTE : add a serviceAccount.json file generated by your firebase in root directory.

## npm install
 ```
npm install 
```

## Run Backend
```
node src/index.js
```

# Frontend
go to frontend folder

```bash
cd frontend
```
## npm install
 ```
npm install 
```

Set the url to http://localhost:8000/api at `frontend/src/util/axios.js`

```javascript
 import axiosInstance from 'axios';
export const axios = axiosInstance.create({
    baseURL: 'http://localhost:8000/api',
    });
```
## Run Frontend
```
npm run dev
```

YOUR SERVER IS UP ON `http://localhost:5173/`



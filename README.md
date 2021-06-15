# rlads2021Spring-Final
Final project for the course "Introduction to Programming for Data Science".

```
data/places.json     # 位置的資訊，key 是 place_id
data/urls.json       # place_id 對應 url，爬蟲中介產物
data/reviews/*.csv   # 評論，檔名是 place_id + .csv
```
## Run our application
Requirements
- Make sure your device have already build Node.js environment
- [Download Node.js](https://nodejs.org/zh-tw/download/)

How to run
1. Open a terminal window and access to the directory of our app
```
cd rlads-final-app
```
2. Access to our backend directory and start the server
```
cd backend
npm start
```
You should see your terminal print out results below if server is successfully connected
```
> backend@1.0.0 start
> node index.js

Listening on port 4000

```
3. Open another terminal window and repeat step 1 & 2 but access to our frontend this time
```
cd rlads-final-app
cd frontend
npm start
```
4. If the app sccessfully runs, your device would pop out an website of our app, or you may also access our app in link [](http://localhos.3000)

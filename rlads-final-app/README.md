# rlads-final-app

使用 `node.js` 建構可與使用者互動的app介面

## 在local端執行App
- 將這個檔案clone下來至local端
- 開啟兩個終端機介面設定路徑到這個 `rlads-final-app` 資料夾
```
cd rlads-final-app
```
- 其中一個終端機介面執行以下程序以開啟後端 (資料傳輸、執行R腳本)
```
cd backend
npm install
npm start
```
- 另一個終端機介面執行以下程序開啟前端 (網頁介面)
```
cd frontend
npm install
npm start
```
- 開啟Chrome瀏覽器並輸入網址[http://localhost:3000/](http://localhost:3000/) 即可打開app

## Hierarchies

- [`frontend`](frontend/)
  - [`public/index.html`](frontend/public/index.html): 執行基本的HTML網頁的架構，並且render出 `id="root"` 的 `<div>`模塊
  - [`src`](frontend/src)
    - [`components/*`](frontend/src/components/)
    - [`App.js`](frontend/src/App.js)
    - [`index.js`](frontend/src/index.js)
- [`backend`](backend/)
  - [`index.js`](backend/index.js)
  - [`Rscripts`](backend/Rscripts)
    - [`ex_multi_rating.R`](backend/Rscripts/ex_multi_rating.R)
    - [`ex_multi_type.R`](backend/Rscripts/ex_multi_type.R)
    - [`ex_rating_tfidf.R`](backend/Rscripts/ex_rating_tfidf.R)
    - [`ex_review_tfidf.R`](backend/Rscripts/ex_review_tfidf.R)
    - [`ex_word_filter.R`](backend/Rscripts/ex_word_filter.R)
    - [`ex_word_place_filter.R`](backend/Rscripts/ex_word_place_filter.R)

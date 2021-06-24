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
  - [`public/index.html`](frontend/public/index.html) : 執行基本的HTML網頁的架構，並且render出 `id="root"` 的 `<div>`模塊
  - [`src`](frontend/src)
    - [`components/*`](frontend/src/components/) : `Chart_*.js` 會接收來自上層傳送進來的json資料，並利用 `recharts` 套件輸出成不同分析樣式的圖表
    - [`App.js`](frontend/src/App.js) : 主要的前端網頁的程式碼，使用了 `React` `React Hook` 作為模組的設計以及控制使用者介面中的狀態變數與狀態變化；設計上使用了開源的 `Material-UI` 套件作為框架的美化；使用者可以自行設置不同圖表上的參數設定，會由前端依照不同的圖表各自的狀態變數去向後端fetch各自的json資料回前端
    - [`index.js`](frontend/src/index.js) : 將設計好的 `App.js` 模塊插入至HTML網頁中，設定模塊的id為root
- [`backend`](backend/)
  - [`index.js`](backend/index.js) : 主要的資料處理、傳輸與R腳本的執行的後端程式碼，使用 `Express` `Node.js` 套件作為執行R scripts的server端，以及設置不同的路由以傳送正確的資料回應來自前端不同的要求；當取得的前端的fetch請求時，執行該路由對應的R scripts，並且回傳json資料回前端
  - [`Rscripts`](backend/Rscripts)
    - [`ex_multi_rating.R`](backend/Rscripts/ex_multi_rating.R)
    - [`ex_multi_type.R`](backend/Rscripts/ex_multi_type.R)
    - [`ex_rating_tfidf.R`](backend/Rscripts/ex_rating_tfidf.R)
    - [`ex_review_tfidf.R`](backend/Rscripts/ex_review_tfidf.R)
    - [`ex_word_filter.R`](backend/Rscripts/ex_word_filter.R)
    - [`ex_word_place_filter.R`](backend/Rscripts/ex_word_place_filter.R)

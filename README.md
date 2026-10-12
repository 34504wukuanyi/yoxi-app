# yoxi 城市同行

React + TypeScript + Vite 手機版互動 Demo。既有 PPT 與 REQUIREMENTS.md 保持原樣。

## 安裝與啟動

請先安裝 Node.js 22.12 以上（建議 Node.js 24 LTS）與 Git。Windows PowerShell 使用 `npm.cmd`，避免執行原則阻擋 npm.ps1。

取得專案後，在專案根目錄執行：

```powershell
cd 路徑\yoxi-app
npm.cmd ci
npm.cmd run dev -- --port 5173
```

瀏覽器開啟 http://localhost:5173/ 。若該連接埠已被占用，請使用終端機顯示的網址。以 `Ctrl+C` 停止開發伺服器。

目前不需要 API key 或 `.env`，也沒有實際後端服務。請勿提交任何憑證；如日後新增環境設定，可提供不含秘密的 `.env.example`，實際 `.env` 檔案已列入忽略規則。前端 `VITE_*` 變數會暴露給瀏覽器，不可用於保存私密金鑰。

## 建置與驗證

`npm.cmd run build` 執行 TypeScript 檢查並產生 `dist/`；`npm.cmd test` 執行核心規則測試。

瀏覽器流程測試需先啟動開發伺服器，再於另一個終端執行 `npm.cmd exec playwright test`。目前 `playwright.config.ts` 使用 Windows 預設 Chrome 路徑；其他系統請調整 `launchOptions.executablePath`，或移除該設定並執行 `npm.cmd exec playwright install chromium` 安裝測試瀏覽器。

## 協作與檔案

- `src/`：React 畫面、遊戲規則與樣式。
- `public/`：城市照片素材。
- `tests/`、`e2e/`：規則與瀏覽器測試。
- `screenshots/ppt-*.png`：可放入 PPT 的手機比例示範圖；`screenshots/capture.mjs` 可重新產生（需啟動本機伺服器與 Windows Chrome）。
- `REQUIREMENTS.md`、原始 `.pptx`：需求與簡報來源，請保留。
- `package-lock.json`：共同開發請一併提交，以 `npm.cmd ci` 安裝一致版本。

`node_modules/`、`dist/`、測試報告、環境秘密、日誌與本機暫存不納入版本控制。建議各自建立分支開發，再透過 Pull Request 整合變更。

## Demo 操作與限制

開啟 http://localhost:5173/ 。初始模擬時間為 2026-10-12 20:30；右上 Demo 可切隔日 08:00、今晚、年度結算與新年度。

第一次領養後，以搭乘、猜題隔日領獎或照片投稿審核取得飼料，再主動餵食。100 EXP 解鎖圍巾、300 EXP 解鎖皇冠。所有資料使用 `localStorage` 的 `yoxi-v1` 保存，獎勵以日期與紀錄去重；清除瀏覽器網站資料會重設。此為單瀏覽器展示，正式交易防重與帳戶同步需後端實作。

日曆為獨立一般排程，可新增修改刪除。授權連接模擬日曆後顯示自己的寵物明日提醒，缺少目的地須手動補充。設定出發前提醒不會下單、派車或建立系統推播。

年度只讀該年度有效餵食紀錄；結算不改永久經驗。同年結算最多一次發券，示範門檻為 100 / 300 分，券額 $50 / $100，均非正式營運規則或有效優惠券。

照片投稿只保留本機縮圖，審核通過／退回／正式採用及參與統計均為模擬。沒有實際 AI、照片隱私處理、手機日曆、路線或 yoxi 服務串接。

城市備用照片：[Unsplash 圖片來源](https://images.unsplash.com/photo-1470004914212-05527e49370b)。寵物為程式繪製 SVG 角色，進化圖案與提醒使用相同寵物設定。

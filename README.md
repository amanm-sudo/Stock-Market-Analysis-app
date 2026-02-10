# 📈 Stock Market Analysis App

A fully interactive **Stock Market Analysis web application** built using **HTML, CSS, and Vanilla JavaScript**. The app visualizes historical stock price data, shows key financial statistics, and provides company summaries — all fetched dynamically from APIs.

This project was built as part of an academic assignment and follows a **clean, modular, API-driven approach** without any external libraries.

---

## 🚀 Features

* 📊 **Interactive Line Chart**

  * Historical price visualization
  * Hover interaction with crosshair and tooltip
  * Dynamic date & price display

* ⏱️ **Time Range Filters**

  * 1 Month
  * 3 Months
  * 1 Year
  * 5 Years

* 📋 **Stock List Panel**

  * Displays multiple stocks
  * Shows Book Value and Profit
  * Profit color-coded (Green = Positive, Red = Zero/Negative)

* 🧾 **Stock Details Section**

  * Company summary fetched from API (`stocksProfileData[0][SYMBOL].summary`)
  * Displays Peak (Max) and Low (Min) price for selected range

* 🔄 **Fully Dynamic**

  * Updates chart, summary, and statistics on stock or range change

---

## 🛠️ Tech Stack

* **HTML5** – Structure
* **CSS3** – Styling & layout
* **JavaScript (ES6)** – Logic & interactivity
* **REST APIs** – Data source

> ❌ No frameworks or libraries used (no React, Chart.js, etc.)

---

## 📂 Project Structure

```
stock-market-analysis/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## 🌐 APIs Used

* **Stock Statistics API**

  ```
  https://stock-market-api-k9vl.onrender.com/api/stocksstatsdata
  ```

* **Stock Chart Data API**

  ```
  https://stock-market-api-k9vl.onrender.com/api/stocksdata
  ```

* **Company Profile / Summary API**

  ```
  https://stock-market-api-k9vl.onrender.com/api/profiledata
  ```

  > The API returns `stocksProfileData`, where each stock symbol contains a nested `summary` field.
  > [https://stock-market-api-k9vl.onrender.com/api/profiledata](https://stock-market-api-k9vl.onrender.com/api/profiledata)

  ```
  ```

---

## ⚙️ How to Run the Project

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/stock-market-analysis.git
   ```

2. Navigate to the project folder

   ```bash
   cd Stock-Market-Analysis-app
   ```

3. Open `index.html` in your browser

   * No server setup required
   * Works directly in the browser

---

## ✅ Implementation Highlights

* Modular JavaScript functions (`renderChart`, `renderAll`, `renderDetails`)
* Defensive checks for API data shape
* Proper handling of missing or unavailable data
* Clean separation of concerns (UI vs Data vs Logic)

---

## 📌 Notes

* If a company summary is not available from the API, the app gracefully displays:

  > `No summary available.`

  This is handled defensively by checking the presence of the `summary` field inside `stocksProfileData`.

* Peak & Low values are calculated **dynamically** based on the selected range.

---

## 🧑‍🎓 Academic Use

This project was created for educational purposes and follows best practices expected in coursework submissions:

* API-driven data
* No hardcoded values
* Clean UI and logic

---

## 📄 License

This project is for educational use only.

---

## 🙌 Acknowledgements

Thanks to the provided Stock Market APIs for enabling real-time data visualization.

---

> ✅ If you're reviewing this project: open the app, interact with the chart, change ranges, and switch stocks — everything updates dynamically.

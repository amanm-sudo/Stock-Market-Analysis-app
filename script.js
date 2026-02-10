const rangeMap = {
  "1month": "1mo",
  "3month": "3mo",
  "1year": "1y",
  "5year": "5y"
};


const chartApi =
  "https://stock-market-api-k9vl.onrender.com/api/stocksdata";
const statsApi =
  "https://stock-market-api-k9vl.onrender.com/api/stocksstatsdata";
const profileApi =
  "https://stock-market-api-k9vl.onrender.com/api/profiledata?symbol=";

let chart;
let selectedStock = "AAPL";
let selectedRange = "1month";
let chartData, statsData;

// Fetch data
async function loadData() {
  

  chartData = await fetch(chartApi).then(r => r.json());
  statsData = await fetch(statsApi).then(r => r.json());

  

  renderStockList();
  renderAll();
}


// Render stock list
function renderStockList() {
  const ul = document.getElementById("stockList");
  ul.innerHTML = "";

  if (
    !statsData ||
    !Array.isArray(statsData.stocksStatsData) ||
    !statsData.stocksStatsData[0]
  ) {
    console.error("Stats data not ready");
    return;
  }

  const stocksObject = statsData.stocksStatsData[0];
  // stocksObject = { AAPL: {...}, MSFT: {...}, ... }

 Object.keys(stocksObject).forEach(symbol => {
    if (symbol === "_id") return;

    const stock = stocksObject[symbol];

    const li = document.createElement("li");
    const profitClass = stock.profit > 0 ? "green" : "red";

    li.innerHTML = `
      <strong>${symbol}</strong><br>
      Book: ${stock.bookValue}<br>
      Profit: <span class="${profitClass}">
        ${stock.profit}
      </span>
    `;

    li.onclick = () => {
      selectedStock = symbol;
      renderAll();
    };

    ul.appendChild(li);
  });
}







// Render chart and details
function renderAll() {
  const apiRange = rangeMap[selectedRange];
  const rangeData = chartData.stocksData[0][selectedStock][apiRange];

  const labels = rangeData.timeStamp.map(ts =>
    new Date(ts * 1000).toLocaleDateString()
  );

  const prices = rangeData.value;

  // (Peak & Low)
  const peak = Math.max(...prices);
  const low = Math.min(...prices);

  // Store globally so renderDetails can use it
  window.currentPeak = peak;
  window.currentLow = low;
 

  renderChart(labels, prices);
  renderDetails();
}




// Chart
function renderChart(labels, prices) {
  const ctx = document.getElementById("chart");

  if (chart) chart.destroy();

  // Custom crosshair plugin
  const crosshairPlugin = {
    id: "crosshair",
    afterDraw: chart => {
      if (chart.tooltip?._active?.length) {
        const ctx = chart.ctx;
        const x = chart.tooltip._active[0].element.x;
        const topY = chart.scales.y.top;
        const bottomY = chart.scales.y.bottom;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#aaa";
        ctx.stroke();
        ctx.restore();
      }
    }
  };

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        data: prices,
        borderColor: "#2dff2d",
        borderWidth: 2,
        tension: 0.3,

        
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#2dff2d",
        pointHoverBorderColor: "#ffffff",
        pointHoverBorderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,

      interaction: {
        mode: "index",
        intersect: false
      },

      plugins: {
        legend: { display: false },

        tooltip: {
          enabled: true,
          displayColors: false,
          backgroundColor: "#111",
          titleColor: "#aaa",
          bodyColor: "#fff",
          callbacks: {
            title: ctx => ctx[0].label,
            label: ctx => `${selectedStock}: $${ctx.raw}`
          }
        }
      },

      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#aaa" }
        },
        y: {
          grid: { color: "#1a1a3d" },
          ticks: { color: "#aaa" }
        }
      }
    },
    plugins: [crosshairPlugin]
  });
}


// Details
async function renderDetails() {
  const title = document.getElementById("details-title");
  const summary = document.getElementById("details-summary");

  try {
    const res = await fetch(profileApi);
    const data = await res.json();

    if (
      !data ||
      !Array.isArray(data.stocksProfileData) ||
      !data.stocksProfileData[0] ||
      !data.stocksProfileData[0][selectedStock] ||
      !data.stocksProfileData[0][selectedStock].summary
    ) {
      title.innerText = selectedStock;
      summary.innerText = "No summary available.";
      return;
    }

    title.innerText = selectedStock;
    summary.innerHTML = `
      ${data.stocksProfileData[0][selectedStock].summary}
      <br><br>
      <strong>Peak:</strong> $${window.currentPeak}<br>
      <strong>Low:</strong> $${window.currentLow}
    `;
  } catch (err) {
    title.innerText = selectedStock;
    summary.innerText = "Error loading summary.";
  }
}




// Buttons
document.querySelectorAll("button").forEach(btn => {
  btn.onclick = () => {
    selectedRange = btn.dataset.range;
    renderAll();
  };
});

loadData();

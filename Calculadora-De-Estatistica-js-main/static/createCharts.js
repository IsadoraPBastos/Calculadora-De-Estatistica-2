let _chart = null;

export function createChart(chartType, label, labelTitle, data) {
  if (_chart) {
    _chart.destroy();
    _chart = null;
  }

  const ctx = document.getElementById("myChart");
  _chart = new Chart(ctx, {
    type: chartType,
    data: {
      labels: label,
      datasets: [
        {
          label: labelTitle,
          data: data,
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2,
      scales: {
        y: { beginAtZero: true },
      },
    },
    plugins: [
      {
        id: "backgroundColor",
        beforeDraw(chart) {
          const ctx = chart.canvas.getContext("2d");
          ctx.save();
          ctx.globalCompositeOperation = "destination-over";
          ctx.fillStyle = "#f0f0f0";
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        },
      },
    ],
  });

  return _chart;
}

export function destroyChart() {
  if (_chart) {
    _chart.destroy();
    _chart = null;
  }
}

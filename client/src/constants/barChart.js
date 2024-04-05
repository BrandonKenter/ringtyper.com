const options = {
  plugins: {
    legend: {
      display: true,
      position: "bottom",
    },
    tooltip: {
      displayColors: false,
      displayLabels: false,
      callbacks: {
        label: function (context) {
          return context.dataset.data[context.dataIndex];
        },
      },
    },
  },
};

const defaultData = {
  labels: [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ],
  datasets: [
    {
      label: "Errors",
      backgroundColor: "#e11d48",
    },
  ],
};

export { options, defaultData };

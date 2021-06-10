import { allInvestmentData } from '../data/investments';

const numberFormatter = new Intl.NumberFormat('PT-br');

const months = [
  '',
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dec',
];

export const formatNumbers = number => numberFormatter.format(number);

export const getInvestments = () => {
  return allInvestmentData.investments;
};

const getReportsSortedByInvestmentId = id => {
  return allInvestmentData.reports
    .filter(({ investmentId }) => investmentId === id)
    .sort((a, b) => a.month - b.month);
};

export const getReportsByInvestmentId = id => {
  return getReportsSortedByInvestmentId(id).map((report, _, array) => {
    const { id, month, year, value } = report;
    const percentComparison = getPercentComparision(report, array);
    return {
      id,
      month,
      year,
      formattedValue: valueFormatter(value),
      formattedDate: `${months[month]}/${year}`,
      percentComparison,
      percentComparisonFormatted: percentFormatter(percentComparison),
    };
  });
};

const percentFormatter = value => {
  return value > 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`;
};

const valueFormatter = value => {
  return `R$ ${formatNumbers(Math.round(value * 100) / 100)}`;
};

const getPercentComparision = (report, data) => {
  if (report.month === 1) {
    return 0;
  } else {
    const lastData = data.find(({ month }) => month === report.month - 1);
    const diff = lastData.value - report.value;
    const percentResult = ((diff * 100) / lastData.value) * -1;

    return Math.round(percentResult * 100) / 100;
  }
};

export const getTotalPerformanceByInvestmentId = id => {
  const reportsByInvestment = getReportsSortedByInvestmentId(id);
  const [firstValue, lastValue] = [
    reportsByInvestment[0].value,
    reportsByInvestment[reportsByInvestment.length - 1].value,
  ];
  const diff = firstValue - lastValue;
  const generalDiff = Math.round((lastValue - firstValue) * 100) / 100;
  const percentResult =
    Math.round(((diff * 100) / firstValue) * -1 * 100) / 100;
  return {
    generalDiff: valueFormatter(generalDiff),
    percentResult,
    percentResultFormatted: percentFormatter(percentResult),
  };
};

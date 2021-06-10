import css from './Investment.module.css';

export default function Investment({ children = null }) {
  const {
    formattedDate,
    formattedValue,
    percentComparison,
    percentComparisonFormatted,
  } = children;
  const valueStyle =
    percentComparison === 0
      ? 'font-bold'
      : percentComparison > 0
      ? 'text-green-700'
      : 'text-red-700';
  return (
    <div className={` ${css.dataContainer} border-b-2 p-2 font-semibold`}>
      <span>{formattedDate}</span>{' '}
      <span className={`${valueStyle}`}>{formattedValue}</span>{' '}
      <span className={`${valueStyle}`}>{percentComparisonFormatted}</span>
    </div>
  );
}

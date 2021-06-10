export default function InvestmentGeneralInfo({ children }) {
  const { generalDiff, percentResult, percentResultFormatted } = children;
  const valueStyle =
    percentResult === 0
      ? 'font-bold'
      : percentResult > 0
      ? 'text-green-700'
      : 'text-red-700';
  return (
    <div className="m-3">
      <h2 className="text-center font-semibold text-base">
        Rendimiento total:{' '}
        <span className={valueStyle}>
          {generalDiff} ({percentResultFormatted})
        </span>
      </h2>
    </div>
  );
}

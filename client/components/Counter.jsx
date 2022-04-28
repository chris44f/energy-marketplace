export const Counter = ({ handleValueChange, value }) => {
  const handleQuantityDecrease = () => {
    if (value === 1) return;
    handleValueChange(current => current -1);
  }

  const handleQuantityIncrease = () => {
    if (value === 99) return;
    handleValueChange(current => current +1);
  }

  return (
    <div className="flex flex-col items-center">
      <span className="text-blue-accent">QTY</span>
      <div className="flex flex-row">
        <button className="h-8 w-8 rounded bg-blue-accent disabled:bg-counter-disabled text-white" onClick={handleQuantityDecrease} disabled={value === 1}>-</button>
        <span className="text-white text-sub-heading w-12 text-center font-bold" title="Current quantity">{value}</span>
        <button className="h-8 w-8 rounded bg-blue-accent disabled:bg-counter-disabled text-white" onClick={handleQuantityIncrease} disabled={value === 99}>+</button>
      </div>
    </div>
  )
}

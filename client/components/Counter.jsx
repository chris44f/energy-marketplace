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
    <div>
      <button onClick={handleQuantityDecrease} disabled={value === 1}>-</button>
      <span>{value}</span>
      <button onClick={handleQuantityIncrease} disabled={value === 99}>+</button>
    </div>
  )
}

export const formatQty = (qty) =>
  Number(qty).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

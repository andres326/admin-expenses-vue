export const formatQty = (qty) =>
  Number(qty).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export const generateUID = () =>
  `${Date.now().toString(36)}${Math.random().toString(36).substring(2)}`;

export const formatDate = (date) =>
  new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

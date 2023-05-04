export default function formatMoney(amount = 0) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };

  if (amount % 100 === 0) {
    options.minimumFractionDigits = 0;
  }

  // INTL is a build in in NODE and Browser to format currencies (Part of javascript)

  const formatter = Intl.NumberFormat('en-EN', options);

  return formatter.format(amount / 100);
}

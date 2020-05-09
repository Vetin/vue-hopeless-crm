export default (value, currency = 'RUB') => {
  let locales;
  switch (currency) {
    case 'USD': {
      locales = 'us-US';
      break;
    }
    case 'EUR': {
      locales = 'eu-EU';
      break;
    }
    default: {
      locales = 'ru-RU';
      break;
    }
  }
  return new Intl.NumberFormat(locales, {
    style: 'currency',
    currency,
  }).format(value);
};

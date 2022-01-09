export const camelToSnake = (camel: unknown) => {
  if (typeof camel === 'object') {
    return Object.entries(camel).reduce((acc, [key, value]) => {
      const snake_key = key.split(/(?=[A-Z])/).join('_').toLowerCase();
      return { ...acc, [snake_key]: value };
    }, {});
  }
  return camel.toString().split(/(?=[A-Z])/).join('_').toLowerCase();
};

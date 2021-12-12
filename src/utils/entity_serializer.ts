export const setEntityProperty = <T, K>(entity_class: T, property_to_set: K): T => {
  Object.entries(property_to_set).forEach(([key, value]) => {
    if (entity_class[key]) {
      return entity_class[key] = value;
    }
    throw new Error(`Property ${key} does not exist on ${entity_class.constructor.name}`);
  });
  return entity_class;
};

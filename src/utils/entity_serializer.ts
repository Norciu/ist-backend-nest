export const setEntityProperty = <T, K>(entity_class: T, property_to_set: K): T => {
  Object.entries(property_to_set).forEach(([key, value]) => entity_class[key] = value);
  return entity_class;
};

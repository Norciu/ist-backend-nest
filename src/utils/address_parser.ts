import { AddressType } from 'src/geoapify/geoapify.dto';

export const parseAddress = (address: AddressType): string => {
  if (typeof address === 'string') {
    return encodeURIComponent(address);
  }
  const { housenumber, street, city, postcode, country } = address;
  const parsedAddress = `${street} ${housenumber}, ${postcode} ${city}, ${country}`;
  return encodeURIComponent(parsedAddress);
};

type AddressBookTableHeader = {
  value: string;
  text: string;
};

type AddressBookTableItem = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
};

type CountryListItem = {
  alpha3Code: string;
  independent: boolean;
  name: string;
};

export type { AddressBookTableItem, AddressBookTableHeader, CountryListItem };

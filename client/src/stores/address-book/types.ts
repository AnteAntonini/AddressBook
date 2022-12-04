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

export type { AddressBookTableItem, AddressBookTableHeader };

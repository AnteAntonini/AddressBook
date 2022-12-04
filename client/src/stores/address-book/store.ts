import { defineStore } from "pinia";
import { ref } from "vue";
import type { AddressBookTableItem } from "./types";

const useAddressBookStore = defineStore("addressBook", () => {
  const addressBookContacts = ref<Array<AddressBookTableItem>>([]);
  const addressBookItems = [
    {
      firstName: "Ante",
      lastName: "Ante",
      email: "ante@email.com",
      country: "Croatia",
    },
    {
      firstName: "Ante",
      lastName: "Ante",
      email: "test@email.com",
      country: "Croatia",
    },
  ];

  const getAddressBookList = (): AddressBookTableItem[] | null => {
    return addressBookContacts.value;
  };

  const addContact = (data: AddressBookTableItem): void => {
    addressBookContacts.value.push(data);
  };

  const removeContact = (index: any) => {
    addressBookContacts.value.splice(index, 1);
  };

  return {
    addressBookItems,
    addressBookContacts,
    addContact,
    getAddressBookList,
    removeContact,
  };
});

export { useAddressBookStore };

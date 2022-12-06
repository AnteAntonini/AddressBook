import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { AddressBookTableItem } from "./types";

export const useAddressBookStore = defineStore(
  "addressBook",
  () => {
    const addressBookContacts = ref<Array<AddressBookTableItem>>([]);

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
      addressBookContacts,
      addContact,
      getAddressBookList,
      removeContact,
    };
  },
  {
    persist: true,
  }
);

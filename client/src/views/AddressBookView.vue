<script setup lang="ts">
import { ref } from "vue";
import {
  type AddressBookTableItem,
  useAddressBookStore,
} from "@/stores/address-book";

const tableHeaders = [
  {
    value: "firstName",
    text: "First Name",
  },
  {
    value: "lastName",
    text: "Last Name",
  },
  {
    value: "email",
    text: "Email",
  },
  {
    value: "country",
    text: "Country",
  },
];

const tableItems = ref<Array<AddressBookTableItem>>([]);
tableItems.value = useAddressBookStore().addressBookContacts;

const removeContact = useAddressBookStore().removeContact;
</script>

<template>
  <main class="address-book">
    <h1 class="address-book-title">Address Book</h1>
    <RouterLink to="/form">
      <button class="btn btn-large btn-primary">Add Contact</button>
    </RouterLink>
    <div class="address-book-table-wrapper">
      <table class="address-book-table">
        <thead>
          <tr>
            <th v-for="{ text, value } in tableHeaders" :key="value">
              {{ text }}
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in tableItems" :key="item.email">
            <tr class="address-book-table-row">
              <td>{{ item.firstName }}</td>
              <td>{{ item.lastName }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.country }}</td>
              <div class="address-book_btn-action-mobile">
                <RouterLink :to="{ name: 'form', params: { id: index } }">
                  <img
                    src="../assets/icons/edit.svg"
                    class="edit-icon"
                    alt="edit icon"
                  />
                </RouterLink>
                <button class="btn-icon" @click="removeContact(index)">
                  <img
                    src="../assets/icons/delete.svg"
                    class="delete-icon"
                    alt="delete icon"
                  />
                </button>
              </div>
              <div class="address-book_btn-action">
                <RouterLink :to="{ name: 'form', params: { id: index } }">
                  <button class="btn btn-primary btn-spacing">Edit</button>
                </RouterLink>
                <button class="btn btn-warning" @click="removeContact(index)">
                  Delete
                </button>
              </div>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </main>
</template>

<style scoped lang="scss">
.address-book {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 10rem;

  &-title {
    padding-bottom: 2rem;
  }

  &-table-wrapper {
    overflow-x: auto;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    background-color: var(--color-bg-1-light);
  }

  &-table {
    --table-padding-x: 1.5rem;
    width: 100%;
    color: var(--sc-text-primary-1);
    border-spacing: 0;
    border-collapse: collapse;
    overflow-x: auto;

    &-row {
      border-top: 1px solid lightgray;
    }

    thead {
      text-align: left;
      tr th {
        padding: 1.5rem var(--table-padding-x) 0.625rem;
        font-size: 0.75rem;
        text-transform: uppercase;
      }
    }

    tr td {
      padding-left: var(--table-padding-x);
      padding-right: var(--table-padding-x);
      word-break: break-word;
      height: 3rem;
    }
  }

  &_btn-action-mobile {
    display: none;
  }
}

.btn-icon {
  border: none;
  background: none;
}

.btn-spacing {
  margin: 0.5rem 1rem;
}

@media screen and (max-width: 1024px) {
  .address-book {
    padding: 0;

    &-table {
      tr th {
        padding: 0.5rem 1rem !important;
      }

      tr td {
        padding: 0rem 1rem;
      }
    }

    &_btn-action {
      display: none;
    }

    &_btn-action-mobile {
      padding: 1rem;
      display: block;

      .edit-icon {
        margin-left: 0.5rem;
      }
    }
  }
}
</style>

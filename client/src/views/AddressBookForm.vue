<script setup lang="ts">
import { useAddressBookStore } from "@/stores/address-book";

const addressBookStore = useAddressBookStore();

const contact = {
  firstName: "",
  lastName: "",
  email: "",
  country: "",
};
</script>

<template>
  <div class="address-book-form-wrapper">
    <div class="address-book-form">
      <div class="address-book-form-title">
        <h1>Add Contact</h1>
        <RouterLink to="/">
          <button class="btn form-btn">X</button>
        </RouterLink>
      </div>
      <div class="address-book-form-content">
        <form @submit.prevent="addressBookStore.addContact"></form>
        <div class="address-book-form_input-row">
          <h3>First Name</h3>
          <input
            type="text"
            v-model="contact.firstName"
            class="address-book-form_input"
            required
          />
        </div>
        <div class="address-book-form_input-row">
          <h3>Last Name</h3>
          <input
            type="text"
            v-model="contact.lastName"
            class="address-book-form_input"
            required
          />
        </div>
        <div class="address-book-form_input-row">
          <h3>Email</h3>
          <input
            type="text"
            v-model="contact.email"
            class="address-book-form_input"
            required
          />
        </div>
        <div class="address-book-form_input-row">
          <h3>Country</h3>
          <select
            name="country"
            id="country"
            v-model="contact.country"
            class="address-book-form_input"
            required
          >
            <option>Select country</option>
            <option></option>
          </select>
        </div>
      </div>
      <div class="address-book-form-action">
        <button type="submit">Create</button>
        <button>Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.address-book-form {
  height: 60%;
  width: 40%;
  background-color: #fff;

  &-title {
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
  }

  &_input {
    width: 70%;
    padding: 0.75rem;

    &-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
    }
  }

  &-action {
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  &-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: var(--vt-c-white-mute);
  }
}

.form-btn {
  color: grey;
  padding: 0 0;
  font-size: 1.5rem;
  background-color: transparent;
}
</style>

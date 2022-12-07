<script setup lang="ts">
import { computed, ref } from "vue";
import axios from "axios";
import router from "@/router";
import { useRoute } from "vue-router";

import {
  useAddressBookStore,
  type CountryListItem,
} from "@/stores/address-book";

const addressBookStore = useAddressBookStore();
const addressBookContacts = addressBookStore.addressBookContacts;
const countryList = ref<Array<CountryListItem>>([]);
const contactId = useRoute().params.id as unknown as number;

const getAllCountries = () =>
  axios
    .get<CountryListItem[]>(
      "https://restcountries.com/v2/all?fields=name,alpha3Code"
    )
    .then((res) => {
      countryList.value = res.data;
    })
    .catch((err) => {
      return err;
    });

getAllCountries();

const contact = ref({
  firstName: addressBookContacts[contactId]?.firstName,
  lastName: addressBookContacts[contactId]?.lastName,
  email: addressBookContacts[contactId]?.email,
  country: addressBookContacts[contactId]?.country,
});

const validationErrors = ref({
  firstName: false,
  lastName: false,
  email: false,
  country: false,
});

const checkFirstName = () => {
  if (!contact.value.firstName) {
    validationErrors.value.firstName = true;
  } else {
    validationErrors.value.firstName = false;
  }
};

const checkLastName = () => {
  if (!contact.value.lastName) {
    validationErrors.value.lastName = true;
  } else {
    validationErrors.value.lastName = false;
  }
};

const checkEmail = () => {
  const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
    contact.value.email
  );
  if (!isEmailValid) {
    validationErrors.value.email = true;
  } else {
    validationErrors.value.email = false;
  }
};

const checkCountry = () => {
  if (!contact.value.country) {
    validationErrors.value.country = true;
  } else {
    validationErrors.value.country = false;
  }
};

const formValid = computed(() => {
  const { firstName, lastName, email, country } = contact.value;

  return (
    firstName &&
    lastName &&
    country &&
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
  );
});

const addContact = (): void => {
  checkFirstName();
  checkLastName();
  checkEmail();
  checkCountry();

  if (!formValid.value) {
    return;
  }
  addressBookContacts.push(contact.value);
  router.push({ name: "addressBook" });
};

const closeForm = (): void => {
  router.push({ name: "addressBook" });
};
</script>

<template>
  <div class="address-book-form-wrapper">
    <div class="address-book-form">
      <div class="address-book-form-title">
        <h1>Add Contact</h1>
        <button @click="closeForm" class="btn form-btn">X</button>
      </div>
      <div class="address-book-form-content">
        <form @submit.prevent="addContact">
          <div class="address-book-form_input-row">
            <h3>First Name</h3>
            <div class="address-book-form_input-wrapper">
              <input
                type="text"
                id="firstName"
                v-model="contact.firstName"
                placeholder="first name"
                autocomplete="off"
                class="address-book-form_input"
                :class="{ invalidForm: validationErrors.firstName }"
                required
              />
              <span v-if="validationErrors.firstName" class="invalid-form-text"
                >First name cannot be blank</span
              >
            </div>
          </div>
          <div class="address-book-form_input-row">
            <h3>Last Name</h3>
            <div class="address-book-form_input-wrapper">
              <input
                type="text"
                id="lastName"
                v-model="contact.lastName"
                placeholder="last name"
                autocomplete="off"
                class="address-book-form_input"
                :class="{ invalidForm: validationErrors.lastName }"
                required
              />
              <span v-if="validationErrors.lastName" class="invalid-form-text"
                >Last name cannot be blank</span
              >
            </div>
          </div>
          <div class="address-book-form_input-row">
            <h3>Email</h3>
            <div class="address-book-form_input-wrapper">
              <input
                type="text"
                id="email"
                v-model="contact.email"
                placeholder="email"
                autocomplete="off"
                class="address-book-form_input"
                :class="{ invalidForm: validationErrors.email }"
                required
              />
              <span v-if="validationErrors.email" class="invalid-form-text"
                >Email is not valid</span
              >
            </div>
          </div>
          <div class="address-book-form_input-row">
            <h3>Country</h3>
            <div class="address-book-form_input-wrapper">
              <select
                name="country"
                id="country"
                v-model="contact.country"
                autocomplete="off"
                class="address-book-form_input"
                :class="{ invalidForm: validationErrors.country }"
                required
              >
                <option value="undefined">Select country</option>
                <option
                  v-for="country in countryList"
                  :value="country.name"
                  :key="country.alpha3Code"
                >
                  {{ country.name }}
                </option>
              </select>
              <span v-if="validationErrors.country" class="invalid-form-text"
                >Country is not selected</span
              >
            </div>
          </div>
        </form>
      </div>
      <div class="address-book-form-action">
        <button class="btn btn-primary" type="submit" @click="addContact">
          Create
        </button>
        <button class="btn btn-neutral" @click="closeForm">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.address-book-form {
  height: 60%;
  width: 40%;
  background-color: var(--color-bg-1-light);

  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
  }

  &_input {
    padding: 0.75rem;

    &-wrapper {
      width: 70%;
      display: flex;
      flex-direction: column;
    }

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
    margin-top: 2rem;
    padding: 0 2rem;

    .btn {
      padding: 1rem 2rem;
      margin-right: 1.5rem;
    }
  }

  &-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
}

.invalidForm {
  border-color: var(--error-color) !important;
  border: solid 2px #f0f0f0;
}
.invalid-form-text {
  color: var(--error-color);
}
.form-btn {
  color: grey;
  padding: 0 0;
  font-size: 1.5rem;
  background-color: transparent;
}

@media screen and (max-width: 1024px) {
  .address-book-form {
    height: 100%;
    width: 100%;

    &_input {
      &-wrapper {
        width: 80%;
      }

      &-row {
        flex-direction: column;
        padding: 0.5rem 2rem 1rem;
      }
    }

    &-action {
      flex-direction: column;
      align-items: center;
      margin-top: 2rem;

      button {
        width: 80%;
        margin: 0.25rem 0 !important;
      }
    }
  }
}
</style>

import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";

import { mount } from "@vue/test-utils";
import AddressBookView from "@/views/AddressBook.vue";

describe("AddressBookView", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("renders properly", () => {
    const wrapper = mount(AddressBookView);
    expect(wrapper.text()).toContain("Address Book");
  });
});

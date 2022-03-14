<template>
  <div class="new-profile content">
    <div class="form">
      <ValidationObserver v-slot="{ invalid }">
        <form class="d-flex flex-column" @submit.prevent="onSubmit">
          <ValidationProvider
            name="email"
            rules="required|email"
            v-slot="{ errors }"
            class="mb-3"
          >
            <div class="d-flex flex-column align-items-baseline">
              <label
                @click="$refs.emailInput.focus()"
                for="email"
                class="mb-2 label"
                >Email :
              </label>
              <input
                ref="emailInput"
                class="mb-2 w-100 input"
                v-model="profile.email"
                type="email"
              />
              <span class="error-text">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider
            name="name"
            rules="required|engalpha"
            v-slot="{ errors }"
            class="mb-3"
          >
            <div class="d-flex flex-column align-items-baseline">
              <label
                @click="$refs.nameInput.focus()"
                for="name"
                class="mb-2 label"
                >Name :
              </label>
              <input
                ref="nameInput"
                class="mb-2 w-100 input"
                v-model="profile.name"
                type="text"
              />
              <span class="error-text">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider
            name="descriptions"
            rules="required"
            v-slot="{ errors }"
            class="mb-3"
          >
            <div class="d-flex flex-column align-items-baseline">
              <label for="descriptions" class="mb-2 label"
                >Descriptions :
              </label>
              <multiselect
                v-model="profile.selectedDescriptions"
                name="descriptions"
                :options="descriptionOptions"
                label="name"
                track-by="id"
                taggable
                multiple
                @tag="addTag"
                class="mb-2"
              />
              <span class="error-text">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <button type="submit" :disabled="invalid">Submit</button>
        </form>
      </ValidationObserver>
    </div>
    <a @click="backToList" class="d-flex mt-3 back">Back To List</a>
  </div>
</template>

<script>
export default {
  name: "AddNewProfile",
  props: {
    descriptionOptions: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      profile: {
        name: "",
        email: "",
        selectedDescriptions: [],
        likes: 0,
        comment: "",
        liked: false,
        disliked: false,
      },
    };
  },
  methods: {
    onSubmit() {
      this.$emit("addProfile", this.profile);
    },
    addTag(t) {
      const newoption = { value: t, label: t };
      this.selectedSpecialisations.push(newoption);
    },
    backToList() {
      this.$emit("showList");
    },
  },
};
</script>

<style>
.back {
  cursor: pointer;
  font-size: 16px;
}
.error-text {
  color: red;
  font-size: 14px;
}
.label {
  font-size: 16px;
}
</style>

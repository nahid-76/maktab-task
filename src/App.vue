<template>
  <div id="app">
    <div class="header">{{ headerText }}</div>
    <div v-if="!showAddNewProfileComponent" class="content">
      <div class="buttons">
        <button @click="sortAsc">▲</button>
        <button @click="sortDesc">▼</button>
      </div>
      <div>
        <input
          v-model="search"
          class="input mt-3"
          placeholder="Search Name..."
        />
      </div>
      <div v-if="filteredList.length > 0">
        <ProfileCard
          v-for="(profile, index) in filteredList"
          :key="index"
          :profile="profile"
          class="profile"
          @liked="profileLiked"
          @disliked="profileDisliked"
        />
      </div>
      <div v-else>There Is No Item To Display</div>
      <button class="mt-3" @click="showAddNewProfileComponent = true">
        Add New Profile
      </button>
      <div class="icons-note">
        Icons made by
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik"
          >Freepik</a
        >
        from
        <a href="https://www.flaticon.com/" title="Flaticon"
          >www.flaticon.com</a
        >
      </div>
    </div>
    <div v-if="showAddNewProfileComponent">
      <AddNewProfile
        :descriptionOptions="descriptionOptions"
        @showList="showAddNewProfileComponent = false"
        @addProfile="addProfile"
      />
    </div>
  </div>
</template>

<script>
import ProfileCard from "./components/ProfileCard";
import AddNewProfile from "./components/AddNewProfile.vue";

export default {
  name: "App",

  components: {
    ProfileCard,
    AddNewProfile,
  },

  data() {
    return {
      search: "",
      showAddNewProfileComponent: false,
      descriptionOptions: [
        { id: 1, name: "Surgeon" },
        { id: 2, name: "Radiologist" },
        { id: 3, name: "Cardiologist" },
        { id: 4, name: "Psychiatrist" },
        { id: 5, name: "Dermatologist" },
      ],
      profiles: [
        {
          id: 1,
          name: "Wojciech",
          email: "wojciech@poz.pl",
          selectedDescriptions: [{ id: 5, name: "Dermatologist" }],
          likes: 34,
          comment: "",
          liked: false,
          disliked: false,
        },
        {
          id: 2,
          name: "Maria",
          email: "maria@poz.pl",
          selectedDescriptions: [{ id: 2, name: "Radiologist" }],
          likes: 28,
          comment: "",
          liked: false,
          disliked: false,
        },
        {
          id: 3,
          name: "Anna",
          email: "anna@poz.pl",
          selectedDescriptions: [{ id: 1, name: "Surgeon" }],
          likes: 53,
          comment: "",
          liked: false,
          disliked: false,
        },
      ],
    };
  },
  computed: {
    filteredList() {
      return this.profiles.filter((doc) => {
        var vm = this;
        return doc.name.toLowerCase().includes(vm.search.toLowerCase());
      });
    },
    headerText() {
      return this.showAddNewProfileComponent
        ? "Add New Profile"
        : "Profiles List";
    },
  },
  methods: {
    sortAsc() {
      this.profiles.sort(function (a, b) {
        return a.likes - b.likes;
      });
    },

    sortDesc() {
      this.profiles.sort(function (a, b) {
        return b.likes - a.likes;
      });
    },
    addProfile(profile) {
      profile.id = this.profiles.length + 1;
      this.profiles.unshift(profile);
      this.showAddNewProfileComponent = false;
    },
    profileLiked(id) {
      let profile = this.profiles.find((item) => item.id == id);
      if (!profile.liked) {
        profile.liked = true;
        if (!profile.disliked) profile.likes++;
        else {
          profile.likes = profile.likes + 2;
          profile.disliked = false;
        }
      } else {
        profile.liked = false;
        if (!profile.disliked && profile.likes >= 1) profile.likes--;
      }
    },
    profileDisliked(id) {
      let profile = this.profiles.find((item) => item.id == id);
      if (!profile.disliked) {
        profile.disliked = true;
        if (!profile.liked && profile.likes >= 1) profile.likes--;
        else {
          if (profile.likes >= 2) profile.likes = profile.likes - 2;
          if (profile.likes == 1) profile.likes--;
          profile.liked = false;
        }
      } else {
        profile.disliked = false;
        if (!profile.liked) profile.likes++;
      }
    },
  },
};
</script>

<style>
#app {
  font-family: "Roboto", helvetica, arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  padding: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;

  background: linear-gradient(
    135deg,
    rgba(65, 184, 131, 0.9),
    rgba(52, 73, 94, 0.9)
  );

  font-size: 1.5em;
}
svg {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
button {
  display: block;
  padding: 1em;
  width: 100%;
  background-color: #41b883;
  border: 1px solid;
  color: #fff;
  cursor: pointer;
  font-size: 0.75em;
  font-weight: 600;
  text-shadow: 0 1px 0 rgba(black, 0.2);
}
.input {
  width: 100%;
  font-size: 14px;
  padding: 5px 10px;
}
.content {
  width: 100%;
  min-width: 300px;
  padding: 2em;
  margin-top: 30px;
  position: relative;
  background: rgba(0, 0, 0, 0.15);
}

@media screen and (min-width: 600px) {
  .content {
    width: 50vw;
    max-width: 15em;
  }
}

.content::before {
  content: "";
  position: absolute;
  top: -2px;
  left: 0;
  height: 2px;
  width: 100%;
  background: #35c3c1;
}

.buttons {
  display: flex;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
}

.profile {
  margin-top: 20px;
}

.icons-note {
  margin-top: 30px;
  font-size: 10px;
}
</style>

<template>
  <div class="profile">
    <div class="card">
      <DoctorIcon class="avatar" />
      <div class="data">
        <div class="profile-content">
          <div>
            <strong>{{ profile.name }}</strong>
            <a :href="profile.email" class="email">{{ profile.email }}</a>
          </div>
          <div class="description text-break">{{ description }}</div>
        </div>
        <div class="likes">
          <span class="likes-icon">💚</span>
          <span class="likes-value">{{ profile.likes }}</span>
        </div>
        <div
          class="mt-3 d-flex align-items-center justify-content-between w-100"
        >
          <div @click="likeCliked">
            <DeActiveLikeIcon v-show="!profile.liked" />
            <ActiveLikeIcon v-show="profile.liked" />
          </div>
          <div @click="dislikeCliked">
            <ActiveDisLikeIcon v-show="profile.disliked" />
            <DeActiveDisLikeIcon v-show="!profile.disliked" />
          </div>
        </div>
      </div>
    </div>
    <div class="comment">
      <input
        v-model="profile.comment"
        class="input"
        placeholder="Write your comment..."
      />
    </div>
  </div>
</template>

<script>
import DoctorIcon from "./DoctorIcon";
import ActiveDisLikeIcon from "./activeDisLikeIcon";
import ActiveLikeIcon from "./activeLikeIcon";
import DeActiveDisLikeIcon from "./deActiveDisLikeIcon";
import DeActiveLikeIcon from "./deActiveLikeIcon";

export default {
  name: "ProfileCard",
  computed: {
    description() {
      return this.profile.selectedDescriptions
        .map((item) => item.name)
        .join(",");
    },
  },
  components: {
    DoctorIcon,
    ActiveDisLikeIcon,
    ActiveLikeIcon,
    DeActiveDisLikeIcon,
    DeActiveLikeIcon,
  },
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  methods: {
    likeCliked() {
      this.$emit("liked", this.profile.id);
    },
    dislikeCliked() {
      this.$emit("disliked", this.profile.id);
    },
  },
};
</script>

<style>
.card {
  display: flex;
  align-items: center;
  border: solid 1px rgb(172, 172, 172);
  border-radius: 3px;
  padding: 10px;
  font-size: 14px;
  color: rgb(82, 82, 82);
  background-color: #fff;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.avatar {
  width: 64px;
  min-width: 64px;
  height: 64px;
  border: 1px solid rgb(172, 172, 172);
  border-radius: 100%;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
}

.data {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.profile-content {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 15px;
}

.email {
  margin-left: 15px;
}

.description {
  margin-top: 5px;
}

.likes {
  color: rgb(76, 202, 114);
  margin-top: 10px;
  margin-left: 15px;
}

.likes-value {
  margin-left: 5px;
}

.comment {
  display: flex;
  width: 100%;
}
</style>

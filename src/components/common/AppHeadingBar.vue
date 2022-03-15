<template>
  <div class="app-heading-bar">
    <img class="logo" src="@/images/icons/bi-simple-white.svg" alt="로고" />
    <router-link class="burger" :to="burgerTo">
      <img src="@/images/icons/burger-white.svg" alt="메뉴" />
    </router-link>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useAuth } from "@/composables/auth";

export default defineComponent({
  name: "AppHeadingBar",
  setup() {
    const auth = useAuth();

    const burgerTo = computed(() => (auth.isLogged.value ? "/my" : "/account"));

    return { burgerTo };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
@import "@/styles/mixins";

.app-heading-bar {
  position: relative;
  height: (104/2/16) * 1rem;
  background-color: $color-blue;
  color: $color-white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  display: flex;
  height: (36/2/16) * 1rem;
}

.burger {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 0 (30/2/16) * 1rem;
  display: inline-flex;
  align-items: center;

  img {
    height: (68/2/16) * 1rem;
  }
}
</style>

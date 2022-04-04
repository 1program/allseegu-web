<template>
  <div class="section">
    <div class="section-title">부동산 문의</div>
    <div class="section-content">
      <ContactTile
        name="금미부동산"
        description="서울시 서초구 양재동 111-2 서울시 서초구 양재동 111-2 서울시 서초구 양재동 111-2"
      >
        <template v-slot:button>
          <ContactButton @click="notImplemented">
            <img class="call-icon" src="@/images/icons/call.svg" alt="전화 아이콘" />
          </ContactButton>
        </template>
      </ContactTile>
      <div class="spacer" />
      <ContactTile
        name="금미부동산"
        description="서울시 서초구 양재동 111-2 서울시 서초구 양재동 111-2 서울시 서초구 양재동 111-2"
      >
        <template v-slot:button>
          <ContactButton @click="notImplemented">
            <img class="call-icon" src="@/images/icons/call.svg" alt="전화 아이콘" />
          </ContactButton>
        </template>
      </ContactTile>
      <div class="spacer" />
      <ContactTile
        name="금미부동산"
        description="서울시 서초구 양재동 111-2 서울시 서초구 양재동 111-2 서울시 서초구 양재동 111-2"
      >
        <template v-slot:button>
          <ContactButton @click="notImplemented">
            <img class="call-icon" src="@/images/icons/call.svg" alt="전화 아이콘" />
          </ContactButton>
        </template>
      </ContactTile>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ContactTile from "@/components/common/ContactTile.vue";
import ContactButton from "@/components/common/ContactButton.vue";
import { useUi } from "@/composables/common/useUi";

export default defineComponent({
  name: "RedevDetailAgentSection",
  components: { ContactTile, ContactButton },
  setup() {
    const { notImplemented } = useUi();

    return {
      notImplemented,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.call-icon {
  width: (32/2/16) * 1rem;
  display: block;
  margin: 0 auto;
}
</style>

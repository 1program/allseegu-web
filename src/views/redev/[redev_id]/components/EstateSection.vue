<template>
  <div class="section">
    <div class="section-title">부동산 문의</div>
    <div class="section-content">
      <AppFallback v-if="estates.length < 1" message="등록된 부동산 정보가 없습니다." />
      <template v-for="(estate, index) in estates" :key="estate.id">
        <div v-if="index > 0" class="spacer" />
        <ContactTile :name="estate.title" :description="estate.address">
          <template v-slot:button>
            <ContactButton :href="`tel:${estate.tel}`">
              <img class="call-icon" src="@/images/icons/call.svg" alt="전화걸기" />
            </ContactButton>
          </template>
        </ContactTile>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import AppFallback from "@/components/common/AppFallback.vue";
import ContactButton from "@/components/common/ContactButton.vue";
import ContactTile from "@/components/common/ContactTile.vue";
import { Estate } from "@/models/estate";

export default defineComponent({
  name: "RedevDetailEstateSection",
  components: { ContactTile, ContactButton, AppFallback },
  props: {
    redev_id: {
      type: Number,
      required: true,
    },
    estates: {
      type: Array as PropType<Estate[]>,
      required: true,
    },
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

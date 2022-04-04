<template>
  <AppScaffold title="공지사항" has-top-button>
    <div class="container page-content">
      <ListTile title="조합이 바르게 운영되지 못하고 와해되는 이유..." to="notice/1" />
      <ListDivider />
      <ListTile title="조합이 바르게 운영되지 못하고 와해되는 이유..." to="notice/1" />
      <ListDivider />
      <ListTile title="빠르게 달성하는 목표" to="notice/1" />
      <ListDivider />
      <ListTile title="조합이 바르게 운영되지 못하고 와해되는 이유..." to="notice/1" />
      <ListDivider />
      <ListTile title="빠르게 달성하는 목표" to="notice/1" />
      <ListDivider />
      <ListTile title="빠르게 달성하는 목표" to="notice/1" />
      <ListDivider />
      <ListTile title="조합이 바르게 운영되지 못하고 와해되는 이유..." to="notice/1" />
      <ListDivider />
      <ListTile title="빠르게 달성하는 목표" to="notice/1" />
      <ListDivider />
      <ListTile title="빠르게 달성하는 목표" to="notice/1" />
      <ListDivider />
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import ListTile from "@/components/common/ListTile.vue";
import ListDivider from "@/components/common/ListDivider.vue";

export default defineComponent({
  name: "RedevDetailNotice",
  components: { AppScaffold, ListTile, ListDivider },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.banner {
  margin-bottom: (60/2/16) * 1rem;
}
</style>

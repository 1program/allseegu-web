<template>
  <AppScaffold title="올씨구 공지사항" has-top-button>
    <div class="container">
      <div class="meta">
        <PostMeta
          badge="공지"
          title="조합이 바르게 운영되지 못하고 와해되는 이유는 바로 이것 때문입니다."
          :date="date"
          :hits="256"
        >
          <Badge label="공지" blue class="badge" />
        </PostMeta>
      </div>
      <div class="divider light" />
      <div class="page-content-medium">
        <AttachmentTile
          class="attachment"
          url="http://view3.synology.me:5050/d/s/672812605452106783/bzE8Aohz0mThrDs-cYk8IV1JdsyHGgzM-vb5gT7NPVgk_"
        >
          첨부 파일.hwp
        </AttachmentTile>
        <AttachmentTile
          class="attachment"
          url="http://view3.synology.me:5050/d/s/672812605452106783/bzE8Aohz0mThrDs-cYk8IV1JdsyHGgzM-vb5gT7NPVgk_"
        >
          첨부 파일.hwp
        </AttachmentTile>
        <LinkTile
          class="link"
          url="http://view3.synology.me:5050/d/s/672812605452106783/bzE8Aohz0mThrDs-cYk8IV1JdsyHGgzM-vb5gT7NPVgk_"
        />
        <div class="gallery">
          <ImageGallery :images="images" />
        </div>
        <div class="content">
          조합이 바르게 운영되지 못하고 와해되는 이유는 바로 이것 때문입니다. 조합이 바르게 운영되지
          못하고 와해되는 이유는 바로 이것 때문입니다.<br /><br />
          조합이 바르게 운영되지 못하고 와해되는 이유는 바로 이것 때문입니다.
        </div>
      </div>
    </div>
  </AppScaffold>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppScaffold from "@/components/common/AppScaffold.vue";
import PostMeta from "@/components/common/PostMeta.vue";
import AttachmentTile from "@/components/common/AttachmentTile.vue";
import LinkTile from "@/components/common/LinkTile.vue";
import ImageGallery from "@/components/common/ImageGallery.vue";

import redevImage from "@/images/mocks/redev-image.png";
import Badge from "@/components/common/Badge.vue";

export default defineComponent({
  name: "MyCustomerNoticeDetail",
  components: { AppScaffold, PostMeta, AttachmentTile, LinkTile, ImageGallery, Badge },
  setup() {
    return {
      images: [redevImage, redevImage, redevImage],
      date: new Date(),
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.meta {
  padding: $padding;
  padding-bottom: (30/2/16) * 1rem;
}

.badge {
  margin-bottom: (20/2/16) * 1rem;
}
.attachment {
  margin-bottom: (8/2/16) * 1rem;
}

.link {
  margin-top: (40/2/16) * 1rem;
}

.gallery {
  margin-top: (40/2/16) * 1rem;
}

.content {
  margin-top: (51/2/16) * 1rem;
  font-size: (30/2/16) * 1rem;
}
</style>

<template>
  <div class="post-view">
    <div class="meta">
      <PostMeta
        :title="title"
        :date="created_at"
        :hits="hits"
        :badge="badge"
        :badge-color="badgeColor"
      />
    </div>
    <div class="divider light" />
    <div class="page-content">
      <template v-if="info.length > 0">
        <div v-for="item in info" :key="item.label" class="label-info-group">
          <div class="label">{{ item.label }}</div>
          <div class="info">{{ item.value }}</div>
        </div>
      </template>
      <div v-if="showAttachmentsTitle" class="label-info-group">
        <div class="label">첨부파일</div>
      </div>
      <!-- 첨부파일, 링크중 하나라도 있다면? -->
      <div class="top" v-if="files?.docs.length > 0 || link != null">
        <AttachmentTile v-for="doc in files?.docs" :key="doc.id" class="attachment" :url="doc.url">
          {{ doc.name }}
        </AttachmentTile>
        <LinkTile v-if="link != null" class="link" :url="link" />
      </div>
      <div class="gallery" v-if="files?.images.length > 0">
        <ImageGallery :images="files?.images" />
      </div>
      <div class="content">
        <!-- TODO: Implement content parser by content_type -->
        <ContentRenderer :content="content" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import AttachmentTile from "@/components/common/AttachmentTile.vue";
import ImageGallery from "@/components/common/ImageGallery.vue";
import LinkTile from "@/components/common/LinkTile.vue";
import { ContentType } from "@/models/common";
import { Files } from "@/models/file";

import ContentRenderer from "../common/ContentRenderer.vue";
import PostMeta from "./PostMeta.vue";

/**
 * 글 상세 컴포넌트
 *
 * 모델간 서로 다른 필드가 있기 때문에, 각개 prop을 매핑하도록 디자인.
 *
 * 작업시 누락을 방지하기 위해 nullable 한 필드 포함하여
 * 모든 필드를 required로 지정하였음.
 */
export default defineComponent({
  name: "PostView",
  components: { PostMeta, AttachmentTile, ImageGallery, LinkTile, ContentRenderer },
  props: {
    badge: {
      type: String,
    },
    badgeColor: {
      type: String as PropType<"default" | "primary" | "danger">,
      default: "primary",
    },
    title: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      required: true,
    },
    hits: {
      type: Number,
      required: false,
    },
    files: {
      type: Object as PropType<Files | null>,
      required: true,
    },
    link: {
      type: String as PropType<string | null>,
      required: true,
    },
    content_type: {
      type: String as PropType<ContentType>,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    showAttachmentsTitle: {
      type: Boolean,
      default: false,
    },
    info: {
      type: Array as PropType<{ label: string; value: string }[]>,
      default: () => [],
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/config";

.meta {
  padding: $padding;
  padding-bottom: (30/2/16) * 1rem;
}

.attachment {
  margin-bottom: (8/2/16) * 1rem;
}

.top {
  margin-bottom: (40/2/16) * 1rem;
}

.label-info-group {
  display: flex;
  align-items: center;

  font-size: (26/2/16) * 1rem;

  margin-bottom: (24/2/16) * 1rem;

  .label {
    min-width: (60/16) * 1rem;
    color: $color-gray;
  }

  .info {
    margin-left: (30/2/16) * 1rem;

    flex: 1 1 auto;
  }
}

.link {
  margin-top: (13/2/16) * 1rem;
}

.gallery {
  margin-bottom: (51/2/16) * 1rem;
}

.content {
  white-space: pre-wrap;
  font-size: (30/2/16) * 1rem;
}
</style>

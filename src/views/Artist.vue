<template>
  <v-card
    class="mx-auto"
    max-width="1024"
    outlined
  >
    <v-card-text>
      <div class="px-8 mb-2 title">
        작가 이름
      </div>

      <div class="py-5 body-1 text-center">
        <img
          height="200"
          :src="require('@/assets/img/diana.jpg')"
        />
      </div>
      <div class="px-8 py-5 body-1">
        작가에 대한 간략한 소개와 화파에 대한 소개<br />
        작가의 작품에 공통적으로 나타나는 특징과 철학에 대해서 소개
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        block
        color="primary"
        :disabled="disabled"
        @click="submit"
      >
        다음 {{ countDown > 0 ? `(${countDown})` : '' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
/* eslint-disable import/no-unresolved */
import { setTimeout } from 'timers';

export default {
  data: () => ({
    countDown: 7,
  }),

  computed: {
    disabled() {
      return this.countDown > 0;
    },
  },

  mounted() {
    this.countDownTimer();
  },

  methods: {
    submit() {
      this.$router.push({ name: 'Art' });
    },

    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
    },
  },
};
</script>

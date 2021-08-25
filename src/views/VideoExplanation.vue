<template>
  <v-card
    class="mx-auto"
    max-width="900"
    width="900"
    outlined
  >
    <v-card-text
      class="row text-center"
      style="display: block;"
    >
      <v-btn
        rounded
        style="margin: 20px; font-size: 30px"
        color="gray"
        :disabled="imgId === 1"
        @click="prev"
      >
        ‹
      </v-btn>
      <img
        :src="require(`@/assets/img/00${imgId}.png`)"
        height="600"
      />
      <v-btn
        rounded
        style="margin: 20px; font-size: 30px"
        color="gray"
        :disabled="imgId === imgs.length"
        @click="next"
      >
        ›
      </v-btn>
    </v-card-text>

    <v-card-actions
      style="flex-direction: row-reverse"
    >
      <v-btn
        style="width: 25%"
        color="primary"
        :disabled="imgId !== imgs.length"
        @click="submit"
      >
        다음 {{ countDown > 0 ? `(${countDown})` : '' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import { setTimeout } from 'timers';

export default {
  data: () => ({
    countDown: 20,
    imgs: [],
    imgId: 1,
  }),

  computed: {
    disabled() {
      return this.countDown > 0;
    },

    condition() {
      return this.$store.state.data.experimentType;
    },
  },

  mounted() {
    this.countDownTimer();
    this.setImgs();
  },

  methods: {
    submit() {
      this.$router.push({ name: 'StyleTransfer' });
    },

    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
    },

    preload() {
      for (let i = 0; i < this.imgs.length; i += 1) {
        const img = new Image();
        img.src = this.imgs[i];
      }
      console.log('preloaded');
      return true;
    },

    setImgs() {
      if (this.condition === '1' || this.condition === '2') {
        this.imgs.push(require('@/assets/img/001.png'));
        this.imgs.push(require('@/assets/img/002.png'));
        this.imgs.push(require('@/assets/img/003.png'));
      } else if (this.condition === '3') {
        this.imgs.push(require('@/assets/img/001.png'));
        this.imgs.push(require('@/assets/img/002.png'));
        this.imgs.push(require('@/assets/img/003.png'));
        this.imgs.push(require('@/assets/img/004.png'));
      }
      this.preload();
    },

    prev() {
      this.imgId = (this.imgId === 1) ? 1 : this.imgId - 1;
    },

    next() {
      this.imgId = (this.imgId === this.imgs.length) ? this.imgs.length : this.imgId + 1;
    },
  },
};
</script>

<style>
.row {
  display: flex;
  flex-direction: row;
}
</style>

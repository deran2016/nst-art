<template>
  <v-card
    class="mx-auto"
    max-width="1024"
    outlined
  >
    <v-card-text>
      <div class="px-8 py-5 body-1">
        이미지를 클릭하면 해당 작품에 대한 정보를 확인할 수 있습니다.
      </div>

      <div class="py-5 body-1 text-center">
        <img
          height="200"
          :src="require('@/assets/img/diana.jpg')"
        />
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
      this.$router.push({ name: 'Survey' });
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

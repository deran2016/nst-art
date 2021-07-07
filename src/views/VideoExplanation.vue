<template>
  <v-card
    class="mx-auto"
    max-width="1024"
    outlined
  >
    <v-card-text>
      <div class="text-center mb-5 title">
        NST - USER Guide
      </div>

      <div class="py-5 body-1 text-center">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/B22nIUhXo4E"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; \
                autoplay; \
                clipboard-write; \
                encrypted-media; \
                gyroscope; \
                picture-in-picture"
          allowfullscreen
        >
        </iframe>
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
  },
};
</script>

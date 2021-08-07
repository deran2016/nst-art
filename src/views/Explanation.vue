<template>
  <v-card
    class="mx-auto"
    max-width="750"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          1.2 실험 내용 안내
        </div>
        <v-list-item-title class="text-h5 mb-1 text-center">
          실험 내용 안내
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <!--
      <div class="text-center mb-5 title">
        실험 내용 안내
      </div>
      -->

      <div class="px-8 py-5 body-1">
        <ul>
          <li>
            앞으로 약 10~20 분간 가상 미술관을 관람 후 학습을 위한 프로그램을 진행하게 됩니다.
          </li>
          <li>
            프로그램은 총 {{ condition === '1' ? '2' : '3' }} 가지 과정으로 구성되어 있으며, 안내 메시지에 따라 실험을 진행해 주세요.
          </li>
          <li>
            자신의 기존 경험에 근거해서, 솔직하게 진행해 주시면 됩니다.
          </li>
          <li>
            프로그램 종료 후 이루어지는 설문조사에 응해 주셔야 모든 실험이 종료됩니다.
          </li>
        </ul>
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
    condition() {
      return this.$store.state.data.experimentType;
    },
  },

  mounted() {
    this.countDownTimer();
  },

  methods: {
    submit() {
      this.$router.push({ name: 'Gallary' });
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

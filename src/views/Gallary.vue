<template>
  <v-card
    class="mx-auto"
    max-width="1024"
    outlined
  >
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-3">
          관람 전 안내
        </v-card-title>

        <v-card-text>
          <div class="px-2 py-6 body-1">
            <ul>
              <li>
                지금부터 램브란트의 작품 10개를 감상하시게 될 예정입니다.
              </li>
              <li>
                작품 명과 제작년도만 표시되어 있습니다.
              </li>
              <li>
                편안하게 보이는 대로, 떠오르는 대로 자유롭게 작품을 감상해주시면 됩니다.
              </li>
            </ul>
          </div>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            닫기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-carousel
      hide-delimiter-background
    >
      <v-carousel-item
        v-for="img in imgs"
        :key="img"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <v-img
            contain
            max-height="400"
            :src="require(`@/assets/img/${img}.jpg`)"
          />
        </v-row>
        <div class="text-h6 text-right">
          {{ img }}
        </div>
      </v-carousel-item>
    </v-carousel>

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
    dialog: true,
    imgs: [
      '2, 지스몽다(Gismonda) 석판화(Colour lithograph), 1895',
    ],
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
      this.$router.push({ name: 'VideoExplanation' });
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

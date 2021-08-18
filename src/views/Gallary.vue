<template>
  <v-card
    class="mx-auto"
    max-width="100%"
    width="100%"
    height="100%"
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
          <div class="py-6 body-1">
            <ul>
              <li>
                지금부터 알폰스 무하의 작품 15개를 감상하시게 될 예정입니다.
              </li>
              <li>
                작품의 우측에 작품 명과 제작년도만 표시되어 있습니다.
              </li>
              <li>
                편안하고 자유롭게 작품을 감상해주시면 됩니다.
              </li>
              <li>
                작품을 모두 감상하시면 다음 버튼이 활성화됩니다.
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
    <v-card-text>
      <v-carousel
        hide-delimiters
        height="100%"
        width="100%"
        @change="onChange"
      >
        <v-carousel-item
          v-for="img in imgs"
          :key="img"
        >
          <v-sheet
            height="100%"
            tile
          >
            <v-row
              align="center"
              justify="center"
              style="height: 620px;"
            >
              <v-img
                contain
                max-height="560"
                :src="img"
              />
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <div
        class="mb-2 mr-2 text-h6 text-right"
        style="position: absolute; bottom: 43%; right: 8px; width: 30%"
      >
        {{ text1 }}
      </div>
      <div
        class="mb-30 mr-2 body-1 text-right"
        style="position: absolute; bottom: 40%; right: 8px; width: 30%"
      >
        {{ text2 }}
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="primary"
        :disabled="disabled"
        @click="submit"
      >
        다음
        {{ watchCount > 0 ? `(남은 작품 수 : ${watchCount})` : '' }}
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
    countDown: 7,
    watched: [],
    dialog: true,
    text1: '',
    text2: '',
    imgs: [
      require('@/assets/img/1, 카르티에 라탱 표지(Au Quartier Latin Cover), 1898.jpg'),
      require('@/assets/img/2, 지스몽다(Gismonda), 1895.jpg'),
      require('@/assets/img/3, 토스카(La Tosca), 1899.jpg'),
      require('@/assets/img/4, 제20회 살롱 데 상 전시회 포스터(Salon of the Hundred), 1896.jpg'),
      require('@/assets/img/5, 사계_가을(The Seasons series_Autumn), 1896.jpg'),
      require('@/assets/img/6, 라 플륌을 위한 일러스트_황도 십이궁(La Plume_Zodiac), 1897.jpg'),
      require('@/assets/img/7, 일세, 트리폴리 공주를 위한 삽화, 1897.jpg'),
      require('@/assets/img/8, 르 파테를 위한 삽화, 1899.jpg'),
      require('@/assets/img/10, 장식 패널 앵초와 깃털을 위한 디자인( The Primrose and the Quill), 1899.png'),
      require('@/assets/img/11, 파리 만국 박람회 오스트리아 전시관 포스터(Exposition universelle de paris), 1899.jpg'),
      require('@/assets/img/12, 호르이체에서 열린 북동 보헤이마의 상공 예술 박람회를 위한 포스터(Hospodarska Prumyslova a umelecka Vystava Ceskeho Severovychodu v Horicich, 1903.jpg'),
      require('@/assets/img/13, 세인트루이스 만국 박람회를 위한 홍보 포스터(art nouveau color lithograph poster showing a seated woman clasping the hand of a Native american), 1903.jpg'),
      require('@/assets/img/14, 잔다르크로 분한 모드 아담(Maude Adams as Joan of Arc), 1908.jpg'),
      require('@/assets/img/15, 모리비아 교사 합창단을 위한 포스터(Moravian Teachers Choir), 1911.jpg'),
      require('@/assets/img/16, 슬라브 서사시 연작 중 슬라브 민족의 역사 찬미(Epopeia Eslava - Ciclo XX), 1926.jpg'),
    ],
  }),

  computed: {
    condition() {
      return this.$store.state.data.experimentType;
    },

    disabled() {
      return this.countDown > 0 || this.watchCount !== 0;
    },

    watchCount() {
      return this.watched.filter((item) => item === false).length;
    },
  },

  mounted() {
    this.preload();
    this.countDownTimer();
    this.watched = Array.from({ length: 15 }, () => false);
    this.watched[0] = true;
  },

  methods: {
    submit() {
      if (this.condition === '1') {
        this.$router.push({ name: 'Artist' });
      } else if (this.condition === '2' || this.condition === '3') {
        this.$router.push({ name: 'VideoExplanation' });
      }
    },

    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
    },

    onChange(num) {
      this.watched[num] = true;
      this.watched = this.watched.slice(0);
      [this.text1, this.text2] = [this.imgs[num].split('.')[0].split(',').slice(1, -1).join(', '), this.imgs[num].split('.')[0].split(',')[this.imgs[num].split('.')[0].split(',').length - 1]];
    },

    preload() {
      for (let i = 0; i < this.imgs.length; i += 1) {
        const img = new Image();
        img.src = this.imgs[i];
      }
      console.log('preloaded');
      return true;
    },
  },
};
</script>

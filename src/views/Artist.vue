<template>
  <v-card
    class="mx-auto"
    max-width="1024"
    outlined
  >
    <v-card-text>
      <div class="px-8 mb-2 title">
        Alphonse Mucha (알폰스 마리아 무하)
      </div>

      <div class="py-5 body-1 text-center">
        <img
          height="250"
          :src="require('@/assets/img/2, 지스몽다(Gismonda) 석판화(Colour lithograph), 1895.jpg')"
        />
      </div>
      <div class="px-8 py-5 body-1">
        체코의 화가이자 장식 예술가<br />
        아루누보 시대의 대표적인 일러스트레이터<br />
        19살 무렵부터 무대배경 제작 회사에서 2년간 그림을 그리고 이후 뮌헨 미술원에서 정식으로 그림을 배웠
        다. 20대 후반에 파리에서 잡지와 광고 삽화를 그리다가 한 프랑스 배우, 사라 베르나르를 알리기 위한 석
        판 포스터가 큰 호평을 받아 유명해졌다. 이 때 부터 형성된 무하의 특이한 화풍은 아르누보 양식에 큰 영향을 주었다.
        <br /><br />
        아르누보 양식은 기존 미술에 대해 반하며 예술가의 작업 영역이 건축, 가구 등 실용적인 부분에 닿아야 한다고 생각했
        다. 꽃, 덩굴에서 따온 곡선을 특징으로 하는데, 무하의 작업 스타일이 크게 영향을 미쳐 처음에는 무하 스타일로 알려졌다.
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

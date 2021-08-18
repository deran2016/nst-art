<template>
  <v-card
    class="mx-auto"
    max-width="750"
    outlined
  >
    <v-card-text>
      <div class="px-8 mb-2 title">
        알폰스 무하 (Alphonse Mucha)
      </div>

      <div class="py-5 body-1 text-center">
        <img
          height="250"
          :src="require('@/assets/img/mucha.jpg')"
        />
      </div>
      <div class="px-8 py-5 body-1">
        체코의 화가이자 장식 예술가<br /><br />
        아루누보 시대의 대표적인 일러스트레이터<br /><br />
        어릴 적부터 그림을 그리던 무하는 고등학교를 졸업한 뒤에 화가가 되겠다는 꿈을 가지고 있었다.
        열정적이고 패기가 넘치던 그는 19살 무렵부터 무대배경 제작 회사에서 2년간 그림을 그리다 쿠엔 백작 형제를 만나게 되었고,
        그들의 후원을 받아 파리에 있는 쥘리앙 아카데미에서 그림 공부를 시작했다.
        하지만 2년 뒤 재정적인 지원이 끊기게 되자 돈을 벌기 위해 파리에서 잡지와 광고 삽화를 그리며 가난으로 어려운 시절을 보냈다.
        그러던 어느 날 20대 후반이 된 무하에게 운명의 여신이 찾아왔다.
        우연한 계기로 당시 최고의 프랑스 여배우 사라 베르나르를 위한 석판 포스터를 디자인한 것이 큰 호평을 받았고 그로 인해 유명해졌다.
        이때부터 형성된 무하의 특이한 화풍은 아르누보 양식에 큰 영향을 주었다.
        <br /><br />
        무하의 그림은 주로 곡선으로 이루어져 있으며 인물과 배경의 윤곽선이 도드라져 기존 아카데미 그림에 비해 평면적인 편이다.
        상업적인 그림을 많이 그렸던 무하는 대중에게 인정받는 장식 예술가가 된다.
        기하학적이며 반복되는 무늬가 그림에 많이 등장하는데,
        그가 직접 그린 장식 자료집은 당시의 많은 장인들과 학생들에게 팔리면서 그의 스타일을 양산하는 계기가 된다.
        <br /><br />
        아르누보 양식은 기존 미술에 대해 반하며 예술가의 작업 영역이 건축, 가구 등 실용적인 부분에 닿아야 한다고 생각했다.
        따라서 아르누보 양식은 지하철 역, 악세사리, 건축, 가구 등 일상 속에서 찾아볼 수 있었다.
        꽃, 덩굴에서 따온 곡선을 특징으로 하는데, 무하의 작업 스타일이 크게 영향을 미쳐 처음에는 무하 스타일로 알려졌다.
      </div>
    </v-card-text>

    <v-card-actions
      style="flex-direction: row-reverse"
    >
      <v-btn
        color="primary"
        style="width: 25%"
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
    countDown: 20,
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

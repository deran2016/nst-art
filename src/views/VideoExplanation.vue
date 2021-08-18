<template>
  <v-card
    class="mx-auto"
    max-width="900"
    width="900"
    outlined
  >
    <v-card-text>
      <div class="text-center mb-5 title">
        NST - USER Guide
      </div>

      <div class="py-5 body-1">
        다음 페이지에선 ‘명화 스타일 옮기기’라는 딥러닝 기술을 이용한 인공지능 미술프로그램을 진행하실 예정입니다.<br />
        해당 기술은 2장의 이미지를 활용해 명화의 스타일이 들어간 이미지를 생성해주는 방식으로, 한장의 이미지는 사진을 다른 한장은 그림을 사용합니다.<br />
        <img
          :src="require('@/assets/img/guide1.jpg')"
          height="240px"
        />
        <img
          :src="require('@/assets/img/guide2.jpg')"
          height="270px"
        />
        <br />
        명화의 스타일을 적용하고자 하는 사진에 따라 어떤 사진의 경우 잘 어울릴 수도 있고, 어떤 사진의 경우 어색할 수도 있기 때문에,
        다양한 시도를 통해서 명화의 스타일이 적용되는 대상이 바뀌면 어떤 느낌을 주는지를 인공지능을 이용해 직접 그려보지 않고도
        쉽고 빠르게 많은 작품을 확인해보실 수 있습니다.<br /><br />
        활동을 진행하실 때<br />
        <ol>
          <li>해당 명화의 스타일이 주는 느낌이 결과물에도 잘 나타나는 것 같은지</li>
          <li>완성된 결과물이 내 마음에 드는지</li>
        </ol>
        생각해 보시면서 활동을 진행하시면 좋습니다.<br /><br />
        <div v-if="condition === '3'">
          <mark style="background-color: red; color: white">*중요</mark><br />
          사진을 사용자가 직접 3장의 사진을 업로드해서 사용하게 됩니다.<br />
          내가 직접 찍은 사진중 기억에 남는 사진을 이용해서 프로그램을 진행하실 수 있습니다.<br />
          (다만, 사진에 나온 물체들이 전부 작거나 흐릿한경우, 혹은 구분될 것 없이 하나의 색으로만 이루어진 구름없는 하늘이나,
          벽, 어두운 공간 같은 경우엔 스타일 적용이 어려워 그러한 사진들은 피해주시길 바랍니다.)<br />
          아래 이미지처럼 다양한 물체가 다양한 크기를 가지고 있는 경우 명화 스타일 적용에 유리합니다.<br />
          <div class="text-center">
            <img
              :src="require('@/assets/img/2.jpg')"
              height="300px"
            />
            <img
              :src="require('@/assets/img/1.jpg')"
              height="300px"
            />
          </div>
        </div>
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
    countDown: 20,
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

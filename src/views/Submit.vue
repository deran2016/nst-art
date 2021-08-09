<template>
  <v-card
    class="mx-auto"
    max-width="750"
    outlined
  >
    <v-card-text>
      <div class="px-8 mb-5 title">
        수고하셨습니다
      </div>
      <div class="px-8 py-5 body-1">
        <div v-if="condition !== '1'">
          <canvas
            v-for="i in stylizedCount"
            :id="`stylized${i}`"
            :key="i"
            style="margin: 3px;"
          >
          </canvas>
        </div>
        <div
          v-if="condition !== '1'"
          class="text-center"
        >
          저장하고 싶은 이미지를 마우스 우클릭하시고 ‘이미지를 다른 이름으로 저장’을 클릭하시면 이미지 저장이 가능합니다.
        </div>
        <br />
        <div class="text-center">
          마지막으로 아래 링크로 들어가셔서 설문을 완료해 주셔야 실험이 종료됩니다.
        </div>
        <div class="text-center">
          ‘설문하러 가기’ 버튼을 누르시면 설문 페이지로 연결됩니다.
        </div>
        <div class="text-center">
          <b>[설문까지 완료하셔야만 실험비 지급이 가능해서 꼭 설문 완료 부탁드립니다!!.]</b>
        </div>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        block
        color="primary"
        :loading="isSending"
        @click="goSurvey"
      >
        설문하러 가기 {{ countDown > 0 ? `(${countDown})` : '' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
/* eslint-disable import/no-unresolved */
import axios from 'axios';

export default {
  data: () => ({
    isSubmitted: false,
    isSending: false,
    countDown: 5,
  }),

  computed: {
    condition() {
      return this.$store.state.data.experimentType;
    },

    stylizedCount() {
      return this.$store.state.data.stylizedCount;
    },
  },

  async mounted() {
    if (this.condition !== '1') {
      for (let i = 1; i <= this.stylizedCount; i += 1) {
        this.loadImg(i);
      }
    }
    this.submitData();
    this.countDownTimer();
    setTimeout(() => {
      // this.goSurvey();
      // if (!this.isSending) {
      //   const url = 'https://docs.google.com/forms/d/e/1FAIpQLScJc0mV0mqJBh-TYiXZb4jDbsMf-exUKO3yJieu-zunOv3tUQ/viewform';
      //   window.location = url;
      // }
    }, this.countDown * 1000);
  },

  methods: {
    loadImg(index) {
      const canvas = this.$el.querySelector(`#stylized${index}`);
      if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        if (localStorage[`stylized${index}`] && localStorage[`stsize${index}`]) {
          const aData = localStorage[`stylized${index}`].split('|');
          const size = localStorage[`stsize${index}`].split(',');
          const imgData = ctx.createImageData(size[0], size[1]);
          [canvas.width, canvas.height] = [size[0], size[1]];
          let j = 0;
          for (let i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i] = aData[j];
            imgData.data[i + 1] = aData[j + 1];
            imgData.data[i + 2] = aData[j + 2];
            imgData.data[i + 3] = 0xFF;
            j += 3;
          }
          ctx.putImageData(imgData, 0, 0);
        }
      }
    },

    async submitData() {
      this.isSending = true;
      const data = this.$store.getters.getSubmitData;
      console.log(data, this.$store);
      try {
        const url = '';
        const response = await axios.post(
          url,
          data,
        );
        console.log(response);
      } catch (err) {
        console.log(err);
      } finally {
        this.isSending = false;
      }
    },

    goSurvey() {
      let url = '';
      if (this.condition === '1') {
        url = 'https://forms.gle/a4UBA7uCvuMuMyay8';
      } else if (this.condition === '2' || this.condition === '3') {
        url = 'https://forms.gle/qMFoztNUbAJovh417';
      }
      window.open(url);
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

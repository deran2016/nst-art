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
// import axios from 'axios';

export default {
  data: () => ({
    isSubmitted: false,
    isSending: false,
    countDown: 5,
    filesystem: null,
    stylizedObjects: {},
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
      this.getLocalFile();
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
        if (this.stylizedObjects[`stylized${index}`] && this.stylizedObjects[`stsize${index}`]) {
          const aData = this.stylizedObjects[`stylized${index}`].split('|');
          const size = this.stylizedObjects[`stsize${index}`].split(',');
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
        await this.$firebase.database().ref(`response/${this.$store.state.data.participantID}`).set(data);
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
      } else if (this.condition === '2') {
        url = 'https://forms.gle/qMFoztNUbAJovh417';
      } else if (this.condition === '3') {
        url = 'https://forms.gle/W4Dcjb5ndfjKZrbZA';
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

    getLocalFile() {
      window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
      navigator.webkitPersistentStorage.requestQuota(1024 * 1024 * 10, (grantedSize) => {
        window.requestFileSystem(window.PERSISTENT, grantedSize, (fs) => {
          this.filesystem = fs;
          console.log('저장소 요청 성공');
          this.filesystem.root.getFile('stylized.txt', {}, (fileEntry) => {
            console.log(`파일 열기 성공: ${fileEntry.fullPath}`);
            fileEntry.file((file) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                this.stylizedObjects = JSON.parse(reader.result);
                for (let i = 1; i <= this.stylizedCount; i += 1) {
                  this.loadImg(i);
                }
              };
              reader.readAsText(file, 'utf-8');
            });
          });
        }, (error) => {
          console.log(error);
        });
      }, (error) => {
        console.log(error);
      });
    },
  },
};
</script>

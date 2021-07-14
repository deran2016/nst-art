<template>
  <v-card
    class="mx-auto"
    max-width="1024"
    outlined
  >
    <v-dialog
      v-model="dialog"
      max-width="800"
    >
      <v-card>
        <v-card-text>
          <div class="px-8 py-5 mb-5 title">
            {{ selectedImg }}
            {{ countUp[selectedImg] }}
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="dialog = false; selectedImg = 'base'"
          >
            닫기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card-text>
      <div class="px-8 py-5 body-1">
        이미지를 클릭하면 해당 작품에 대한 정보를 확인할 수 있습니다.
      </div>

      <div class="py-5 body-1 text-center">
        <vue-select-image
          :data-images="artImgs"
          :h="'200'"
          @onselectimage="onSelectImage"
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
/* eslint-disable global-require */
import { setTimeout } from 'timers';
import VueSelectImage from 'vue-select-image';

require('vue-select-image/dist/vue-select-image.css');

export default {
  components: {
    VueSelectImage,
  },

  data: () => ({
    countDown: 7,
    countUp: {},
    dialog: false,
    selectedImg: 'base',
    artImgs: [{
      id: 'beach',
      src: require('../assets/img/beach.jpg'),
      alt: 'beach.jpg',
    }, {
      id: 'stata',
      src: require('../assets/img/seaport.jpg'),
      alt: 'stata.jpg',
    }],
    artInfo: [],
  }),

  computed: {
    disabled() {
      return this.countDown > 0;
    },
  },

  mounted() {
    this.countUpTimer();
    this.countDownTimer();
  },

  methods: {
    submit() {
      this.$router.push({ name: 'Survey' });
    },

    countUpTimer() {
      if (this.$router.history.current.name === 'Art') {
        setTimeout(() => {
          if (!this.countUp[this.selectedImg]) this.countUp[this.selectedImg] = 0;
          this.countUp[this.selectedImg] = ((this.countUp[this.selectedImg] * 10) + 1) / 10;
          console.log(this.countUp[this.selectedImg]);
          this.countUpTimer();
        }, 100);
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

    onSelectImage(img) {
      this.selectedImg = img.id;
      this.dialog = true;
    },
  },
};
</script>

<style lang="scss">
.vue-select-image__thumbnail--selected {
    background: rgb(33, 75, 212);
}
</style>

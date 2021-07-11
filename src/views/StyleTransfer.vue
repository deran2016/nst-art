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
        <v-card-text>
          <div class="text-center py-8">
            <v-btn
              rounded
              color="pink"
              class="ma-2 white--text"
            >
              Upload
              <v-icon
                right
                dark
              >
                mdi-cloud-upload
              </v-icon>
            </v-btn>
            <v-file-input
              v-model="file"
              accept="image/png, image/jpeg, image/bmp"
              label="사진 업로드"
              prepend-icon="mdi-camera"
              show-size
              @change="onSelectFile"
            />
          </div>
          <div class="px-2 py-6 body-1">
            <p>업로드 버튼을 눌러 선택한 스타일 이미지를 적용할 사진을 업로드해주세요</p>
            <p>#업로드하신 이미지는 별도로 보관하지 않으며 실험이 완료되는 즉시 삭제합니다.</p>
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

    <v-dialog
      v-model="dialog2"
      width="500"
    >
      <v-card v-show="dialog2">
        <v-card-text>
          <div class="px-8 py-6 mb-2 text-center title">
            완성!
          </div>
          <canvas
            id="complete"
            ref="complete"
          >
          </canvas>
          <div class="px-2 py-6 body-1">
            <p>스타일 트랜스퍼가 완료되었습니다.<br />아래 질문에 대한 선택을 완료하면 다음 버튼이 활성화됩니다.</p>
          </div>
          <div class="px-2 py-6 body-1">
            1. 사진에 스타일이 잘 어울린다
            <v-radio-group
              row
            >
              <v-radio value="1" />
              <v-radio value="2" />
              <v-radio value="3" />
              <v-radio value="4" />
              <v-radio value="5" />
            </v-radio-group>
            2. 화풍이 잘 반영된 것 같다
            <v-radio-group
              row
            >
              <v-radio value="1" />
              <v-radio value="2" />
              <v-radio value="3" />
              <v-radio value="4" />
              <v-radio value="5" />
            </v-radio-group>
          </div>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="dialog2 = false"
          >
            다음
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card-text>
      <div class="px-8 mb-5 title">
        1. 스타일
      </div>

      <div class="text-center body-1">
        <vue-select-image
          :data-images="styleImgs"
          :h="'200'"
          @onselectimage="onSelectStyleImage"
        />
      </div>

      <v-divider />

      <div class="px-8 py-2 mb-5 title">
        2. 사진 선택
        <v-btn
          rounded
          color="pink"
          class="ma-2 white--text"
          @click="dialog = true"
        >
          Upload
          <v-icon
            right
            dark
          >
            mdi-cloud-upload
          </v-icon>
        </v-btn>
      </div>

      <div class="text-center body-1">
        <vue-select-image
          :data-images="contentImgs"
          :h="'200'"
          @onselectimage="onSelectContentImage"
        />
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        rounded
        outlined
        block
        color="primary"
        :disabled="!enableStylize"
        @click="startStyling"
      >
        Stylize
      </v-btn>
    </v-card-actions>

    <v-card-text>
      <v-divider />
      <div class="px-8 py-2 mb-5 title">
        3. 완성
      </div>
      <div class="px-8 py-2 body-1">
        <canvas
          v-for="i in stylizedCount"
          :id="`stylized${i}`"
          :key="i"
        >
        </canvas>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        block
        color="primary"
        :disabled="!stylizedCount"
        @click="submit"
      >
        다음
      </v-btn>
    </v-card-actions>

    <v-overlay
      :value="overlay"
      :absolute="true"
    >
      <v-btn
        color="success"
        @click="overlay = false"
      >
        X
      </v-btn>
      <p>test</p>
    </v-overlay>
  </v-card>
</template>

<script>
/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
import * as tf from '@tensorflow/tfjs';
import VueSelectImage from 'vue-select-image';
import { mapMutations } from 'vuex';

tf.ENV.set('WEBGL_PACK', false);
require('vue-select-image/dist/vue-select-image.css');

export default {
  name: 'StyleTransfer',

  components: {
    VueSelectImage,
  },

  data: () => ({
    countDown: 7,
    overlay: true,
    dialog: false,
    dialog2: true,
    styleNet: null,
    transformNet: null,
    styleImg: null,
    contentImg: null,
    stylizedCount: 0,
    file: {},
    styleImgs: [{
      id: 'beach',
      src: require('../assets/img/beach.jpg'),
      alt: 'beach.jpg',
    }, {
      id: 'stata',
      src: require('../assets/img/seaport.jpg'),
      alt: 'stata.jpg',
    }],
    contentImgs: [],
  }),

  computed: {
    enableStylize() {
      return this.styleImg !== null
        && this.contentImg !== null;
    },
    disabled() {
      return this.countDown > 0;
    },
  },

  mounted() {
    this.countDownTimer();
    Promise.all([
      this.loadInceptionStyleModel(),
      this.loadOriginalTransformerModel(),
    ]).then(([styleNet, transformNet]) => {
      console.log('Loaded styleNet');
      this.styleNet = styleNet;
      this.transformNet = transformNet;
    });
  },

  methods: {
    ...mapMutations([
      'updateFields',
    ]),

    async loadInceptionStyleModel() {
      if (!this.inceptionStyleNet) {
        this.inceptionStyleNet = await tf.loadGraphModel('/model/saved_model_style_inception_js/model.json');
      }
      return this.inceptionStyleNet;
    },

    async loadOriginalTransformerModel() {
      if (!this.origitalTransformNet) {
        this.origitalTransformNet = await tf.loadGraphModel('/model/saved_model_transformer_js/model.json');
      }
      return this.origitalTransformNet;
    },

    async startStyling() {
      this.stylizedCount += 1;
      await tf.nextFrame();
      await tf.nextFrame();
      const bottleneck = await tf.tidy(() => this.styleNet.predict(
        tf.browser.fromPixels(this.styleImg).toFloat().div(tf.scalar(255)).expandDims(),
      ));
      await tf.nextFrame();
      const stylized = await tf.tidy(() => this.transformNet.predict([
        tf.browser.fromPixels(this.contentImg).toFloat().div(tf.scalar(255)).expandDims(),
        bottleneck,
      ]).squeeze());
      await tf.browser.toPixels(stylized, this.$el.querySelector(`#stylized${this.stylizedCount}`));
      bottleneck.dispose();
      stylized.dispose();
      this.dialog2 = true;
      this.saveImg();
      this.loadImg();
    },

    onSelectStyleImage(img) {
      this.styleImg = this.$el.querySelector(`#${img.id}`);
    },

    onSelectContentImage(img) {
      this.contentImg = this.$el.querySelector(`#${img.id}`);
    },

    onSelectFile(file) {
      if (file) {
        this.file = file;
        this.setImage();
      }
    },

    setImage() {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.file);
      fileReader.onload = () => {
        this.contentImgs.push({
          id: `contentImg${this.contentImgs.length + 1}`,
          src: fileReader.result,
          alt: 'contentImg',
        });
      };
    },

    saveImg() {
      const canvas = this.$el.querySelector(`#stylized${this.stylizedCount}`);
      if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let strData = '';
        for (let i = 0; i < imgData.data.length; i += 4) {
          strData += `${imgData.data[i]}|${imgData.data[i + 1]}|${imgData.data[i + 2]}|`;
        }
        localStorage.setItem(`stylized${this.stylizedCount}`, strData);
        localStorage.setItem(`stsize${this.stylizedCount}`, `${canvas.width},${canvas.height}`);
      }
    },

    loadImg() {
      const canvas = this.$refs.complete;
      if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        if (localStorage[`stylized${this.stylizedCount}`] && localStorage[`stsize${this.stylizedCount}`]) {
          const aData = localStorage[`stylized${this.stylizedCount}`].split('|');
          const size = localStorage[`stsize${this.stylizedCount}`].split(',');
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

    onloadContentImg() {
      this.contentImg = this.$el.querySelector('#content');
    },

    submit() {
      for (let i = 1; i <= this.stylizedCount; i += 1) {
        this.saveImg(i);
      }
      this.$router.push({ name: 'Artist' });
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

<template>
  <v-card
    class="mx-auto"
    width="100%"
    outlined
  >
    <div
      v-if="!modelLoading"
      class="py-5 text-center"
    >
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      />
      <div class="text-center body-1">
        Loading Models...
      </div>
    </div>
    <div
      v-if="modelLoading"
    >
      <v-dialog
        v-model="dialog"
        persistent
        max-width="800"
      >
        <v-card v-show="dialog1">
          <v-card-text>
            <div class="text-center py-8">
              <v-btn
                rounded
                color="pink"
                class="ma-2 white--text"
                @click="fileupload"
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
                id="fileinput"
                ref="fileinput"
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
              <p><b>사진을 3장 업로드해야 진행이 가능합니다.</b></p>
              <p>
                #업로드하신 이미지는 별도로 보관하지 않으며 실험이 완료되는 즉시 삭제됩니다.
              </p>
              <p>업로드를 동일한 방법으로 3회 진행하신 뒤 닫기를 눌러주시면 바로 바로 업로드된 사진을 사용하실 수 있습니다.</p>
              <p
                style="color: red;"
              >
                <b>
                  업로드 하신 후 사용을 원하는 사진을 클릭해주세요.
                </b>
              </p>
            </div>
          </v-card-text>

          <v-divider />

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              text
              @click="dialog = false; dialog1 = false"
            >
              닫기
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-card v-show="dialog2">
          <v-card-text>
            <div class="px-8 py-6 mb-2 text-center title">
              완성!
            </div>
            <div class="text-center body-1">
              <img
                :src="getSrc"
                height="290"
                style="margin-right: 30px"
              />
              <canvas
                id="complete"
                ref="complete"
              >
              </canvas>
            </div>
            <div class="mx-16 px-16 py-6 body-1 text-center">
              <p>
                카이(CAAI) 실행이 완료되었습니다!<br />
                완성된 결과물과 무하의 작품을 비교해 보면서 아래 질문에 대해 답변해주세요.<br /><br />
                (1: 전혀 아니다 ~ 7: 매우 그렇다)
              </p>
            </div>
            <div class="mx-16 px-16 body-1">
              1. 무하 그림에 더 관심이 간다.
              <p class="radio-label">
                1234567
              </p>
              <v-radio-group
                v-model="selectedOption1"
                row
              >
                <v-radio value="1" />
                <v-radio value="2" />
                <v-radio value="3" />
                <v-radio value="4" />
                <v-radio value="5" />
                <v-radio value="6" />
                <v-radio value="7" />
              </v-radio-group>
              2. 완성된 결과물이 내 마음에 든다.
              <p class="radio-label">
                1234567
              </p>
              <v-radio-group
                v-model="selectedOption2"
                row
              >
                <v-radio value="1" />
                <v-radio value="2" />
                <v-radio value="3" />
                <v-radio value="4" />
                <v-radio value="5" />
                <v-radio value="6" />
                <v-radio value="7" />
              </v-radio-group>
            </div>
          </v-card-text>

          <v-divider />

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              text
              :disabled="!checkedAll"
              @click="survey"
            >
              확인
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-card-text>
        <div class="px-8 mb-5 title">
          1단계: 스타일을 적용할 사진을 골라주세요
          <div
            v-if="condition !== '2'"
            style="display: inline"
          >
            <v-btn
              rounded
              color="pink"
              class="ma-2 white--text"
              @click="dialog = true; dialog1 = true"
            >
              Upload
              <v-icon
                right
                dark
              >
                mdi-cloud-upload
              </v-icon>
            </v-btn>
            <!--
            <v-btn
              rounded
              color="secondary"
              :disabled="!contentImg"
              @click="deleteContentImage"
            >
              선택한 사진 삭제
            </v-btn>
            -->
          </div>
        </div>

        <div class="text-center body-1">
          <vue-select-image
            ref="contentImgs"
            :data-images="contentImgs"
            :h="'290'"
            @onselectimage="onSelectContentImage"
          />
        </div>

        <v-divider />

        <div class="px-8 py-2 mb-5 title">
          2단계: 어떤 작품의 스타일을 적용할지 선택해주세요
        </div>

        <div class="text-center body-1">
          <vue-select-image
            :data-images="styleImgs"
            :h="'290'"
            @onselectimage="onSelectStyleImage"
          />
        </div>
      </v-card-text>

      <v-card-actions>
        <div></div>
        <v-btn
          rounded
          outlined
          style="width: 30%; margin: 0 auto; text-transform: none"
          color="primary"
          :disabled="!enableStylize || stylizing || contentImgs.length < 3"
          :loading="stylizing"
          @click="startStyling"
        >
          카이(Create Art with AI) 실행!
          <template v-slot:loader>
            <v-progress-circular
              indeterminate
              color="primary"
            />
            <span>카이가 스타일을 적용시키고 있어요 (10초 이내의 시간이 소요됩니다!)</span>
          </template>
        </v-btn>
      </v-card-actions>

      <v-card-text>
        <v-divider />
        <div class="px-8 py-2 mb-5 title">
          내가 만든 무하 갤러리
        </div>
        <div class="px-8 py-2 body-1">
          <canvas
            v-for="i in stylizedCount"
            :id="`stylized${i}`"
            :key="i"
            style="margin: 3px;"
          >
          </canvas>
        </div>
      </v-card-text>

      <v-card-actions
        style="flex-direction: row-reverse"
      >
        <v-btn
          style="width: 20%"
          color="primary"
          :disabled="!stylizedCount"
          @click="submit"
        >
          카이 활동 마치고 넘어가기
        </v-btn>
      </v-card-actions>

      <v-overlay
        :value="overlay"
        :absolute="true"
      >
        <img
          :src="require(`@/assets/img/가이드 - 컨디션${condition}.jpg`)"
          width="1000px"
        />
        <v-btn
          color="gray"
          @click="overlay = false"
        >
          X
        </v-btn>
      </v-overlay>
    </div>
  </v-card>
</template>

<script>
/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
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
    dialog1: false,
    dialog2: false,
    modelLoading: false,
    selectedOption1: null,
    selectedOption2: null,
    styleNet: null,
    transformNet: null,
    styleImg: null,
    styleImgId: '',
    contentImg: null,
    contentImgId: '',
    stylizing: false,
    stylizedCount: 0,
    stylizedResult: {},
    stylizedObjects: {},
    file: {},
    filesystem: null,
    filewriter: null,
    styleImgs: [{
      id: 'img1',
      src: require('@/assets/img/1, 지스몽다(Gismonda), 1895.jpg'),
      alt: 'img1',
    }, {
      id: 'img2',
      src: require('@/assets/img/2, 카르티에 라탱 표지(Au Quartier Latin Cover), 1898.jpg'),
      alt: 'img2',
    }, {
      id: 'img3',
      src: require('@/assets/img/3, 토스카(La Tosca), 1899.jpg'),
      alt: 'img3',
    }, {
      id: 'img4',
      src: require('@/assets/img/4, 제20회 살롱 데 상 전시회 포스터(Salon of the Hundred), 1896.jpg'),
      alt: 'img4',
    }, {
      id: 'img5',
      src: require('@/assets/img/5, 사계_가을(The Seasons series_Autumn), 1896.jpg'),
      alt: 'img5',
    }, {
      id: 'img6',
      src: require('@/assets/img/6, 라 플륌을 위한 일러스트_황도 십이궁(La Plume_Zodiac), 1897.jpg'),
      alt: 'img6',
    }, {
      id: 'img7',
      src: require('@/assets/img/7, 뫼즈강의 맥주(Bieres de La Meuse), 1897.jpeg'),
      alt: 'img7',
    }, {
      id: 'img8',
      src: require('@/assets/img/8, 모나코 몬테 카를로(Monaco - Monte Carlo), 1897.jpeg'),
      alt: 'img8',
    }, {
      id: 'img9',
      src: require('@/assets/img/9, 장식 패널 앵초와 깃털을 위한 디자인( The Primrose and the Quill), 1899.png'),
      alt: 'img9',
    }, {
      id: 'img10',
      src: require('@/assets/img/10, 뿌리는 향수 로도 광고 포스터 (Lanca Perfume “Rodo”), 1896.jpeg'),
      alt: 'img10',
    }, {
      id: 'img11',
      src: require('@/assets/img/11, 호르이체에서 열린 북동 보헤이마의 상공 예술 박람회를 위한 포스터(Hospodarska Prumyslova a umelecka Vystava Ceskeho Severovychodu v Horicich, 1903.jpg'),
      alt: 'img11',
    }, {
      id: 'img12',
      src: require('@/assets/img/12, 세인트루이스 만국 박람회를 위한 홍보 포스터(art nouveau color lithograph poster showing a seated woman clasping the hand of a Native american), 1903.jpg'),
      alt: 'img12',
    }, {
      id: 'img13',
      src: require('@/assets/img/13, 잔다르크로 분한 모드 아담(Maude Adams as Joan of Arc), 1908.jpg'),
      alt: 'img13',
    }, {
      id: 'img14',
      src: require('@/assets/img/14, 모리비아 교사 합창단을 위한 포스터(Moravian Teachers Choir), 1911.jpg'),
      alt: 'img14',
    }, {
      id: 'img15',
      src: require('@/assets/img/15, 슬라브 서사시 연작 중 슬라브 민족의 역사 찬미(Epopeia Eslava - Ciclo XX), 1926.jpg'),
      alt: 'img15',
    }],
    contentImgs: [],
    fixedContentImgs: [
      require('@/assets/img/1.jpg'),
      require('@/assets/img/2.jpg'),
      require('@/assets/img/3.jpeg'),
    ],
  }),

  computed: {
    condition() {
      return this.$store.state.data.experimentType;
    },

    enableStylize() {
      return this.styleImg !== null
        && this.contentImg !== null;
    },

    checkedAll() {
      return this.selectedOption1 && this.selectedOption2;
    },

    disabled() {
      return this.countDown > 0;
    },

    uploadCount() {
      return this.contentImgs.length;
    },

    getSrc() {
      return this.styleImgs[this.getKeyByValue(this.styleImgs, this.styleImgId)] ? this.styleImgs[this.getKeyByValue(this.styleImgs, this.styleImgId)].src : '';
    },
  },

  mounted() {
    this.getLocalFile();
    this.countDownTimer();
    Promise.all([
      this.loadInceptionStyleModel(),
      this.loadOriginalTransformerModel(),
    ]).then(([styleNet, transformNet]) => {
      this.modelLoading = true;
      this.preload();
      console.log('Loaded styleNet');
      this.styleNet = styleNet;
      this.transformNet = transformNet;
    });
    if (this.condition === '2') {
      this.initContentImage();
    }
  },

  methods: {
    ...mapMutations([
      'updateFields',
    ]),

    fileupload() {
      this.$refs.fileinput.$refs.input.click();
    },

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
      this.stylizing = true;
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
      this.dialog = true;
      this.dialog2 = true;
      await this.saveImg();
      await this.loadImg();
      this.stylizing = false;
    },

    onSelectStyleImage(img) {
      this.styleImg = this.$el.querySelector(`#${img.id}`);
      this.styleImgId = img.id;
    },

    onSelectContentImage(img) {
      this.contentImg = this.$el.querySelector(`#${img.id}`);
      this.contentImgId = img.id;
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
        // localStorage.setItem(`stylized${this.stylizedCount}`, strData);
        // localStorage.setItem(`stsize${this.stylizedCount}`, `${canvas.width},${canvas.height}`);
        this.stylizedObjects[`stylized${this.stylizedCount}`] = strData;
        this.stylizedObjects[`stsize${this.stylizedCount}`] = `${canvas.width},${canvas.height}`;
        console.log(this.stylizedObjects);
      }
    },

    loadImg() {
      const canvas = this.$refs.complete;
      if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        if (this.stylizedObjects[`stylized${this.stylizedCount}`] && this.stylizedObjects[`stsize${this.stylizedCount}`]) {
          const aData = this.stylizedObjects[`stylized${this.stylizedCount}`].split('|');
          const size = this.stylizedObjects[`stsize${this.stylizedCount}`].split(',');
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

    initContentImage() {
      for (let i = 0; i < this.fixedContentImgs.length; i += 1) {
        this.contentImgs.push({
          id: `contentImg${this.contentImgs.length + 1}`,
          src: this.fixedContentImgs[i],
          alt: 'contentImg',
        });
      }
    },

    survey() {
      this.stylizedResult[`result${this.stylizedCount}`] = {
        styleImg: this.styleImgId.slice(3),
        contentImg: this.contentImgId.slice(10),
        uploadCount: this.uploadCount,
        selectedOption1: this.selectedOption1,
        selectedOption2: this.selectedOption2,
      };
      this.dialog = false;
      this.dialog2 = false;
      this.selectedOption1 = null;
      this.selectedOption2 = null;
    },

    submit() {
      const blob = new Blob([JSON.stringify(this.stylizedObjects)], { type: 'text/plain' }, 'utf-8');
      this.fileWriter.write(blob);
      console.log(blob);
      this.updateFields({ stylizedCount: this.stylizedCount, stylizedResult: this.stylizedResult });
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

    deleteContentImage() {
      if (!this.contentImgId) return;
      for (let i = 0; i < this.contentImgs.length; i += 1) {
        if (this.contentImgs[i].id === this.contentImgId) {
          this.contentImgs.splice(i, 1);
          this.contentImg = null;
          this.contentImgId = '';
          this.$refs.contentImgs.removeFromSingleSelected();
        }
      }
    },

    preload() {
      for (let i = 0; i < this.styleImgs.length; i += 1) {
        const img = new Image();
        img.src = this.styleImgs[i].src;
      }
      console.log('preloaded');
      return true;
    },

    getLocalFile() {
      window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
      navigator.webkitPersistentStorage.requestQuota(1024 * 1024 * 10, (grantedSize) => {
        window.requestFileSystem(window.PERSISTENT, grantedSize, (fs) => {
          this.filesystem = fs;
          console.log('저장소 요청 성공');
          this.filesystem.root.getFile('stylized.txt', { create: true, exclusive: false }, (fileEntry) => {
            console.log(`파일의 절대경로: ${fileEntry.fullPath}`);
            fileEntry.createWriter((fileWriter) => {
              this.fileWriter = fileWriter;
            });
          });
        }, (error) => {
          console.log(error);
        });
      }, (error) => {
        console.log(error);
      });
    },

    getKeyByValue(arr, value) {
      for (let i = 0; i < arr.length; i += 1) {
        if (arr[i].id === value) {
          return i;
        }
      }
      return false;
    },
  },
};
</script>

<style lang="scss">
.vue-select-image__thumbnail--selected {
  background: rgb(255, 0, 0);
}
.vue-select-image__item {
  margin: 3px 3px !important;
}
.v-input--radio-group__input {
  justify-content: center;
}
.radio-label {
  margin: 12px 7px -18px;
  letter-spacing: 39px;
  text-align: center;
  padding-left: 14px;
}
</style>

<template>
  <v-card
    class="elevation-12"
  >
    <vue-select-image
      :data-images="dataImages"
      @onselectimage="onSelectImage"
    />
  </v-card>
</template>

<script>
/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
import * as tf from '@tensorflow/tfjs';
import VueSelectImage from 'vue-select-image';
import { mapMutations } from 'vuex';

require('vue-select-image/dist/vue-select-image.css');

export default {
  name: 'StyleTransfer',

  components: {
    VueSelectImage,
  },

  data: () => ({
    styleNet: {},
    transformNet: {},
    dataImages: [{
      id: '1',
      src: require('../assets/img/beach.jpg'),
      alt: '1',
    }, {
      id: '2',
      src: require('../assets/img/stata.jpg'),
      alt: '2',
    }],
  }),

  mounted() {
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
      await tf.browser.toPixels(stylized, this.stylized);
      bottleneck.dispose();
      stylized.dispose();
    },

    onSelectImage(id) {
      console.log(id);
    },
  },
};
</script>

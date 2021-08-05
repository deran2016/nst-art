<template>
  <v-card
    class="mx-auto"
    max-width="1100"
    outlined
  >
    <v-dialog
      v-model="dialog"
      max-width="800"
    >
      <v-card>
        <v-card-text>
          <div class="px-6 py-5 mb-5 title">
            {{ artInfo[selectedImg].title }}
          </div>
          <div class="px-6 py-5 body-1">
            <div style="text-align: center;">
              <img
                :src="getSrc"
                height="300"
              />
            </div>
            <br />
            {{ artInfo[selectedImg].text }}
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
          :h="'250'"
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
import { mapMutations } from 'vuex';

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
      id: 'img1',
      src: require('../assets/img/1, 카르티에 라탱 표지(Au Quartier Latin Cover), 1898, 석판화(Colour lithograph).jpg'),
      alt: 'img1',
    }, {
      id: 'img2',
      src: require('../assets/img/2, 지스몽다(Gismonda) 석판화(Colour lithograph), 1895.jpg'),
      alt: 'img2',
    }, {
      id: 'img3',
      src: require('../assets/img/3, 토스카(La Tosca), 1899.jpg'),
      alt: 'img3',
    }, {
      id: 'img4',
      src: require('../assets/img/4, 제20회 살롱 데 상 전시회 포스터(Salon of the Hundred), 1896.jpg'),
      alt: 'img4',
    }, {
      id: 'img5',
      src: require('../assets/img/5, 사계_가을(The Seasons series_Autumn), 1896.jpg'),
      alt: 'img5',
    }, {
      id: 'img6',
      src: require('../assets/img/6, 라 플륌을 위한 일러스트_황도 십이궁(La Plume_Zodiac), 1897.jpg'),
      alt: 'img6',
    }, {
      id: 'img7',
      src: require('../assets/img/7, 일세, 트리폴리 공주를 위한 삽화, 1897.jpg'),
      alt: 'img7',
    }, {
      id: 'img8',
      src: require('../assets/img/8, 르 파테를 위한 삽화, 1899.jpg'),
      alt: 'img8',
    }, {
      id: 'img10',
      src: require('../assets/img/10, 장식 패널 앵초와 깃털을 위한 디자인( The Primrose and the Quill), 1899.png'),
      alt: 'img10',
    }, {
      id: 'img11',
      src: require('../assets/img/11, 파리 만국 박람회 오스트리아 전시관 포스터(Exposition universelle de paris), 1899.jpg'),
      alt: 'img11',
    }, {
      id: 'img12',
      src: require('../assets/img/12, 호르이체에서 열린 북동 보헤이마의 상공 예술 박람회를 위한 포스터(Hospodarska Prumyslova a umelecka Vystava Ceskeho Severovychodu v Horicich, 1903.jpg'),
      alt: 'img12',
    }, {
      id: 'img13',
      src: require('../assets/img/13, 세인트루이스 만국 박람회를 위한 홍보 포스터(art nouveau color lithograph poster showing a seated woman clasping the hand of a Native american), 1903.jpg'),
      alt: 'img13',
    }, {
      id: 'img14',
      src: require('../assets/img/14, 잔다르크로 분한 모드 아담(Maude Adams as Joan of Arc), 1908, 석판화, 손으로 칠한 수채화와 과슈(Lithograph, hand-coloured in watercolour and gouache).jpg'),
      alt: 'img14',
    }, {
      id: 'img15',
      src: require('../assets/img/15, 모리비아 교사 합창단을 위한 포스터(Moravian Teachers Choir), 1911.jpg'),
      alt: 'img15',
    }, {
      id: 'img16',
      src: require('../assets/img/16, 슬라브 서사시 연작 중 슬라브 민족의 역사 찬미(Epopeia Eslava - Ciclo XX), 1926, 캔버스에 템페라, 480 x 405cm.jpg'),
      alt: 'img16',
    }],
    artInfo: {
      base: {
        title: 'base',
        text: '',
      },
      img1: {
        title: '카르티에 라탱 표지(1898)',
        text: '무하는 잡지 일러스트레이터로 활동하면서 인정받았으나, 그럼에도 큰 성공을 거두지 못한 일군의 화가들과 별반 다를 것 없는 처지였다. 그의 화첩에는 아직 누구나 알아볼 만한 유명작이 없었다.',
      },
      img2: {
        title: '지스몽다 (1895)',
        text: '크리스마스 날 그가 일하던 인쇄소에 긴급한 의뢰가 들어왔다. 당시 가장 유명한 여배우인 사라 베르나르의 주연작인 연극 지스몽다의 포스터를 새해 첫 날까지 완성해야 하는 의뢰였다. 그 외에는 의뢰를 수락 할 수 있는 사람이 없었다. 이 때 제작한 포스터가 큰 호평을 받아 유명해졌다. 이 때 부터 형성된 무하의 특이한 화풍은 아르누보 양식에 큰 영향을 주었다. (무하는 그녀를 스케치 하기위해 극장으로 가서 사라 베르나르의 연극을 지켜보았다. 그녀의 늘어진 의상과 화려한 화관, 그녀가 들고 있는 종려나무 가지와 무대 장치를 빠른 속도로 스케치 했다. 그리고 비잔틴식 무대와 의상을 떠올렸다. 이 때 제작한 포스터가 큰 호평을 받아 유명해졌다. 이 때 부터 형성된 무하의 특이한 화풍은 아르누보 양식에 큰 영향을 주었다. )',
      },
      img3: {
        title: '토스카(1899)',
        text: '무하는 지스몽다의 성공을 계기로 사라 베르나르와 계약을 채결했고 이후 6년간 사라 베르나르를 위한 포스터를 제작했을 뿐만 아니라 연극의 콘셉트를 의논하고 의상부터 소품까지 맡아 제작하는 동업자가 되었다. 무하가 제작한 포스터를 통해 사라 베르나르의 인기는 프랑스 전역을 거쳐 미국에까지 이어졌다.',
      },
      img4: {
        title: '제20회 사롱 데 상 전시회 포스터(1896)',
        text: '무하가 속한 잡지 창간자인 레옹 데 샹의 권유로 무하는 <20회 살롱 데 상 전시회 포스터>를 작업하게 된다. 무하가 이 포스터를 제작하고 있을 때, 레옹 데샹은 작업 중인 무하의 그림을 보고 한 눈에 반하게 된다. 데샹을 무하에게 그림을 완성하지 말고 미완성인 현재 상태로 포스터를 만들자고 제안한다. ',
      },
      img5: {
        title: '사계: 가을(1896)',
        text: '무하는 연장 장식 패널, <사계>로 큰 성공을 거두고 이후 다른 연작을 완성한다. 무하의 포스터는 거리를 메웠고 그의 장식 패널은 서민술집, 가정집, 그리고 고급 주택의 응접실에서도 볼 수 있었다. 그의 작품은 굳게 닫힌 미술과느이 유리문 너머에 있는 것이 아니라 손이 닿는 곳에, 대중을 위한 예술이 되어가고 있었다.',
      },
      img6: {
        title: 'La Plume(1896~1896)년 경 작품',
        text: '무하가 속한 인쇄소 상프누와는 끊임없이 의뢰를 받았고 무하의 수입도 점차 늘었다. 그러나 인쇄소로부터 받은 주문 중 무하가 선택권을 가진 것은 거의 없었다. 무하는 엄청난 양의 상업 포스터와 장식 패널을 위해 많은 에너지를 쏟았다. 얼핏 불가능해 보이는 이 장업량을 타고난 성실성과 재능으로 꾸려갔다.',
      },
      img7: {
        title: '일세, 트리폴리 공주를 위한 삽화 (1897)',
        text: '삽화가로서 무하는 글과 그림으리 조화를 중시했다. 몇몇 문학 작품을 위한 작업들은 무하가 보다 상징적이고 장식적인 스타일로 발전하는데 영감을 주었다. 무하의 책표지와 삽화 작업이 큰 성공을 거두었다. 무하는 이 작품이 책으로 출간된 것을 제안받았는데, 이는 무하에게 무척 반가운 제의였다. 더 자유롭게 자신이 원하는 방식으로 그림을 그릴 기회라 생각되었기 때문이다.',
      },
      img8: {
        title: '르 파테 를 위한 삽화 (1899)',
        text: '무하는 쳇바퀴 구르는 듯한 디자인에서 벗어나 보다 자신에게 충실한 작품에 대한 희망으로 <르 파테: 주기도문>을 출간했다. 이 작품은 무하가 세상 사람들에게 보내는 메시지로, 인간이란 비탄과 괴로움 속에 사는 불안정한 존재일지라도 신이라는 초월적 존재에게 언제나 보호받고 있다는 희망을 담고 있다.',
      },
      img10: {
        title: '장식 패널 앵초와 깃털을 위한 디자인 (1899)',
        text: '무하의 작품은 엽서, 삽화, 광고, 포스터 등 거리의 일상에서 볼 수  있었다. 무하는 사적인 응접실을 위해서가 아니라 모두를 위한 예술에 관련되어 기뻐랬다. 무하의 작품은 저렴하고, 일반 대중들도 쉽게 접근할 수 있으며 부유한 집안들뿐만 아니라 가난한 가정들에서도 자리를 차지할 수 있기 때문이다.',
      },
      img11: {
        title: '파리 만국 박람회 오르스티아 전시관 포스터(1899)',
        text: '무하는 1900년 파리 만국 박람회를 위해 국가나 단체로부터 많은 주문을 받았다. 무하에게 1900년 박람회는 중요한 의미가 있었다. 엄청난 양의 주문으로 그의 역량을 시험받았으며 그가 그린 보스니아-헤르체고비나 전시장의 약식은 은메달을 수상했다.  ',
      },
      img12: {
        title: '호르이체에서 열린 북동 보헤미아의 상공 예술 박람회를 위한 포스터 (1903) ',
        text: '마흔의 나이를 넘긴 무하는 쳇바퀴 도는 디자인 작업 보다는 더욱 성숙하고 진지한, 자신에게 솔직한 작업을 원하게 되었다. 무하는 프라하 여행에서 고향의 자연을 느꼈으나 고향에서 무하는 이방인이었다. 고향을 그를 프랑스에서 온 유명한 장식 화가로 여겼다. 무하는 체코 특유의 현대미술이 없는 것에 가슴 아파하며 지역화가들에게 타 유럽의 유행보다는 체코 전통에 관심을 기울이라 충고했지만 무하에 대한 그들의 태도는 냉담했다.',
      },
      img13: {
        title: '세인트 루이스 만국 박람회를 위한 홍보 포스터, 1903',
        text: '1900년 초 에 아르누보는 점점 퇴조했다. 무하는 조국과 슬라브인들에 대한 봉사를 위해 남은 생을 바치고자 했으나 계획적인 경제생활을 하지 않았기 때문에 엄청난 성공에도 불구하고 수중에 남은 돈은 적었다. 그는 돈을 벌기 위해 미국으로 이주를 택한다. 미국에서 무하는 세계에서 가장 위대한 장식화가로 환영 받는다. 여기서 무하는 장식 미술에 대한 주문은 사절하고 초상화 주문을 받는다. ',
      },
      img14: {
        title: '잔다르크로 분한 모드 아담, 1908',
        text: '미국으로 이주한 무하는 상류 사회 인사들의 초상회를 그리기 위해 유화 작업을 시작했으나 파스텔로 주로 작업하던 무하는 유화에 익숙하지 않았다. 그러나 점차 유화로도 자신만의 스타일을 찾기 시작했다. 미국 생활에 점자 안정성을 찾은 무하는 이후 뉴욕에 새로 생긴 극장의 연극인 잔다르크 등의 디자인을 맡아 호평을 받았다.',
      },
      img15: {
        title: '모리비아 교사 합창단을 위한 포스터, 1911 ',
        text: '무하는 연어가 강을 거슬러 태어난 곳으로 향하듯이 조국을 다시 찾게 되었다. 이제 그가 해야 할 일은 분명했다. 조국인 체코에 대한 봉사였다. 무하에 대해 알려진 것은 대부분 파리 시대의 장식적인 포스터였으나 조국에 돌아온 그의 작품에 파리의 화려함은 사라지고 단순하고 민속적인 요소들이 자리잡았다. 무하는 이런 포스터들을 무상으로 제작해주었다.',
      },
      img16: {
        title: '슬라브 서사시 연작 중: 슬라브 민족의 역사 찬미 (Epopeia Eslava - Ciclo XX), 1926',
        text: '조국을 위해 슬라브 역사를 20개 에피소드로 나누어 그렸다. 그는 시간이 나는데로 슬라브 역사가 담긴 곳을 여행하며 그곳의 풍경과 사람들을 담았다. 또한 슬라브의 역사와 종교, 문화에 대해 누구보다 애정을 가지고 공부했다. 고령의 나이에도 불구하고 슬라브 서사시를 제작하는 20년 간 은둔하며 10시간 이상을 작업실에서 보냈다.',
      },
    },
  }),

  computed: {
    disabled() {
      return this.countDown > 0;
    },
    getSrc() {
      return this.artImgs[this.getKeyByValue(this.artImgs, this.selectedImg)] ? this.artImgs[this.getKeyByValue(this.artImgs, this.selectedImg)].src : '';
    },
  },

  mounted() {
    this.countUpTimer();
    this.countDownTimer();
    console.log(this.artInfo[this.selectedImg].title);
  },

  methods: {
    ...mapMutations([
      'updateFields',
    ]),

    submit() {
      this.updateFields({ counter: this.countUp });
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
    background: rgb(33, 75, 212);
}
.vue-select-image__item {
    margin: 3px 3px !important;
}
</style>

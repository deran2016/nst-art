<template>
  <v-card
    class="mx-auto"
    max-width="1024"
    width="1010"
    outlined
  >
    <v-dialog
      v-model="dialog"
      max-width="800"
    >
      <v-card>
        <v-card-text
          style="margin: 0 auto; width: 75%"
        >
          <div class="px-6 py-5 mb-5 title text-center">
            {{ artInfo[selectedImg].title }}
          </div>
          <div class="px-8 py-5 body-1">
            <div style="text-align: center;">
              <img
                :src="getSrc"
                height="450"
              />
            </div>
            <br />
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p v-html="artInfo[selectedImg].text"></p>
          </div>
        </v-card-text>

        <v-card-actions
          style="margin: 0 auto; width: 75%"
        >
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

    <v-card-actions
      style="flex-direction: row-reverse"
    >
      <v-btn
        style="width: 25%"
        color="primary"
        :disabled="watched < 2"
        @click="submit"
      >
        다음
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
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
    watched: 0,
    selectedImg: 'base',
    artImgs: [{
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
    artInfo: {
      base: {
        title: 'base',
        text: '',
      },
      img1: {
        title: '지스몽다(Gismonda), 1895',
        text: '이 작품은 당시 파리에서 가장 유명한 배우였던 사라 베르나르의 주연작인 연극 지스몽다의 포스터이다. 크리스마스 날 무하가 속했던 인쇄소에 긴급하게 들어왔던 지스몽다 포스터 의뢰는 우연한 기회로 무하가 맡아 진행하게 되었다. 무하는 사라 베르나르의 연극을 지켜보고 그녀를 스케치하며 포스터를 디자인했다. 그렇게 제작된 세로로 길게 그려진 포스터 속 베르나르의 의상은 연극의 클라이맥스에서 입었던 의상이다.<br/><br/>대공 부인 지스몽다를 연기하는 베르나르의 늘어진 의상과 화려한 화관, 손에 들고있는 종려나무 가지를 본 무하는 아치형 연단에 실물 크기의 배우를 올려 놓음으로써, 그녀의 실제 성격이나 스토리를 표현하기 보다는 무대위에서 베르나르가 보여주는 아름다움과 위엄을 표현했다. 이 포스터는 큰 호평을 받아 파리 시민들에게 무하의 이름을 알리는 계기가 되었고, 이를 기점으로 형성된 무하의 독특한 화풍은 아르누보 양식에 큰 영향을 주었다.<br/><br/>아르누보는 프랑스어로 “새로운 미술”을 뜻한다. 19세기 아카데미 예술의 반작용으로 아르누보는 자연물, 특히 꽃이나 식물 덩굴에서 따온 장식적인 곡선을 특징으로 삼고 있다. 아르누보는 예술가가 건축에서 가구까지 삶의 예술에 관한 모든 부분에 대해 작업해야 한다라고 접근한다.',
      },
      img2: {
        title: '카르티에 라탱 표지(Au Quartier Latin Cover), 1898',
        text: '이 작품은 파리의 라탱 지구에서 발행된 잡지, 카르티에 라탱의 표지를 위해 제작된 그림이다. 무하는 초기에 포스터를 디자인하며 자신의 스타일을 세상에 알리고 이후, 일러스트레이터로 활동했다. 이 잡지 커버 작품은 자연스럽고 실제적인 형태를 반영하고 있어 무하의 아르누보 스타일을 보여주는 훌륭한 예로 꼽힌다. 무하는 카르티에 라탱 잡지 커버를 여러 번 장식했는데, 표지를 위해 제작된 그림 모두 여성의 아름다움을 보여준다는 공통점이 있다. 다만, 이 표지의 경우 여성이 다소 경직되어 보이는 것은 잡지 내용과 조화를 이루기 위한 표현방식이라고 한다.<br/><br/>무하는 그리스 정교회, 즉 비잔틴의 전통이 남아있었던 체코 동부 모라비아 지방에서 자랐기 때문에 ‘스태인드 글라스’색상에서 영감을 많이 얻을 수 있었고, 이를 이용해 여성을 가장 아름답고 정교한 방법으로 묘사하는 방식을 자신만의 대표적인 스타일로 구축했다.',
      },
      img3: {
        title: '토스카(La Tosca), 1899',
        text: '이 작품은 당시 파리에서 가장 유명한 배우였던 사라 베르나르의 주연작인 연극 지스몽다의 포스터이다. 크리스마스 날 무하가 속했던 인쇄소에 긴급하게 들어왔던 지스몽다 포스터 의뢰는 우연한 기회로 무하가 맡아 진행하게 되었다. 무하는 사라 베르나르의 연극을 지켜보고 그녀를 스케치하며 포스터를 디자인했다. 그렇게 제작된 세로로 길게 그려진 포스터 속 베르나르의 의상은 연극의 클라이맥스에서 입었던 의상이다.<br/><br/>대공 부인 지스몽다를 연기하는 베르나르의 늘어진 의상과 화려한 화관, 손에 들고있는 종려나무 가지를 본 무하는 아치형 연단에 실물 크기의 배우를 올려 놓음으로써, 그녀의 실제 성격이나 스토리를 표현하기 보다는 무대위에서 베르나르가 보여주는 아름다움과 위엄을 표현했다. 이 포스터는 큰 호평을 받아 파리 시민들에게 무하의 이름을 알리는 계기가 되었고, 이를 기점으로 형성된 무하의 독특한 화풍은 아르누보 양식에 큰 영향을 주었다. 처음에는 무하 스타일이라 불렸는데 이는 곧 아르누보로 알려졌다.',
      },
      img4: {
        title: '제20회 살롱 데 상 전시회 포스터(Salon of the Hundred), 1896',
        text: '이 작품은 무하가 제작한 전시회 포스터로, 당시 무하가 속했던 잡지의 창간자였던 레옹 데 샹의 권유로 작업하게 되었다. 작품 속 여인의 하체는 거의 묘사되어 있지 않고 간단한 선으로만 표현되어 있는데, 이는 무하가 포스터를 제작하고 있을 당시 레옹 데 샹이 작업 중인 무하의 그림을 보고 한 눈에 반하여 미완성인 상태로 포스터를 만들 것을 제안하여 작업 도중에 완성한 결과이다. 따라서 이 작품은 무하의 기존 포스터에서 볼 수 있는 구체적이고 면밀한 묘사나 세밀한 장식성 보다는 간결하게 압축된 묘사와 절제된 장식성을 사용해 대담한 이미지로 완성된 것을 볼 수 있다. <br/><br/>무하의 포스터 작품에서는 배경과 인물, 포스터 정보 등이 층을 나누어 구성된 모습을 쉽게 찾아볼 수 있는데, 이 작품에도 여인과 전시회 정보가 맨 위에, 붉은 배경에 적힌 전시회 명이 맨 아래층에 배치되어 있다.',
      },
      img5: {
        title: '사계_가을(The Seasons series_Autumn), 1896',
        text: '이 작품은 사계절 중 가을을 모티프로 만들어진 장식용 패널이다. 사계 연작은 각 계절의 아름다운 풍경과 감정을 작가의 상상을 통해 유토피아로 표현한 작품이다. 각 계절을 표현한 작품 속에는 계절이라는 추상적인 형태를 여성으로 표현했는데, 이 작품에서 여성들은 몽환적인 분위기를 띄고 있어 요정이나 여신처럼 보이기도 한다. 사계_가을에서는 꽃과 식물들 사이에서 포도를 따고 있는 여성을 그려넣어 수확의 계절인 가을의 풍성함을 묘사했다. 색채 또한 가을을 잘 표현할 수 있도록 붉은 톤을 주로 사용한 것을 볼 수 있다.<br/><br/>무하는 작품을 통해 산업화 시대의 파리 시민들이 기계화와 대량 생산의 물결 속에서 느끼는 소외감과 공허함을 떠나 잠시나마 자연으로의 여행을 즐길 수 있기를 바랐다. 사계 연작은 큰 성공을 거두어 서민술집, 가정집, 고급 주택의 응접실에서도 볼 수 있었다. 이는 그의 작품이 아름다울 뿐 아니라 여러 장 복사 가능한 채색 석판화로 그려졌기 때문에 가능한 일이었다.',
      },
      img6: {
        title: '라 플륌을 위한 일러스트_황도 십이궁(La Plume_Zodiac), 1897',
        text: '이 작품은 실내용 달력 속 삽화를 위해 그려진 그림으로, 12개의 별자리를 상징하는 배경과 그 가운데 위치한 여인의 옆모습으로 구성되어 있다. 무하는 자신의 작품에서 기하학적인 무늬나 자연을 모티프로 한 패턴을 많이 사용했는데, 해당 작품에서도 그러한 무하의 스타일로 표현된 배경을 찾아볼 수 있다. 여인의 머리카락은 길게 풀어져 포도 덩굴처럼 둥글게 말려 있는데, 이 또한 자연에서 아름다움을 찾아 패턴화 하는 아르누보 양식의 대표적인 예로 볼 수 있다. <br/><br/>무하는 생활 속의 예술작품이 사람들의 의욕을 북돋아주고 삶의 질을 높여준다고 생각했기에, 자신의 예술이 단순히 차분한 감상에 그치지 않고 일상 속 자연처럼 사람들의 생활에서 찾아볼 수 있는 것이 되기를 원했다. 황도 12궁과 같은 삽화나 포스터 작품들은 그의 바람대로 사람들이 자주 접하고 일상에서 마주칠 수 있는 생활에 밀접한 작품이었다.',
      },
      img7: {
        title: '뫼즈강의 맥주(Bieres de La Meuse), 1897',
        text: '이 작품은 맥주를 광고하기 위한 상업용 삽화로 제작되었다. 해당 포스터는 맥주를 들고 밀과 홉, 그리고 양귀비로 만들어진 머리장식을 하고 있는 뫼즈강의 여신이 작품 가운에 위치하고 있고 하단에는 흑백으로 그려진 맥주 양조장의 모습이 배치되어 있다. 포스터 하단의 흑백 그림은 다른 작가의 작품인데, 무하는 다른 스타일로 그려진 그림과 자신의 그림을 한 작품 조화롭게 담기 위해 흑백 이미지에는 우아한 액자를 그려 넣어 포스터를 완성했다. 무하의 작품은 얼굴에만 명암이 조금 표현되어 있고, 주름이나 몸의 실루엣은 섬세한 선으로만 처리되어 있는 경우가 많은데 이런 무하의 스타일은 작품에서 평평한 느낌이 들게 한다. 이러한 특징들은 무하가 영감을 준 아르누보 양식에서도 나타난다. 무하는 예술이 일상 생활에서 접근 가능해야 한다는 이념가지고 있었는데, 많은 상업화를 남긴 것은 그의 이념이 반영된 것으로 볼 수 있다.',
      },
      img8: {
        title: '모나코 몬테 카를로(Monaco - Monte Carlo), 1897',
        text: '이 작품은 파리에서 몬테카를로까지 16시간만에 갈 수 있는 호화열차를 홍보하기 위한 포스터이다. 지중해에 위치한 몬테카를로를 향한 여행의 즐거움을 표현하기 위해, 하늘을 바라본 채 두 손을 얼굴앞에 꼭 잡고 있는 소녀의 꿈꾸는 듯한 모습이 그려져 있다. 원형의 화려한 화환은 기차 바퀴를, 휘어진 꽃 줄기는 선로를 연상하도록 표현되었다. 소녀의 뒤에 배치된 큰 원형 장식에 포함된 꽃과 새, 나뭇잎은 도착지인 몬테카를로가 자연을 품은 아름다운 장소임을 암시하고, 지중해 연안의 풍경을 배경으로 하여 지중해 지방을 여행하는 즐거움을 표현했다.<br/><br/>이 작품은 무하가 자주 사용했던 Q모양의 구도를 잘 보여주는 예시이다. 무하는 여인의 뒷배경에 원형 장식을 사용하는 것을 즐겨 했고, 원형 장식을 배경으로 한 여인의 긴 드레스나 실루엣 구조는 Q의 꼬리와 같다고 하여 무하의 그림에서는 종종 Q모양의 구도를 찾아볼 수 있다.',
      },
      img9: {
        title: '장식 패널 앵초와 깃털을 위한 디자인( The Primrose and the Quill), 1899',
        text: '이 작품은 실내 장식용 미술 작품으로 제작되어 왼쪽에는 앵초를 든 여인이, 오른쪽에는 깃털 장식을 들고 있는 여인이 각각 그려져 있다. 지금처럼 프린트기가 없었던 1800년대에 여러 장의 그림을 복사하기 위해서는 석판을 긁어 그림을 그린 후 그 위에 색을 입혀서 찍어내는 채색 석판화 방식으로 복사를 할 수 있었는데, 이 작품 또한 채색 석판화 기법으로 만들어졌다.<br/><br/>무하가 속한 인쇄소에서는 해당 작품을 포스터, 달력, 홍보물 등으로 인쇄하여 고객들에게 판매했다. 원판만 있다면 여러 장을 복사할 수 있기 때문에 무하의 그림은 저렴한 가격에 다수에게 팔릴 수 있었고, 이 덕분에 부유한 집안뿐만 아니라 가난한 가정에서도 찾아볼 수 있는 대중적인 작품이 되었다. 무하는 자신의 작품이 미술관이나 브루주아들의 사적인 응접실뿐만 아니라 모두를 위한 예술에 관련될 수 있는 것을 기뻐했다.',
      },
      img10: {
        title: '뿌리는 향수 로도 광고 포스터 (Lanca Perfume “Rodo”), 1896',
        text: '이 작품은 뿌려서 바르는 향수인 로도의 광고 포스터로 제작되었다. 무하가 남긴 작품 중 상당 수가 상업 포스터인데, 무하의 포스터 작품을 통해 파리의 초기 광고 시대의 일면을 엿볼 수 있다. 당시 유수의 기업들이 무하의 포스터를 원했고 무하는 광고주와 소비자가 무엇을 원하는지 잘 알고 있었다. <br/><br/>무하의 작품이 사람들에게 사랑받았던 것은 무엇보다 쉽고 아름다웠기 때문이다. 그의 작품에 등장하는 여인들은 고운 살결에 풍성한 머리카락, 몸체를 이루는 풍만한 곡선에 우아한 의상을 입고 있었다. 누구에게나 호감을 줄 것 같은 그림 속 여인들은 한창 소비가 급증하던 여성용 향수나 코르셋 같은 여성용 제품의 광고 모델로도 적격이었으며, 한편으로는 남성 소비자들을 유혹하는 무언가가 있었다. 이렇듯 무하의 광고 작품들은 그 시대의 광고가 성을 상품화하는 전략을 보여준다.',
      },
      img11: {
        title: '호르이체에서 열린 북동 보헤이마의 상공 예술 박람회를 위한 포스터(Hospodarska Prumyslova a umelecka Vystava Ceskeho Severovychodu v Horicich, 1903',
        text: '이 작품은 체코의 호르이체에서 열린 상공업 예술 박람회를 알리기 위한 포스터로 제작되었다. 그림 속에는 한 아름 들꽃을 두고 모라비아 민속 의상을 입은 시골 소녀가 등장한다. 이 작품뿐만 아니라, 무하는 1900년대 초반 즈음에 고향인 체코의 민족 의상을 입은 소녀를 여럿 그렸는데, 이것은 고향에 대한 그리움에서 비롯된 것이라고 본다. <br/><br/>해당 작품은 포스터로 제작되었기 때문에 상공업 예술 박람회에 대한 날짜, 장소 정보를 찾아볼 수 있다. 무하가 주로 사용했던 장식적인 배경 또한 찾아볼 수 있는데, 소녀 뒤에 장식된 원은 소녀의 앞에 놓인 들꽃을 패턴화 하여 꾸민 것이다. 해당 작품이 다른 무하의 작품과 다른 점은 무하가 파리에서 그렸던 작품들보다는 수수하고 단순하다는 점이다. 그러나 이것은 점차 상업적이고 화려한 것 보다 조국을 그리워하고 사랑하는 자신에게 솔직한 작업을 하고자 했던 무하의 마음이 담겨 있다고 볼 수 있다.',
      },
      img12: {
        title: '세인트루이스 만국 박람회를 위한 홍보 포스터(art nouveau color lithograph poster showing a seated woman clasping the hand of a Native american), 1903',
        text: '이 작품은 미국 세인트루이스에서 열린 만국박람회를 홍보하기 위해 제작되었다. 포스터 속에는 만국 박람회의 일정과 설명이 기재되어 있고, 무하의 그림에서 빠지지 않는 요소들도 발견할 수 있다. 이 작품에는 여인의 뒷배경이 되는 원 속에 미국 원주민이 배치되어 있고 여인과 원주민이 서로 손을 잡고 있는 모습을 그렸다. 배경의 기하학적 배치나 별 무늬는 무하의 그림에서 흔히 찾아볼 수 있으나, 박람회 제목을 배치한 포스터 윗면에는 원주민의 흉상을 딴 장식 그림을 볼 수 있다. <br/><br/>이 포스터를 작업했던 당시 무하는 상업 화가로서 엄청난 성공을 거두었음에도 수중에 남은 돈은 얼마 없었다. 이듬해인 1904년에 무하는 돈을 벌기 위해 미국 이주를 택한다. 무하의 이주에 대해서 미국 데일리 뉴스, 뉴욕 헤럴드에는 긍정적인 기사를 냈고, 무하는 세계에서 가장 위한 장식 화가로 미국에서 환영받는다.',
      },
      img13: {
        title: '잔다르크로 분한 모드 아담(Maude Adams as Joan of Arc), 1908',
        text: '이 작품은 무하가 미국으로 이주한 후에 그린 그림으로, 당시 뉴욕에 새로 생긴 극장에서 올리는 연극인 오를레앙의 소녀(잔다르크)에서 잔다르크 역할을 맡은 배우 모드 아담을 그린 작품이다. 잔다르크가 신의 계시를 행하기 위해 전쟁을 나서는 모습이 아닌 시골 소녀일 적의 모습을 그린 것으로, 잔다르크의 배경에는 잔다르크에게 말을 건네는 듯한 신의 모습이, 전면에는 신의 계시를 듣고 놀라움을 감추지 못하는 잔다르크가 그려져 있고 있다. 무하는 연극 오를레앙의 소녀의 장면 일부를 그렸을 뿐만 아니라 극 전반의 디자인을 맡아 호평을 받았다. <br/><br/>무하의 작품은 기존의 예술 아카데미에서 흔히 볼 수 있었던 작품과는 달리 인물 전체의 실루엣이 굵은 선으로 따 있거나 배경이 반복적인 무늬로 되어있는 등 인물과 배경 레이어가 나누어져 있다. 더불어 무하는 포스터나 상업 광고를 많이 남겼기 때문에 작품에서 제목 등을 적을 수 있도록 디자인된 글자띠를 쉽게 찾아볼 수 있다.',
      },
      img14: {
        title: '모리비아 교사 합창단을 위한 포스터(Moravian Teachers Choir), 1911',
        text: '이 그림은 무하의 조국인 체코 모라비아에서 근무하는 교사 합창단 홍보를 위한 포스터로, 채석 석판화 기법으로 제작되었다. 포스터에는 모라비아 전통 의상을 입은 소녀가 나무에 걸터앉아 가지 끝에서 지저귀는 작은 새의 노랫소리에 귀를 기울이는 모습이 그려져있다. <br/><br/>1910년대 무렵에 무하는 주로 생활했던 파리와 미국 생활을 정리하고 체코에 돌아와 체코 국민들을 위한 그림을 그렸다. 무하의 유명한 작업들은 주로 파리에서 활동할 때 그렸던 장식적인 포스터였으나 조국에 돌아온 이후의 작품에서는 파리의 화려함은 찾아보기 힘들다. 당시 체코는 전쟁 등으로 인해 정세가 불안했기 때문에 무하는 이 작품처럼 조국을 위해 단순하지만 민속적인 요소들을 작품에 넣고, 포스터, 우표, 공공 기관의 제복 등을 무상으로 제작해주며 조국에 봉사했다.',
      },
      img15: {
        title: '슬라브 서사시 연작 중 슬라브 민족의 역사 찬미(Epopeia Eslava - Ciclo XX), 1926',
        text: '이 작품은 무하가 체코의 역사를 서사시로 정리해 그린 20개의 슬라브 서사시 연작 중 마지막 20번째 작품이다. 무하는 채색 석판화로 잘 알려져 있지만 슬라브 서사시 연작은 템페라로 그려졌다. <br/><br/>이 작품에서 무하는 슬라브 민족의 역사를 총체적으로 요약해 4개의 색으로 구분하여 표현했다. 먼저 푸른색은 신비로운 고대를 표현하고 본향의 슬라브인들을 나타낸다. 검은색은 갖은 전쟁을 치른 암흑의 시대를, 붉은색은 오스트리아-헝가리로부터의 해방을 상징한다. 중앙의 황색은 제1차 세계대전 이후 여러 슬라브 민족이 자유를 얻었던 기쁨과 자유를 상징하고 제1차 세계대전 승전국을 환영하는 의미로 그들의 국기를 꽂아 환영하는 모습을 표현했다. <br/><br/>기존 작품에서는 대중성을 중요시 여겨, 상징이나 의미 보다는 장식성이 대두되었으나, 무하의 후기 그림에서는 여러 상징과 숨겨진 의미를 그림 속에 녹여낸 것을 볼 수 있다.',
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

  async mounted() {
    await this.preload();
    this.countUpTimer();
    this.countDownTimer();
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
          // this.countUp[this.selectedImg] = ((this.countUp[this.selectedImg] * 10) + 1) / 10;
          this.$set(this.countUp, this.selectedImg,
            ((this.countUp[this.selectedImg] * 10) + 1) / 10);
          this.watched = Object.keys(this.countUp).length;
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

    preload() {
      for (let i = 0; i < this.artImgs.length; i += 1) {
        const img = new Image();
        img.src = this.artImgs[i].src;
      }
      console.log('preloaded');
      return true;
    },

    newline(str) {
      return str.replace(/\n/g, '<br />');
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

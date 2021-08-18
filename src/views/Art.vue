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
      src: require('@/assets/img/1, 카르티에 라탱 표지(Au Quartier Latin Cover), 1898.jpg'),
      alt: 'img1',
    }, {
      id: 'img2',
      src: require('@/assets/img/2, 지스몽다(Gismonda), 1895.jpg'),
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
        title: '카르티에 라탱 표지(Au Quartier Latin Cover), 1898',
        text: '포스터의 성공 이후 무하는 다양한 잡지의 삽화를 그리는 일러스트레이터로 활동했다. 그러한 잡지들중 하나인 Au Quartier Latin는 아루느보 시대 초기에 폴 뒤퐁에 의해 파리의 라탱 지구에서 발행된 잡지이다. 이 잡지의 커버는 자연스럽고 실제적인 형태를 반영하고있어 무하의 아르누보 스타일을 보여주는 훌륭한 예로 꼽힌다.<br/><br/>그리스 정교회, 즉 비잔틴의 전통이 남아있었던 체코 동부 모라비아 지방에서 자란 무하는 ‘스태인드 글라스’색상에서 영감을 많이 얻었었고 이를 이용해 여성을 가장 아름답고 정교한 방법으로 묘사하는 방식이 무하의 대표적인 스타일이다. 다만, 다른 표지들과 달리 이 표지의 경우 다소 경직된 자세처럼 보이는것은 잡지의 내용과 조화를 위해 이렇게 표현했다고 한다. 이 표지 외에도 여러 표지들은 유사하게 여성의 아름다움을 보여준다고 한다.',
      },
      img2: {
        title: '지스몽다(Gismonda), 1895',
        text: '크리스마스 날 무하가 일하던 인쇄소에 긴급한 의뢰가 들어왔다. 당시 가장 유명한 여배우인 사라 베르나르의 주연작인 연극 지스몽다의 포스터를 새해 첫 날까지 완성해야 하는 의뢰였다. 그 외에는 의뢰를 수락 할 수 있는 사람이 없었기에 무하는 한번도 해본적이 없던 석판화 작업을 수락하고, 그녀를 스케치 하기위해 극장으로 가서 사라 베르나르의 연극을 지켜보았다.<br/><br/>그렇게 제작한 세로로 어마어마하게 긴 포스터에 그려진 베르나르의 의상은 연극의 클라이맥스인 마지막장에서 입은 의상이다. 대공 부인 지스몽다를 연기하는 베르나르의 늘어진 의상과 화려한 화관, 손에 들고있는 종려나무 가지를 본 무하는 아치형 연단에 실물 크기의 몸매를 올려 놓음으로써, 그녀의 실제 성격이나 스토리를 표현하기 보다는 무대위에서 베르나르가 보여주는 아름다움과 위엄을 표현했다.<br/><br/>원색 대신 파스텔 톤의 투명한 색채와 명암으로 포스터를 채웠는데, 이는 무하가 어린시절부터 교회에서 익히 봤던 ‘스테인드글라스’의 파스텔 톤의 빛이 ‘신비감’을 더해준다는 사실을 알고 있었기 때문이라고 한다. 이 때 제작한 포스터는 큰 호평을 받아 파리 시민들에게 무하의 이름을 알렸고, 이 작품을 기점으로 형성된 무하의 특이한 화풍은 아르누보 양식에 큰 영향을 주었다.',
      },
      img3: {
        title: '토스카(La Tosca), 1899',
        text: '무하는 지스몽다의 성공을 계기로 사라 베르나르와 계약을 채결했고 이후 6년간 사라 베르나르를 위한 포스터를 제작했을 뿐만 아니라 연극의 콘셉트를 의논하고 의상부터 소품까지 맡아 제작하는 동업자가 되었다. 무하가 제작한 포스터를 통해 사라 베르나르의 인기는 프랑스 전역을 거쳐 미국에까지 이어졌다.<br/><br/>토스카라는 연극은 나폴레옹의 이탈리아 침공으로 나폴리 왕국의 로마 지배가 위협받는 상황의 로마를 배경으로한 멜로 작품으로 베르나르는 플로리아 토스카를 맡았다. 이 연극은 토스카의 연인인 마리오 카바라도시, 로마의 무자비한 경찰 섭장인 남작 스카르피아에 초점을 맞춰 고문, 살인, 자살에 대한 묘사들이 들어가있고, 연극이 끝날 무렵에는 세사람 모두 죽는다.',
      },
      img4: {
        title: '제20회 살롱 데 상 전시회 포스터(Salon of the Hundred), 1896',
        text: '무하가 속한 잡지 창간자인 레옹 데 샹의 권유로 무하는 <20회 살롱 데 상 전시회 포스터>를 작업하게 된다. 무하가 이 포스터를 제작하고 있을 때, 레옹 데샹은 작업 중인 무하의 그림을 보고 한 눈에 반하게 된다. 데샹을 무하에게 그림을 완성하지 말고 미완성인 현재 상태로 포스터를 만들자고 제안한다.<br/><br/>이 작품은 무하의 기존 포스터들에서의 구체적이고도 면밀한 설명적 묘사와 세밀한 장식성을 추구했던 것과는 다르게 보다 단순간결하게 압축된 묘사와 절제된 장식성을 사용해 대담한 이미지를 추구하는 스타일의 포스터이다.<br/><br/>단순하게 왜곡시킨 평면적 형태와 화면 구성을 통해 매우 인상적인 시각적 임팩트를 발휘하고있다. 이러한 무하의 양식은 이 살롱 데 상 전시회 포스터에서부터 시작되었다.',
      },
      img5: {
        title: '사계_가을(The Seasons series_Autumn), 1896',
        text: '그의 작품속에 등장하는 아름다운 자연의 모습은 예술가가 있는 그대로 묘사한 것이 아닌, 상상력을 발휘해 만들어낸 ‘유토피아’이다. 산업화 시대의 파리 시민들이 기계화와 대량생산의 물결 속에서 느끼는 소외감과 공허함을 무하는 자신의 작품을 통해 잠시나마 자연으로의 여행을 떠날 수 있길 원했다.<br/><br/>계절이라는 추상적인 존재를 인물로 표현한 새로운 시도로, 몽환적인 분위기와 요정과 여신처럼 보이는 인물들로 사계절을 표현했다. 그중 하나인 가을의 경우 풍부한 과일과, 꽃, 식물들 사이에 포도를 따고 있는 여성의 모습으로 수확의 계절인 가을의 풍성함을 묘사했으며, 그녀의 긴 적갈색 머리에는 국화꽃이 위치해있다. 원색의 강한 색채를 사용하지 않고 파스텔톤의 색체를 주로 이용했고, 그 속에서도 색의 대비와 조화를 섬세하게 표현했다.',
      },
      img6: {
        title: '라 플륌을 위한 일러스트_황도 십이궁(La Plume_Zodiac), 1897',
        text: '무하는 생활속의 예술작품이 사람들의 의욕을 북돋아주고 삶의 질을 높여준다고 생각했기에,<br/><br/>“나는 사적인 응접실을 위해서가 아니라 모두를 위한 예술에 관련되어 기쁘다. 이것은 저렴하고, 일반 대중들도 쉽게 접근할 수 있으며 부유한 집안들뿐만 아니라 가난한 가정들에서도 자리를 차지할 수 있다.” 라고 하며 자신의 예술이 단순히 차분한 감상에만 그치는 것이 아니라 자연처럼 생활속에 들어오기를 원했다.<br/><br/>그 대표적인 형태가 황도12궁과 같은 장식 패널화이다.',
      },
      img7: {
        title: '뫼즈강의 맥주(Bieres de La Meuse), 1897',
        text: '작품의 이름은 프랑스어에서 Beer of the Meuse로 번역된다. 프랑스 동북부의 뫼즈강에 위치한 회사에서 차용한것으로 이 작품은 맥주를 광고하는 상업용 삽화이다.<br/><br/>머리에 있는 밀과 홉, 그리고 손에 맥주를 들고있는 뫼즈강의 여신이 작품에 가운데 위치하고 있고 포스터 하단에는 흑백으로 맥주가 만들어진 양조장의 오버헤드샷이 보인다. 포스터 하단의 그림은 다른 작가의 작품인데 무하는 두개의 다른 이미지를 담기 위해 우아한 액자를 그려 포스터를 완성했다.<br/><br/>여성의 머리에는 양귀비도 같이 그려져있는데 이는 무하가 1년전에 그린 사계의 여름을 연상시킨다. 자연을 여성으로 표현했으며, 밝은 색상과 평평한 원근감 역시 무하의 스타일을 보여주고 있다. 이러한 특징들은 무하가 영감을 준 아르누보 양식에도 크게 나타나있으며, 예술이 일상 생활에서 접근 가능해야하고 풍부해야 한다는 무하의 이념을 공유하고 있다. 이러한 무하의 스타일이 그의 작품을 광고에 안성맞춤으로 만들었다.',
      },
      img8: {
        title: '모나코 몬테 카를로(Monaco - Monte Carlo), 1897',
        text: '상업적인 성공을 거둔 무하는 그의 고향과, 모나코-몬테카를로등으로 여행을 다닐 수 있게 되었고 그 경험과 관련된 작품들을 만들었다.<br/><br/>이 작품은 파리에서 몬테카를로까지 16시간만에 갈 수 있는 호화열차를 제공하는 P.L.M. 철도회사의 포스터이다. 지중해에 위치한 몬테카를로를 향한 여행의 즐거움을 하늘을 바라본 채 두손을 얼굴앞에 꼭 잡고 있는 소녀의 꿈꾸는 듯한 모습으로 표현했으며, 기차 바퀴와 선로를 연상하게 하는 화려한 화환과 휘어진 꽃줄기를 부들레아(자주색이나 흰색 꽃이피는 관목)로 표현했다.<br/><br/>원형에 포함된 꽃과 새, 나뭇잎이 이곳이 천국 같은 장소임을 암시하고, 지중해 연안의 풍경을 배경으로 해 관광의 즐거움을 강조했으며, 소녀의 머리에 묶인 붉은 꽃과 두드러지는 검은 머리와 눈동자, 끈이 없는 드레스는 브랜드를 홍보하기 위한 매력적인 모델의 모습을 보여준다.',
      },
      img9: {
        title: '장식 패널 앵초와 깃털을 위한 디자인( The Primrose and the Quill), 1899',
        text: '왼쪽은 앵초 장식을 한 여인, 오른쪽은 깃털 장식을 들고 있는 여인이 각각 그려진 "장식 패널 앵초와 깃털을 위한 디자인"은 실내 장식용 미술작품으로 제작되었다. 무하가 속한 인쇄소에서는 해당 작품을 포스터, 달력, 홍보물 등으로 인쇄하여 고객들에게 판매했다. 이처럼 무하의 작품은 엽서, 삽화, 광고, 포스터 등 거리의 일상에서 볼 수 있어 대중에게 친근했다. 무하의 작품은 대부분 석판 인쇄 기법을 사용했기 때문에 여러장 인쇄할 수 있어 저렴하면서 일반 대중들도 쉽게 접근할 수 있는 데다, 부유한 집안뿐만 아니라 가난한 가정에서도 자리를 차지할 수 있기 때문이다. 무하는 이처럼 사적인 응접실을 위해서가 아니라 모두를 위한 예술에 관련되어 기뻐했다.',
      },
      img10: {
        title: '뿌리는 향수 로도 광고 포스터 (Lanca Perfume “Rodo”), 1896',
        text: '무하가 남긴 작품 중 상당량은 상업 포스터인데, 이 포스터를 작품을 통해 파리의 초기 광고 시대의 일면을 엿볼 수 있다. 유수의 기업들이 무하의 포스터를 원했고 무하는 무하는 광고주와 소비자가 무엇을 원하는지 잘 알고 있었다. 무하의 작품이 사람들에게 사랑받은 것은 무엇보다 쉽고 아름다웠기 때문이다. 그의 작품에 등장하는 여인들은 고운 살결에 풍성한 머리카락, 몸체를 이루는 풍만한 곡선에 우아한 의상을 입고 있었다. 누구에게나 호감을 줄 것 같은 그림 속 여인들은 한창 소비가 급증하던 여성용 향수나 코르셋 같은 여성용 제품의 광고 모델로도 적격이었으며, 남성 소비자들을 유혹하는 무언가가 있었다. 무하의 광고 작품들은 그 시대의 광고가 성을 상품화하는 전략을 보여준다. "뿌리는 향수 로도 광고 포스터"도 당시 무하 스타일 광고의 특징을 잘 보여주는 작품이다.<br/><br/>1800년대 말 파리의 풍요로운 근대 문화를 대변하는 무하의 스타일은 이후 유럽 전역에 유통되었다. 기하학적인 무늬, 여성의 흐르는 듯한 머리카락과 인물을 배경과 떨어뜨리는 윤곽선, 인물 뒤의 동그란 장식 배경 등의 특유의 스타일은 곧 무하를 가르키면서도 유럽 전역에 퍼져 아르누보 양식으로 불리게 되었다.',
      },
      img11: {
        title: '호르이체에서 열린 북동 보헤이마의 상공 예술 박람회를 위한 포스터(Hospodarska Prumyslova a umelecka Vystava Ceskeho Severovychodu v Horicich, 1903',
        text: '마흔의 나이를 넘긴 무하는 쳇바퀴 도는 디자인 작업 보다는 더욱 성숙하고 진지한, 자신에게 솔직한 작업을 원하게 되었다. 무하는 프라하 여행에서 고향의 자연을 느꼈으나 고향에서 무하는 이방인이었다. 고향은 그를 프랑스에서 온 유명한 장식 화가로 여겼다. 무하는 체코 특유의 현대미술이 없는 것에 가슴 아파하며 지역화가들에게 타 유럽의 유행보다는 체코 전통에 관심을 기울이라 충고했지만 무하에 대한 그들의 태도는 냉담했다. "호르이체에서 열린 북동 보헤이마의 상공 예술 박람회를 위한 포스터"는 한 아름 들꽃을 두고 모라비아 민속 의상을 입은 시골 소녀가 등장한다. 이 무렵 무하는 고향의 민족 의상을 입은 소녀를 여럿 그렸는데, 이를 통해 무하의 고향에 대한 그리움을 짐작할 수 있다.',
      },
      img12: {
        title: '세인트루이스 만국 박람회를 위한 홍보 포스터(art nouveau color lithograph poster showing a seated woman clasping the hand of a Native american), 1903',
        text: '1900년 초에 아르누보는 점점 퇴조했다. 무하는 조국과 슬라브인들에 대한 봉사를 위해 남은 생을 바치고자 했으나 계획적인 경제생활을 하지 않았기 때문에 엄청난 성공에도 불구하고 수중에 남은 돈은 적었다. 그는 자신이 포스터를 그려주었던 여배우가 재정적 위기에 부딪혔을 때마다 미국 순회 공연나 나서, 부유한 미국의 지지자들을 통해 부활했던 것을 기억했다. 무하는 돈을 벌기 위해 미국으로 이주를 택한다. 파리에서 절정을 구가하던 그가 터전을 미국으로 옮기는 것은 큰 모험이었으나, 무하는 미국에서의 활동이 \'장식 미술가\'라는 꼬리표를 떼고 진지한 화가로 거듭날 수 있는 계기를 만들어줄 것이라 확인했다. 미국의 뉴욕 데일리 뉴스, 뉴욕 헤럴드에는 무하의 방문에 대한 긍정적인 기사가 낫고, 무하는 세계에서 가장 위대한 장식화가로 환영 받는다. "세인트루이스 만국 박람회를 위한 홍보 포스터"를 통해 무하는 새로운 대륙인 미국에 대한 관심을 보여준다.',
      },
      img13: {
        title: '잔다르크로 분한 모드 아담(Maude Adams as Joan of Arc), 1908',
        text: '1904년, 진지한 화가로 거듭나기 위해서, 조국에 봉사하기 위한 자금을 모으기 위해서 무하는 파리에서 미국으로 이주한다. 무하는 미국의 상류 사회 인사들의 초상화를 그리기 위해 유화 작업을 시작했으나 주로 파스텔로 작업하던 그는 유화에 익숙하지 않았다. 그러나 점차 유화로도 자신만의 스타일을 찾기 시작했다. 미국 생활에 점자 안정성을 찾은 무하는 이후 뉴욕에 새로 생긴 극장의 연극인 오를레앙의 소녀(잔다르크) 등의 디자인을 맡아 호평을 받았다. 그러나 아직도 그의 꿈을 실현할 기회는 보이지 않았다. 무하가 최초로 조국을 위한 꿈을 계획한 때로부터 이미 10년이라는 세월이 흘렀지만 무하는 꿈을 포기하지 않고 꾸준히 그림을 그렸다. "잔다르크로 분한 모드 아담"은 무하가 디자인을 맡은 연극 오를레앙의 소녀(잔다르크)에서 주인공인 잔다르크 역을 맡은 배우 모드 아담을 그린 작품이다.',
      },
      img14: {
        title: '모리비아 교사 합창단을 위한 포스터(Moravian Teachers Choir), 1911',
        text: '50대에 접어든 무하는 연어가 강을 거슬러 태어난 곳으로 향하듯이 조국을 다시 찾았다. 그는 조국인 체코에 봉사하기 위해 조국을 위한 그림을 그리고자 했다. 무하에 대해 알려진 것은 대부분 파리 시대의 장식적인 포스터였으나 조국에 돌아온 그의 작품에 파리의 화려함은 사라지고 단순하고 민속적인 요소들이 자리잡았다. "모라비아 교사 합창단을 위한 포스터"에는 모라비아 전통 의상을 입은소녀가 나무에 걸터앉아 가지 끝에서 지저귀는 작은 새의 노랫소리에 귀를 기울이고 있다. 이 외에도 무하는 조국에 대한 애정을 그림을 통해 드러내었다. 당시 오스트리아-헝가리 제국 내 게르만화 정책으로 인해 체코 땅에서 체코 말을 가르칠 수 있는 학교가 없었다. 무하는 체코 언어와 문화를 가르칠 수 있는 민간 학교를 건립하기 위해 발행하는 복권의 포스터와 제1차 세계대전 종전 후 체코슬라비아가 독립 했을 때 국가의 국장, 우표, 지폐, 공공 기관의 제복 등을 무상으로 제작해주었다.',
      },
      img15: {
        title: '슬라브 서사시 연작 중 슬라브 민족의 역사 찬미(Epopeia Eslava - Ciclo XX), 1926',
        text: '슬라브 서사시 연작은 20개의 에피소드에 슬라브의 역사를 그린 작품이다. 무하는 시간이 나는데로 슬라브 역사가 담긴 곳을 여행하며 그곳의 풍경과 사람들을 담았다. 또한 슬라브의 역사, 종교, 문화에 대해 누구보다 애정을 가지고 공부했다. 6x8미터의 거대한 캔버스에 슬라브 역사를 표현하고자 했던 무하는 성을 빌려 작업실로 사용하고, 사다리가 달릴 발판을 딛고 온종일 캔버스를 오르내려야만 했다. 이미 고령의 나이에도 불구하고 무하는 슬라브 서사시를 제작하는 20년 간 은둔하며 10시간 이상을 작업실에서 보냈다. 그슬러브 민족의 역사를 그려내면서 무하가 꿈구었던 일은 모든 슬라브 민족이 겪고 있는 고통인 범게르만주의와 유럽전역에 팽배한 제1차세계대전의 기운, 그리고 억압에서 벗어나 이상적인 화합을 이루는 것이었다. 종전 후 슬라브 서사시 전 작품 20점은 조국에 기증된다.',
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

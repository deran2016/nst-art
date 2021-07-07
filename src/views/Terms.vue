<template>
  <v-card
    class="mx-auto"
    max-width="1024"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          1.1 실험 참여 동의
        </div>
        <v-list-item-title class="text-h5 mb-1 text-center">
          실험 참여 동의
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <div class="body-1">
        연구 배경 및 방법
      </div>
      <div class="terms pa-2">
        연구 배경 및 방법 내용
      </div>
      <div class="body-1 d-flex justify-end mb-5">
        <v-checkbox
          v-model="agreedTerm1"
          label="동의합니다"
        />
      </div>

      <div class="body-1">
        개인정보에 대한 비밀보장
      </div>
      <div class="terms pa-2">
        개인정보에 대한 비밀보장 내용
      </div>
      <div class="body-1 d-flex justify-end mb-5">
        <v-checkbox
          v-model="agreedTerm2"
          label="동의합니다"
        />
      </div>

      <div>
        본 실험을 통해 얻어진 귀하의 자료는 향후의 다른 연구에서도 사용되어 더 가치 있는 연구의 결과로 사용 될 수
        있습니다. 귀하의 자료를 미래의 다른 연구에 사용하는 것에 대해 다음 중 하나에 선택해 주시기 바랍니다.
      </div>

      <v-radio-group v-model="selectedOption">
        <v-radio
          label="향후의 모든 다른 연구에 제 자료를 제공하여 연구하는 것에 동의합니다."
          value="향후의 모든 다른 연구에 제 자료를 제공하여 연구하는 것에 동의합니다."
        />
        <v-radio
          label="성균관대학교의 연구자에게만 동의합니다."
          value="성균관대학교의 연구자에게만 동의합니다."
        />
        <v-radio
          label="본 연구의 연구자에게만 동의합니다."
          value="본 연구의 연구자에게만 동의합니다."
        />
        <v-radio
          label="동의하지 않습니다."
          value="동의하지 않습니다."
        />
      </v-radio-group>

      <v-text-field
        v-model="participantID"
        label="참여자 성명/휴대전화 번호 마지막 4자리 (ex: 홍길동/1234)"
      />
    </v-card-text>

    <v-card-actions>
      <v-btn
        block
        color="primary"
        :disabled="!agreedAll"
        @click="submit"
      >
        다음
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
/* eslint-disable import/no-unresolved */
import { mapMutations } from 'vuex';

export default {
  data: () => ({
    agreedTerm1: false,
    agreedTerm2: false,
    selectedOption: null,
    participantID: '',
  }),

  computed: {
    agreedAll() {
      return this.agreedTerm1
        && this.agreedTerm2
        && (this.selectedOption && this.selectedOption !== '동의하지 않습니다.')
        && (this.participantID && this.participantID.length >= 6);
    },
  },

  methods: {
    ...mapMutations([
      'updateFields',
    ]),

    submit() {
      this.updateFields(this.$data);
      this.$router.push({ name: 'Explanation' });
    },
  },
};
</script>

<style lang="scss">
.terms {
  height: 150px;
  overflow-y: auto;
  border: 1px solid grey;
}
</style>

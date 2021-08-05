<template>
  <v-card
    class="mx-auto"
    max-width="1024"
    outlined
  >
    <v-card-text>
      <div class="body-1">
        동일한 과정으로 진행을 한다면 다음에 배우고 싶은 미술 작가가 있나요?
      </div>
      <v-radio-group
        v-model="existArtist"
        column
      >
        <v-radio
          label="예"
          value="yes"
        />
        <v-radio
          label="아니요"
          value="no"
        />
      </v-radio-group>
      <div class="body-1">
        있다면 누구인가요?
      </div>
      <v-text-field
        v-model="artistName"
        label="이름을 입력하세요"
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
    existArtist: null,
    artistName: '',
  }),

  computed: {
    agreedAll() {
      return (this.existArtist && this.existArtist === 'yes' && this.artistName && this.artistName.length >= 1)
        || (this.existArtist && this.existArtist === 'no');
    },
  },

  methods: {
    ...mapMutations([
      'updateFields',
    ]),

    submit() {
      if (this.existArtist && this.existArtist === 'yes') {
        this.updateFields({ wantArtist: { exist: this.existArtist, who: this.artistName } });
      } else {
        this.updateFields({ wantArtist: { exist: this.existArtist, who: 'none' } });
      }
      this.$router.push({ name: 'Submit' });
    },
  },
};
</script>

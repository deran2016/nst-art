<template>
  <v-app>
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="10"
            md="8"
            lg="6"
            style="max-width: 1024px;"
          >
            <v-fade-transition mode="out-in">
              <router-view />
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  computed: {
  },
};
</script>

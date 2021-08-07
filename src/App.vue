<template>
  <v-app>
    <v-main>
      <v-container
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="12"
            style="width: 100%;"
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

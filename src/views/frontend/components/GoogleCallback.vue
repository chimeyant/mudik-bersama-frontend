<template>
  <v-container>
    <v-row class="mt-16">
      <v-col cols="12">
        <v-row class="flex justify-center align-center mt-16">
          <v-card
            width="450"
            flat
            outlined
          >
            <v-card-title class="blue white--text font-weight-thin">Konfirmasi</v-card-title>
            <v-card-text class="mt-5">
              <div class="text-center">
                {{ registerResult.message }}
              </div>
            </v-card-text>
            <!-- <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                outlined
                dense
                :color="theme.color"
                @click="$router.push({name:'login'})"
              >Halaman Login</v-btn>
            </v-card-actions> -->
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
      
  <script>
import { domainURL } from "../../../.env";
import { mapState, mapActions } from "vuex";

export default {
  name: "google-callback",
  components: {},
  data: () => ({
    registerResult: {
      color: "green",
      message: "Mohon Menunggu Sedang Melakukan Singkronisasi Akun",
    },
  }),
  mounted() {
    this.postGoogleCallback();
  },
  computed: {
    ...mapState([
      "device",
      "theme",
      "info",
      "snackbar",
      "loading",
      "page",
      "http",
      "auth",
    ]),
  },
  methods: {
    ...mapActions([
      "setPage",
      "getAppInfo",
      "signInByGoogle",
      "snackbarClose",
      "catchError",
    ]),

    postGoogleCallback: async function () {
      try {
        const url = new URL(domainURL.BASE + "api/auth/login-callback");

        url.search = await window.location.search;

        await this.signInByGoogle(url.toString()).then((res) => {
          setTimeout(() => {
            if (this.auth.user.user.authent == "superadmin") {
              this.$router.push({ name: "dashboard" });
            }
            if (this.auth.user.user.authent == "user") {
              this.$router.push({ name: "dashboard" });
            }
          }, 1000);
        });
      } catch (error) {
        this.catchError(error);
      }
    },
  },
};
</script>
      
  <style>
</style>
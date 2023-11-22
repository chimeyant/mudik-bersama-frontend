<template>
  <v-container>
    <v-row>
      <v-col
        cols="6"
        v-show="device.desktop"
      >
        <v-row class="justify-content-center animated animate__fadeInLeft">
          <v-img src="/images/login.jpg">
          </v-img>
        </v-row>
      </v-col>
      <v-col
        :cols="device.desktop ?`6`:`12`"
        class="animated animate__fadeInRight"
      >

        <div class="login-title">
          Login SI NIKMAT LANTAS <span class="red--text">Plus</span>
        </div>
        <div class="login-subtitle">
          Silahkan masukan pengguna dan kata sandi anda...!
        </div>
        <div :class="device.desktop ? `mt-10 pl-15 pr-15`: `mt-5`">
          <v-col cols="12">
            <v-text-field
              lable="Pengguna"
              outlined
              placeholder="Masukan Pengguna"
              dense
              hide-details
              v-model="uname"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              lable="Kata Sandi"
              outlined
              placeholder="Kata Sandi"
              dense
              hide-details
              v-model="upass"
              type="password"
              v-on:keyup.enter="postAuthent"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-row class="pr-4 pt-5">
              <v-spacer></v-spacer>
              <v-btn
                outlined
                dense
                :color="theme.color"
                @click="postAuthent"
              >Masuk</v-btn>
            </v-row>
            <v-row class="forget-password">
              Lupa Kata sandi..?
            </v-row>
          </v-col>
          <v-col
            cols="12"
            v-if="false"
          >
            <v-row class="mt-5 mb-2">
              <v-divider></v-divider>
              <div style="margin-top:-12px ;margin-left:5px;margin-right: 5px ; font-size:12pt ; color:grey ; border-color: grey solid; border-width: 2px; ">Atau</div>
              <v-divider></v-divider>
            </v-row>
          </v-col>
          <v-col
            cols="12"
            v-if="false"
          >
            <v-row class="justify-center">
              <div class="other-sign-in-red">
                <v-icon color="red">mdi-google</v-icon>
              </div>
              <div class="other-sign-in-blue">
                <v-icon color="blue">mdi-facebook</v-icon>
              </div>
            </v-row>
          </v-col>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import "animate.css";
export default {
  name: "LoginComponent",
  data: () => ({
    uname: "",
    upass: "",
  }),
  mounted() {
    this.setPage({
      crud: false,
    });
  },
  computed: {
    ...mapState(["device", "theme", "info", "http", "snackbar", "auth"]),
  },
  methods: {
    ...mapActions(["setPage", "signIn"]),
    postAuthent: function () {
      this.signIn({
        username: this.uname.replace(/ /g, ""),
        userpass: this.upass,
      }).then((pass) => {
        if (!pass) {
          console.clear();
          return;
        }
        try {
          if (this.auth.user.user.authent == "superadmin") {
            this.$router.push({ name: "dashboard" });
          }
          if (this.auth.user.user.authent == "administrator") {
            this.$router.push({ name: "dashboard" });
          }
          if (this.auth.user.user.authent == "opd") {
            this.$router.push({ name: "dashboard" });
          }
          if (this.auth.user.user.authent == "user") {
            this.$router.push({ name: "dashboard" });
          }
          if (this.auth.user.user.authent == "perusahaan") {
            this.$router.push({ name: "perusahaan-dashboard" });
          }
        } catch (error) {
          this.snackbar.color = "red";
          this.snackbar.text = error;
          this.snackbar.state = true;
        }
      });
    },
  },
};
</script>

<style>
.login-title {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  padding-top: 25px;
  padding-bottom: 10px;
  color: grey;
}
.login-subtitle {
  text-align: center;
  font-size: 15px;
  font-weight: 400;
  color: gray;
}
.other-sign-in-red {
  border: red solid;
  border-radius: 5px;
  margin: 5px;
}
.other-sign-in-blue {
  border: blue solid;
  border-radius: 5px;
  margin: 5px;
}

.row.forget-password {
  font-size: 12px;
  font-weight: 400;
  justify-content: end;
  margin-top: 30px;
  margin-right: 2px;
  color: grey;
}
</style>
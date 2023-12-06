<template>
  <v-container>
    <v-row class="">
      <v-col
        cols="6"
        v-show="device.desktop"
      >
        <v-row class="justify-content-center animated animate__fadeInLeft mt-16">
          <v-img src="/images/signup-min.png">
          </v-img>
        </v-row>
      </v-col>
      <v-col
        :cols="device.desktop ?`6`:`12`"
        class="animated animate__fadeInRight"
      >
        <div class="login-title mt-16">
          LOGIN MUDIK BARENG <span class="red--text">2024</span>
        </div>
        <div class="login-subtitle">
          Pastikan anda memiliki akun
        </div>
        <div>
          <v-col cols="12">
            <v-row class="mt-5 justify-center">
              <v-col :cols="device.desktop ? 6:12">
                <v-btn
                  block
                  outlined
                  color="white"
                  class="text-transform-none elevation-1 shadow-1 ant-font-viga purple--text"
                  @click="postLogin"
                >
                  Masuk Dengan Akun <span class="blue--text ml-1">G</span><span class="red--text">o</span><span class="yellow--text">o</span><span class="blue--text">g</span><span class="green--text">l</span><span class="red--text">e</span></v-btn>
              </v-col>
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
    postLogin: async function () {
      try {
        await this.http.get("api/auth/login").then((res) => {
          window.open(res.data, "_SELF");
        });
      } catch (error) {}
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
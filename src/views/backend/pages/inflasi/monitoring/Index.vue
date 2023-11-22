<template>
  <v-container
    fluid
    class="pt-10 grid-list-xl"
  >

    <v-row class="justify-center mb-10 pl-5 pr-5">
      <div class="title-geoinfo">PETA MONITORING DISTRIBUSI</div>
      <v-col cols="12">
        <l-map
          style="height: 500px ; z-index:0 ;"
          :zoom="zoom"
          :center="center"
        >
          <v-geosearch
            :options="geosearchOptions"
            style="width:100px; border: 1px;"
          ></v-geosearch>
          <l-tile-layer
            :url="url"
            :attribution="attribution"
          ></l-tile-layer>
          <l-marker
            v-for="(item,index) in markers"
            :key="index"
            :visible="item.visible"
            :draggable="item.draggable"
            :lat-lng.sync="item.position"
          >

            <l-icon
              :iconSize="item.size"
              :icon-url="item.icon"
              className=""
            />
            <l-popup :content="item.tooltip" />
            <l-tooltip :content="item.tooltip" />

          </l-marker>

        </l-map>

      </v-col>
    </v-row>
    <v-row class="pa-2">
      <v-col :cols="device.mobile ? `12` : `4`">
        <v-card
          class="dashboard-statistik"
          dark
          height="150"
        >
          <div class="d-flex flex-no-wrap justify-space-between mb-3">
            <div>
              <v-card-title class="text-h5">Jumlah Pasar</v-card-title>

              <v-card-subtitle>{{ data.jmlpasar }} Pasar</v-card-subtitle>

              <v-card-actions>

              </v-card-actions>
            </div>

          </div>
          <v-divider></v-divider>

          <span class="dashboard-statistik-footer-text ml-3 mt-4">Data Tahun {{ 2023 }}</span>
        </v-card>
      </v-col>
      <v-col :cols="device.mobile ? `12` : `4`">
        <v-card
          class="dashboard-statistik"
          dark
          height="150"
        >
          <div class="d-flex flex-no-wrap justify-space-between mb-3">
            <div>
              <v-card-title class="text-h5">Jumlah Distributor</v-card-title>

              <v-card-subtitle>{{ data.jmldistributor }} Distributor</v-card-subtitle>

              <v-card-actions>

              </v-card-actions>
            </div>

          </div>
          <v-divider></v-divider>

          <span class="dashboard-statistik-footer-text ml-3 mt-4">Data Tahun {{ 2023 }}</span>
        </v-card>
      </v-col>
      <v-col :cols="device.mobile ? `12` : `4`">
        <v-card
          class="dashboard-statistik"
          dark
          height="150"
        >
          <div class="d-flex flex-no-wrap justify-space-between mb-3">
            <div>
              <v-card-title class="text-h5">Jumlah Kendaraan</v-card-title>

              <v-card-subtitle>{{ data.jmlkendaraan }} Unit</v-card-subtitle>

              <v-card-actions>

              </v-card-actions>
            </div>

          </div>
          <v-divider></v-divider>

          <span class="dashboard-statistik-footer-text ml-3 mt-4">Data Tahun {{ 2023 }}</span>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>
  
  <script>
import { mapActions, mapState } from "vuex";

import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
  LPopup,
  LTooltip,
} from "vue2-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import VGeosearch from "vue2-leaflet-geosearch";
import "leaflet/dist/leaflet.css";

export default {
  name: "dashboard",

  components: {
    LMap,
    LTileLayer,
    LMarker,
    VGeosearch,
    LIcon,
    LPopup,
    LTooltip,
  },

  data: () => ({
    num: 1,

    jmlpengajuan: 0,
    jmlterverifikasi: 0,
    jmlprosesediting: 0,
    jmlpenandatangan: 0,

    staf: {
      headers: [
        { text: "#", value: "num", width: 75 },
        { text: "STAF", value: "nama" },
        {
          text: "JML.PEKERJAAN",
          value: "jmlpekerjaan",
          width: 200,
          align: "right",
        },
        {
          text: "PROGRESS (%)",
          value: "progress",
          align: "center",
          width: 200,
        },
      ],
      records: [
        {
          id: 1,
          num: 1,
          nama: "Ujang Selamat",
          jmlpekerjaan: 20 + " Dokumen",
          progress: 25,
        },
        {
          id: 2,
          num: 2,
          nama: "Dudy Ali Fathan",
          jmlpekerjaan: 25 + " Dokumen",
          progress: 65,
        },
      ],
    },

    //un used
    datacollection: null,
    chartData: {
      Books: 24,
      Magazine: 30,
      Newspapers: 10,
    },

    jmlformasi: 0,
    jmlpelamar: 0,
    pelamars: [],
    pesans: [],

    search: null,
    jmlpegawai: 25,

    selected: [2],

    headers: [],

    headers2: [
      { text: "#", value: "num" },
      {
        text: "PROGRAM KEAHLIAN",
        align: "start",
        sortable: false,
        value: "jurusan",
      },
      { text: "BELUM TERVERIFIKASI", value: "jmlbelum" },
      { text: "SUDAH TERVERIFIKASI", value: "jmlsudah" },
    ],

    headers3: [
      { text: "#", value: "num" },
      {
        text: "PROGRAM KEAHLIAN",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "PILIHAN I", value: "jmlpil1" },
      { text: "PILIHAN II", value: "jmlpil2" },
    ],

    records: [],

    records2: [],

    records3: [],

    //property map
    //url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a target="_blank" href="#">Dinas Perhubungan Kab. Tangerang</a>',
    zoom: 11,
    //-6.1716001, 106.6405384
    center: [-6.1716001, 106.6405384],

    geosearchOptions: {
      // Important part Here
      provider: new OpenStreetMapProvider(),
    },

    marker: {
      id: "m1",
      position: { lat: -6.1716001, lng: 106.6405384 },
      tooltip: "<h4>Lampu Merah</h4><p>Rambu Lampu Merah </p>",
      draggable: false,
      visible: true,
    },
    marker2: {
      id: "m2",
      position: { lat: -6.2546, lng: 106.6405384 },
      tooltip:
        "<h4>Lampu Merah 2</h4><p>Rambu Lampu Merah Stopan Pemda Tigaraksa </p><p>Kondisi Baik</p>",
      draggable: false,
      visible: true,
    },

    markers: [],
    data: {},
  }),
  computed: {
    ...mapState(["theme", "http", "device", "loading", "event", "user"]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/dashboard",
      pagination: false,
      title: "Peta Monitoring",
      subtitle: "",
      showtable: false,
      breadcrumbs: [
        {
          text: "Distribusi",
          disabled: false,
          href: "",
        },
      ],
    });

    this.fetchMonitoring();
  },
  mounted() {},
  methods: {
    ...mapActions([
      "setPage",
      "postAddNew",
      "postEdit",
      "postUpdate",
      "postConfirmDelete",
    ]),

    fetchMonitoring: async function () {
      let {
        data: { pasars, jmlpasar, jmldistributor, jmlkendaraan },
      } = await this.http.get("api/inflasi/monit");

      this.markers = pasars;
      this.data.jmlpasar = jmlpasar;
      this.data.jmldistributor = jmldistributor;
      this.data.jmlkendaraan = jmlkendaraan;
    },

    fetchDashboard: async function () {
      let {
        data: { rambus, data },
      } = await this.http.get("api/dashboard");

      //this.markers = rambus;
      this.data = data;
    },

    fetchPesan: async function () {
      let {
        data: { pesans },
      } = await this.http.get("api/dashboard-pesan");

      this.pesans = pesans;
    },

    fetchPerHari: async function () {
      let {
        data: { headers, records },
      } = await this.http.get("api/dashboard-perhari");

      this.headers = headers;
      this.records = records;
    },

    fethDataVerifikasi: async function () {
      let {
        data: { data },
      } = await this.http.get("api/dashboard-verifikasi");

      this.records2 = data;
    },

    fethDataPerjurusanPerPilihan: async function () {
      let {
        data: { datas },
      } = await this.http.get("api/dashboard-perjurusan-per-pilihan");

      this.records3 = datas;
    },
  },
};
</script>
  
  <style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
.box-statistik-title {
  height: 100px;
  align-items: start;
}
.animasi {
  position: relative;
  animation: ripple 5s infinite;
  border-radius: 10%;
  border: none;
  background-color: #eff2f5;
  box-shadow: inset 10px 10px 20px #cf1313, inset -10px -10px 20px #ffffff;
  transition: 0.33s ease-in all;
  opacity: 0;
}

.dashboard-statistik {
  background: linear-gradient(#77bff3, #096cec);
}
.dashboard-statistik-footer-text {
  font-size: 8pt;
}

@keyframes ripple {
  0% {
    width: 20px;
    height: 20px;
    opacity: 1;
  }
  100% {
    width: 100px;
    height: 100px;
    opacity: 0;
  }
}
</style>
  
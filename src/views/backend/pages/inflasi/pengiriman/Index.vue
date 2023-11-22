<template>
  <div :class="device.desktop ? `home pa-6 grey lighten-4`:`home pa-0 grey lighten-4`">

    <v-row>
      <v-col cols="12">
        <v-card class="animated animate__bounceIn rounded-0">
          <v-card-title :class="`flex flex-row-reverse ` + theme.color + ` lighten-1`">
            <v-tooltip
              :color="theme.color"
              bottom
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  text
                  small
                  icon
                  v-on="on"
                  v-show="page.actions.add"
                >
                  <v-icon
                    :color="theme.mode == 'dark' ? `white` : `black`"
                    @click="openForm"
                  >add_circle</v-icon>
                </v-btn>
              </template>
              <span>Tambah Data</span>
            </v-tooltip>
            <v-tooltip
              :color="theme.color"
              bottom
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  text
                  small
                  icon
                  v-on="on"
                  v-show="page.actions.refresh"
                >
                  <v-icon
                    :color="theme.mode == 'dark' ? `white` : `black`"
                    @click="fetchRecords"
                  >refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh Data</span>
            </v-tooltip>

            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Pencarian"
              single-line
              hide-details
              solo
              dense
              color="orange darken-3"
              style="max-width: 350px"
            ></v-text-field>
          </v-card-title>
          <v-data-table
            v-show="device.desktop"
            :headers="headers"
            :items="records"
            :items-per-page="table.options.itemsPerPage"
            :page.sync="table.options.page"
            class="elevation-2 mb-1"
            :color="theme.color"
            :loading="loading.table"
            loading-text="Loading... Please wait"
            :search="search"
            hide-default-footer
            @page-count="table.options.pageCount = $event"
            show-select
          >
            <v-progress-linear
              slot="progress"
              :color="theme.color"
              height="1"
              indeterminate
            ></v-progress-linear>
            <template v-slot:item.progress="{ value }">
              <v-progress-linear
                :color="theme.color"
                v-model="value"
                height="25"
              >
                <strong>{{ value }}%</strong>
              </v-progress-linear>
            </template>

            <template v-slot:item.status="{ value }">
              <v-chip
                :color="value.color"
                small
              >{{ value.text }}</v-chip>
            </template>
            <template v-slot:item.id="{ value }">
              <v-menu
                bottom
                origin="center center"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    :color="theme.color"
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-dots-vertical-circle-outline
                  </v-icon>
                </template>

                <v-list>
                  <v-list-item
                    @click="editRecord(value)"
                    v-show="page.actions.edit"
                  >
                    <v-list-item-title>
                      <v-icon
                        color="orange"
                        class="mr-1"
                      >mdi-pencil-circle</v-icon>Ubah Data
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    @click="postDeleteRecord(value)"
                    v-show="page.actions.delete"
                  >
                    <v-list-item-title>
                      <v-icon
                        color="red"
                        class="mr-1"
                      >mdi-delete-circle</v-icon>Hapus Data
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-data-table>
          <v-list
            subheader
            three-line
            v-show="device.mobile"
          >

            <v-list-item-group
              multiple
              active-class=""
            >
              <v-list-item
                v-for="item in filterItems"
                :key="item.id"
                style="border: ;1px solid"
              >
                <template v-slot:default="{ active }">
                  <v-list-item-action>
                    <v-checkbox :input-value="active"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.description }} </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-menu
                      bottom
                      origin="center center"
                      transition="scale-transition"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          :color="theme.color"
                          v-bind="attrs"
                          v-on="on"
                        >
                          mdi-dots-vertical-circle-outline
                        </v-icon>
                      </template>

                      <v-list>

                        <v-divider v-if="page.delete || page.edit"></v-divider>
                        <v-list-item
                          @click="editRecord(item.id)"
                          v-show="page.actions.edit"
                        >
                          <v-list-item-title>
                            <v-icon color="orange">mdi-pencil-circle</v-icon>
                            Ubah Data
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          @click="postDeleteRecord(item.id)"
                          v-show="page.actions.delete"
                        >
                          <v-list-item-title>
                            <v-icon color="red">mdi-delete-circle</v-icon>
                            Hapus Data
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-list-item-action>

                </template>
              </v-list-item>

            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-col cols="12">
      <v-dialog
        transition="dialog-bottom-transition"
        v-model="form.add"
        :max-width="device.desktop ? `600px` : `100%`"
        persistent
        :fullscreen="device.mobile"
      >
        <v-card>
          <v-toolbar
            :color="theme.color"
            :dark="theme.mode"
          >
            <v-icon
              small
              class="mr-1 orange--text animate__animated animate__flash animate__infinite"
            >mdi-circle</v-icon> Formulir Data Pengiriman Barang
          </v-toolbar>
          <v-card-text class="mt-2">

            <v-col cols="12">
              <v-select
                label="Kendaraan |Nomor Kendaraan"
                outlined
                dense
                hide-details
                v-model="record.kendaraan_uuid"
                :color="theme.color"
                :items="kendaraans"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-select
                label="Dari"
                outlined
                dense
                hide-details
                v-model="record.dari"
                :color="theme.color"
                :items="distributors"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-select
                label="Tujuan"
                outlined
                dense
                hide-details
                v-model="record.tujuan"
                :color="theme.color"
                :items="pasar"
              ></v-select>
            </v-col>

            <v-col col="12">
              <v-text-field
                outlined
                :color="theme.color"
                :hide-details="device.desktop"
                label="Estimasi Waktu (Jam)"
                placeholder=""
                v-model="record.estimasi_waktu"
                :filled="record.estimasi_waktu"
                dense
                type="number"
              ></v-text-field>
            </v-col>
            <v-col col="12">
              <v-text-field
                outlined
                :color="theme.color"
                :hide-details="device.desktop"
                label="Biaya (Rp)"
                placeholder=""
                v-model="record.biaya"
                :filled="record.biaya"
                dense
                type="number"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-select
                label="Komoditas"
                outlined
                dense
                hide-details
                v-model="record.komoditas"
                :color="theme.color"
                :items="komoditas"
              ></v-select>
            </v-col>

            <v-col col="12">
              <v-text-field
                outlined
                :color="theme.color"
                :hide-details="device.desktop"
                label="Komoditi"
                placeholder=""
                v-model="record.barang"
                :filled="record.barang"
                dense
              ></v-text-field>
            </v-col>

            <v-col col="12">
              <v-text-field
                outlined
                :color="theme.color"
                :hide-details="device.desktop"
                label="Berat Muatan|Tonase (Ton)"
                placeholder=""
                v-model="record.jumlah"
                :filled="record.jumlah"
                dense
                suffix="Ton"
                type="number"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-row>
                <v-col :cols="device.desktop ?6:12">
                  <v-text-field
                    outlined
                    :color="theme.color"
                    :hide-details="device.desktop"
                    label="Tanggal Keberangkatan"
                    placeholder=""
                    v-model="record.tanggal_keberangkatan"
                    :filled="record.tanggal_keberangkatan"
                    dense
                    type="date"
                  ></v-text-field>
                </v-col>

                <v-col :cols="device.desktop ?6:12">
                  <v-text-field
                    outlined
                    :color="theme.color"
                    :hide-details="device.desktop"
                    label="Tanggal Kedatangan"
                    placeholder=""
                    v-model="record.tanggal_kedatangan"
                    :filled="record.tanggal_kedatangan"
                    dense
                    type="date"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12">
              <v-row>
                <v-col :cols="device.desktop ?6:12">
                  <v-text-field
                    outlined
                    :color="theme.color"
                    :hide-details="device.desktop"
                    label="Jam Keberangkatan"
                    placeholder=""
                    v-model="record.jam_keberangkatan"
                    :filled="record.jam_keberangkatan"
                    dense
                    type="time"
                  ></v-text-field>
                </v-col>
                <v-col :cols="device.desktop ?6:12">
                  <v-text-field
                    outlined
                    :color="theme.color"
                    :hide-details="device.desktop"
                    label="Jam Kedatangan"
                    placeholder=""
                    v-model="record.jam_kedatangan"
                    :filled="record.jam_kedatangan"
                    dense
                    type="time"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-end">
            <v-btn
              outlined
              :color="theme.color"
              v-show=" !form.edit"
              @click="postAddNewRecord"
            >Tambah</v-btn>
            <v-btn
              outlined
              :color="theme.color"
              v-show="form.edit"
              @click="postUpdateRecord"
            >Ubah</v-btn>
            <v-btn
              outlined
              color="grey"
              @click="closeForm"
            >Batal</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </div>
</template>
        
  <script>
import { mapActions, mapState } from "vuex";
import "animate.css";
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
  name: "data-pasar",
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
    headers: [
      {
        text: "TANGGAL",
        value: "tanggal",
        align: "left",
        sortable: false,
      },
      {
        text: "BARANG",
        align: "start",
        sortable: false,
        value: "barang",
      },
      {
        text: "BERAT MUATAN (Ton)",
        align: "right",
        sortable: false,
        value: "jumlah",
      },

      {
        text: "NO. KENDARAAN",
        value: "nomor",
        align: "start",
        sortable: false,
      },
      {
        text: "DARI",
        value: "dari",
        align: "start",
        sortable: false,
      },
      {
        text: "TUJUAN",
        value: "tujuan",
        align: "start",
        sortable: false,
      },
      {
        text: "AKSI",
        value: "id",
        width: 100,
        sortable: false,
        align: "center",
      },
    ],
    search: null,
    path: null,
    filename: null,
    distributors: [],
    pasar: [],
    kendaraans: [],
    komoditas: [
      { text: "Komoditas Pasar", value: "komoditas-pasar" },
      { text: "Ikan", value: "ikan" },
      { text: "Barang Penting", value: "barang-penting" },
    ],
  }),
  computed: {
    ...mapState([
      "page",
      "theme",
      "http",
      "device",
      "record",
      "records",
      "loading",
      "event",
      "snackbar",
      "form",
      "table",
    ]),
    filterItems() {
      if (this.search != null) {
        return this.records.filter((item) => {
          return (
            item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
            item.nip.toLowerCase().indexOf(this.search.toLowerCase()) > -1
          );
        });
      } else {
        return this.records;
      }
    },
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/inflasi/pengiriman",
      pagination: false,
      title: "DATA PENGIRIMAN BARANG",
      subtitle: "Berikut Daftar Pengiriman Yang Tersedia",
      showtable: true,
      breadcrumbs: [
        {
          text: "Inflasi",
          disabled: true,
          href: "",
        },
        {
          text: "Data Pengririman Barang",
          disabled: false,
          href: "",
        },
      ],
      actions: {
        refresh: true,
        add: true,
        edit: true,
        delete: true,
        bulkdelete: false,
        print: false,
        export: false,
        help: false,
      },
    });
    this.fetchRecords();
    this.fetchKendaraans();
    this.fetchDistributors();
    this.fetchPasar();
  },
  mounted() {},
  methods: {
    ...mapActions([
      "setPage",
      "fetchRecords",
      "postAddNew",
      "postEdit",
      "postUpdate",
      "postConfirmDelete",
      "assignFileBrowse",
      "setLoading",
      "setRecord",
      "setForm",
    ]),
    openForm: function () {
      this.setForm({
        add: true,
        edit: false,
      });
      this.setRecord({});
      this.filename = null;
      setTimeout(function () {
        window.dispatchEvent(new Event("resize"));
      }, 250);
    },
    closeForm: function () {
      this.setForm({
        add: false,
        edit: false,
      });
    },
    postAddNewRecord: function () {
      this.postAddNew(this.record).then(() => {
        this.closeForm();
        this.fetchRecords();
      });
    },
    editRecord: function (val) {
      this.postEdit(val).then(() => {
        this.center = [this.record.lat, this.record.lng];
        this.marker.position = {
          lat: this.record.lat,
          lng: this.record.lng,
        };
        setTimeout(function () {
          window.dispatchEvent(new Event("resize"));
        }, 250);
      });
      this.setForm({
        add: true,
        edit: true,
      });
    },
    postUpdateRecord: function () {
      this.postUpdate(this.record).then(() => {
        this.closeForm();
      });
    },
    postDeleteRecord: function (val) {
      this.postConfirmDelete(val);
    },
    postDownload(val) {
      window.open(val, "__blank");
    },
    uploadFile: function () {
      this.assignFileBrowse({
        fileType: [".pdf"],
        query: {
          doctype: "documents",
        },
        callback: (response) => {
          setTimeout(() => {
            this.filename = response.name;
            this.record.filename = response.name;
          }, 500);
        },
      });
    },

    /**
     * Custome func
     */
    fetchKendaraans: async function () {
      try {
        let { data } = await this.http.get("api/combo/kendaraan");

        this.kendaraans = data;
      } catch (error) {}
    },
    fetchDistributors: async function () {
      try {
        let { data } = await this.http.get("api/combo/distributor");
        this.distributors = data;
      } catch (error) {}
    },
    fetchPasar: async function () {
      try {
        let { data } = await this.http.get("api/combo/pasar");

        this.pasar = data;
      } catch (error) {}
    },
  },
  watch: {},
};
</script>
import Vue from "vue";
import VueRouter from "vue-router";
import BaseFrontend from "../views/frontend/Base.vue";
import Auth from "../providers/AuthProviders";
import Login from "../views/frontend/Login.vue";
import GoogleCallback from "../views/frontend/components/GoogleCallback.vue";
import RegistrasiPerusahaan from "../views/frontend/RegistrasiPerusahaan.vue";
import RegisterUser from "../views/frontend/RegisterUser.vue";
import RegistrasiBerhasil from "../views/frontend/RegistrasiBerhasil.vue";
//import Register from "../views/auth/Register.vue";
import Home from "../views/frontend/Home.vue";

//BASE APLIKASI
import Base from "../views/backend/Base.vue";

//Dashboard Page
import Dashboard from "../views/backend/pages/Dashboard.vue";

//Utiity Group Page
import User from "../views/backend/pages/utility/user/Index.vue";
import Changepwd from "../views/backend/pages/utility/user/Changepwd.vue";
import ProfilAkun from "../views/backend/pages/utility/user/Profil.vue";
import UtilityManajemenFitur from "../views/backend/pages/utility/manajemenfitur/Index.vue";
import UtilitymanajemenFiturAdministrator from "../views/backend/pages/utility/manajemenfitur/administrator/Index.vue";
import UtilityUpdateHistory from "../views/backend/pages/utility/updatehistory/Index.vue";
import UtilityUpdateHistoryItem from "../views/backend/pages/utility/updatehistory/items/Index.vue";

//page master data
import MasterAppInfo from "../views/backend/pages/masterdata/appinfo/Index.vue";
import MasterProvince from "../views/backend/pages/masterdata/province/Index.vue";
import MasterRegency from "../views/backend/pages/masterdata/regency/Index.vue";
import MasterJenisRambu from "../views/backend/pages/masterdata/jenisrambu/Index.vue";
import MasterRambu from "../views/backend/pages/masterdata/rambu/Index.vue";
import MasterJenisPengaduan from "../views/backend/pages/masterdata/jenispengaduan/Index.vue";
import MasterPejabat from "../views/backend/pages/masterdata/pejabat/Index.vue";
import MasterDocument from "../views/backend/pages/masterdata/document/Index.vue";
import MasterTrayek from "../views/backend/pages/masterdata/trayek/Index.vue";
import MasterOPD from "../views/backend/pages/masterdata/opd/Index.vue";
import MasterPilar from "../views/backend/pages/masterdata/renaksi/pilars/Index.vue";
import MasterProgram from "../views/backend/pages/masterdata/renaksi/programs/Index.vue";
import MasterKegiatan from "../views/backend/pages/masterdata/renaksi/kegiatans/Index.vue";
import MasterPeriode from "../views/backend/pages/masterdata/periode/index.vue";
import MasterTahun from "../views/backend/pages/masterdata/tahun/index.vue";
import MasterPos from "../views/backend/pages/masterdata/pos/Index.vue";
import MasterSekolah from "../views/backend/pages/masterdata/sekolah/Index.vue";
import MasterPerlintasan from "../views/backend/pages/masterdata/perlintasan/Index.vue";
import MasterJenisKendaraanOperational from "../views/backend/pages/masterdata/jeniskendaraanoperational/Index.vue";
import MasterKendaraanOperational from "../views/backend/pages/masterdata/kendaraanoperasional/Index.vue";
import MasterKompenen from "../views/backend/pages/masterdata/komponen/Index.vue";

//page bidang keselamatan
import KeselamatanLokasiRambu from "../views/backend/pages/keselamatan/lokasirambu/Index.vue";
import KeselamatanLaporan from "../views/backend/pages/keselamatan/laporan/Index.vue";
import KeselamatanPermohonanRamcheck from "../views/backend/pages/keselamatan/permohonan/Index.vue";
import KeselamatanPermohonanTindakLanjut from "../views/backend/pages/keselamatan/permohonan/tindaklanjut/Index.vue";
import KeselamatanPemeriksaanIndex from "../views/backend/pages/keselamatan/permohonan/pemeriksaan/Index.vue";
import KeselamatanPemeriksaanFormAdd from "../views/backend/pages/keselamatan/permohonan/pemeriksaan/FormAdd.vue";
import KeselamatanPemeriksaanFormEdit from "../views/backend/pages/keselamatan/permohonan/pemeriksaan/FormEdit.vue";
import KeselamatanPemeriksaanDocument from "../views/backend/pages/keselamatan/permohonan/pemeriksaan/documents/Index.vue";
import KeselamatanRenaksi from "../views/backend/pages/keselamatan/renaksi/Index.vue";
import KeselamatanMonitoringRenaksi from "../views/backend/pages/keselamatan/monitoring/index.vue";
import KeselamatanDataPerusahaan from "../views/backend/pages/keselamatan/perusahaan/Index.vue";

//page infalasi
import InflasiDataPasar from "../views/backend/pages/masterdata/pasar/Index.vue";
import InflasiDataDistributor from "../views/backend/pages/inflasi/distributor/Index.vue";
import InflasiDataKendaraan from "../views/backend/pages/inflasi/kendaraan/Index.vue";
import InflasiDataPengiriman from "../views/backend/pages/inflasi/pengiriman/Index.vue";
import InflasiMonitoring from "../views/backend/pages/inflasi/monitoring/Index.vue";

import UserPelaporan from "../views/backend/pages/user/pelaporan/Index.vue";

//Backend Halaman Depan
import HalamanDepanSlider from "../views/backend/pages/halamandepan/sliders/Index.vue";
import HalamanDepanPengumuman from "../views/backend/pages/halamandepan/pengumuman/Index.vue";
import HalamanDepanVideo from "../views/backend/pages/halamandepan/videos/Index.vue";

//halaman perusahaan
import PerusahaanDashboard from "../views/backend/pages/perusahaan/Dashboard.vue";
import PerusahaanProfil from "../views/backend/pages/perusahaan/profil/Index.vue";
import PerusahaanPermohonan from "../views/backend/pages/perusahaan/permohonan/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    name: "",
    component: BaseFrontend,
    children: [
      { path: "", redirect: { name: "home" } },
      { path: "home", name: "home", component: Home },
      {
        path: "registrasi-perusahaan",
        name: "registrasi-perusahaan",
        component: RegistrasiPerusahaan,
      },
      {
        path: "registrasi-user",
        name: "registrasi-user",
        component: RegisterUser,
      },
      {
        path: "registrasi-berhasil",
        name: "registrasi-berhasil",
        component: RegistrasiBerhasil,
      },
      { path: "login", name: "login", component: Login },
      {
        path: "google/callback",
        name: "google-callbak",
        component: GoogleCallback,
      },

      ,
    ],
  },

  /**
   * Route Backend
   */

  {
    path: "/backend",
    name: "",
    meta: {
      auth: true,
    },
    component: Base,
    children: [
      { path: "", redirect: { name: "dashboard" } },
      { path: "dashboard", name: "dashboard", component: Dashboard },
      { path: "user", name: "user", component: User },
      {
        path: "chngpwd",
        name: "chngpwd",
        component: Changepwd,
      },
      {
        path: "profil-akun",
        name: "profil-akun",
        component: ProfilAkun,
      },
      //route master data
      {
        path: "master-app-info",
        name: "master-app-info",
        component: MasterAppInfo,
      },
      {
        path: "master-province/:itemsPerPage?/:page?",
        name: "master-province",
        component: MasterProvince,
      },
      {
        path: "master-regency/:province_id/:itemsPerPage/:page",
        name: "master-regency",
        component: MasterRegency,
      },
      //Route Master Rambu
      {
        path: "master-jenis-rambu/:itemsPerPage?/:page?",
        name: "master-jenis-rambu",
        component: MasterJenisRambu,
      },
      {
        path: "master-rambu/:jenis_rambu_uuid/:itemsPerPage/:page",
        name: "master-rambu",
        component: MasterRambu,
      },
      {
        path: "master-jenis-pengaduan",
        name: "master-jenis-pengaduan",
        component: MasterJenisPengaduan,
      },
      {
        path: "master-pejabat",
        name: "master-pejabat",
        component: MasterPejabat,
      },
      {
        path: "master-document",
        name: "master-document",
        component: MasterDocument,
      },
      {
        path: "master-trayek",
        name: "master-trayek",
        component: MasterTrayek,
      },
      {
        path: "master-opd",
        name: "master-opd",
        component: MasterOPD,
      },
      {
        path: "master-pilar",
        name: "master-pilar",
        component: MasterPilar,
      },
      {
        path: "master-program/:pilar_uuid/:itemsPerPage?/:page?",
        name: "master-program",
        component: MasterProgram,
      },
      {
        path: "master-kegiatan/:pilar_uuid/:program_uuid/:itemsPerPage?/:page?",
        name: "master-kegiatan",
        component: MasterKegiatan,
      },
      {
        path: "master-periode",
        name: "master-periode",
        component: MasterPeriode,
      },
      {
        path: "master-tahun/:periode_uuid",
        name: "master-tahun",
        component: MasterTahun,
      },
      {
        path: "master-pos",
        name: "master-pos",
        component: MasterPos,
      },
      {
        path: "master-sekolah",
        name: "master-sekolah",
        component: MasterSekolah,
      },
      {
        path: "master-perlintasan",
        name: "master-perlintasan",
        component: MasterPerlintasan,
      },
      {
        path: "master-jenis-kendaraan-operational",
        name: "master-jenis-kendaraan-operational",
        component: MasterJenisKendaraanOperational,
      },
      {
        path: "master-kendaraan-operational",
        name: "master-kendaraan-operational",
        component: MasterKendaraanOperational,
      },
      {
        path: "master-komponen",
        name: "master-komponen",
        component: MasterKompenen,
      },

      //Route Bidang Keselamatan
      {
        path: "keselamatan-lokasi-rambu",
        name: "keselamatan-lokasi-rambu",
        component: KeselamatanLokasiRambu,
      },
      {
        path: "keselamatan-laporan",
        name: "keselamatan-laporan",
        component: KeselamatanLaporan,
      },

      {
        path: "keselamatan-permohonan-ramcheck/:itemsPerPage?/:page?",
        name: "keselamatan-permohonan-ramcheck",
        component: KeselamatanPermohonanRamcheck,
      },
      {
        path: "keselamatan-permohonan-tindak-lanjut/:uuid/:itemsPerPage/:page",
        name: "keselamatan-permohonan-tindak-lanjut",
        component: KeselamatanPermohonanTindakLanjut,
      },
      {
        path: "keselamatan-pemeriksaan/:permohonan_uuid/:itemsPerPage/:page",
        name: "keselamatan-pemeriksaan",
        component: KeselamatanPemeriksaanIndex,
      },
      {
        path:
          "keselamatan-pemeriksaan-form-add/:permohonan_uuid/:itemsPerPage/:page",
        name: "keselamatan-pemeriksaan-form-add",
        component: KeselamatanPemeriksaanFormAdd,
      },
      {
        path:
          "keselamatan-pemeriksaan-foem-edit/:id/:permohonan_uuid/:itemsPerPage/:page",
        name: "keselamatan-pemeriksaan-form-edit",
        component: KeselamatanPemeriksaanFormEdit,
      },
      {
        path:
          "keselematan-pemeriksaan-dokumen/:pemeriksaan_uuid/:permohonan_uuid/itemsPerPage/:page ",
        name: "keselamatan-pemeriksaan-dokumen",
        component: KeselamatanPemeriksaanDocument,
      },
      {
        path: "keselamatan-renaksi",
        name: "keselamatan-renaksi",
        component: KeselamatanRenaksi,
      },
      {
        path: "keselamatan-monitoring-renaksi",
        name: "keselamatan-monitoring-renaksi",
        component: KeselamatanMonitoringRenaksi,
      },
      {
        path: "keselamatan-data-perusahaan",
        name: "keselamatan-data-perusahaan",
        component: KeselamatanDataPerusahaan,
      },

      /**
       * ROuter User
       */
      {
        path: "user-pelaporan",
        name: "user-pelaporan",
        component: UserPelaporan,
      },

      //Route slider
      {
        path: "halaman-depan-slider",
        name: "halaman_depan_slider",
        component: HalamanDepanSlider,
      },
      //Route Pengumuman
      {
        path: "halaman-depan-pengumuman",
        name: "halaman-depan-pengumuman",
        component: HalamanDepanPengumuman,
      },
      {
        path: "halaman-depan-video",
        name: "halaman-depan-video",
        component: HalamanDepanVideo,
      },

      /**
       * Modul Inflasi
       */
      {
        path: "inflasi-data-pasar",
        name: "inflasi-data-pasar",
        component: InflasiDataPasar,
      },
      {
        path: "inflasi-data-distributor",
        name: "inflasi-data-distributor",
        component: InflasiDataDistributor,
      },
      {
        path: "inflasi-data-kendaraan",
        name: "inflasi-data-kendaraan",
        component: InflasiDataKendaraan,
      },
      {
        path: "inflasi-data-pengiriman",
        name: "inflasi-data-pengiriman",
        component: InflasiDataPengiriman,
      },
      {
        path: "inflasi-monitoring",
        name: "inflasi-monitoring",
        component: InflasiMonitoring,
      },

      /**
       * Route Utility
       */
      {
        path: "utility-manajemen-fitur-administrator",
        name: "utility-manajemen-fitur-administrator",
        component: UtilitymanajemenFiturAdministrator,
      },
      {
        path: "utility-manajemen-fitur",
        name: "utility-manajemen-fitur",
        component: UtilityManajemenFitur,
      },
      {
        path: "utility-update-history",
        name: "utility-update-history",
        component: UtilityUpdateHistory,
      },
      {
        path: "utility-update-history-items/:update_history_id",
        name: "utility-update-history-items",
        component: UtilityUpdateHistoryItem,
      },

      /**
       * Route Akun Perusahaan
       */
      {
        path: "perusahaan-dashboard",
        name: "perusahaan-dashboard",
        component: PerusahaanDashboard,
      },
      {
        path: "perusahaan-profil",
        name: "perusahaan-profil",
        component: PerusahaanProfil,
      },
      {
        path: "perusahaan-permohonan",
        name: "perusahaan-permohonan",
        component: PerusahaanPermohonan,
      },
    ],
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  mode: "history",
});

/**
 * router match
 */

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.auth);

  if (requiresAuth) {
    if (!Auth.check) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    if (to.name === "login" && Auth.check) {
      if (Auth.user.authent == "perusahaan") {
        next({ name: "perusahaan-dashboard" });
      } else if (Auth.user.auth === "dosen") {
        next({ name: "dosen-dashboard" });
      } else {
        next({ name: "dashboard" });
      }
    } else {
      next();
    }
  }
});

export default router;

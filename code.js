//                      //
// Component definition //
//                      //

// Elements //

// Spinner
const spinnercomp = Vue.component('spinnercomp', {
    template: '#spinnercomp'
});

// Footer
const footercomp = Vue.component('footercomp', {
  template: '#footercomp'
});

// Pokemon card
const pokecard = Vue.component('pokecard', {
  template: '#pokecard',
  
  props: [
    'name',
    'image',
    'cp',
    'rank',
    'tcp'
  ],

  computed: {
    cpwu () {
      return this.tcp
        ? (this.cp * 6 / this.tcp * 100).toFixed(2) + "%"
        : 0;
    }
  }
});

// Event card
const eventcard = Vue.component('eventcard', {
  template: '#eventcard',
  props: [
    'event'
  ]
});

// Pages //

// Stats page
const statspage = Vue.component('statspage', {

  template: '#statspage',

  data () {
    return {
      pokemon: [],
      search: '',
      loading: true,
      alert: window.location.hash == '#sent',
      begindate: "2018-01-01",
      enddate: "2018-12-31",
    }
  },

  computed: {

    searchPokemon() {
      return this.pokemon
        .filter(poke => {
            let pokedate = new Date(poke.Date);
            return pokedate >= new Date(this.begindate) && pokedate <= new Date(this.enddate);
        })
        .reduce( function (r, v, i, a) {

          let el = r.find((r) => r && r.name === v['Name']);
          if (el) {
            el.cp += v['CP'];
          } else {
            r.push({
              name: v['Name'],
              image: v['Image'],
              cp: v['CP'],
            })
          }
          return r;

        }, [])
        .sort(function (a, b) {
          return b.cp - a.cp;
        });
    },

    totalCP () {
      return this.searchPokemon ? 
        this.searchPokemon.reduce( function (r, v) {
          return r + v.cp;
        }, 0)
        : 0;
    },

    dateyear () {
        return this.begindate === "2018-01-01" && this.enddate === "2018-12-31";
    },

    dateintimiroar () {
      return this.begindate === "2018-03-08" && this.enddate === "2018-12-31";
    },

    datecustom () {
      return !this.dateyear && !this.dateintimiroar;
    }
  },

  methods: {
    setdateyear: function () {
      this.begindate = "2018-01-01";
      this.enddate = "2018-12-31";
    },

    setdateintimiroar: function () {
      this.begindate = "2018-03-08";
      this.enddate = "2018-12-31";
    },

    setdatecustom: function () {
      this.begindate = "2018-01-01";
      this.enddate = new Date().toISOString().split('T')[0];
    }
  },


  mounted() {
    var data = this;

    var cpSheet = new Miso.Dataset({
      importer : Miso.Dataset.Importers.GoogleSpreadsheet,
      parser : Miso.Dataset.Parsers.GoogleSpreadsheet,
      key : "1WUNrJWrsAK_7EEIn2L0QyMC2SArXqGIOpJ4G1XrlU20",
      worksheet : "19"
      // worksheet : "12"
    });

    var misodata = [];

    cpSheet.fetch({
      success : function() {
        data.pokemon = cpSheet.toJSON();
        data.loading = false;
      },

      error : function() {
        console.log("Are you sure you are connected to the internet?");
      }
    });
  }
});

// MSS page
const msspage = Vue.component('msspage', {
  template: '#msspage',

  data () {
    return {
      events: [],
      loading: true
    }
  },

  mounted () {
    var data = this;

    const cpSheet = new Miso.Dataset({
      importer : Miso.Dataset.Importers.GoogleSpreadsheet,
      parser : Miso.Dataset.Parsers.GoogleSpreadsheet,
      key : "1WUNrJWrsAK_7EEIn2L0QyMC2SArXqGIOpJ4G1XrlU20",
      worksheet : "2"
    });

    var misodata = []; 

    cpSheet.fetch({
      success : function() {
        cpSheet.where({
          rows : function (row) { return row.Placing != null; }
        }).sort(
          function (a, b) {
            return new Date(b.Date) - new Date(a.Date) || a.Placing - b.Placing;
          }
        ).each( function (row, index) {
          misodata.push(row);
        });
        data.events = misodata.reduce( 
          function (r, v, i, a) {
            var k1 = v.Date;
            var k2 = v.Region; 
            var k3 = v.Country;
            ( r[k1 + k2 + k3] || (r[k1 + k2 + k3] = []) ).push(v);
            return r; 
          }, {}
        );
        data.loading = false;
      },

      error : function() {
        console.log("Are you sure you are connected to the internet?");
      }
    });
  }
});

// Regs page
const regpage = Vue.component('regpage', {
  template: '#regpage',

  data () {
    return {
      events: [],
      loading: true
    }
  },

  mounted () {
    var data = this;

    const cpSheet = new Miso.Dataset({
      importer : Miso.Dataset.Importers.GoogleSpreadsheet,
      parser : Miso.Dataset.Parsers.GoogleSpreadsheet,
      key : "1WUNrJWrsAK_7EEIn2L0QyMC2SArXqGIOpJ4G1XrlU20",
      worksheet : "3"
    });

    var misodata = []; 

    cpSheet.fetch({
      success : function() {
        cpSheet.where({
          rows : function (row) { return row.Placing != null; }
        }).sort(
          function (a, b) {
            return new Date(b.Date) - new Date(a.Date) || a.Placing - b.Placing;
          }
        ).each( function (row, index) {
          misodata.push(row);
        });
        data.events = misodata.reduce( 
          function (r, v, i, a) {
            var k1 = v.Date;
            var k2 = v.Region; 
            var k3 = v.Country;
            ( r[k1 + k2 + k3] || (r[k1 + k2 + k3] = []) ).push(v);
            return r; 
          }, {}
        );
        data.loading = false;
      },

      error : function() {
        console.log("Are you sure you are connected to the internet?");
      }
    });
  }
});

// Nats page
const natpage = Vue.component('natpage', {
  template: '#natpage',

  data () {
    return {
      events: [],
      loading: true
    }
  },

  mounted () {
    var data = this;

    const cpSheet = new Miso.Dataset({
      importer : Miso.Dataset.Importers.GoogleSpreadsheet,
      parser : Miso.Dataset.Parsers.GoogleSpreadsheet,
      key : "1WUNrJWrsAK_7EEIn2L0QyMC2SArXqGIOpJ4G1XrlU20",
      worksheet : "4"
    });

    var misodata = []; 

    cpSheet.fetch({
      success : function() {
        cpSheet.where({
          rows : function (row) { return row.Placing != null; }
        }).sort(
          function (a, b) {
            return new Date(b.Date) - new Date(a.Date) || a.Placing - b.Placing;
          }
        ).each( function (row, index) {
          misodata.push(row);
        });
        data.events = misodata.reduce( 
          function (r, v, i, a) {
            var k1 = v.Date;
            var k2 = v.Region; 
            var k3 = v.Country;
            ( r[k1 + k2 + k3] || (r[k1 + k2 + k3] = []) ).push(v);
            return r; 
          }, {}
        );
        data.loading = false;
      },

      error : function() {
        console.log("Are you sure you are connected to the internet?");
      }
    });
  }
});

//                   //
// Router definition //
//                   //

const router = new VueRouter ({
  routes: [
    {
      path: '/',
      name: 'Stats',
      component: statspage,
    },
    {
      path: '/mss',
      name: 'MSS',
      component: msspage
    },
    {
      path: '/regs',
      name: 'Regs',
      component: regpage
    },
    {
      path: '/nats',
      name: 'Nats',
      component: natpage
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

//                //
// Vue definition //
//                //

var vm = new Vue({
  el: '#app',
  router: router,
  data() {
    return {
      loading: true,
    }
  }
});

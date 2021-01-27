<template>
  <div>
    <div>
      <v-row class="board-brand">
        <v-col>
          <v-card>
            <v-dialog
              v-model="brandDialog"
              persistent
              max-width="600px"
            >
              <template #activator="{ on, attrs }">
                <v-card-title
                  v-bind="attrs"
                  v-on="on"
                >
                  <i class="fa fa-plus" />Add Brand
                </v-card-title>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Brand Details</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                      >
                        <v-text-field
                          v-model="brandDetails.brandName"
                          label="Brand Name"
                          required
                        />
                      </v-col>
                      <v-col
                        cols="12"
                      >
                        <v-text-field
                          v-model="brandDetails.address"
                          label="Address"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                      >
                        <v-text-field
                          v-model="brandDetails.country"
                          label="country"
                          required
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="brandDetails.email"
                          label="Email"
                          required
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="brandDetails.phoneNumber"
                          label="Phone Number"
                          required
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="brandDetails.website"
                          label="website"
                          required
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="white"
                    text
                    @click="brandDialog = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    color="white"
                    text
                    @click="addBrand()"
                  >
                    Add
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
        </v-col>
        <v-col v-for="(brand, index) in brands" :key="index">
          <v-card @click="viewBrand(brand)">
            <v-card-title>{{ brand.brandName }}</v-card-title>
            <v-card-text>Link: {{ brand.brandLink }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <!-- <div>Graph</div> -->
      </v-row>
      <v-row class="mt-4">
        <v-col>
          <v-data-table
            :headers="tableHeaders"
            :items="customers"
            :items-per-page="5"
            class="elevation-1"
            width="500"
            label="no customer found"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data () {
    return {
      brandDialog: false,
      brands: [],
      tableHeaders: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Email', value: 'email' },
        { text: 'phone Number', value: 'phoneNumber' },
        { text: 'dob', value: 'dob' }
      ],
      customers: [
      ],
      token: '',
      userId: '',
      headers: {},
      brandDetails: {
        brandName: '',
        address: '',
        country: '',
        phoneNumbe: '',
        email: '',
        website: ''
      }
    }
  },
  fetch () {
    const token = this.$store.getters.getToken
    const userData = this.$store.getters.getUserData
    const { userId } = userData
    this.token = token
    this.userId = userId
    this.headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    this.fetchCustomers()
    this.fetchBrands()
  },
  methods: {
    fetchCustomers () {
      const url = `https://mayasms.herokuapp.com/api/customer/view?userId=${this.userId}`
      this.$axios.get(url, this.headers)
        .then((response) => {
          const { data } = response
          const { response: customers } = data
          this.customers = customers
        })
        .catch((err) => {
          console.log(err, 'error')
        })
    },
    fetchBrands () {
      const url = `https://mayasms.herokuapp.com/api/brand/view?userId${this.userId}`
      this.$axios.get(url, this.headers)
        .then((response) => {
          const { data } = response
          const { response: brands } = data
          this.brands = brands
        })
        .catch((err) => {
          console.log(err, 'error')
        })
    },
    addBrand () {
      const url = 'https://mayasms.herokuapp.com/api/brand/register'
      this.$axios.post(url, this.brandDetails, this.headers)
        .then((response) => {
          const { data } = response
          const { response: brand } = data
          this.brands.push(brand)
        })
        .catch((err) => {
          console.log(err, 'err')
        })
      this.brandDialog = false
    },
    viewBrand (brand) {
      this.$store.commit('setBrand', { brand })
      this.$router.push('/brand')
    }
  }
}
</script>

<style></style>

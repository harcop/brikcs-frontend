<template>
  <div>
    <div>
      <v-row class="board-brand">
        <v-col cols="12" sm="6" md="4">
          <v-card>
            <v-card-title> <i class="fa fa-wallet" />{{ wallet.amount }} Naira</v-card-title>
            <v-card-text>
              <v-btn @click="topUp()">
                <i class="fa fa-plus" />Top up Wallet
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card>
            <v-card-title> {{ customers.length }} customers </v-card-title>
            <v-card-text>
              <v-btn @click="addCustomer()">
                <i class="fa fa-plus" />Add Customer
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card>
            <v-card-title> {{ customMessages.length }} messages </v-card-title>
            <v-card-text>
              <v-btn @click="addMessage()">
                <i class="fa fa-plus" />Add Message
              </v-btn>
            </v-card-text>
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
            caption="Customers' information"
            no-data-text="No customer's information"
          />
        </v-col>
      </v-row>
    </div>
    <v-dialog v-model="openwise" fullscreen>
      <v-card>
        <v-toolbar>
          <v-btn>
            <v-icon @click="openwise = false">
              mdi-close
            </v-icon>
          </v-btn>
          <v-toolbar-title>Message</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-subheader>Add New Customer</v-subheader>
          <v-text-field v-model="newCustomer.fullName" label="Full Name" />
          <v-text-field v-model="newCustomer.address" label="Address" />
          <v-text-field v-model="newCustomer.phoneNumber" label="Phone Number" />
          <v-text-field v-model="newCustomer.email" label="email" />
          <v-select v-model="newCustomer.gender" :items="genderOption" label="Gender" />
          <v-row>
            <v-col><v-date-picker v-model="dobPicker" /></v-col>
          </v-row>
          <v-btn class="mt-5 blue full-width" @click="saveCustomer()">
            Add
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data () {
    return {
      dobPicker: new Date().toISOString().substr(0, 10),
      genderOption: ['male', 'female'],
      openwise: false,
      brandId: '',
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
      userId: '',
      headers: {},
      token: '',
      brand: {},
      wallet: {},
      customMessages: [],
      brandLink: '',
      newCustomer: {}
    }
  },
  fetch () {
    const token = this.$store.getters.getToken
    const userData = this.$store.getters.getUserData
    this.brand = this.$store.getters.getBrand
    const { userId } = userData
    this.brandLink = this.brand.brandLink
    this.token = token
    this.userId = userId
    this.brandId = this.brand.id
    this.headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    if (!this.brandId || this.brandId === '') {
      this.$router.push('/login')
    }
    this.getBrandWallet()
    this.getBrandCustomers()
    this.getBrandMessages()
  },
  methods: {
    saveCustomer () {
      const url = `https://mayasms.herokuapp.com/api/customer/register/${this.brandLink}`
      const body = {
        ...this.newCustomer,
        date: this.dobPicker
      }
      this.$axios.post(url, body)
        .then((response) => {
          const { data } = response
          const { response: customer } = data
          this.customers.push(customer)
        })
        .catch((err) => {
          console.log(err, 'error')
        })
    },
    getBrandWallet () {
      const url = `https://mayasms.herokuapp.com/api/wallet/view-wallet?brandId=${this.brandId}`
      this.$axios.get(url, this.headers)
        .then((response) => {
          const { data } = response
          const { response: wallet } = data
          this.wallet = wallet
        })
        .catch((err) => {
          console.log(err, 'error')
        })
    },
    getBrandCustomers () {
      const url = `https://mayasms.herokuapp.com/api/customer/view?brandId=${this.brandId}`
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
    getBrandMessages () {
      const url = `https://mayasms.herokuapp.com/api/custom-message/view?brandId=${this.brandId}`
      this.$axios.get(url, this.headers)
        .then((response) => {
          const { data } = response
          const { response: customMessages } = data
          this.customMessages = customMessages
        })
        .catch((err) => {
          console.log(err, 'error')
        })
    },
    topUp () {
      this.$store.commit('setBrand', { brand: this.brand })
      this.$store.commit('setWallet', { wallet: this.wallet })
      this.$router.push('/wallet')
    },
    addMessage () {
      this.$store.commit('setBrand', { brand: this.brand })
      this.$router.push('/message')
    },
    addCustomer () {
      this.openwise = true
    }
  }
}
</script>

<style></style>

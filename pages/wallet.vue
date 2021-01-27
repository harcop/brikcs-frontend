<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>N {{ wallet.amount }}</v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card @click="makePayment()">
          <v-card-text>
            <i class="fa fa-plus" />Top up
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <div><v-subheader>Wallet Top up History</v-subheader></div>
    </v-row>

    <v-row class="mt-4">
      <v-col>
        <v-simple-table dark>
          <template #default>
            <thead>
              <tr>
                <th class="text-left">
                  Amount
                </th>
                <th class="text-left">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-if="!paymentHistory.length">
                <p class="d-flex justify-center">
                  no payment history
                </p>
              </template>
              <tr v-for="(item) in paymentHistory" :key="item.date">
                <td>{{ item.amount }}</td>
                <td>{{ new Date(item.createdAt) }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data () {
    return {
      brand: {},
      wallet: {},
      brandId: '',
      paymentHistory: [],
      token: '',
      headers: {}
    }
  },
  fetch () {
    this.brand = this.$store.getters.getBrand
    this.brandId = this.brand.id
    this.token = this.$store.getters.getToken
    this.headers = {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }
    if (!this.brandId || this.brandId === '') {
      this.$router.push('/login')
    }
    this.getBrandWallet()
    this.getBrandPaymentHistory()
  },
  methods: {
    makePayment () {
      this.payWithPaystack()
    },
    payWithRave () {
      const paymentCompleted = this.paymentCompleted
      // eslint-disable-next-line no-undef
      const x = FlutterwaveCheckout({
        public_key: 'FLWPUBK_TEST-SANDBOXDEMOKEY-X',
        tx_ref: `${Math.floor(Math.random())}hooli-tx-1920bbtyt${new Date()}`,
        amount: 54600,
        currency: 'NGN',
        country: 'NG',
        payment_options: 'card',
        // redirect_url: // specified redirect URL
        // 'https://callbacks.piedpiper.com/flutterwave.aspx?ismobile=34',
        meta: {
          consumer_id: 23,
          consumer_mac: '92a3-912ba-1192a'
        },
        customer: {
          email: 'user@gmail.com',
          phone_number: '08102909304',
          name: 'yemi desola'
        },
        callback (data) {
          console.log(data, 'data response')
          paymentCompleted()
          setTimeout(function () {
            x.close()
          }, 3000)
        },
        onclose () {
        // close modal
        },
        customizations: {
          title: 'My store',
          description: 'Payment for items in cart',
          logo: 'https://assets.piedpiper.com/logo.png'
        }
      })
    },
    payWithPaystack () {
      const paymentCompleted = this.paymentCompleted
      // eslint-disable-next-line no-undef
      const handler = PaystackPop.setup({
        key: 'pk_test_789b77892028ae1a28ae19e0006d0bcdf66552c6',
        email: 'customer@email.com',
        amount: 10000,
        currency: 'NGN',
        // ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        metadata: {
          custom_fields: [
            {
              display_name: 'Mobile Number',
              variable_name: 'mobile_number',
              value: '+2348012345678'
            }
          ]
        },
        callback (response) {
          // alert('success. transaction ref is ' + response.reference)
          console.log(response, 'balance')
          if (response.trxref) {
            paymentCompleted(response)
          } else {
            alert('Error in payment')
          }
        },
        onClose () {
          alert('window closed')
        }
      })
      handler.openIframe()
    },
    paymentCompleted (data) {
      console.log(data.trxref, 'this is the data I need')
      const { trxref } = data
      const body = {
        txRef: trxref,
        amount: 100,
        brandId: this.brandId
      }
      const url = 'https://mayasms.herokuapp.com/api/wallet/top-up'
      this.$axios.post(url, body, this.headers)
        .then((response) => {
          const { data } = response
          const { response: _response } = data
          this.paymentHistory.push(_response)
          this.wallet.amount += _response.amount
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
    getBrandPaymentHistory () {
      const url = `https://mayasms.herokuapp.com/api/wallet/view-payment-history?brandId=${this.brandId}`
      this.$axios.get(url, this.headers)
        .then((response) => {
          const { data } = response
          const { response: payments } = data
          this.paymentHistory = payments
        })
        .catch((err) => {
          console.log(err, 'error')
        })
    }
  }
}
</script>

<style>

</style>

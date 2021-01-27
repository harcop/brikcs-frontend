<template>
  <div>
    <div>
      <v-row class="board-brand">
        <v-col cols="12" sm="6" md="4">
          <v-card>
            <v-card-title>
              <i class="fa fa-wallet" />{{ defaultMessages.length }} Template Messages
            </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card>
            <v-card-title> {{ customMessages.length }} Brand messages </v-card-title>
            <v-card-text>
              <v-btn @click="addCustomMessage()">
                <i class="fa fa-plus" /> Add Message
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-toolbar dark flat>
              <template #extension>
                <v-tabs v-model="tab" align-with-title>
                  <v-tabs-slider color="yellow" />

                  <v-tab :key="1">
                    Template Messages
                  </v-tab>
                  <v-tab :key="2">
                    Audience Messages
                  </v-tab>
                </v-tabs>
              </template>
            </v-toolbar>
            <v-tabs-items v-model="tab">
              <v-tab-item :key="1">
                <v-row class="mt-4">
                  <v-col>
                    <template>
                      <v-simple-table dark>
                        <template #default>
                          <thead>
                            <tr>
                              <th class="text-left">
                                Title
                              </th>
                              <th class="text-left">
                                Category
                              </th>
                              <th class="text-left">
                                Message Body
                              </th>
                              <th class="text-left">
                                Delivery Type
                              </th>
                              <th class="text-left">
                                Date
                              </th>
                              <th class="text-left">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in _defaultMessages" :key="item.name">
                              <td>{{ item.title }}</td>
                              <td>{{ item.category }}</td>
                              <td>{{ item.messageBody }}</td>
                              <td>{{ item.deliveryType }}</td>
                              <td>{{ item.sendDay }}</td>
                              <td>
                                <v-btn color="green" @click="cloneMessage(index)">
                                  Copy Template
                                </v-btn>
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </template>
                  </v-col>
                </v-row>
              </v-tab-item>
              <v-tab-item :key="2">
                <v-row class="mt-4">
                  <v-col>
                    <template>
                      <v-simple-table dark>
                        <template #default>
                          <thead>
                            <tr>
                              <th class="text-left">
                                Title
                              </th>
                              <th class="text-left">
                                Category
                              </th>
                              <th class="text-left">
                                Message Body
                              </th>
                              <th class="text-left">
                                Delivery Type
                              </th>
                              <th class="text-left">
                                Date
                              </th>
                              <th class="text-left">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <template v-if="!customMessages.length">
                              <p>Please clone message from the template message</p>
                            </template>
                            <tr v-for="(item, index) in _customMessages" :key="item.name">
                              <td>{{ item.title }}</td>
                              <td>{{ item.category }}</td>
                              <td>{{ item.messageBody }}</td>
                              <td>{{ item.deliveryType }}</td>
                              <td>{{ item.sendDay }}</td>
                              <td class="d-flex flat tile">
                                <v-row>
                                  <v-col cols="6 d-flex align-center justify-center">
                                    <v-btn @click="editCustomMessage(index)">
                                      Edit
                                    </v-btn>
                                  </v-col>
                                  <!-- <v-col cols="4">
                                    <v-switch
                                      v-model="item.status"
                                      class="ma-0"
                                      width="200"
                                      inset
                                      hide-details
                                    />
                                  </v-col> -->
                                  <v-col cols="6 d-flex align-center justify-center">
                                    <v-icon @click="deleteCustomMessage(item, index)">
                                      mdi-delete
                                    </v-icon>
                                  </v-col>
                                </v-row>
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </template>
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
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
          <v-subheader>Edit Message</v-subheader>
          <v-text-field v-model="edit.title" label="Title" />
          <v-text-field v-model="edit.messageBody" label="Message Body" />
          <v-select v-model="edit.category" :items="categoryOptions" label="Category" />
          <v-select v-model="edit.deliveryType" :items="deliveryTypeOptions" label="Delivery Time" />
          <v-select v-if="edit.deliveryType === 'OnEventDay'" v-model="edit.repeat" :items="repeatTime" label="Repeat" />
          <v-row v-if="edit.deliveryType === 'OnEventDay'" justify="center">
            <v-col><v-date-picker v-model="picker" /></v-col>
          </v-row>
          <v-btn class="mt-5 blue full-width" @click="saveMessage()">
            {{ _saveBtn }}
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
      brandId: '',
      userId: '',
      token: '',
      headers: {},
      categoryOptions: ['everyone', 'male', 'female'],
      deliveryTypeOptions: ['Everyday', 'Birthday', 'OnEventDay', 'EveryMonth'],
      tab: null,
      picker: new Date().toISOString().substr(0, 10),
      openwise: false,
      defaultMessages: [],
      customMessages: [],
      edit: {},
      repeatTime: ['once', 'always'],
      edittingMode: false,
      editIndex: 0
    }
  },
  fetch () {
    const token = this.$store.getters.getToken
    const userData = this.$store.getters.getUserData
    this.brand = this.$store.getters.getBrand
    const { userId } = userData
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
    this.getDefaultMessage()
    this.getCustomMessage()
  },
  computed: {
    _defaultMessages () {
      const msg = this.defaultMessages
      const _m = msg.map((message) => {
        const { deliveryType } = message
        if (deliveryType === 'Birthday') {
          message.sendDay = 'Birthday'
        } else if (deliveryType === 'OnEventDay') {
          const { date } = message
          const { day, month } = date
          const _d = new Date(`${month}-${day}`).toString().split(' ')
          const _day = _d[2]
          const _month = _d[1]
          message.sendDay = `${_month} ${_day}`
        } else if (deliveryType === 'EveryMonth') {
          message.sendDay = 'every 01'
        }
        return message
      })
      return _m
    },
    _customMessages () {
      const msg = this.customMessages
      const _m = msg.map((message) => {
        console.log(message, 'her message')
        const { deliveryType } = message
        if (deliveryType === 'Birthday') {
          message.sendDay = 'Birthday'
        } else if (deliveryType === 'OnEventDay') {
          const { date } = message
          const { day, month } = date
          const _d = new Date(`${month}-${day}`).toString().split(' ')
          const _day = _d[2]
          const _month = _d[1]
          message.sendDay = `${_month} ${_day}`
        } else if (deliveryType === 'EveryMonth') {
          message.sendDay = 'Every 01'
        }
        return message
      })
      return _m
    },
    _saveBtn () {
      return this.edittingMode ? 'UPDATE' : 'CREATE'
    }
  },
  methods: {
    pickerDate () {
      const date = this.edit.date
      console.log(date, 'date here')
      if (date) {
        const { month, day } = date
        const d = new Date()
        d.setDate(day)
        d.setMonth(month - 1)
        console.log(d, 'date here ic coming home')
        this.picker = d.toISOString().substr(0, 10)
      }
    },
    addCustomMessage (index) {
      this.edittingMode = false
      this.openwise = true
      this.editIndex = index
      this.pickerDate()
    },
    cloneMessage (index) {
      const msg = this.defaultMessages[index]
      this.edit = {
        messageBody: msg.messageBody,
        title: msg.title,
        category: msg.category,
        deliveryType: msg.deliveryType,
        date: msg.date ? msg.date : null,
        status: true
      }
      this.addCustomMessage(index)
    },
    saveMessage () {
      const index = this.editIndex
      this.edittingMode ? this.updateMessage(index) : this.saveNewMessage()
      this.openwise = false
      // this.edit = {}
    },
    saveNewMessage () {
      const url = 'https://mayasms.herokuapp.com/api/custom-message/add'
      const body = this.parseMessageBodyDate()
      this.$axios.post(url, body, this.headers)
        .then((response) => {
          const { data } = response
          this.customMessages.push(data.response)
          console.log('added')
        })
        .catch((err) => {
          console.log(err, 'error')
        })
    },
    updateMessage (index) {
      const { id: messageId } = this.edit
      const url = `https://mayasms.herokuapp.com/api/custom-message/update/${messageId}`
      const body = this.parseMessageBodyDate()
      this.$axios.patch(url, body, this.headers)
        .then((response) => {
          const { data } = response
          // this.customMessages[index] = data.response
          this.customMessages.splice(index, 1, data.response)
          // this._customMessages([index] = data.response)
          console.log('added', this.customMessages)
        })
        .catch((err) => {
          console.log(err, 'error')
        })

      this.openwise = false
      this.edit = {}
    },
    parseMessageBodyDate () {
      const body = {
        ...this.edit,
        isCustom: false,
        brandId: this.brandId,
        repeat: this.edit.repeat !== 'Once'
      }
      const [year, month, day] = this.picker.split('-')
      const notTouch = ['Birthday', 'EveryDay']
      if (!notTouch.includes(this.edit.deliveryType)) {
        body.date = { month }
        if (this.edit.deliveryType === 'OnEventDay') {
          body.date.day = day
        }
      }
      return body
    },
    getCustomMessage () {
      const url = `https://mayasms.herokuapp.com/api/custom-message/view?brandId=${this.brandId}`
      this.$axios.get(url, this.headers)
        .then((response) => {
          const { data } = response
          const { response: messages } = data
          this.customMessages = messages
        })
        .catch((err) => {
          console.log(err, 'error')
        })
    },
    getDefaultMessage () {
      const url = 'https://mayasms.herokuapp.com/api/default-message/view-all'
      this.$axios.get(url, this.headers)
        .then((response) => {
          const { data } = response
          const { response: messages } = data
          this.defaultMessages = messages
        })
        .catch((err) => {
          console.log(err, 'error')
        })
    },
    deleteCustomMessage (item, index) {
      const { id } = item
      const url = `https://mayasms.herokuapp.com/api/custom-message/delete/${id}`
      this.$axios.delete(url, this.headers)
        .then((response) => {
          this.customMessages.splice(index, 1)
          console.log('deleted')
          alert('deleted')
        })
        .catch((err) => {
          console.log(err, 'error')
        })
    },
    editCustomMessage (index) {
      this.edit = this.customMessages[index]
      this.addCustomMessage(index)
      this.edittingMode = true
    }
  }
}
</script>

<style></style>

/* eslint-disable no-undef */
<template>
  <div class="main">
    <div class="main_c">
      <v-row>
        <v-col cols="12" md="6">
          <div class="bar-card">
            Question
          </div>
          <div class="prompt-card pa-3">
            <div>{{ question.title }}</div>
            <div class="question-body my-5">
              {{ question.body }}
            </div>
            <div v-if="question.tests">
              <div v-for="(test, index) in question.tests" :key="index" class="question-test pa-3 my-5">
                <div class="test-input px-3">
                  <div>sample input</div>
                  <div style="background: #262C3C; border-radius:3px" class="pa-3">
                    {{ test.input }}
                  </div>
                </div>
                <div class="test-output px-3">
                  <div>sample output</div>
                  <div style="background: #262C3C; border-radius:3px" class="pa-3">
                    {{ test.output }}
                  </div>
                </div>
              </div>
            </div>
            <div v-if="question.hints" class="hints pa-2">
              <div style="color: skyblue; background:#262C3C; border-radius:3px" class="d-flex justify-center">
                Hints
              </div>
              <div v-for="(hint, index) in question.hints" :key="index">
                <div>{{ hint }}</div>
              </div>
            </div>
            <div v-if="question.constrains" class="constrains hints pa-2 mt-5">
              <div style="color: skyblue; background:#262C3C; border-radius:3px" class="d-flex justify-center">
                Constrains
              </div>
              <div v-for="(constrain, index) in question.constrains" :key="index">
                <div>{{ constrain }}</div>
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="bar-card d-flex justify-space-between">
            <div>
              Javascript
            </div>
            <div>
              <span class="codeRunner" @click="runCode()">Run</span>
            </div>
          </div>
          <div class="prompt-card">
            <textarea id="editor" ref="editor" v-model="editor" />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="bar-card d-flex pa-0">
            <div class="pa-1 px-5 mr-2 console-tab" :class="[test_console_active]" @click="switchConsoleTab(1)">
              Tests
            </div>
            <div class="pa-1 px-5 mr-2 console-tab" :class="[console_console_active]" @click="switchConsoleTab(2)">
              Console
            </div>
          </div>
          <div class="prompt-card console pa-3">
            <div v-if="test_console_active" class="test-console">
              <div>2/2 test cases passed</div>
              <div class="test-case">
                <div>
                  <v-expansion-panels>
                    <v-expansion-panel v-for="(test, index) in codeOutput.response.tests" :key="index" style="background-color:#2C344C; color: white" class="mt-5">
                      <v-expansion-panel-header>
                        <div>
                          <span v-if="test.status==='fail'" style="color: red">
                            <i class="fa fa-close" />
                          </span>
                          <span v-else>
                            <i class="fa fa-check" style="color: green" />
                          </span>
                        </div>
                        <div>Test case {{ test.status }}ed</div>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content style="background:#262C3C">
                        <div class="test-output hints pa-2 mt-2" style="color:white">
                          <div>Your Output</div>
                          <div class="pa-3 test-card">
                            {{ test.output }}
                          </div>
                          <div>Expected Output</div>
                          <div class="pa-3 test-card">
                            {{ test.expected }}
                          </div>
                          <div>Test Input</div>
                          <div class="pa-3 test-card">
                            {{ test.input }}
                          </div>
                        </div>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>
              </div>
            </div>
            <div v-if="console_console_active" class="console-console pa-2">
              <pre class="console.terminal-text" style="color: gray; font-size: 12px">{{ codeOutput.response.logs.join('\n') }}</pre>
            </div>
          </div>
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
      editor: '//code below\nfunction nextSq(sequence){\n\t// your code here \n}',
      codeCode: 'code',
      question: {
        title: 'Even Number Sequence',
        level: 'easy',
        body: 'Tara new school games are fun and weird, they make her think and she is already loosing interest; Help Tara find the answer to the game. What is the next number in the sequence?',
        hints: [ // hinta are going to be array
          'loop',
          'even'
        ],
        tests: [
          {
            input: [2, 4, 6],
            output: 8
          },
          {
            input: [14, 16, 18],
            output: 20
          }
        ],
        constrains: [
          '10 <= n <= 99',
          'first digit is an even number'
        ]
      },
      codeOutput: {
        message: 'good',
        response: {
          tests: [],
          passes: 0,
          logs: []
        }
      },
      test_console_active: 'console-active',
      console_console_active: '',
      levelId: ''
    }
  },
  fetch () {
    this.levelId = this.$store.getters.getLevelId
  },
  mounted () {
    const editCode = this.$refs.editor
    // eslint-disable-next-line no-undef
    this.editor = CodeMirror.fromTextArea(editCode, {
      lineNumbers: true,
      mode: 'javascript',
      theme: 'dracula',
      lineWrapping: true,
      styleActiveLine: true,
      matchBrackets: true,
      indentUnit: 4,
      indentWithTabs: true,
      autoCloseTags: true,
      autoCloseBrackets: true,
      matchTags: true,
      extraKeys: {
        'Ctrl-Space': 'autocomplete'
      },
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
    })
  },
  methods: {
    switchConsoleTab (tab) {
      if (tab === 1) {
        this.test_console_active = 'console-active'
        this.console_console_active = ''
      }
      if (tab === 2) {
        this.test_console_active = ''
        this.console_console_active = 'console-active'
      }
    },
    getCode () {
      const code = this.editor.getValue()
      this.codeCode = `${code}`
      console.log(code)
    },
    runCode () {
      const text = this.editor.getValue()
      const url = 'http://localhost:3280/home'
      console.log(this.editor.getValue())
      this.$axios.post(url, {
        code: text,
        codeName: 'nextSq'
      })
        .then((response) => {
          console.log(response)
          this.codeOutput = response.data
        })
        .catch((err) => {
          console.log(err.response, 'error is here')
        })
    },
    getLevelQuestion () {
      const url = 'http://localhost:3280/api/category/view'

    }
  }
}
</script>

<style>
.test-output {

}
.prompt-card {
  background-color: #262C3C;
  border-radius: 3px;
  height: 300px;
  overflow: scroll;
  color: #f1f2f2;
}
.bar-card {
  background:#2C344C;
  border-radius:5px 5px 0px 0px;
  padding:10px;
  margin-bottom:-3px;
  position: relative;
  z-index:20 !important;
  color: #f1f1f1;
  font-size:20px;
}
.question-test {
  background: #2C344C;
  border-radius:3px;
  border-left: solid 3px yellow;
  padding-left: 10px;
}
.hints {
  background: #2C344C;
  border-radius:3px;
  border-left: solid 3px rgb(61, 128, 35);
  padding-left: 10px;
}
.test-card {
  background: rgb(38, 44, 60);
  border-radius: 3px;
}
.console {
  /* background: rgb(89, 100, 84); */
  /* height: 30vh */
  overflow: scroll;
}
.console-active {
  background: #262C3C
}
.console-tab {
  cursor: pointer;
}
.codeRunner {
  cursor: pointer;
}
 </style>

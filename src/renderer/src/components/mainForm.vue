<template>
  <div class="container-fluid pt-5">
    <div class="container shadow-lg rounded-3 p-5 border bg-body mb-5">
      <h2 class="fw-bold">Dalaix by Ben Herbst</h2>
      <p>
        Install Dalaix the simple and easy way. Just fill out this form and press install!
        <br />
        Start and stop Dalai via the Start menu entries
      </p>
      <h3>General</h3>
      <label class="form-label" for="directory">Select install directory:</label>
      <input type="text" class="form-control" placeholder="Install directory" id="directory" v-model="installDirectory"/>
      <h3 class="mt-3">Model</h3>
      <p class="form-label">Select model:</p>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          id="flexRadioLlama"
          value="llama"
          v-model="modelType"
        />
        <label class="form-check-label" for="flexRadioLlama"> LLaMA </label>
      </div>
      <div class="form-check mb-2">
        <input
          class="form-check-input"
          type="radio"
          id="flexRadioAlpaca"
          value="alpaca"
          checked
          v-model="modelType"
        />
        <label class="form-check-label" for="flexRadioAlpaca"> Alpaca </label>
      </div>
      <select v-model="selectedModel" class="form-select form-control">
        <option value="7B" selected>7B Model</option>
        <option>13B Model</option>
        <!-- llama exclusive -->
        <option value="30B" v-if="modelType == 'llama'">30B Model</option>
        <option value="65B" v-if="modelType == 'llama'">65B Model</option>
      </select>
      <h3 class="mt-3">Run</h3>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="startMenuRunCheck" v-model="runEntry" />
        <label class="form-check-label" for="startMenuRunCheck">Run entry in start menu?</label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="startMenuStopCheck"
          v-model="stopEntry"
        />
        <label class="form-check-label" for="startMenuStopCheck">Stop entry in start menu?</label>
      </div>
      <div class="form-check mb-3">
        <input class="form-check-input" type="checkbox" id="autostartCheck" v-model="autostart" />
        <label class="form-check-label" for="autostartCheck">Autostart entry for Dalai?</label>
      </div>
      <div class="d-flex flex-md-row flex-column">
        <button
          class="btn btn-primary px-5 endButton mb-md-0 mb-2"
          id="sendButton"
          @click="install"
          data-bs-toggle="modal"
          data-bs-target="#popup"
        >
          Install Dalai
        </button>
        <button
          class="ms-md-2 btn btn-outline-secondary px-3 endButton"
          id="cancelButton"
          @click="close"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedModel: '7B',
      autostart: false,
      runEntry: true,
      stopEntry: true,
      modelType: 'alpaca',
      installDirectory: 'C:\\Dalai\\'
    }
  },
  methods: {
    install() {
      console.log('Installing Dalai ...')
      window.api.install(
        this.autostart,
        this.runEntry,
        this.stopEntry,
        this.selectedModel,
        this.modelType,
        this.installDirectory
      )
    },
    close() {
      window.api.closeApp()
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/styles.scss';

.endButton {
  line-height: 2.1em !important;
}
</style>

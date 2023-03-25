<template>
  <div class="container my-5 shadow-lg rounded-3 p-5 border">
    <h2 class="fw-bold">Dalaix by Ben Herbst</h2>
    <p>Install Dalaix the simple and easy way.
      Just fill out this form and press install!
      <br />
      Start and stop Dalai via the Start menu entries
    </p>
    <h3>Model</h3>
    <p class="form-label">Select model:</p>
    <select v-model="selected" class="mb-3 form-select form-control">
      <option selected>7B Model</option>
      <option>13B Model</option>
      <option>30B Model</option>
      <option>65B Model</option>
    </select>
    <h3>Run</h3>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="startMenuRunCheck" v-model="runEntry">
      <label class="form-check-label" for="startMenuRunCheck">Run entry in start menu?</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="startMenuStopCheck" v-model="stopEntry">
      <label class="form-check-label" for="startMenuStopCheck">Stop entry in start menu?</label>
    </div>
    <div class="form-check mb-3">
      <input class="form-check-input" type="checkbox" id="autostartCheck" v-model="autostart">
      <label class="form-check-label" for="autostartCheck">Autostart entry for Dalai?</label>
    </div>
    <div class="d-flex flex-md-row flex-column">
      <button class="btn btn-primary px-5 endButton mb-md-0 mb-2" id="sendButton" @click="install">Install Dalai</button>
      <button class="ms-md-2 btn btn-outline-secondary px-3 endButton" id="cancelButton">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "7B Model",
      autostart: false,
      runEntry: true,
      stopEntry: true,
      installDocker: true,
      installNpm: true
    }
  },
  methods: {
    async install() {
      console.log("Installing Dalai ...")
      window.api.install(this.autostart, this.runEntry, this.stopEntry, this.installNpm, this.installDocker, this.selected)
    }
  }
}
</script>

<style lang="scss">
@import './assets/css/styles.scss';

.endButton {
  line-height: 2.1em !important;
}
</style>

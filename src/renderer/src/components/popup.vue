<template>
  <div
    class="modal fade"
    id="popup"
    tabindex="-1"
    aria-labelledby="Label"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="Label">Installing Dalai</h5>
          <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
        </div>
        <div class="modal-body">
          <div class="progress" role="progressbar" aria-label="Animated striped example">
            <div
              v-if="installProgress != null"
              class="progress-bar"
              :class="{
                'progress-bar-striped': installed == false,
                'progress-bar-animated': installed == false,
                'bg-success': installed == true,
              }"
              :style="{ width: installProgress + '%' }"
            ></div>
          </div>
          <div class="d-flex justify-content-center">
            <p class="p-0 m-0 pt-2" v-if="installText != null">{{ installText }}</p>
          </div>
          <div class="d-flex justify-content-center mt-3 mb-2" v-if="installed">
            <button type="button" class="btn btn-primary px-5" @click="close">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      installText: null,
      installProgress: null,
      installed: false
    }
  },
  mounted: function () {
    window.api.onProgress(() => {
      this.getInstallProgress()
    })
  },
  methods: {
    finishInstall() {
      this.installed = true
      this.installText = 'Successfully installed Dalai'
      this.installProgress = 100
    },
    getInstallProgress: async function () {
      const installProgress = await window.api.getInstallProgress()
      this.installText = installProgress.progressText
      this.installProgress = installProgress.progress
      if (this.installProgress == 100) {
        this.installed = true
      }
    },
    close() {
      window.api.closeApp()
    }
  }
}
</script>

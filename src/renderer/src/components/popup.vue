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
          <div
            class="progress"
            role="progressbar"
            aria-label="Animated striped example"
            aria-valuenow="50"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              class="progress-bar progress-bar-striped progress-bar-animated"
              style="width: 75%"
            ></div>
          </div>
          <div class="d-flex justify-content-center">
            <p class="p-0 m-0 pt-2">{{ installText }}</p>
          </div>
          <div class="d-flex justify-content-center mt-3 mb-2" v-if="installed">
            <button type="button" class="btn btn-primary px-5">Close</button>
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
            installed: false,
            installText: "Installing Dalai..."
        }
    },
    methods: {
        finishInstall() {
            this.installed = true;
            this.installText = "Successfully installed Dalai";
        },
    }
}
</script>
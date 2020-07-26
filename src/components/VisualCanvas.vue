<template>
  <div class="visual-canvas-wrapper flex flex-auto">
    <canvas ref="visual-canvas"></canvas>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "VisualCanvas",
  props: {
    data: null,
  },
  watch: {
    data: function () {
      this.provider.context.clearRect(0, 0, this.$refs["visual-canvas"].width, this.$refs["visual-canvas"].height);
    }
  },
  data() {
    return {
      // By creating the provider in the data property, it becomes reactive,
      // so child components will update when `context` changes.
      provider: {
        // This is the CanvasRenderingContext that children will draw to.
        context: null,
      },
    };
  },

  // Allows any child component to `inject: ['provider']` and have access to it.
  provide() {
    return {
      provider: this.provider,
    };
  },

  mounted() {
    // We can't access the rendering context until the canvas is mounted to the DOM.
    // Once we have it, provide it to all child components.
    this.provider.context = this.$refs["visual-canvas"].getContext("2d");
    this.provider.context.clearRect(0, 0, this.$refs["visual-canvas"].width, this.$refs["visual-canvas"].height);

    // Resize the canvas to fit its parent's width.
    // Normally you'd use a more flexible resize system.
    this.$refs["visual-canvas"].width = this.$refs[
      "visual-canvas"
    ].parentElement.clientWidth;
    this.$refs["visual-canvas"].height = this.$refs[
      "visual-canvas"
    ].parentElement.clientHeight;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

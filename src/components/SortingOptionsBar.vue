<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item md-small-size-100 md-xsmall-size-100">
      <md-field>
        <label for="algorithm">Sorting algorithm</label>
        <md-select v-model="algorithm" name="algorithm" id="algorithm">
          <md-option value="bubble-sort">Bubble Sort</md-option>
          <md-option value="insertion-sort">Insertion Sort</md-option>
          <md-option value="merge-sort">Merge Sort</md-option>
          <md-option value="quick-sort">Quick Sort</md-option>
        </md-select>
      </md-field>
    </div>

    <div class="md-layout-item md-medium-size-100 md-small-size-100 md-xsmall-size-100 data-size">
      <div class="md-field md-theme-default md-has-value">
        <label for="data-size">Data Size</label>
        <RangeSlider class="range-slider" v-on:slider-change="sliderChange" />
      </div>
    </div>

    <div
      class="button-container md-layout-item md-layout md-alignment-top-center md-medium-size-100 md-large-size-30 md-small-size-100 md-xsmall-size-100"
    >
      <div class="mb1">
        <md-button class="md-raised md-accent reset-button" v-on:click="resetButtonClick">Reset</md-button>
      </div>
      <div class="mb1">
        <md-button
          class="md-raised md-primary sort-button"
          v-on:click="sortButtonClick"
          :disabled="sorting"
        >Sort</md-button>
      </div>
    </div>
  </div>
</template>

<script>
import RangeSlider from "./RangeSlider";
export default {
  name: "OptionsBar",
  props: {
    font: String,
    sorting: Boolean,
  },
  components: {
    RangeSlider,
  },
  data() {
    return {
      algorithm: "bubble-sort",
      dataSizeValue: 50,
    };
  },
  methods: {
    sliderChange(e) {
      this.dataSizeValue = e;
      this.$emit("data-size-change", e);
    },
    sortButtonClick() {
      this.$emit("sort-button-click", this.algorithm);
    },
    resetButtonClick() {
      this.$emit("data-size-change", this.dataSizeValue);
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.data-size {
  .md-field.md-theme-default:after {
    background-color: initial;
  }
}
.sort-button,
.reset-button {
  height: 44px;
}
.range-slider {
  padding-top: 18px;
}
.md-card-content {
  padding-bottom: 0 !important;
}
.button-container {
  min-width: 250px;
  margin-bottom: 20px;
}
</style>

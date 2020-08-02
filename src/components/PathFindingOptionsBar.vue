<template>
  <div class="flex flex-row">
    <div class="col-2">
      <md-field>
        <label for="algorithm">Pathfinding algorithm</label>
        <md-select v-model="algorithm" name="algorithm" id="algorithm">
          <md-option value="dijkstra">Dijkstra's algorithm</md-option>
          <md-option value="breadth-first">Breadth-first search</md-option>
          <md-option value="depth-first">Depth-first search</md-option>
          <md-option value="a-star-search">A* search</md-option>
        </md-select>
      </md-field>
    </div>

    <div class="col-5 p1 pl3">
      <div>
        <md-radio v-model="mode" value="wall">Add Walls</md-radio>
        <md-radio v-model="mode" value="start">Set Starting Point</md-radio>
        <md-radio v-model="mode" value="end">Set Ending Point</md-radio>
        <md-radio v-model="mode" value="normal">Clear cells</md-radio>
      </div>
    </div>

    <div class="col-4 flex flex-row">
      <div class="mb1">
        <md-button class="md-raised md-accent reset-button" v-on:click="resetButtonClick" :disabled="running">Reset</md-button>
      </div>
       <div class="mb1">
        <md-button 
          class="md-raised reset-button"
          v-on:click="clearWallsButtonClick"
          :disabled="running">Clear Walls</md-button>
      </div>
      <div class="mb1">
        <md-button
          class="md-raised md-primary sort-button"
          v-on:click="actionButtonClick"
          :disabled="running"
        >Visualize</md-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OptionsBar",
  props: {
    running: Boolean,
  },
  components: {},
  watch: {
      mode() {
          this.$emit("mode-change", this.mode);
      },
      algorithm() {
        this.$emit("algorithm-change", this.algorithm);
      }
  },
  data() {
    return {
      mode: 'wall',
      algorithm: "dijkstra",
      dataSizeValue: 50,
    };
  },
  methods: {
    sliderChange(e) {
      this.dataSizeValue = e;
      this.$emit("data-size-change", e);
    },
    actionButtonClick() {
      this.$emit("action-button-click", this.algorithm);
    },
    resetButtonClick() {
      this.$emit("reset-button-click", this.dataSizeValue);
    },
    clearWallsButtonClick() {
      this.$emit("clear-walls-button-click");
    }
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

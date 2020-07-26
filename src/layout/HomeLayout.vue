<template>
  <div class="wrapper">
    <md-toolbar class="md-primary">
      <span class="md-title">{{ title }}</span>
    </md-toolbar>

    <div class="md-layout md-alignment-center">
      <md-card
        class="md-layout-item md-large-size-60 md-small-size-90 md-xsmall-size-90 mt3 m2 h100"
      >
        <md-card-content class="pb0">
          <OptionsBar
            v-bind:sorting="sorting"
            v-on:data-size-change="dataSizeChange"
            v-on:sort-button-click="sortArray"
          />
        </md-card-content>
      </md-card>
    </div>
    <div class="md-layout md-alignment-center graph-wrapper">
      <md-card class="flex flex-auto w60 xs-w90 sm-w90 md-small-size-90 md-xsmall-size-90 h100 mb2">
        <md-card-content class="pb0 flex flex-auto w100">
          <!-- These are the custom components we'll create -->
          <!-- Values for `my-box` are percentages of the width of the canvas. -->
          <!-- Each bar will take up an equal space of the canvas. -->
          <VisualCanvas class="flex-auto w100" v-bind:data="chartValues">
            <Bar
              v-for="(obj, index) of chartValues"
              v-bind:key="index"
              v-bind:time="new Date().getTime()"
              :x1="((index / chartValues.length) * 100)"
              :x2="((index / chartValues.length) * 100) + (100 / chartValues.length)"
              :y1="100"
              :y2="100 - obj.value"
              :color="obj.color"
              :value="obj.value"
            ></Bar>
          </VisualCanvas>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import OptionsBar from "../components/OptionsBar.vue";
import VisualCanvas from "../components/VisualCanvas.vue";
import Bar from "../components/Bar.vue";

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default {
  name: "Normal",
  props: ["title"],
  components: {
    OptionsBar,
    VisualCanvas,
    Bar,
  },
  data() {
    return {
      sorting: false,
      defaultBarColor: "#72a8ff",
      swappingBarcolor: "red",
      sortedBarColor: "#ed5aed",
      chartValues: Array.from({ length: 50 }, () => ({
        color: this.defaultBarColor,
        value: Math.floor(Math.random() * 99) + 1,
      })),
    };
  },
  methods: {
    dataSizeChange(e) {
      this.sorting = false;
      this.chartValues = Array.from({ length: e }, () => ({
        color: this.defaultBarColor,
        value: Math.floor(Math.random() * 99) + 1,
      }));
    },
    async sortArray(algorithm) {
      switch (algorithm) {
        case "bubble-sort": {
          this.bubbleSort();
          break;
        }
        case "insertion-sort": {
          this.insertionSort();
          break;
        }
      }
    },
    async bubbleSort() {
      if (!this.sorting) {
        this.sorting = true;
      } else {
        return;
      }
      for (let i = 0; i < this.chartValues.length; i++) {
        if (!this.sorting) {
          break;
        }
        for (let j = 0; j < this.chartValues.length - i - 1; j++) {
          if (!this.sorting) {
            break;
          }
          if (this.chartValues[j].value > this.chartValues[j + 1].value) {
            this.chartValues[j].color = this.swappingBarcolor;
            this.chartValues[j + 1].color = this.swappingBarcolor;
            await delay(10);
            swap(this.chartValues, j, j + 1);
            await delay(10);
            this.chartValues[j].color = this.defaultBarColor;
            this.chartValues[j + 1].color = this.defaultBarColor;
          }
        }
        if (this.sorting) {
          this.chartValues[
            this.chartValues.length - 1 - i
          ].color = this.sortedBarColor;
        }
      }
    },
    async insertionSort() {
      if (!this.sorting) {
        this.sorting = true;
      } else {
        return;
      }
      for (let i = this.chartValues.length - 1; i >= 0; i--) {
        let maxValue = this.chartValues[0].value;
        let maxIndex = 0;
        for (let j = 1; j < i; j++) {
          if (this.chartValues[j].value > maxValue) {
            maxValue = this.chartValues[j].value;
            maxIndex = j;
          }
        }
        if (this.chartValues[maxIndex].value > this.chartValues[i].value) {
          this.chartValues[i].color = this.swappingBarcolor;
          this.chartValues[maxIndex].color = this.swappingBarcolor;
          await delay(10);
          swap(this.chartValues, maxIndex, i);
          await delay(10);
          this.chartValues[maxIndex].color = this.defaultBarColor;
        }
        this.chartValues[i].color = this.sortedBarColor;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.md-content.md-theme-default {
  background-color: #fafafa;
}

.md-layout-item {
  height: 40px;
  margin-top: 8px;
  margin-bottom: 8px;

  &:after {
    width: 100%;
    height: 100%;
    display: block;
    content: " ";
  }
}
.pb0 {
  padding-bottom: 0 !important;
}
.h100 {
  height: 100%;
}
.w100 {
  width: 100%;
}
.w60 {
  width: 60%;
}
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.graph-wrapper {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}
.flex-auto {
  flex: 1 1 auto !important;
}
@media (max-width: 600px) {
  .xs-w90 {
    min-width: 90%;
    max-width: 90%;
    flex: 0 1 90%;
  }
}

@media (max-width: 960px) {
  .sm-w90 {
    min-width: 90%;
    max-width: 90%;
    flex: 0 1 90%;
  }
}
</style>
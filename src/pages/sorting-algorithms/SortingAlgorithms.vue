<template>
  <div class="flex flex-column flex-auto items-center">
    <div class="w-100 mb1">
      <md-card>
        <md-card-content class="pb0">
          <SortingOptionsBar
            v-bind:sorting="sorting"
            v-on:data-size-change="dataSizeChange"
            v-on:sort-button-click="sortArray"
          />
        </md-card-content>
      </md-card>
    </div>
    <div class="w-100 min-h-65vh flex flex-auto mb1">
      <md-card class="flex flex-auto">
        <md-card-content class="pb0 flex flex-auto w-100">
          <!-- These are the custom components we'll create -->
          <!-- Values for `my-box` are percentages of the width of the canvas. -->
          <!-- Each bar will take up an equal space of the canvas. -->
          <VisualCanvas class="flex-auto w-100" v-bind:data="chartValues">
            <Bar
              v-for="(obj, index) of chartValues"
              v-bind:key="index"
              v-bind:time="new Date().getTime()"
              :x1="(index / chartValues.length) * 100"
              :x2="
                (index / chartValues.length) * 100 + 100 / chartValues.length
              "
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
import SortingOptionsBar from "../../components/SortingOptionsBar.vue";
import VisualCanvas from "../../components/VisualCanvas.vue";
import Bar from "../../components/Bar.vue";
import { delay, swap } from "../../utils/common.utils";

export default {
  name: "SortingAlgorithms",
  components: {
    SortingOptionsBar,
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
      if (!this.sorting) {
        this.sorting = true;
      } else {
        return;
      }
      switch (algorithm) {
        case "bubble-sort": {
          this.bubbleSort();
          break;
        }
        case "insertion-sort": {
          await this.insertionSort();
          for (let i = 0; i < this.chartValues.length; i++) {
            this.chartValues[i].color = this.sortedBarColor;
          }
          break;
        }
        case "quick-sort": {
          await this.quickSort(
            this.chartValues,
            0,
            this.chartValues.length - 1
          );
          for (let i = 0; i < this.chartValues.length; i++) {
            this.chartValues[i].color = this.sortedBarColor;
          }
          break;
        }
        case "merge-sort": {
          await this.mergeSort(
            this.chartValues,
            0,
            this.chartValues.length - 1
          );
          for (let i = 0; i < this.chartValues.length; i++) {
            this.chartValues[i].color = this.sortedBarColor;
          }
          break;
        }
      }
    },
    async bubbleSort() {
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
          this.chartValues[this.chartValues.length - 1 - i].color =
            this.sortedBarColor;
        }
      }
    },
    async insertionSort() {
      for (let i = 1; i < this.chartValues.length; i++) {
        let j = i - 1;
        while (
          j >= 0 &&
          this.chartValues[j].value > this.chartValues[j + 1].value
        ) {
          this.chartValues[j].color = this.swappingBarcolor;
          this.chartValues[j + 1].color = this.swappingBarcolor;
          await delay(10);
          swap(this.chartValues, j, j + 1);
          await delay(10);
          this.chartValues[j].color = this.defaultBarColor;
          this.chartValues[j + 1].color = this.defaultBarColor;
          j--;
        }
      }
    },
    async quickSort(array, start, end) {
      if (start < end) {
        const pivotIndex = await this.partition(array, start, end);
        await Promise.all([
          this.quickSort(array, start, pivotIndex - 1),
          this.quickSort(array, pivotIndex + 1, end),
        ]);
      }
    },
    async partition(array, start, end) {
      let pivot = array[end].value;
      let i = start;
      for (let j = start; j <= end - 1; j++) {
        if (array[j].value < pivot) {
          array[i].color = this.swappingBarcolor;
          array[j].color = this.swappingBarcolor;
          swap(array, i, j);
          await delay(50);
          array[i].color = this.defaultBarColor;
          array[j].color = this.defaultBarColor;
          i++;
        }
      }
      swap(array, end, i);
      array[i].color = this.sortedBarColor;
      await delay(50);
      return i;
    },
    async mergeSort(array, start, end) {
      if (start < end) {
        const middle = Math.floor(start + (end - start) / 2);
        Promise.all([
          await this.mergeSort(array, start, middle),
          await this.mergeSort(array, middle + 1, end),
        ]);
        await this.merge(array, start, middle, end);
      }
    },
    async merge(array, start, middle, end) {
      const L = [];
      const R = [];
      const n1 = middle - start + 1;
      const n2 = end - middle;
      for (let i = 0; i < n1; i++) {
        L.push(array[start + i]);
      }
      for (let j = 0; j < n2; j++) {
        R.push(array[middle + 1 + j]);
      }

      let i = 0;
      let j = 0;
      let k = start;
      while (i < n1 && j < n2) {
        if (L[i].value <= R[j].value) {
          array[k] = L[i];
          i++;
        } else {
          array[k] = R[j];
          j++;
        }
        array[k].color = this.swappingBarcolor;
        await delay(20);
        k++;
      }

      while (i < n1) {
        array[k] = L[i];
        await delay(20);
        i++;
        k++;
      }

      while (j < n2) {
        array[k] = R[j];
        await delay(20);
        j++;
        k++;
      }

      for (let j = start; j < k; j++) {
        array[j].color = this.defaultBarColor;
      }
      await delay(20);
    },
  },
};
</script>
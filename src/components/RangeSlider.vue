<template>
  <div
    class="ui-slider"
    tabindex="0"
    ref="slider"
    :class="{ min: value === 0, max: value === 100, dragging: dragging }"
    @mousedown="sliderClick"
    @keydown.left.prevent="decrement"
    @keydown.right.prevent="increment"
  >
    <div class="ui-slider-containment" ref="container"></div>

    <div class="ui-slider-wrapper">
      <div class="ui-slider-track-container">
        <div class="ui-slider-track"></div>
        <div class="ui-slider-track-fill" :style="{ width: value + '%' }"></div>
      </div>

      <div class="ui-slider-thumb-container" ref="thumb">
        <div class="ui-slider-focus-ring"></div>
        <div class="ui-slider-thumb"></div>
      </div>
    </div>
  </div>
</template>

<script>
import "hammerjs";
import Draggabilly from "draggabilly";
export default {
  name: "RangeSlider",
  props: {
    msg: String,
  },
  data() {
    return {
      value: 50,
      keyboardStep: 5,
      dragging: false,
      draggable: null,
    };
  },

  mounted() {
    // Set initial value
    this.$refs.thumb.style.left = this.value + "%";

    // Initialize Draggabilly
    this.draggable = new Draggabilly(this.$refs.thumb, {
      containment: this.$refs.container,
      axis: "x",
    });

    // Setup drag events
    this.draggable.on("dragStart", this.dragStart);
    this.draggable.on("dragMove", this.dragMove);
    this.draggable.on("dragEnd", this.dragEnd);
  },

  methods: {
    sliderClick(e) {
      let sliderPosition = this.$refs.slider.getBoundingClientRect();

      let newValue =
        ((e.clientX - sliderPosition.left) / sliderPosition.width) * 100;

      this.setValue(newValue, true);

      if (e.target !== this.$refs.thumb) {
        this.draggable._pointerDown(e, e);
      }

      this.$refs.slider.focus();
    },

    dragStart() {
      this.dragging = true;
      this.$refs.slider.focus();
    },

    dragMove() {
      let x = this.draggable.position.x;
      let newValue =
        (x / this.$refs.slider.getBoundingClientRect().width) * 100;

      this.setValue(newValue);
    },

    dragEnd() {
      this.dragging = false;
    },

    increment() {
      if (this.value === 100) {
        return;
      }

      this.setValue(this.value + this.keyboardStep, true);
    },

    decrement() {
      if (this.value === 0) {
        return;
      }

      this.setValue(this.value - this.keyboardStep, true);
    },

    setValue(newValue, updateThumb) {
      if (newValue === this.value) {
        return;
      }

      // Round the value
      var moderatedValue = Math.round(newValue);

      // Check for max
      if (moderatedValue >= 100) {
        moderatedValue = 100;
      }

      // Check for min
      if (moderatedValue <= 0) {
        moderatedValue = 0;
      }

      if (this.value != moderatedValue) {
        this.value = moderatedValue;
        this.$emit("slider-change", this.value + 5);
      }

      if (updateThumb) {
        this.$refs.thumb.style.left = this.value + "%";
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@use 'sass:math';
// Overall slider width
$slider-width: 100%;

// Track line
$track-height: 3px;
$track-background-color: rgba(0, 0, 0, 0.28);
$track-fill-color: rgb(244, 67, 54);

// Thumb
$thumb-size: 16px;
$thumb-scale-active: 1.1;
$thumb-container-size: 38px;

// Transition durations
$thumb-transition-duration: 0.2s;
$track-transition-duration: 0.1s;

// Colors
$thumb-fill-color: $track-fill-color;
$thumb-background-color: $track-fill-color;

// Slider container
.ui-slider {
  position: relative;
  width: $slider-width;
  height: $thumb-container-size + 4px;
  display: flex;
  align-items: center;
  outline: none;

  // Increase size of thumb on slider hover
  &:hover {
    .ui-slider-thumb {
      transform: scale($thumb-scale-active);
    }
  }

  // Increase size of thumb and focus dot on focus
  &:focus,
  &.dragging {
    .ui-slider-thumb {
      transform: scale($thumb-scale-active);
    }

    .ui-slider-focus-ring {
      transform: scale(1);
    }
  }
}

.ui-slider-wrapper {
  position: relative;
  width: 100%;
}

.ui-slider-track-container {
  position: relative;
}

.ui-slider-track {
  height: $track-height;
  background-color: $track-background-color;
  width: 100%;
}

.ui-slider-track-fill {
  position: absolute;
  top: 0;
  height: $track-height;
  background-color: $track-fill-color;
}

.ui-slider-thumb-container {
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -(math.div($thumb-container-size, 2)) - (math.div($track-height, 2));
  margin-left: -(math.div($thumb-container-size, 2)) - (math.div($track-height, 2));
  width: $thumb-container-size;
  height: $thumb-container-size;
}

.ui-slider-thumb {
  display: flex;
  align-items: center;
  justify-content: center;
  width: $thumb-size;
  height: $thumb-size;
  background-color: $thumb-fill-color;
  border-radius: 50%;
  transition-property: transform;
  transition-duration: $thumb-transition-duration;
  transition-timing-function: linear;

  transform: scale(1);
}

.ui-slider-focus-ring {
  position: absolute;
  top: 0;
  left: 0;

  width: $thumb-container-size;
  height: $thumb-container-size;

  border-radius: 50%;
  background-color: rgba(244, 67, 54, 0.38);

  transition: transform 0.2s ease;
  transform: scale(0);
}

.ui-slider-containment {
  left: 0;
  right: 0;
  position: absolute;
  margin-left: -(math.div($thumb-container-size, 2)) - (math.div($track-height, 2));
  margin-right: -(math.div($thumb-container-size, 2)) - (math.div($track-height, 2));
}
</style>

<template>
  <div class="content">
    <div class="md-layout img-filled">
      <div class="text-content">
        <h5>Welcome to Algorithms Visualizer</h5>
        <h3>Choose from any one of the following</h3>
        <div class="flex justify-center">
          <a
            href="#/sorting-algorithms"
            class="main-stroked-button"
            tabindex="0"
            >Sorting</a
          >
          <a
            href="#/pathfinding-algorithms"
            class="main-stroked-button"
            tabindex="0"
            >Pathfinding</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.text-content {
  width: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
h3 {
  margin-bottom: 25px;
  font-size: 22px;
  letter-spacing: 1px;
  color: #000;
  -webkit-animation: fadeOutRight 1s both;
  animation: fadeOutRight 1s both;
}
h5 {
  margin-bottom: 15px;
  font-size: 36px;
  font-weight: 200;
  letter-spacing: 2.5px;
  color: #000;
  overflow: hidden;
}
.main-stroked-button {
  margin: 0 5px;
  font-size: 13px;
  border-radius: 25px;
  padding: 11px 25px;
  background-color: transparent;
  border: 2px solid #000;
  text-transform: uppercase;
  color: #000 !important;
  font-weight: 600;
  letter-spacing: 1px;
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
}
.main-stroked-button:hover {
  margin: 0 5px;
  font-size: 13px;
  border-radius: 25px;
  padding: 11px 25px;
  border: 2px solid #fff;
  background-color: #fff;
  text-transform: uppercase;
  color: #5fb759 !important;
  font-weight: 600;
  letter-spacing: 1px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.img-filled {
  height: calc(100vh - 152px);
  width: 100%;
  display: block;
  overflow: hidden;
  position: relative;
  text-align: center;
}
</style>

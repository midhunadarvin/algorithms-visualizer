<template>
  <div class="content dashboard-content">
    <div class="md-layout overflow-y-auto img-filled">
      <div
        class="
          text-content
          flex flex-column
          align-items-center
          justify-content-center
        "
      >
        <h5>Welcome to Algorithms Visualizer</h5>
        <h3 class="mt-0">Choose any one of the following</h3>
        <div class="flex flex-wrap justify-center">
          <a
            href="#/sorting-algorithms"
            class="main-stroked-button mb-8"
            tabindex="0"
            >Sorting</a
          >
          <a
            href="#/pathfinding-algorithms"
            class="main-stroked-button mb-8"
            tabindex="0"
            >Pathfinding</a
          >
        </div>
        <div class="horizontal-divider margin-top-16">
          <hr />
        </div>
        <div class="dashboard-intro">
          <p class="text-align-justify">
            Hi, My Name is Midhun A Darvin. I primarily work with Javascript
            libraries / frameworks like Angular, React, Vue and Node. I have
            created this website for learning purposes and the complete source
            code is available on my github.
          </p>
        </div>
        <div class="text-align-center width-66">Follow me on</div>
        <div>
          <div class="flex justify-content-center">
            <a class="mr-4" href="#"
              ><i class="fa fa-facebook social-icon" aria-hidden="true"></i
            ></a>
            <a class="mr-4" href="#"
              ><i class="fa fa-twitter social-icon" aria-hidden="true"></i
            ></a>
            <a class="mr-4" href="#"
              ><i class="fa fa-linkedin social-icon" aria-hidden="true"></i
            ></a>
            <a class="mr-4" href="#"
              ><i class="fa fa-envelope social-icon" aria-hidden="true"></i
            ></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Dashboard.js"></script>
<style src="./Dashboard.scss" scoped lang="scss"></style>


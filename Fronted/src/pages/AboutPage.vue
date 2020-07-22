<template>
  <div class="container">
    <div class="about">
      <b-row>
        <b-col>
          <h1 class="title">ABOUT</h1>
          <br />
          <div class="txt">
            Website developers and designers:
            <br />

            <b>Shir Ben Dor</b>
            AND
            <b>Liron Ben Yakov</b>
            .
            <br />
            <br />

            This
            <b>full stack web app</b>
            was built as part of a bachelor's degree in information systems
            engineering at Ben-Gurion University of the Negev.
            <br />
            <br />
            - We wrote an API Document Using SwaggerHub.
            <br />
            - We built an extensive backend API with Node.js and express using
            Azure DB SQL.
            <br />
            - We built and design fronted with Vue.js, we used templates from
            the bootstrap-vue.
            <br />
            <img src="../assets/swagger.png" style="width: 15%;" />

            <img src="../assets/nodejs.png" style="width: 15%;" />
            <img src="../assets/ExpressJS.png" style="width: 15%;" />
            <img src="../assets/Azure.png" style="width: 15%;" />
            <img src="../assets/Vue.png" style="width: 10%;" />
            <img src="../assets/boot.png" style="width: 10%;" />
          </div>
        </b-col>
        <b-col>
          <img
            src="../assets/about1.jpg"
            style="width: 100%; border-radius: 15px; opacity: 0.75;"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <img
            src="../assets/about2.jpg"
            style="width: 100%; border-radius: 15px; opacity: 0.75;"
          />
        </b-col>
        <b-col>
          <br />
          <h2 class="title">MORE PROJECTS</h2>
          <div class="txt">
            # A personal website for an adult in old age:
            <br />
            <a
              href="https://sise-web-development-environments.github.io/204675797/"
            >
              <b>SHIR's web</b>
            </a>
            <br />
            <a
              href="https://sise-web-development-environments.github.io/204385884/"
            >
              <b>LIRON's web</b>
            </a>
            <br />
            <br />
            # Pacman game in HTML5 in JAVASCRIPT:
            <br />
            <a
              href="https://sise-web-development-environments.github.io/assignment2-liron-shir/"
            >
              <b>PACMAN GAME</b>
            </a>
            <br />
            <br />
            <h2 class="title">CONTACT US</h2>
            <div class="contact">
              Liron:
              <a href="https://www.facebook.com/liron.oskar">
                <img src="../assets/facebook.png" style="width: 10%;" />
              </a>
              <a href="https://www.instagram.com/lironoskar/">
                <img src="../assets/inst.png" style="width: 10%;" />
              </a>
              <a href="mailto:oskar@post.bgu.ac.il">
                <img src="../assets/gmail.png" style="width: 11%;" />
              </a>
              <a href="https://github.com/lironoskar">
                <img src="../assets/git.png" style="width: 11%;" />
              </a>
              <br />
              <br />
              Shir:
              <a href="https://www.facebook.com/shirbd1">
                <img src="../assets/facebook.png" style="width: 10%;" />
              </a>
              <a href="https://www.instagram.com/shir_ben_dor/">
                <img src="../assets/inst.png" style="width: 10%;" />
              </a>
              <a href="mailto:bendsh@post.bgu.ac.il">
                <img src="../assets/gmail.png" style="width: 11%;" />
              </a>
              <a href="https://github.com/shirbendor">
                <img src="../assets/git.png" style="width: 11%;" />
              </a>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  max-width: 70%;
}
.fa {
  padding: 2px;
  font-size: 30px;
  text-align: center;
  text-decoration: none;
  color: black;
}

/* Add a hover effect if you want */
.fa:hover {
  opacity: 0.7;
}

.about {
  margin: 6px;
  padding: 8px;
  background: rgba(26, 26, 26, 0.74);

  opacity: 0.997;
  width: 100%;

  margin: auto;
  border-radius: 20px;
}
@import url('https://fonts.googleapis.com/css?family=Special+Elite');
@import url('https://fonts.googleapis.com/css?family=Raleway');

.title {
  font-family: 'Special Elite';
  color: #fff;
  text-align: center;
}
.txt {
  font-family: 'Raleway';
  color: #fff;
}
.contact {
  text-align: center;
}
</style>

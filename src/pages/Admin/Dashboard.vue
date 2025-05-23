<template>
  <v-app class="app-root">

    <section id="about-me" class="section">
      <AboutMe />
    </section>

    <section id="resume" class="section">
      <Resume />
    </section>

    <section id="projects" class="section">
      <Projects />
    </section>

    <section id="contact" class="section">
      <Contact />
    </section>
  </v-app>
</template>

<script>
import AboutMe from '../../components/AboutMeSection.vue'
import Resume from '../../components/ResumeSection.vue'
import Projects from '../../components/ProjectsSection.vue'
import Contact from '../../components/ContactSection.vue'

export default {
  name: 'AdminDashboard',
   components: {
    AboutMe,
    Resume,
    Projects,
    Contact,
  },
   methods: {
    scrollToSection(sectionId) {
      const el = document.getElementById(sectionId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}
</script>

<style>
html, body, #app, .v-application {
  margin: 0 !important;
  padding: 0 !important;
  overflow-x: hidden;
  width: 100%;
}

.app-root {
  margin: 0 !important;
  padding: 0 !important;
}

.section {
  margin: 0 !important;
  padding: 0 !important;
  width: 100%;
}
</style>

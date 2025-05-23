<template>
  <v-container fluid class="pa-0" style="background-color: #f2eae3; min-height: 100vh;">
    <v-row justify="center" class="pa-8">
      <!-- Başlık -->
      <v-col cols="12" class="text-center mb-8 pt-12">
        <h1 class="text-black"><strong>Resume</strong></h1>
      </v-col>

      <!-- Experience ve Buton aynı hizada -->
      <v-col cols="12" md="10" lg="8" class="mb-6">
        <v-row align="center">
          <v-col cols="12" md="6" class="d-flex justify-start">
            <h2 class="text-black mb-0"><strong>Experience</strong></h2>
          </v-col>
          <v-col cols="12" md="6" class="d-flex justify-end">
            <v-btn color="primary" @click = "downloadPDF" rounded>DOWNLOAD CV</v-btn>
          </v-col>
        </v-row>
      </v-col>

      <!-- Kart 1 -->
      <v-col cols="12" md="10" lg="8" class="mb-6" >
        <v-card hover style="min-height: 35vh; width: 100%;">
          <v-card-text class="text-left">
            <v-row>
              <v-col cols="12" md="6">
                <v-card-title class="text-h6 pa-2">2035 - Present</v-card-title>
                <v-card-subtitle class="text-subtitle-1 pa-2">JOB POSITION</v-card-subtitle>
                <v-card-subtitle class="text-subtitle-1 pa-2">Company Name</v-card-subtitle>
                <v-card-subtitle class="text-subtitle-1 pa-2">Company Location</v-card-subtitle>
              </v-col>
              <v-col cols="12" md="6" class="d-flex align-center">
                <p class="ma-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Kart 2 -->
      <v-col cols="12" md="10" lg="8" class="mb-6" >
        <v-card hover style="min-height: 35vh; width: 100%;">
          <v-card-text class="text-left">
            <v-row>
              <v-col cols="12" md="6">
                <v-card-title class="text-h6 pa-2">2035 - Present</v-card-title>
                <v-card-subtitle class="text-subtitle-1 pa-2">JOB POSITION</v-card-subtitle>
                <v-card-subtitle class="text-subtitle-1 pa-2">Company Name</v-card-subtitle>
                <v-card-subtitle class="text-subtitle-1 pa-2">Company Location</v-card-subtitle>
              </v-col>
              <v-col cols="12" md="6" class="d-flex align-center">
                <p class="ma-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" class="pa-8">

      <!-- Experience ve Buton aynı hizada -->
      <v-col cols="12" md="10" lg="8" class="mb-6">
        <v-row align="center">
          <v-col cols="12" md="6" class="d-flex justify-start">
            <h2 class="text-black mb-0"><strong>Education</strong></h2>
          </v-col>
        </v-row>
      </v-col>

      <!-- Kart 1 -->
      <v-col cols="12" md="10" lg="8" class="mb-6" >
        <v-card hover style="min-height: 35vh; width: 100%;">
          <v-card-text class="text-left">
            <v-row>
              <v-col cols="12" md="6">
                <v-card-title class="text-h6 pa-2">2020 - 2024</v-card-title>
                <v-card-subtitle class="text-subtitle-1 pa-2">UNIVERSITY NAME</v-card-subtitle>
                <v-card-subtitle class="text-subtitle-1 pa-2">Degree Level</v-card-subtitle>
                <v-card-subtitle class="text-subtitle-1 pa-2">University Location</v-card-subtitle>
              </v-col>
              <v-col cols="12" md="6" class="d-flex align-center">
                <p class="ma-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Kart 2 -->
      <v-col cols="12" md="10" lg="8" class="mb-6" >
        <v-card hover style="min-height: 35vh; width: 100%;">
          <v-card-text class="text-left">
            <v-row>
              <v-col cols="12" md="6">
                <v-card-title class="text-h6 pa-2">2020 - 2024</v-card-title>
                <v-card-subtitle class="text-subtitle-1 pa-2">UNIVERSITY NAME</v-card-subtitle>
                <v-card-subtitle class="text-subtitle-1 pa-2">Degree Level</v-card-subtitle>
                <v-card-subtitle class="text-subtitle-1 pa-2">University Location</v-card-subtitle>
              </v-col>
              <v-col cols="12" md="6" class="d-flex align-center">
                <p class="ma-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" class="pa-8">
      <!-- Kart Professional skillset -->
      <v-col cols="12" md="10" lg="8" class="mb-6" >
        <v-card hover style="min-height: 55vh; width: 100%;">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-card-title class="text-h6">Professional skillset</v-card-title>
                <v-card-subtitle class="text-subtitle-1">Card subtitle secondary text</v-card-subtitle>
              </v-col>
              <v-col cols="12" md="6" class="d-flex align-center">
                <p class="ma-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import {jsPDF} from 'jspdf'
function downloadPDF(){
  const doc = new jsPDF()
  doc.text("Azime Tolumoglu",10,10)
  doc.save('azime_tolumoglu_cv')
}
</script>

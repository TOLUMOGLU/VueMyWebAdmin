<template>
  <v-container fluid class="pa-0" style="background-color: #f2eae3; min-height: 100vh;">
    <v-row justify="center" class="pa-8">
      <v-col cols="12" class="text-center mb-8 pt-12">
        <h1 class="text-black"><strong>Resume</strong></h1>
      </v-col>

      <v-col cols="12" md="10" lg="8" class="mb-6">
        <v-row align="center">
          <v-col cols="12" md="6" class="d-flex justify-start">
            <h2 class="text-black mb-0"><strong>Experience</strong></h2>
          </v-col>
          <v-col cols="12" md="6" class="d-flex justify-end">
            <v-btn color="primary" @click="downloadPDF" rounded>DOWNLOAD CV</v-btn>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="10" lg="8" v-for="(card, index) in experienceCards" :key="card.id" class="mb-6">
        <v-card hover style="min-height: 35vh; width: 100%; position: relative;">
          <v-btn
            small
            icon
            color="blue"
            style="position: absolute; top: 10px; right: 10px;"
            @click="toggleEdit('experience', index)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <v-card-text>
            <template v-if="card.isEditing">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field label="Date" v-model="card.date" dense></v-text-field>
                  <v-text-field label="Job Position" v-model="card.position" dense></v-text-field>
                  <v-text-field label="Company" v-model="card.company" dense></v-text-field>
                  <v-text-field label="Location" v-model="card.location" dense></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-textarea label="Description" v-model="card.description" rows="5" dense></v-textarea>
                </v-col>
              </v-row>
              <v-row justify="end" class="mt-2">
                <v-btn color="success" @click="saveEdit('experience', index)">Kaydet</v-btn>
                <v-btn color="error" class="ml-2" @click="cancelEdit('experience', index)">İptal</v-btn>
              </v-row>
            </template>
            <template v-else>
              <!-- Normal görüntü modu -->
              <v-row>
                <v-col cols="12" md="6">
                  <v-card-title class="text-h6 pa-2">{{ card.date }}</v-card-title>
                  <v-card-subtitle class="text-subtitle-1 pa-2">{{ card.position }}</v-card-subtitle>
                  <v-card-subtitle class="text-subtitle-1 pa-2">{{ card.company }}</v-card-subtitle>
                  <v-card-subtitle class="text-subtitle-1 pa-2">{{ card.location }}</v-card-subtitle>
                </v-col>
                <v-col cols="12" md="6" class="d-flex align-center">
                  <p class="ma-0">{{ card.description }}</p>
                </v-col>
              </v-row>
            </template>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    
    <v-row justify="center" class="pa-8">
      <v-col cols="12" md="10" lg="8" class="mb-6">
        <h2 class="text-black"><strong>Education</strong></h2>
      </v-col>

      <v-col cols="12" md="10" lg="8" v-for="(card, index) in educationCards" :key="card.id" class="mb-6">
        <v-card hover style="min-height: 35vh; width: 100%; position: relative;">
          <v-btn
            small
            icon
            color="blue"
            style="position: absolute; top: 10px; right: 10px;"
            @click="toggleEdit('education', index)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <v-card-text>
            <template v-if="card.isEditing">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field label="Date" v-model="card.date" dense></v-text-field>
                  <v-text-field label="University" v-model="card.university" dense></v-text-field>
                  <v-text-field label="Degree" v-model="card.degree" dense></v-text-field>
                  <v-text-field label="Location" v-model="card.location" dense></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-textarea label="Description" v-model="card.description" rows="5" dense></v-textarea>
                </v-col>
              </v-row>
              <v-row justify="end" class="mt-2">
                <v-btn color="success" @click="saveEdit('education', index)">Kaydet</v-btn>
                <v-btn color="error" class="ml-2" @click="cancelEdit('education', index)">İptal</v-btn>
              </v-row>
            </template>
            <template v-else>
              <v-row>
                <v-col cols="12" md="6">
                  <v-card-title class="text-h6 pa-2">{{ card.date }}</v-card-title>
                  <v-card-subtitle class="text-subtitle-1 pa-2">{{ card.university }}</v-card-subtitle>
                  <v-card-subtitle class="text-subtitle-1 pa-2">{{ card.degree }}</v-card-subtitle>
                  <v-card-subtitle class="text-subtitle-1 pa-2">{{ card.location }}</v-card-subtitle>
                </v-col>
                <v-col cols="12" md="6" class="d-flex align-center">
                  <p class="ma-0">{{ card.description }}</p>
                </v-col>
              </v-row>
            </template>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="pa-8">
      <v-col cols="12" md="10" lg="8" class="mb-6">
        <v-card hover style="min-height: 55vh; width: 100%; position: relative;">
          <v-btn
            small
            icon
            color="blue"
            style="position: absolute; top: 10px; right: 10px;"
            @click="toggleEdit('skillset')"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <v-card-text>
            <template v-if="skillset.isEditing">
              <v-text-field label="Title" v-model="skillset.title" dense></v-text-field>
              <v-text-field label="Subtitle" v-model="skillset.subtitle" dense></v-text-field>
              <v-textarea label="Description" v-model="skillset.description" rows="6" dense></v-textarea>
              <v-row justify="end" class="mt-2">
                <v-btn color="success" @click="saveEdit('skillset')">Kaydet</v-btn>
                <v-btn color="error" class="ml-2" @click="cancelEdit('skillset')">İptal</v-btn>
              </v-row>
            </template>
            <template v-else>
              <v-row>
                <v-col cols="12" md="6">
                  <v-card-title class="text-h6">{{ skillset.title }}</v-card-title>
                  <v-card-subtitle class="text-subtitle-1">{{ skillset.subtitle }}</v-card-subtitle>
                </v-col>
                <v-col cols="12" md="6" class="d-flex align-center">
                  <p>{{ skillset.description }}</p>
                </v-col>
              </v-row>
            </template>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { reactive } from 'vue'
import { jsPDF } from 'jspdf'

// Kartlar verisi - deneysel olarak reactive ile tutuyoruz
const experienceCards = reactive([
  {
    id: 1,
    date: '2035 - Present',
    position: 'JOB POSITION',
    company: 'Company Name',
    location: 'Company Location',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isEditing: false,
    backup: null,
  },
  {
    id: 2,
    date: '2035 - Present',
    position: 'JOB POSITION',
    company: 'Company Name',
    location: 'Company Location',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isEditing: false,
    backup: null,
  }
])

const educationCards = reactive([
  {
    id: 1,
    date: '2020 - 2024',
    university: 'UNIVERSITY NAME',
    degree: 'Degree Level',
    location: 'University Location',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isEditing: false,
    backup: null,
  },
  {
    id: 2,
    date: '2020 - 2024',
    university: 'UNIVERSITY NAME',
    degree: 'Degree Level',
    location: 'University Location',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isEditing: false,
    backup: null,
  }
])

const skillset = reactive({
  title: 'Professional skillset',
  subtitle: 'Card subtitle secondary text',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  isEditing: false,
  backup: null,
})

function toggleEdit(section, index) {
  if (section === 'experience') {
    const card = experienceCards[index]
    if (!card.isEditing) {
      card.backup = {...card} // Yedekle
    }
    card.isEditing = !card.isEditing
  } else if (section === 'education') {
    const card = educationCards[index]
    if (!card.isEditing) {
      card.backup = {...card}
    }
    card.isEditing = !card.isEditing
  } else if (section === 'skillset') {
    if (!skillset.isEditing) {
      skillset.backup = {...skillset}
    }
    skillset.isEditing = !skillset.isEditing
  }
}

function saveEdit(section, index) {
  if (section === 'experience') {
    const card = experienceCards[index]
    card.isEditing = false
    card.backup = null
  } else if (section === 'education') {
    const card = educationCards[index]
    card.isEditing = false
    card.backup = null
  } else if (section === 'skillset') {
    skillset.isEditing = false
    skillset.backup = null
  }
}

function cancelEdit(section, index) {
  if (section === 'experience') {
    const card = experienceCards[index]
    if (card.backup) {
      Object.assign(card, card.backup)
      card.backup = null
    }
    card.isEditing = false
  } else if (section === 'education') {
    const card = educationCards[index]
    if (card.backup) {
      Object.assign(card, card.backup)
      card.backup = null
    }
    card.isEditing = false
  } else if (section === 'skillset') {
    if (skillset.backup) {
      Object.assign(skillset, skillset.backup)
      skillset.backup = null
    }
    skillset.isEditing = false
  }
}

function downloadPDF() {
  const doc = new jsPDF()
  doc.text("Azime Tolumoglu", 10, 10)
  doc.save('azime_tolumoglu_cv')
}
</script>

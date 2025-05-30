<template>
  <v-container fluid class="pa-0" style="background-color: #f2eae3; min-height: 100vh;">
    <v-row justify="center" class="pa-8">
      <v-col cols="12" class="text-center mb-8 pt-12">
        <h1 class="text-black"><strong>Resume</strong></h1>
      </v-col>

      <!-- EXPERIENCE -->
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
          <div style="position: absolute; top: 10px; right: 10px; display: flex; gap: 8px;">
            <v-btn small icon color="blue" @click="toggleEdit('experience', index)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn small icon color="red" @click="deleteCard('experience', index)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>

          <v-card-text>
            <template v-if="card.isEditing">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field label="Date" v-model="card.startDate" dense></v-text-field>
                  <v-text-field label="Job Position" v-model="card.jobTitle" dense></v-text-field>
                  <v-text-field label="Company" v-model="card.companyName" dense></v-text-field>
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
              <v-row>
                <v-col cols="12" md="6">
                  <v-card-title class="text-h6 pa-2">{{ card?.startDate }}</v-card-title>
                  <v-card-subtitle class="text-subtitle-1 pa-2">{{ card?.jobTitle }}</v-card-subtitle>
                  <v-card-subtitle class="text-subtitle-1 pa-2">{{ card?.companyName }}</v-card-subtitle>
                  <v-card-subtitle class="text-subtitle-1 pa-2">{{ card?.location }}</v-card-subtitle>
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

    <!-- EDUCATION -->
    <v-row justify="center" class="pa-8">
      <v-col cols="12" md="10" lg="8" class="mb-6">
        <h2 class="text-black"><strong>Education</strong></h2>
      </v-col>

      <v-col cols="12" md="10" lg="8" v-for="(card, index) in educationCards" :key="card?.educationId" class="mb-6">
        <v-card hover style="min-height: 35vh; width: 100%; position: relative;">
          <div style="position: absolute; top: 10px; right: 10px; display: flex; gap: 8px;">
            <v-btn small icon color="blue" @click="toggleEdit('education', index)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn small icon color="red" @click="deleteCard('education', index)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>

          <v-card-text>
            <template v-if="card?.isEditing">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field label="Date" v-model="card.startDate" dense></v-text-field>
                  <v-text-field label="University" v-model="card.schoolName" dense></v-text-field>
                  <v-text-field label="Degree" v-model="card.degree" dense></v-text-field>
                  <v-text-field label="fieldOfStudy" v-model="card.fieldOfStudy" dense></v-text-field>
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
                  <v-card-title class="text-h6 pa-2">{{ card?.startDate }}</v-card-title>
                  <v-card-subtitle class="text-subtitle-1 pa-2">{{ card?.schoolName }}</v-card-subtitle>
                  <v-card-subtitle class="text-subtitle-1 pa-2">{{ card?.degree }}</v-card-subtitle>
                  <v-card-subtitle class="text-subtitle-1 pa-2">{{ card?.fieldOfStudy }}</v-card-subtitle>
                </v-col>
                <v-col cols="12" md="6" class="d-flex align-center">
                  <p class="ma-0">{{ card?.description }}</p>
                </v-col>
              </v-row>
            </template>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- SKILLSET -->
    <v-row justify="center" class="pa-8">
      <v-col cols="12" md="10" lg="8" class="mb-6">
        <v-card hover style="min-height: 55vh; width: 100%; position: relative;">
          <div style="position: absolute; top: 10px; right: 10px; display: flex; gap: 8px;">
            <v-btn small icon color="blue" @click="toggleEdit('skillset')">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </div>

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
import { ref } from 'vue'
import { jsPDF } from 'jspdf'
import { useEducationStore } from '@/stores/educationStore'
import { useExperienceStore } from '@/stores/experienceStore'

const store = useEducationStore()
const store2 = useExperienceStore()

const educationCards = ref([])
const experienceCards = ref([])
const skillset = ref({ title: '', subtitle: '', description: '', isEditing: false })

async function loadData() {
  await store.fetchEducations()
  educationCards.value = store.educations.map(card => ({ ...card, isEditing: false }))

  await store2.fetchExperiences()
  experienceCards.value = store2.experiences.map(card => ({ ...card, isEditing: false }))
}

function toggleEdit(section, index) {
  if (section === 'education') {
    educationCards.value[index].isEditing = true
  } else if(section == 'experience') 
    experienceCards.value[index].isEditing = true
  else if (section === 'skillset') {
    skillset.value.isEditing = true
  }
}

function cancelEdit(section, index) {
  if (section === 'education') {
    const original = store.educations.find(e => e.educationId === educationCards.value[index].educationId)
    if (original) {
      educationCards.value[index] = { ...original, isEditing: false }
    }
  } else if (section === 'experience'){
    const original = store2.experiences.find(e => e.experienceId === experienceCards.value[index].experienceId)
    if (original) {
      experienceCards.value[index] = { ...original, isEditing: false }
    }
  }


  else if (section === 'skillset') {
    skillset.value.isEditing = false
  }
}

async function saveEdit(section, index) {
  if (section === 'education') {
    const card = educationCards.value[index]
    const payload = {
      educationId: card.educationId,
      schoolName: card.schoolName?.trim() || '',
      degree: card.degree?.trim() || '',
      fieldOfStudy: card.fieldOfStudy?.trim() || '',
      startDate: formatDate(card.startDate),
      endDate: card.endDate ? formatDate(card.endDate) : null,
      description: card.description?.trim() || ''
    }
    console.info('Gönderilen payload:', payload)

    try {
      await store.updateEducation(card.educationId, payload)
      educationCards.value[index].isEditing = false
    } catch (error) {
      console.error('Eğitim güncellenirken hata oluştu:', error)
      alert('Güncelleme sırasında bir hata oluştu.')
    }
  } 
  else if (section === 'skillset') {
    skillset.value.isEditing = false
  }
}

function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  return d.toISOString().split('T')[0]
}

function downloadPDF() {
  const doc = new jsPDF()
  doc.text('Azime Tolumoglu', 10, 10)
  doc.save('azime_tolumoglu_cv')
}

loadData()
</script>

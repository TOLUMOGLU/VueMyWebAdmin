<template>
  <v-container fluid class="pa-0" style="background-color: white; min-height: 100vh;">
    <v-row justify="center" class="pa-8">
      <v-col cols="12" class="text-center mb-8 pt-12">
        <h1 class="text-black"><strong>Projects</strong></h1>
      </v-col>

      <v-col cols="12" md="10" lg="8" class="mb-6">
        <p>
          I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text”
          or double click me to add your own content and make changes to the font.
        </p>
        <v-btn small icon color="blue" class="mt-4" @click="addbutton">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>

      <v-col
        v-for="(project, index) in projects"
        :key="project.projectId || index"
        cols="12"
        md="10"
        lg="8"
        class="mb-6 pa-4 text-left"
      >
        <v-card hover style="min-height: 35vh; width: 100%;">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6" class="pa-6">
                <div v-if="!project.isEditing">
                  <v-card-title class="text-h6 pa-4">{{ project.title }}</v-card-title>
                  <v-card-subtitle class="text-subtitle-1 pa-4">{{ project.category }}</v-card-subtitle>
                  <p class="pa-4">{{ project.description }}</p>
                </div>
                <div v-else>
                  <v-text-field v-model="project.title" label="Project Title" class="pa-2" />
                  <v-text-field v-model="project.category" label="Category" class="pa-2" />
                  <v-textarea v-model="project.description" label="Description" class="pa-2" />
                </div>

                <v-btn v-if="!project.isEditing" color="primary" class="ma-2" @click="project.isEditing = true">
                  Düzenle
                </v-btn>

                <v-btn v-else color="success" class="ma-2" @click="saveProject(index)">
                  Kaydet
                </v-btn>

                <v-btn v-if="project.isEditing" color="grey" class="ma-2" @click="cancelEdit(index)">
                  İptal
                </v-btn>

                <v-btn v-else color="error" class="ma-2" @click="deleteProject(index)">
                  Sil
                </v-btn>
              </v-col>

              <v-col cols="12" md="6" class="d-flex align-center justify-end" style="position: relative;">
                <img
                  :src="project.imageUrl ? backendBaseUrl + '/' + project.imageUrl : defaultImage"
                  alt="Project image"
                  style="max-width: 100%; height: auto;"
                />

                <v-btn
                  small
                  icon
                  color="blue"
                  style="position: absolute; top: 8px; right: 8px;"
                  @click="triggerFileInput(index)"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>

                <input
                  type="file"
                  accept="image/*"
                  style="display: none"
                  :ref="el => setFileInputRef(index, el)"
                  @change="onFileSelected(index, $event)"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProjectStore } from '@/stores/projectStore'
import { useImageStore } from '@/stores/imagesStore'

const backendBaseUrl = "http://localhost:5282"
const defaultImage = 'https://via.placeholder.com/150'

const store = useProjectStore()
const store2 = useImageStore()

const projects = ref([])
const fileInputs = ref([])

function setFileInputRef(index, el) {
  if (el) fileInputs.value[index] = el
}

function triggerFileInput(index) {
  const input = fileInputs.value[index]
  if (input) input.click()
}

async function onFileSelected(index, event) {
  const file = event.target.files[0]
  if (!file) return

  try {
    const uploadedUrl = await store2.uploadImageFile(file)
    projects.value[index].imageUrl = uploadedUrl

    const payload = {
      ...projects.value[index],
      imageUrl: uploadedUrl,
      createdAt: formatDate(projects.value[index].createdAt),
    }

    if (projects.value[index].projectId) {
      await store.updateProject(projects.value[index].projectId, payload)
    }
  } catch (error) {
    alert('Fotoğraf yüklenemedi: ' + error.message)
  }
}

function addbutton() {
  projects.value.push({
    projectId: null,
    title: '',
    description: '',
    imageUrl: '',
    projectUrl: '',
    category: '',
    createdAt: '',
    isEditing: true
  })
}

function cancelEdit(index) {
  const original = store.projects.find(e => e.projectId === projects.value[index].projectId)
  if (original) {
    projects.value[index] = { ...original, isEditing: false }
  }
}

async function deleteProject(index) {
  const card = projects.value[index]
  if (!card || !card.projectId) {
    projects.value.splice(index, 1)
    return
  }
  try {
    await store.deleteProject(card.projectId)
    projects.value.splice(index, 1)
  } catch (error) {
    console.error('Proje silinirken hata oluştu:', error)
    alert('Silme sırasında bir hata oluştu.')
  }
}

async function saveProject(index) {
  const card = projects.value[index]
  const payload = {
    title: card.title?.trim() || '',
    description: card.description?.trim() || '',
    imageUrl: card.imageUrl || '',
    projectUrl: card.projectUrl || '',
    category: card.category || '',
    createdAt: formatDate(card.createdAt),
  }

  try {
    if (!card.projectId) {
      const newData = await store.postProject(payload)
      projects.value[index] = { ...newData.data, isEditing: false }
    } else {
      await store.updateProject(card.projectId, payload)
      projects.value[index].isEditing = false
    }
  } catch (error) {
    console.error('Proje kaydedilirken hata oluştu:', error)
    alert('Kaydetme sırasında bir hata oluştu.')
  }
}

function formatDate(date) {
  if (!date) return new Date().toISOString()
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toISOString()
}

const loadData = async () => {
  await store.fetchProjects()
  projects.value = store.projects.map(project => ({
    ...project,
    isEditing: false
  }))
}

onMounted(() => {
  loadData()
})
</script>

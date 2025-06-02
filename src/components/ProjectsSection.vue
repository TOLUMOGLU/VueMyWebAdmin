<template>
  <v-container fluid class="pa-0" style="background-color: #f2eae3; min-height: 100vh;">
    <v-row justify="center" class="pa-8">
      <v-col cols="12" class="text-center mb-8 pt-12">
        <h1 class="text-black"><strong>Projects</strong></h1>
      </v-col>

      <v-col cols="12" md="10" lg="8" class="mb-6">
        <p>
          I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text”
          or double click me to add your own content and make changes to the font.
        </p>
        <v-btn small icon color="blue" @click="addbutton()">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>

      <v-col
        v-for="(project, index) in projects"
        :key="index"
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
                  <v-card-subtitle class="text-subtitle-1 pa-4">{{ project.title }}</v-card-subtitle>
                  <p class="pa-4">{{ project.description }}</p>
                </div>
                <div v-else>
                  <v-text-field v-model="project.title" label="Project Title" class="pa-2" />
                  <v-text-field v-model="project.title" label="Role Title" class="pa-2" />
                  <v-textarea v-model="project.description" label="Description" class="pa-2" />
                </div>

                <v-btn
                  v-if="!project.isEditing"
                  color="primary"
                  class="ma-2"
                  @click="project.isEditing = true"
                >
                  Düzenle
                </v-btn>

                <v-btn
                  v-else
                  color="success"
                  class="ma-2"
                  @click="saveProject(index)"
                >
                  Kaydet
                </v-btn>

                <v-btn
                  v-if="project.isEditing"
                  color="grey"
                  class="ma-2"
                  @click="cancelEdit(index)"
                >
                  İptal
                </v-btn>

                <v-btn
                 v-else
                  color="error"
                  class="ma-2"
                  @click="deleteProject(index)"
                >
                  Sil
                </v-btn>


              </v-col>

              <v-col cols="12" md="6" class="d-flex align-center justify-end">
                <img
                  class="pa-0"
                  :src="project.image"
                  alt="Project image"
                  style="max-width: 100%; height: auto;"
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

const store = useProjectStore()
const projects = ref([])

const loadData = async () => {
  await store.fetchProjects()
  projects.value = store.projects.map(project => ({
    ...project,
    isEditing: false
  }))
}

function addbutton(){
  projects.value.push({
   experienceId: null, 
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

async function deleteProject(index){
  const card = projects.value[index];
  if(!card || !card.projectId){
    projects.value.splice(index, 1);
    return;
  }
  try {
      await store.deleteProject(card.projectId);
      projects.value.splice(index, 1);
    } catch (error) {
      console.error('Proje silinirken hata oluştu:', error);
      alert('Silme sırasında bir hata oluştu.');
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
    createdAt: formatDate(card.startDate),
  }
  

  console.info('Gönderilen payload:', payload)

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


onMounted(() => {
  loadData()
  console.log("Store Projects:", store.projects)
console.log("Local Projects:", projects.value)

})

function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  return d.toISOString().split('T')[0]
}

console.log("Store Projects:", store.projects)
console.log("Local Projects:", projects.value)

</script>

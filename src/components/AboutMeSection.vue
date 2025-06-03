<template>
  <v-container
    fluid
    class="pa-0 d-flex align-center justify-center"
    style="background: linear-gradient(to right, white 33.3%, white 33.3%); min-height: 100vh;"
  >
    <v-col class="pa-12" cols="12" md="10" style="height: auto;">
      <v-row no-gutters style="height: 100%;">
        <v-col
          cols="12"
          md="4"
          class="d-flex flex-column align-center justify-center pa-8 ma-0"
          style="background-color: #1976D2; min-height: 60vh; position: relative; border-radius: 0;">

          <v-img
            :src="imageUrl || editData.profileImageUrl || defaultImage"
            alt="Azime Tolumoğlu"
            class="mb-4 pa-2 pa-md-6"
            cover
            style="border-radius: 50%; box-shadow: 0 4px 12px rgba(0,0,0,0.15); max-width: 150px; max-height: 150px; width: 100%; height: auto;"
          ></v-img>
          <v-btn color="orange" @click="triggerFileInput">Fotoğraf Ekle</v-btn>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            style="display: none"
            @change="onFileSelected"
          />

          <div class="text-center pa-2 pa-md-6">
            <h2 v-if="!isEditing" class="mb-1 font-weight-bold text-black">{{ editData.name }}</h2>
            <v-text-field v-else v-model="editData.name" label="Ad" hide-details dense style="min-width: 250px;"></v-text-field>

            <h2 v-if="!isEditing" class="mb-3 font-weight-bold text-black">{{ editData.surname }}</h2>
            <v-text-field v-else v-model="editData.surname" label="Soyad" hide-details dense style="min-width: 250px;"></v-text-field>

            <h3 v-if="!isEditing" class="mb-3 font-italic">{{ editData.title }}</h3>
            <v-text-field v-else v-model="editData.title" label="Ünvan" hide-details dense style="min-width: 250px;"></v-text-field>
          </div>

          <div
            class="d-flex justify-center align-center"
            style="gap: 16px; background-color: white; width: 100%; margin-top: auto; padding: 0; position: absolute; bottom: 0; left: 0; border-top: 1px solid #a99f8f; border-radius: 0px;"
          >
            <v-btn icon variant="text" href="https://www.linkedin.com/in/azime-tolumo%C4%9Flu/" target="_blank" rel="noopener">
              <font-awesome-icon :icon="['fab', 'linkedin']" size="lg" />
            </v-btn>
            <v-btn icon variant="text" href="https://github.com/TOLUMOGLU" target="_blank" rel="noopener">
              <font-awesome-icon :icon="['fab', 'github']" size="lg" />
            </v-btn>
            <v-btn icon variant="text" href="https://medium.com/@tolumogluazime2" target="_blank" rel="noopener">
              <font-awesome-icon :icon="['fab', 'medium']" size="lg" />
            </v-btn>
            <v-btn icon variant="text" href="mailto:info@mysite.com" target="_blank" rel="noopener">
              <font-awesome-icon :icon="['fas', 'envelope']" size="lg" />
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" md="8" class="pa-4 text-left" style="height: 100%;">
          <h1 class="pa-2"><strong>Hello</strong></h1>
          <h2 class="mb-4 pa-2">Here's who I am &amp; what I do</h2>

          <div class="d-flex justify-start mb-4 pa-2" style="gap: 20px;">
            <v-btn color="primary" href="#resume" rounded>Resume</v-btn>
            <v-btn href="#projects" rounded>Projects</v-btn>
          </div>

          <p v-if="!isEditing" class="pa-2">{{ editData.description }}</p>
          <v-textarea v-else v-model="editData.description" class="pa-2" auto-grow label="Hakkımda" outlined></v-textarea>

          <div class="d-flex pa-2" style="gap: 10px;">
            <v-btn v-if="!isEditing" color="primary" @click="startEditing">Düzenle</v-btn>
            <template v-else>
              <v-btn color="success" @click="saveEdit">Kaydet</v-btn>
              <v-btn color="error" @click="cancelEdit">İptal</v-btn>
            </template>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script setup>
import { ref, reactive, watchEffect } from 'vue'
import { useAboutStore } from '@/stores/aboutStore'

const defaultImage = "https://avatars.mds.yandex.net/i?id=2a00000179f5ece0391cd85e6c09c8dfb4fb-4914134-images-thumbs&n=13"

const imageUrl = ref('') 
const fileInput = ref(null)

const store = useAboutStore()
const isEditing = ref(false)

const editData = reactive({
  aboutMeId: null,
  name: '',
  surname: '',
  title: '',
  description: '',
  profileImageUrl: ''
})

function triggerFileInput() {
  fileInput.value.click()
}

async function onFileSelected(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    const base64 = e.target.result;
    imageUrl.value = base64; // geçici olarak gösteriyoruz

    try {
      const uploadedUrl = await store.uploadImage(base64); // base64 string gönderiyoruz
      editData.profileImageUrl = uploadedUrl;
      imageUrl.value = ''; // upload sonrası local base64'yi temizle

      // Fotoğraf URL'sini backend'de güncelle
      const payload = {
        aboutMeId: editData.aboutMeId,
        name: editData.name,
        surname: editData.surname,
        title: editData.title,
        description: editData.description,
        profileImageUrl: uploadedUrl,
        skills: [] 
      }
      await store.updateAbout(editData.aboutMeId, payload);

      await loadData(); 
    } catch (error) {
      alert('Fotoğraf yüklenemedi: ' + error.message)
    }
  };
  reader.readAsDataURL(file);
}

async function loadData() {
  await store.fetchAbouts()
  const about = store.abouts.find(a => a.aboutMeId === 8) || store.abouts[0]
  if (about) {
    Object.assign(editData, about)
  }
}

function startEditing() {
  const about = store.abouts.find(a => a.aboutMeId === 8) || store.abouts[0]
  if (about) {
    Object.assign(editData, about)
  }
  isEditing.value = true
}

function cancelEdit() {
  isEditing.value = false
  const about = store.abouts.find(a => a.aboutMeId === 8) || store.abouts[0]
  if (about) {
    Object.assign(editData, about)
  } else {
    Object.assign(editData, {
      aboutMeId: 8,
      name: '',
      surname: '',
      title: '',
      description: '',
      profileImageUrl: ''
    })
  }
}

async function saveEdit() {
  try {
    if (!editData.aboutMeId) {
      alert('Veri kimliği bulunamadı. Güncelleme yapılamıyor.')
      return
    }

    const payload = {
      aboutMeId: editData.aboutMeId,
      name: editData.name,   
      surname: editData.surname,
      title: editData.title,
      description: editData.description,
      profileImageUrl: editData.profileImageUrl, 
      skills: [] 
    }

    await store.updateAbout(editData.aboutMeId, payload)
    await loadData()
    isEditing.value = false
    imageUrl.value = '' // yükleme sonrası local görseli temizle
  } catch (error) {
    alert('Güncelleme sırasında hata oluştu: ' + (error.response?.data?.message || error.message))
  }
}

loadData()

watchEffect(() => {
  if (store.abouts.length > 0 && !isEditing.value) {
    const about = store.abouts.find(a => a.aboutMeId === 8) || store.abouts[0]
    if (about) {
      Object.assign(editData, about)
    }
  }
})
</script>

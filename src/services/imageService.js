
const backendBaseUrl = 'http://localhost:5282';

export async function uploadImageFile(file, token) {
  const formData = new FormData();
  formData.append('file', file);  

  const response = await fetch(backendBaseUrl + '/api/Image/upload-image', {
    method: 'POST',
    body: formData,
    headers :{
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Dosya yüklenemedi');
  }

  const data = await response.json();
  return data.imageUrl;  
}


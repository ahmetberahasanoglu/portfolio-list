<template>
  <div class="app-container">
    <Navigation />
    <div class="create-portfolio-container">
      <h1>Portföyünü Oluştur</h1>
      <form @submit.prevent="submitPortfolio">
        <div class="form-group">
          <label for="intro">Giriş Cümlesi</label>
          <textarea
            v-model="portfolio.intro"
            id="intro"
            rows="3"
            maxlength="100"
            placeholder="Giriş cümlenizi buraya yazın (min 16, max 100 karakter)..."
          ></textarea>
          <p id="altYazi">{{ portfolio.intro.length }} / 100</p>
        </div>

        <div class="form-group">
          <label for="profileImage">Profil Resmi</label>
          <input
            type="file"
            @change="handleImageUpload($event, 'profileImage')"
          />
          <div v-if="portfolio.profileImage" class="gallery-card">
            <img
              :src="portfolio.profileImage"
              alt="Profile Image"
              class="profile-image"
            />
            <button @click="removeProfileImage" class="remove-button">x</button>
          </div>
        </div>

        <div class="form-group">
          <label for="jobImages">Yaptıklarım</label>
          <input
            type="file"
            multiple
            @change="handleImageUpload($event, 'jobImages')"
            :disabled="portfolio.jobImages.length >= 8"
          />
          <div v-if="portfolio.jobImages.length" class="job-images-container">
            <div
              v-for="(image, index) in portfolio.jobImages"
              :key="index"
              class="gallery-card"
            >
              <img :src="image" alt="Job Image" class="job-image" />
              <button @click="removeJobImage(index)" class="remove-button">x</button>
            </div>
          </div>
          <p id="altYazi">{{ portfolio.jobImages.length }} / 8 fotoğraf</p>
        </div>

        <div class="form-group specialities-group">
          <label for="specialities">Uzmanlık Alanları</label>
          <div class="specialities-input">
            <input
              v-model="specialityInput"
              :maxlength="20"
              :disabled="portfolio.specialities.length >= 5"
              placeholder="Uzmanlık alanlarınızı buraya yazın (max 20 karakter)..."
            />
            <button
              type="button"
              @click="addSpeciality"
              :disabled="!specialityInput || portfolio.specialities.length >= 5"
            >
              +
            </button>
          </div>
          <ul>
            <li
              v-for="(speciality, index) in portfolio.specialities"
              :key="index"
              class="speciality-item"
            >
              {{ speciality }}
              <button @click="removeSpeciality(index)" class="remove-button">x</button>
            </li>
          </ul>
          <p id="altYazi">{{ portfolio.specialities.length }} / 5 uzmanlık</p>
        </div>

        <button type="submit" class="submit-button" :disabled="!canSubmit">
          Portföyü Kaydet
        </button>
      </form>
    </div>
    <div class="footer-container">
      <SiteFooter />
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import SiteFooter from "@/components/siteFooter.vue";

export default {
  name: "CreatePortfolio",
  components: {
    Navigation,
    SiteFooter,
  },
  data() {
    return {
      portfolio: {
        intro: "",
        profileImage: null,
        jobImages: [],
        specialities: [],
      },
      specialityInput: "",
    };
  },
  computed: {
    canSubmit() {
      return (
        this.portfolio.intro.length >= 16 &&
        this.portfolio.profileImage &&
        this.portfolio.jobImages.length >= 1 &&
        this.portfolio.specialities.length >= 1
      );
    },
  },
  methods: {
    handleImageUpload(event, type) {
      const files = event.target.files;
      if (type === "profileImage" && files[0]) {
        this.portfolio.profileImage = URL.createObjectURL(files[0]);
      } else if (type === "jobImages") {
        const remainingSlots = 8 - this.portfolio.jobImages.length;
        Array.from(files)
          .slice(0, remainingSlots)
          .forEach((file) => {
            this.portfolio.jobImages.push(URL.createObjectURL(file));
          });
      }
    },
    removeProfileImage() {
      this.portfolio.profileImage = null;
    },
    removeJobImage(index) {
      this.portfolio.jobImages.splice(index, 1);
    },
    addSpeciality() {
      if (this.specialityInput && this.portfolio.specialities.length < 5 && this.specialityInput.length <= 20) {
        this.portfolio.specialities.push(this.specialityInput);
        this.specialityInput = "";
      } else if (this.specialityInput.length > 20) {
        alert("Uzmanlık alanı maksimum 20 karakter olmalıdır.");
      }
    },
    removeSpeciality(index) {
      this.portfolio.specialities.splice(index, 1);
    },
    submitPortfolio() {
      if (this.canSubmit) {
        console.log("Portföy verileri kaydedildi:", this.portfolio);
        alert("Portföy başarıyla kaydedildi!");
      } else {
        alert("Lütfen tüm gerekli alanları doldurun.");
      }
    },
  },
};
</script>

<style scoped>
#altYazi {
  font-size: 13px;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.create-portfolio-container {
  flex: 1;
  max-width: 800px;
  min-width: 700px;
  margin: 0 auto;
  padding: 20px;
  padding-top: 60px; 
  font-family: "Poppins", sans-serif;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.preview-image {
  margin-top: 10px;
}

.job-images-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.profile-image,
.job-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  display: inline-block;
}

.specialities-group {
  position: relative;
}

.specialities-input {
  display: flex;
  gap: 10px;
}

.specialities-input input {
  flex: 1;
}

.specialities-input button {
  padding: 10px;
  background-color: #5dcaf2;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.specialities-input button:hover {
  transform: scale(1.01);
  box-shadow: 0 7px 10px rgba(0, 0, 0, 0.15);
}

.specialities-input button:disabled {
  background-color: #f0f0f0;
  cursor: not-allowed;
}

.speciality-item {
  background-color: #ff7f50;
  padding: 7px 27px 7px 10px;
  border-radius: 20px;
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 5px;
  position: relative;
}

.submit-button {
  padding: 10px 20px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
}

.submit-button:hover {
  background-color: #5d7185;
  transform: scale(1.01);
  box-shadow: 0 7px 10px rgba(0, 0, 0, 0.15);
}

.submit-button:disabled {
  background-color: #f0f0f0;
  color: black;
  cursor: not-allowed;
}

.footer-container {
  display: flex;
  justify-content: center;
  margin-top: auto;
}

input[type="file"]::file-selector-button {
  background: #ff7f50;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.gallery-card {
  position: relative;
  display: inline-block;
  width: 150px;
  height: 150px;
  overflow: hidden;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 5px;
}

.gallery-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-button {
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>

<template>
  <div class="app-container">
    <Navigation />

    <div class="portfolio-list">
      <div class="header">
        <div class="create-portfolio" v-if="loggedIn">
          <button class="primary-button" @click="createPortfolio">
            Portföy Oluştur
          </button>
        </div>
        <div class="filter-section">
          <label for="role-filter">Sırala:</label>
          <select id="role-filter" v-model="filter" @change="filterPortfolios">
            <option value="All">Tüm Portföyler</option>
            <option value="Web Developer">Web Developer</option>
            <option value="UX Designer">UX Designer</option>
            <option value="Backend Developer">Backend Developer</option>
          </select>
        </div>
      </div>
      <div class="portfolio-grid">
        <div
          v-for="portfolio in paginatedPortfolios"
          :key="portfolio.id"
          class="portfolio-card"
          @click="goToPortfolio(portfolio.id)"
        >
          <img :src="portfolio.image" alt="Portfolio Image" />
          <h3>{{ portfolio.name }}</h3>
          <p>{{ portfolio.role }}</p>
          <div class="portfolio-rating">
            <span
              v-for="star in 5"
              :key="star"
              class="star"
              :class="{ filled: star <= portfolio.rating }"
              >★</span
            >
          </div>
        </div>
      </div>
      <div class="pagination">
        <button
          class="pagination-button"
          @click="previousPage"
          :disabled="currentPage === 1"
        >
          <
        </button>
        <span style="font-size: medium;">Sayfa {{ currentPage }} / {{ totalPages }}</span>
        <button
          class="pagination-button"
          @click="nextPage"
          :disabled="currentPage === totalPages"
        >
          >
        </button>
      </div>
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
  components: {
    Navigation,
    SiteFooter,
  },
  data() {
    return {
      loggedIn: false, // giriş yapıldı mı
      portfolios: [
        {
          id: 1,
          name: "Ahmet",
          role: "Web Developer",
          image: "https://via.placeholder.com/150",
          rating: 4,
        },
        {
          id: 2,
          name: "Ayşe",
          role: "UX Designer",
          image: "https://via.placeholder.com/150",
          rating: 5,
        },
        {
          id: 3,
          name: "Mehmet",
          role: "Backend Developer",
          image: "https://via.placeholder.com/150",
          rating: 3,
        },
        {
          id: 4,
          name: "Selin",
          role: "Web Developer",
          image: "https://via.placeholder.com/150",
          rating: 4,
        },
        {
          id: 5,
          name: "Can",
          role: "Web Developer",
          image: "https://via.placeholder.com/150",
          rating: 5,
        },
        {
          id: 6,
          name: "Zeynep",
          role: "UX Designer",
          image: "https://via.placeholder.com/150",
          rating: 4,
        },
        {
          id: 7,
          name: "Emre",
          role: "Backend Developer",
          image: "https://via.placeholder.com/150",
          rating: 2,
        },
        {
          id: 8,
          name: "Elif",
          role: "Web Developer",
          image: "https://via.placeholder.com/150",
          rating: 3,
        },
        {
          id: 9,
          name: "Burak",
          role: "Web Developer",
          image: "https://via.placeholder.com/150",
          rating: 5,
        },
      ],
      filter: "All",
      currentPage: 1,
      itemsPerPage: 6,
    };
  },
  computed: {
    filteredPortfolios() {
      if (this.filter === "All") {
        return this.portfolios;
      }
      return this.portfolios.filter(
        (portfolio) => portfolio.role === this.filter
      );
    },
    paginatedPortfolios() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredPortfolios.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredPortfolios.length / this.itemsPerPage);
    },
  },
  methods: {
    filterPortfolios() {
      this.currentPage = 1;
    },
    goToPortfolio(id) {
      this.$router.push(`/portfolio/${id}`);
    },
    createPortfolio() {
      this.$router.push("/create-portfolio");
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
  mounted() {
    this.loggedIn = true; //baslatıldıgında giriş yapılı olsun
  },
};
</script>
<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
}

.portfolio-list {
  flex: 1;
  padding: 20px;
  margin-top: 60px; 
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.create-portfolio button {
  padding: 10px 20px;
  cursor: pointer;
}

.filter-section {
  display: flex;
  align-items: center;
}

.filter-section label {
  margin-right: 10px;
  color: #ff7f50;
}

.filter-section select {
  padding: 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.portfolio-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center; 
}

.portfolio-card {
  flex: 1 1 calc(33.33%);
  max-width: calc(33.33% - 100px);
  margin: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  background-color: #fff;
  cursor: pointer;
  text-align: center;
}

.portfolio-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.portfolio-card img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.portfolio-card h3 {
  margin-top: 10px;
  font-size: 1.2em;
}

.portfolio-card p {
  margin: 5px 0 10px;
  color: #666;
}

.portfolio-rating {
  margin-top: 10px;
}

.star {
  font-size: 20px;
  color: #ddd;
}

.star.filled {
  color: #f5c518;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.pagination-button {
  padding: 10px 20px;
  cursor: pointer;
  border: 1px solid #ff5079;
  background-color: #ff5079;
  color: black;
  border-radius: 15px;
  transition: background-color 0.2s, border 0.2s;
}

.pagination-button:disabled {
  cursor: not-allowed;
  background-color: #b0c4de;
  border-color: #b0c4de;
}

.pagination-button:not(:disabled):hover {
  background-color: #ff1d52;
  border-color: #ff1d52;
}

.primary-button {
  padding: 10px 20px;
  background-color:     #5cc385;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.primary-button:hover {
  background-color: #72ce98;
}

.footer-container {
  display: flex;
  justify-content: center; 
  margin-top: auto; 
}
</style>

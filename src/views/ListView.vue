<template>
  <div class="app-container">
    <Navigation />

    <div class="portfolio-list">
      <div class="header">
        <div class="create-portfolio" v-if="loggedIn">
          <button @click="createPortfolio">Kendi Portföyünü Oluştur</button>
        </div>
        <div class="filter-buttons">
          <button :class="{ active: filter === 'All' }" @click="filterPortfolios('All')">Tüm Portföyler</button>
          <button :class="{ active: filter === 'Web Developer' }" @click="filterPortfolios('Web Developer')">Web Developer</button>
          <button :class="{ active: filter === 'UX Designer' }" @click="filterPortfolios('UX Designer')">UX Designer</button>
          <button :class="{ active: filter === 'Backend Developer' }" @click="filterPortfolios('Backend Developer')">Backend Developer</button>
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
        </div>
      </div>
      <div class="pagination">
        <button @click="previousPage" :disabled="currentPage === 1">Önceki</button>
        <span>Sayfa {{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Sonraki</button>
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
      loggedIn: false, // Kullanıcı giriş durumunu belirler
      portfolios: [
        { id: 1, name: "Ahmet", role: "Web Developer", image: "https://via.placeholder.com/150" },
        { id: 2, name: "Ayşe", role: "UX Designer", image: "https://via.placeholder.com/150" },
        { id: 3, name: "Mehmet", role: "Backend Developer", image: "https://via.placeholder.com/150" },
        { id: 4, name: "Selin", role: "Web Developer", image: "https://via.placeholder.com/150" },
        { id: 5, name: "Can", role: "Web Developer", image: "https://via.placeholder.com/150" },
        { id: 6, name: "Zeynep", role: "UX Designer", image: "https://via.placeholder.com/150" },
        { id: 7, name: "Emre", role: "Backend Developer", image: "https://via.placeholder.com/150" },
        { id: 8, name: "Elif", role: "Web Developer", image: "https://via.placeholder.com/150" },
        { id: 9, name: "Burak", role: "Web Developer", image: "https://via.placeholder.com/150" },
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
      return this.portfolios.filter(portfolio => portfolio.role === this.filter);
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
    filterPortfolios(role) {
      this.filter = role;
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
    this.loggedIn = true; // Örnek olarak true yapıldı
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.portfolio-list {
  flex: 1;
  padding: 20px;
  margin-top: 60px; /* Navbar için yer açma */
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

.filter-buttons {
  display: flex;
  gap: 10px;
}

.filter-buttons button {
  padding: 10px 20px;
  cursor: pointer;
}

.filter-buttons .active {
  background-color: #007bff;
  color: white;
}

.portfolio-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  gap: 20px;
}

.portfolio-card {
  width: calc(33.33% - 40px); /* 3 kart için genişlik */
  margin: 20px; /* Kartlar arasındaki boşluk*/
  border: 1px solid #ccc;
  padding: 20px;
  cursor: pointer;
  text-align: center;
  transition: transform 0.2s;
}

.portfolio-card:hover {
  transform: scale(1.05);
}

.portfolio-card img {
  max-width: 100%;
  height: auto;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.pagination button {
  padding: 10px 20px;
  cursor: pointer;
}

.footer-container {
  background-color: #f8f9fa;
  padding: 10px 20px;
  flex-grow: 1; /* Footer'ın tüm alanı kaplamasını sağla */
  display: flex;
  flex-wrap: wrap; /* Kartlar yeni satıra geçsin */
  justify-content: center; /* Kartları ortala */
}
</style>

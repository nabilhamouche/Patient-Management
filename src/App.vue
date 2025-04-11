<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import PatientForm from './components/PatientForm.vue';
import PatientList from './components/PatientList.vue';
import Homepage from './components/Homepage.vue';

const activeView = ref('home'); 
const patients = ref([]);
const isScrolled = ref(false);
const atTop = ref(true);

const handleAddPatient = (patient) => {
  patients.value.push(patient);
  activeView.value = 'list';
};

const handleScroll = () => {
  if (window.scrollY > 100) {
    isScrolled.value = true;
  } else {
    isScrolled.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="app-container">
    <header :class="['main-header',
      activeView === 'home' ?  (isScrolled ? 'scrolled' : 'not-scrolled' && atTop ? 'visible' : 'hidden')
      : ('header' ),
      ]">
      
      <nav class="nav-container">
        <div class="nav-content">
          <div class="logo-section">
            <div class="logo-wrapper">
              <a href="" class="logo-link">
                <img class="logo-img" src="./components/images/logo.png" alt="Logo" />
              </a>
              <h1 class="logo-text">Patient <span class="title">Management</span></h1>
            </div>
          </div>
          <div class="nav-buttons">
            <button
              @click="activeView = 'home'"
              :class="['nav-button',
                activeView === 'home'
                  ? 'active-button'
                  :activeView==='home'?( isScrolled
                  ? 'scrolled-button'
                  : 'normal-button') : 'scrolled-button']"
            >
              Home
            </button>
            
            <button
              @click="activeView = 'form'"
              :class="['nav-button',
                activeView === 'form'
                  ? 'active-button'
                  : 'scrolled-button']"
            >
              Add a Patient
            </button>
            
            <button
              @click="activeView = 'list'"
              :class="['nav-button',
                activeView === 'list'
                  ? 'active-button'
                  : 'scrolled-button']"
            >
              View All Patients
            </button>
          </div>
        </div>
      </nav>
    </header>

    <main class="main-content">
      <div v-if="activeView === 'home'">
        <Homepage @navigate="activeView = $event" />
      </div>
      <div v-if="activeView === 'form'" class="form-container_">
        <PatientForm @add-patient="handleAddPatient" />
      </div>
      <div v-if="activeView === 'list'" class="list-container_">
        <PatientList :patients="patients" />
      </div>
    </main>
  </div>
</template>

<style>
/* Base styles */
.app-container {
  transition: background-color 200ms;
}
/* Header styles */
.title{
  color: #32e09b;
  font-weight: 700;
  text-decoration-color: #6afbc2;
  text-decoration-thickness: 2px;
  text-underline-offset: 0.2rem;
  text-shadow: 0 0 5px rgba(106, 251, 194, 0.5);

}
.main-header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;
  transition: all 500ms ease-in-out;
  transform: translateY(0);
}

.main-header.scrolled {
  background-color: #007d7d;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.main-header.not-scrolled {
  background-color: #f7f5f4;
  box-shadow: none;
}

.main-header.visible {
  transform: translateY(0);
  opacity: 1;
}

.main-header.hidden {
  transform: translateY(-100%);
  opacity: 0;
}
.header{
  transform: translateY(0);
  opacity: 1;
  background-color: #007d7d;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
/* Navigation container */
.nav-container {
  max-width: 1170px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .nav-container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .nav-container {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

/* Navigation content */
.nav-content {
  display: flex;
  justify-content: space-between;
  height: 4rem;
}

/* Logo section */
.logo-section {
  display: flex;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.logo-link {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo-img {
  height: 2.5rem;
  width: 2.5rem;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
}

/* Navigation buttons */
.nav-buttons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-button {
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 300ms, background-color 300ms;
}

.active-button {
  background-color: #007d7d;
  color: white;
}

.scrolled-button {
  color: black;
}

.scrolled-button:hover {
  color: white;
  background-color: #007d7d;
}

.normal-button {
  color: #374151;
}

.normal-button:hover {
  color: #007d7d;
  font-weight: 700;
}

.form-container_,
.list-container_ {
  max-width: 1170px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  margin-top: 5rem;
}

@media (min-width: 640px) {
  .form-container,
  .list-container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .form-container,
  .list-container {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>

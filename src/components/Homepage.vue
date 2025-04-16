<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const scrollItems = document.querySelectorAll('.scroll-item');

  const observerOptions = {
    root: null,
    threshold: 0.5,
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  scrollItems.forEach(item => observer.observe(item));
});
</script>

<template>
  <div class="home-page">
    <!-- Main Content -->
    <section class="hero scroll-item" id="home">
      <div class="bg-image__wrapper">
        <img class="bg-image" src="./images/hero_img.webp" alt="background image">
      </div>
      <div class="hero__container nav-container">
        <div class="hero-content">
          <h1>Powering Healthcare.</h1>
          <p class="scroll-item hero-desc" style="margin-bottom: 10px;">Effortlessly manage patient records with our easy-to-use system.</p>
          <button  class="scroll-item" style="margin: 5px;" @click="$emit('navigate', 'form')">AddPatient</button>

          <button class="scroll-item" style="margin: 5px;" @click="$emit('navigate', 'list')">View Patients</button>
        </div>
        <div class="health-image">
          <img style="height: 100%; width: 100%;" src="./images/hero_health.png" alt="health image">
        </div>
      </div>
    </section>
  </div>
</template>
  
  <style>
   /* some additional style */
  @keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
  /* additional style */
  .scroll-item {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  .hero-desc {
  font-size: 20px;
}

.heading {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 5px;
}

.text {
  font-size: 14px;
  margin-bottom: 10px;
}

.link {
  text-decoration: none;
  color: inherit;
  transition: color 0.3s ease-in-out;
}

.link:hover {
  color: #fff;
}

.features-subtitle {
  margin: -50px 0 0;
  font-size: 1rem;
  text-align: center;
  color: #797979;
  animation: fadeInUp 1.2s ease;
}
  .scroll-item.show {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* hime section */
  .home-page {
    text-align: center;

  }
  /* hero section */
  .hero {
    background-color: #f6f5f3;
    padding: 40px;
    position: relative;
    overflow: hidden;
    padding-top: 150px;
    padding-bottom: 150px;
    width: 100%;
    margin-top: 0px;
  }
  .bg-image__wrapper{
    left: 0;
    bottom: 0;
    position: absolute;
    right: 0;
    top: 0;
    
  }
  .bg-image{
  width: 100%;
  height: 100%;
  object-fit: cover; 
  }
  .health-image{
    width: 200%;
    height: 200%;
    object-fit: cover;
  }
  .hero__container{
    position: relative;
    z-index: 1;
    display: flex;  
    gap: 20px;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .hero-content{
    text-align: left;
    justify-content:center;
    animation: fadeInUp 1s ease;
  }
  .hero button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;
    background-color: #050505;
    border-color: #050505;
    color: white;
    display: inline-block;
    border-radius: 5px;
    transition: background-color 0.3s ease-in, color 0.3s;
    font-size: 16px;
    font-weight: 500;
    animation: fadeInUp 1s ease;

  }
  .hero button:hover {
    background-color: #007d7d;
    color: #fff;
  }
  .hero h1 {
    font-size: 72px;
    line-height: 1.2;
    font-weight: 400;
    text-align: left;
    padding-bottom: 20px;
    animation: fadeInUp 1s ease;
  }

  </style>
  
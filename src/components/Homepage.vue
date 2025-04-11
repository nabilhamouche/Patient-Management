<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  const scrollItems = document.querySelectorAll('.scroll-item');

  const observerOptions = {
    root: null, 
    threshold: 0.5, 
  };

  const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
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
          <p class="scroll-item" style="font-size: 20px;">Effortlessly manage patient records with our easy-to-use system.</p>
          <button  class="scroll-item" @click="$emit('navigate', 'form')">Get Started</button>
        </div>
        <div class="health-image">
          <img style="height: 100%; width: 100%;" src="./images/hero_health.png" alt="health image">
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features scroll-item max-wnav-container" id="features">
      <h1>Features</h1>
      <p>Designed for Impact, Built for Perfection</p>
      <div class="feature_content">
        <div class="feature_items">
          <h2>📋 Easy Patient Management</h2>
          <p>Add, update, and view patient records in one place.</p>
        </div>
        <div class="feature_items">
          <h2>📊 Quick Statistics</h2>
          <p>Keep track of patient data with real-time stats.</p>
        </div>
        <div class="feature_items">
          <h2>🔍 Search & Sort</h2>
          <p>Find patient records quickly with built-in search and sorting.</p>
        </div>
      </div>
    </section>

    <!-- Wrapper Section -->
    <div class="wrapper_section ">
      <div class="bg-image__wrapper">
        <img class="bg-image" src="./images/blue_bg.webp" alt="bg blue img">
      </div>
      <div class="wrapper_content nav-container">
        <h1 class="scroll-item">Effortless Patient Management for Healthcare Professionals</h1>
        <p class="scroll-item" style="font-size: 20px;">Streamline patient records, appointments, and medical history with our simple and efficient system. Keep all your patient data organized in one place.</p>
        <button class="scroll-item" @click="$emit('navigate', 'form')">Get Started Today</button>
      </div>
    </div>

    <!-- How It Works Section -->
    <section class="how-it-works " id="howit-works">
      <h1 class="scroll-item">How It Works</h1>
      <p class="scroll-item">Simple steps to manage your patient</p>
      <div class="steps">
        <div class="step">
          <div class="scroll-item">
            <h3>1. Register Patients</h3>
            <p>Fill in patient details and submit.</p>
          </div>
          <button class="scroll-item" @click="$emit('navigate', 'form')">Register Patients</button>
        </div>
        <div class="step ">
          <div class="scroll-item">
            <h3>2. View Records</h3>
            <p>Access patient history anytime.</p>
          </div>
          <button class="scroll-item"  @click="$emit('navigate', 'list')">Check Records</button>
        </div>
      </div>
    </section>

    <!-- Footer Section -->
    <footer>
      <div class="extranal_container nav-container">
        <div class="info_footer">
          <div class="logo"><img src="./images/logo.png" alt="logo"></div>
          <p class="company-name">PatientCare Solutions.</p>
          <div class="certifications">
            <img src="./images/iso.webp" alt="ISO 27001" class="cert-logo">
            <img src="./images/cyber.webp" alt="Cyber Essentials Plus" class="cert-logo">
          </div>
          <p class="copyright">PatientCare Solutions., 2025</p>
        </div>
        <div class="container">
          <div class="box">
            <h3 class="text-lg font-semibold mb-3">About Us</h3>
            <p class="text-sm">
              Our Patient Management System ensures efficient medical record management, appointment scheduling, and secure patient data storage.
            </p>
          </div>
          <div class="box">
            <h3 class="text-lg font-semibold mb-3">Quick Links</h3>
            <ul class="text-sm space-y-2">
              <li><a href="#home" class="hover:text-white transition">Home</a></li>
              <li><a href="#features" class="hover:text-white transition">Features</a></li>
              <li><a href="#howit-works" class="hover:text-white transition">How It Works</a></li>
              <li><a href="#contact" class="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          <div class="box" id="contact">
            <h3 class="text-lg font-semibold mb-3">Contact Us</h3>
            <p class="text-sm">📞 +1 (555) 123-4567</p>
            <p class="text-sm">✉️ contact@patientms.com</p>
          </div>
        </div>
      </div>
      <p class="copy_right">&copy; 2025 Patient Management System | Made with love by Nabil and Mehdi </p>
    </footer>
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

  /* features section */
  .features {
    padding: 60px;
  }
  .features h1{
    color: #ebeceb;
    font-size: 100px;
    text-align: center;
    font-weight: 800;
    letter-spacing: -3px;
    animation: fadeInUp 1.2s ease;
  }
  .features >p{
    margin: -50px 0 0;
    font-size: 1rem;
    text-align: center;
    color: #797979;
    animation: fadeInUp 1.2s ease;
  }
  .feature_content{
    display: flex;
    justify-content: center;
    gap: 20px;
    padding-top: 3rem;
    animation: fadeInUp 1.2s ease;
  }
  .feature_items{
    padding: 50px;
    min-height: 100%;
    overflow: hidden;
    background: 
    #f6f5f3;
    border-radius: 10px;
    width: 30%;
    transition: 0.6s;
    animation: fadeInUp 1.2s ease;
  }
  .feature_items:hover{
    transform: scale(1.05);
  }
  .feature_items h2{
    font-size: 25px;
    font-weight: 500;
    line-height: 1.2;
    margin-bottom: 1rem;
    text-align: center;
    animation: fadeInUp 1.2s ease;
  }
  .feature_items p{
    font-size: 15px;
    font-weight: 400;
    line-height: 1.6;
    text-align: center;
    color: #777;
    animation: fadeInUp 1.2s ease;
  }
  /* wrapper section 2*/
  .wrapper_section{
    padding-top: 150px;
    padding-bottom: 150px;
    position: relative;
    overflow: hidden;
    width: 100%;
  }
  .wrapper_section .bg-image__wrapper{
    left: 0;
    bottom: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
  .wrapper_section .bg-image{
    width: 100%;
    height: 100%;
    object-fit: cover; 
    object-position: center center;
  }
  .wrapper_section .wrapper_content{
    position: relative;
    z-index: 1; 
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .wrapper_section .wrapper_content h1{
    font-size: 40px;
    line-height: 1.2;
    font-weight: 400;
    text-align: center;
    padding-bottom: 20px;
    animation: fadeInUp 1.2s ease;
  }
  .wrapper_section .wrapper_content button {
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
    animation: fadeInUp 1.2s ease;
  }
  .wrapper_section .wrapper_content button:hover {
    background-color: #007d7d;
    color: #fff;
  }
  /* how it works section */
.how-it-works {
    background: #f7f5f4;
    padding: 60px;
} 
.how-it-works h1{
    color: #ebeceb;
    font-size: 100px;
    text-align: center;
    font-weight: 800;
    letter-spacing: -3px;
    animation: fadeInUp 1.2s ease;
  }
  .how-it-works >p{
    margin: -50px 0 0;
    font-size: 1rem;
    text-align: center;
    color: #797979;
    animation: fadeInUp 1.2s ease;
  }
.steps {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    padding-top: 3rem;
}

.step {
    background: white;
    padding: 20px;
    width: 250px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    transition: 0.6s;
    animation: fadeInUp 1.2s ease;
}
.step button {
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
    animation: fadeInUp 1.2s ease;
  }
  .step button:hover{
    background-color: #007d7d;
    color: #fff;
  }
.step:hover {
    transform: scale(1.05);
}
.step h3 {
    font-size: 20px;
    font-weight: 500;
    line-height: 1.2;
    margin-bottom: 1rem;
    text-align: center;
    animation: fadeInUp 1.2s ease;
}
.step p {
    font-size: 15px;
    font-weight: 400;
    line-height: 1.6;
    text-align: center;
    color: #777;
    animation: fadeInUp 1.2s ease;}
  /* footer section */
  footer {
    padding-bottom: 30px;
    padding-top: 50px;
    background-color: #007d7d;
  }
  .extranal_container{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .logo{
    width: 100px;
    height: 100px;
    object-fit:cover;

  }
  .info_footer{
    display: flex;
    flex-direction: column;
    justify-content:flex-start;
    text-align: left;
    padding-bottom: 30px;
    width: 570px;
  }
  .container{
    display:grid;
    grid-template-columns: repeat(3, 200px);
    gap: 40px;
}
  .container h3{
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 5px;
  }
  .container p{
    margin-bottom: 10px;
  }
  .container ul{
    list-style: none;
    padding: 0;
  }
  .container ul li{
    margin-bottom: 10px;
  }
  .container ul li a{
    text-decoration: none;
    transition: color 0.3s ease-in-out;
  }
  .container ul li a:hover{
    color: #fff;
  }
  .copy_right{
    text-align: center;
    padding-top: 20px ;
    font-size: 14px;
    color: #fff;
    margin-top: 30px;
    border-top:1px solid #fff;
  }

  .company-name {
    font-size: 14px;
}

.certifications {
    display: flex;
    gap: 15px;
    margin-top: 25px;
    margin-bottom: 15px;
}

.cert-logo {
    width: 80px;
}

.copyright {
    font-weight: bold;
    margin-top: 20px;
    font-size: 14px;
}
  </style>
  
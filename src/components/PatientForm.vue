<script setup>
import { ref, computed } from 'vue';

const emit = defineEmits(['add-patient']);

// Patient data with original fields
const patient = ref({
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  email: '',
  phone: '',
  gender: '',
  bloodType: '',
  allergies: '',
  diagnosis: ''
});

const formStep = ref(1);
const formErrors = ref({});
const showSuccess = ref(false);
const showError = ref(false);
const message = ref('');
const messageType = ref('');

// Compute progress as percentage of filled fields
const progress = computed(() => {
  const total = Object.keys(patient.value).length;
  const filled = Object.values(patient.value).filter(v => v !== '').length;
  return Math.round((filled / total) * 100);
});

// Validation logic adapted from original
function validateForm() {
  const errors = {};
  const p = patient.value;
  if (formStep.value === 1) {
    if (!p.firstName.trim()) errors.firstName = 'First name is required';
    else if (p.firstName.length < 2) errors.firstName = 'At least 2 characters';
    if (!p.lastName.trim()) errors.lastName = 'Last name is required';
    else if (p.lastName.length < 2) errors.lastName = 'At least 2 characters';
    if (!p.dateOfBirth) errors.dateOfBirth = 'DOB is required';
    else {
      const bd = new Date(p.dateOfBirth);
      if (bd > new Date()) errors.dateOfBirth = 'Cannot be in the future';
    }
    if (!p.gender) errors.gender = 'Gender is required';
  }
  if (formStep.value === 2) {
    if (!p.email) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) errors.email = 'Invalid email';
    if (!p.phone) errors.phone = 'Phone is required';
    else if (!/^\+?[\d\s-]{10,}$/.test(p.phone)) errors.phone = 'Invalid phone';
  }
  if (formStep.value === 3) {
    
  }

  formErrors.value = errors;
  return Object.keys(errors).length === 0;
}

function clearError(field) {
  if (formErrors.value[field]) formErrors.value[field] = '';
}

function nextStep() {
  if (validateForm() && formStep.value < 3) formStep.value++;
}
function prevStep() {
  if (formStep.value > 1) formStep.value--;
}

async function submitForm() {
  if (!validateForm()) return;
  try {
    const payload = { ...patient.value };
    const res = await fetch('http://localhost:3000/api/patients', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to submit');
    showSuccess.value = true;
    message.value = data.message || 'Patient added successfully!';
    messageType.value = 'success';
    emit('add-patient', payload);
    setTimeout(() => showSuccess.value = false, 3000);
    // reset
    Object.keys(patient.value).forEach(key => patient.value[key] = '');
    formStep.value = 1;
    formErrors.value = {};
  } catch (err) {
    showError.value = true;
    message.value = err.message;
    messageType.value = 'error';
    setTimeout(() => showError.value = false, 3000);
  }
}
</script>

<template>
  <div class="form-container">
    <h2 class="form-title">Add New Patient</h2>
    <p class="subtitle">Complete the form below to register a new patient</p>
    <!-- Progress Bar -->
    <div class="progress-bar">
      <div class="progress-track"><div class="progress-fill" :style="{ width: progress + '%' }"></div></div>
      <span class="progress-text">{{ progress }}% Complete</span>
    </div>
    <!-- Steps Indicator -->
    <div class="steps-indicator">
      <div v-for="n in 3" :key="n" class="step" :class="{ active: formStep === n, completed: formStep > n }">
        Step {{ n }}
      </div>
    </div>
    <form @submit.prevent="submitForm">
      <!-- Step 1 -->
      <div v-show="formStep === 1" class="form-step">
        <h3 class="step-title">Basic Information</h3>
        <div class="form-grid">
        <div class="input-box" :class="{ error: formErrors.firstName }">
          <label class="details">First Name</label>
          <input type="text" v-model="patient.firstName" @input="clearError('firstName')" placeholder="First name" />
          <span v-if="formErrors.firstName" class="error-message">{{ formErrors.firstName }}</span>
        </div>
        <div class="input-box" :class="{ error: formErrors.lastName }">
          <label class="details">Last Name</label>
          <input type="text" v-model="patient.lastName" @input="clearError('lastName')" placeholder="Last name" />
          <span v-if="formErrors.lastName" class="error-message">{{ formErrors.lastName }}</span>
        </div>
        <div class="input-box" :class="{ error: formErrors.dateOfBirth }">
          <label class="details">Date of Birth</label>
          <input type="date" v-model="patient.dateOfBirth" @input="clearError('dateOfBirth')" />
          <span v-if="formErrors.dateOfBirth" class="error-message">{{ formErrors.dateOfBirth }}</span>
        </div>
        <div class="input-box" :class="{ error: formErrors.gender }">
          <label class="details">Gender</label>
          <select v-model="patient.gender" @change="clearError('gender')" class="select-input">
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <span v-if="formErrors.gender" class="error-message">{{ formErrors.gender }}</span>
        </div>
      </div>
      </div>
      <!-- Step 2 -->
      <div v-show="formStep === 2" class="form-step">
        <h3 class="step-title">Contact Information</h3>
        <div class="form-grid">
        <div class="input-box" :class="{ error: formErrors.email }">
          <label class="details">Email</label>
          <input type="email" v-model="patient.email" @input="clearError('email')" placeholder="Email" />
          <span v-if="formErrors.email" class="error-message">{{ formErrors.email }}</span>
        </div>
        <div class="input-box" :class="{ error: formErrors.phone }">
          <label class="details">Phone</label>
          <input type="tel" v-model="patient.phone" @input="clearError('phone')" placeholder="Phone" />
          <span v-if="formErrors.phone" class="error-message">{{ formErrors.phone }}</span>
        </div>
      </div>
      </div>
      <!-- Step 3 -->
      <div v-show="formStep === 3" class="form-step">
        <h3 class="step-title">Medical Information</h3>
        <div class="form-grid">
          <div class="input-box">
            <label class="details">Blood Type</label>
            <select
              id="bloodType"
              v-model="patient.bloodType"
              class="select-input"
            >
              <option value="">Select blood type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div class="input-box">
            <label class="details">Allergies</label>
            <input 
              type="text" 
              id="allergies" 
              v-model="patient.allergies"
              placeholder="List any allergies"
            >
          </div>
        <div class="input-box">
          <label class="details">Diagnosis (Optional)</label>
          <input type="text" v-model="patient.diagnosis" placeholder="Diagnosis" />
        </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="form-actions">
        <button type="button" class="prev-button" @click="prevStep" v-if="formStep > 1">Previous</button>
        <button type="button" class="next-button" @click="nextStep" v-if="formStep < 3">Next</button>
        <button type="submit" class="submit-button" v-if="formStep === 3">Submit</button>
      </div>
    </form>

    <!-- Toast Messages -->
    <transition name="toast">
      <div v-if="message" :class="['toast-message', messageType]">
        {{ message }}
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Reuse original gradients and transitions */
.form-container {
  max-width: 700px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.1);
}
.form-title {
  font-size: 1.75rem;
  font-weight: 500;
  margin-bottom: 1rem;
  position: relative;
}
.subtitle {
  color: #64748b;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
}
.form-title::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: -4px;
  height: 3px;
  width: 50px;
  border-radius: 5px;
  background: linear-gradient(135deg, #007d7d, #a3e635);
}
.form-grid{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}
.progress-bar { margin-bottom: 1.5rem; }
.progress-track { height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden; }
.progress-fill { height: 100%; background: linear-gradient(135deg, #007d7d, #a3e635); transition: width 0.3s; }
.progress-text { font-size: 0.85rem; color: #64748b; margin-top: 0.25rem; display: block; text-align: center;}
.steps-indicator { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; justify-content: center; }
.step { padding: 0.5rem 1rem; background: #f1f5f9; border-radius: 20px; font-size: 0.85rem; color: #64748b; }
.step.active { background: linear-gradient(135deg, #007d7d, #a3e635); color: #fff; transform: scale(1.05); }
.step.completed { background: #3aa876; color: #fff; }
.input-box { margin-bottom: 1rem; }
.input-box .details { font-weight: 500; margin-bottom: 0.25rem; color: #334155; }
.input-box input, .input-box select { width: 100%; padding: 0.75rem 1rem; border: 1px solid #ccc; border-radius: 5px; font-size: 1rem; transition: all 0.3s; }
.input-box input:focus, .input-box select:focus { border-color: #42b983;
  box-shadow: 0 0 0 4px rgba(66, 185, 131, 0.1);
  transform: translateY(-1px); outline: none; }
.input-box.error input, .input-box.error select { border-color: #ef4444; }
.error-message { color: #ef4444; font-size: 0.75rem; margin-top: 0.25rem; }
.select-input { appearance: none; background-image: url("data:image/svg+xml,..."); background-repeat: no-repeat; background-position: right 1rem center; padding-right: 2.5rem; }
.form-actions { display: flex; gap: 1rem; margin-top: 1.5rem; }
.next-button, .submit-button { padding: 0.75rem 1.5rem; border-radius: 5px; font-size: 0.9rem; font-weight: 500; cursor: pointer; border: none; transition: background-position 0.4s;  margin-left: auto;}
.prev-button{padding: 0.75rem 1.5rem; border-radius: 5px; font-size: 0.9rem; font-weight: 500; cursor: pointer; border: none; transition: background-position 0.4s; margin-right:auto ;}
.next-button, .submit-button { background: linear-gradient(135deg, #007d7d, #a3e635); background-size: 200% 200%; background-position: left; color: #fff; }
.next-button:hover, .submit-button:hover { background-position: right; }
.prev-button { background: #f1f5f9; color: #64748b; border: 1px solid #ccc; }
.prev-button:hover { background: #e2e8f0; }
.toast-message { position: fixed; bottom: 2rem; right: 2rem; padding: 1rem 1.5rem; border-radius: 8px; color: #fff; font-weight: 500; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
.toast-enter-active, .toast-leave-active { transition: all 0.5s; }
.toast-enter-from { opacity: 0; transform: translateX(100%); }
.toast-enter-to { opacity: 1; transform: translateX(0); }
.toast-leave-from { opacity: 1; transform: translateX(0); }
.toast-leave-to { opacity: 0; transform: translateX(100%); }
.success { background: #16a34a; }
.input-box input:focus,
.input-box select:focus {
  border-color: #007d7d;
  box-shadow: 0 0 0 2px rgba(0, 125, 125, 0.3);
}
.step-title {
  color: #1a365d;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
}
</style>

<script setup>
import { ref } from 'vue';

const firstName = ref('');
const lastName = ref('');
const dateOfBirth = ref('');
const email = ref('');
const phone = ref('');
const diagnosis = ref('');
const gender = ref('');
const formErrors = ref({});
const showSuccess = ref(false);
const message = ref('');
const messageType = ref('');
const emit = defineEmits(['add-patient']);

const validateForm = () => {
  const errors = {};
  
  if (!firstName.value.trim()) {
    errors.firstName = 'First name is required';
  } else if (firstName.value.length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  if (!lastName.value.trim()) {
    errors.lastName = 'Last name is required';
  } else if (lastName.value.length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  }

  if (!dateOfBirth.value) {
    errors.dateOfBirth = 'Date of birth is required';
  } else {
    const birthDate = new Date(dateOfBirth.value);
    const today = new Date();
    if (birthDate > today) {
      errors.dateOfBirth = 'Date of birth cannot be in the future';
    }
  }

  if (!email.value) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!phone.value) {
    errors.phone = 'Phone number is required';
  } else if (!/^\+?[\d\s-]{10,}$/.test(phone.value)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!gender.value) {
    errors.gender = 'Gender is required';
  }

  formErrors.value = errors;
  return Object.keys(errors).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    const patient = {
      firstName: firstName.value,
      lastName: lastName.value,
      dateOfBirth: dateOfBirth.value,
      email: email.value,
      phone: phone.value,
      gender: gender.value,
      diagnosis: diagnosis.value
    };

    const response = await fetch('http://localhost:3000/api/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patient)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit');
    }

    message.value = data.message || 'Patient added successfully!';
    messageType.value = 'success';

    // Clear form
    firstName.value = '';
    lastName.value = '';
    dateOfBirth.value = '';
    email.value = '';
    phone.value = '';
    diagnosis.value = '';
    gender.value = '';
    formErrors.value = {};

  } catch (error) {
    console.error('Error submitting patient:', error);

    message.value = error.message || 'There was an error submitting the patient.';
    messageType.value = 'error';
  }

  setTimeout(() => {
    message.value = '';
    messageType.value = '';
  }, 3000);
};

const clearError = (field) => {
  if (formErrors.value[field]) {
    formErrors.value[field] = '';
  }
};
</script>

<template>
  <div class="form-container">
    <h2 class="form-title">Add New Patient</h2>
    <form @submit.prevent="handleSubmit">
      <div class="patient-details">
        <div class="input-box" :class="{ 'error': formErrors.firstName }">
          <label class="details">First Name</label>
          <input 
            type="text" 
            v-model="firstName" 
            @input="clearError('firstName')"
            placeholder="Enter first name" 
          />
          <span v-if="formErrors.firstName" class="error-message">{{ formErrors.firstName }}</span>
        </div>

        <div class="input-box" :class="{ 'error': formErrors.lastName }">
          <label class="details">Last Name</label>
          <input 
            type="text" 
            v-model="lastName" 
            @input="clearError('lastName')"
            placeholder="Enter last name" 
          />
          <span v-if="formErrors.lastName" class="error-message">{{ formErrors.lastName }}</span>
        </div>

        <div class="input-box" :class="{ 'error': formErrors.dateOfBirth }">
          <label class="details">Date of Birth</label>
          <input 
            type="date" 
            v-model="dateOfBirth" 
            @input="clearError('dateOfBirth')"
          />
          <span v-if="formErrors.dateOfBirth" class="error-message">{{ formErrors.dateOfBirth }}</span>
        </div>

        <div class="input-box" :class="{ 'error': formErrors.email }">
          <label class="details">Email</label>
          <input 
            type="email" 
            v-model="email" 
            @input="clearError('email')"
            placeholder="Enter email" 
          />
          <span v-if="formErrors.email" class="error-message">{{ formErrors.email }}</span>
        </div>

        <div class="input-box" :class="{ 'error': formErrors.phone }">
          <label class="details">Phone</label>
          <input 
            type="tel" 
            v-model="phone" 
            @input="clearError('phone')"
            placeholder="Enter phone number" 
          />
          <span v-if="formErrors.phone" class="error-message">{{ formErrors.phone }}</span>
        </div>
        
        <div class="input-box" :class="{ 'error': formErrors.diagnosis }">
          <label class="details">Diagnosis (Optional)</label>
          <input 
            type="text" 
            v-model="diagnosis" 
            @input="clearError('diagnosis')"
            placeholder="Enter diagnosis" 
          />
          <span v-if="formErrors.diagnosis" class="error-message">{{ formErrors.diagnosis }}</span>
        </div>
      </div>
      
      <div class="input-box" :class="{'error':formErrors.gender}">
        <label class="details">Gender</label>
        <select 
          v-model="gender" 
          @change="clearError('gender')"
          class="select-input"
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <span v-if="formErrors.gender" class="error-message">{{ formErrors.gender }}</span>
      </div>
      
      <div class="button">
        <input type="submit" value="Add Patient" />
      </div>
    </form>

    <transition name="toast">
      <div
        v-if="message"
        :class="['toast-message', messageType === 'success' ? 'success' : 'error']"
      >
        {{ message }}
      </div>
    </transition>
  </div>
</template>
<style>

.error-message {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.1rem;
}
.select-input {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.8rem center;
  background-size: 0.8em;
}
.form-container {
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  background-color: #fff;
  padding: 25px 30px;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
}
.form-title {
  font-size: 25px;
  font-weight: 500;
  position: relative;
  margin-bottom: 24px;
}
.form-title::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 30px;
  border-radius: 5px;
  background: linear-gradient(135deg, #007d7d, #a3e635);
}
.patient-details {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 0 12px 0;
}
.input-box {
  margin-bottom: 15px;
  width: calc(100% / 2 - 20px);
}
.input-box .details {
  display: block;
  font-weight: 500;
  margin-bottom: 5px;
}
.input-box input,
.input-box select {
  height: 45px;
  width: 100%;
  outline: none;
  font-size: 16px;
  border-radius: 5px;
  padding-left: 15px;
  border: 1px solid #ccc;
  border-bottom-width: 2px;
  transition: all 0.3s ease;
}
.input-box input:focus,
.input-box select:focus {
  border-color: #007d7d;
  box-shadow: 0 0 0 2px rgba(0, 125, 125, 0.3);
}
.input-box.error input,
.input-box.error select,
.input-box.error textarea{
  border-color: #ef4444;
  background-color: #fff5f5;
}
.button {
  height: 45px;
  margin: 35px 0;
}
.button input {
  height: 100%;
  width: 100%;
  border-radius: 5px;
  border: none;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
  background: linear-gradient(135deg, #007d7d, #a3e635);
  background-size: 200% 200%;
  background-position: left;
  transition: background-position 0.4s ease;
}

.button input:hover {
  background-position: right;
}

.toast-message {
  position: fixed;
  bottom: 30px;
  left: 30px;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  color: white;
  z-index: 1000;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  opacity: 0.95;
}

.success {
  background-color: #16a34a;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}
.toast-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.toast-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}


@media(max-width: 584px) {
  .form-container {
    max-width: 100%;
  }
  .input-box {
    margin-bottom: 15px;
    width: 100%;
  }
  .patient-details {
    max-height: 300px;
    overflow-y: scroll;
  }
  .patient-details::-webkit-scrollbar {
    width: 5px;
  }
}
</style>
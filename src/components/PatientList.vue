<script setup>
import { computed, onMounted, ref,watch  } from 'vue';
import { format } from 'date-fns';

const patients = ref([]);
const sortField = ref('lastName');
const sortDirection = ref('asc');
const searchQuery = ref('');
const searchField = ref('lastName');
let debounceTimeout;
const sortKeyMap = {
  'First Name': 'firstName',
  'Last Name': 'lastName',
  'Date of Birth': 'dateOfBirth',
  'Email': 'email',
};

watch([searchQuery, searchField],  () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(async () => {
    const field = searchField.value;
  const query = searchQuery.value.trim();

  if (!query) {

    const res = await fetch('http://localhost:3000/api/get-patients');
    patients.value = await res.json();
    return;
  }

  try {
    if (field === 'id') {
      const res = await fetch(`http://localhost:3000/api/get-patients/${query}`);
      if (res.ok) {
        patients.value = [await res.json()];
      } else {
        patients.value = [];
      }
    } else {
      const res = await fetch(`http://localhost:3000/api/get-patients?${field}=${encodeURIComponent(query)}`);
      patients.value = res.ok ? await res.json() : [];
    }
  } catch (error) {
    console.error('Error while filtering patients:', error);
    patients.value = [];
  }
  }, 300);
 
});
const filteredPatients = computed(() => {
  return patients.value; 
});

const sortedPatients =  computed(() => {
  return [...filteredPatients.value].sort((a, b) => {
    const field = sortField.value;
    const direction = sortDirection.value === 'asc' ? 1 : -1;

    if (field === 'dateOfBirth') {
      return (new Date(a[field]).getTime() - new Date(b[field]).getTime()) * direction;
    }

    return (a[field]?.localeCompare(b[field]) ?? 0) * direction;
  });
});

const toggleSort = (label) => {
  const field = sortKeyMap[label];
  if (!field) return;

  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortField.value = field;
    sortDirection.value = 'asc';
  }
};

const formatDate = (date) => {
  if (!date) return 'Unknown';
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) {
    console.warn('Invalid date format:', date);
    return 'Invalid Date';
  }
  return format(parsed, 'MMM dd, yyyy');
};

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/get-patients');
    if (!response.ok) throw new Error('Failed to fetch patients');
    const data = await response.json();
    console.log('Fetched patients:', data);
    patients.value = data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
});
</script>

<template>
  <div class="patients-container">
    <div class="header-section">
      <h2>Patient Records</h2>
      <div class="search-container">
      <div class="search-wrapper">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search by attribute..."
          class="search-input"
        />
        <span class="search-icon">🔍</span>
      </div>
      <label class="search">search by:</label>
      <select v-model="searchField" class="search-select">
        <option value="firstName">First Name</option>
        <option value="lastName">Last Name</option>
        <option value="email">Email</option>
        <option value="id">ID</option>
      </select>
    </div>
    <div class="note">click on the four first table head in order to sort it asc <span class="sort-indicator">↑</span> or desc <span class="sort-indicator">↓</span></div>
    </div>
    
   

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th v-for="label in ['First Name', 'Last Name', 'Date of Birth', 'Email']" 
                :key="label"
                @click="toggleSort(label)"
                class="sortable"
            >
              {{ label }}
              <span v-if="sortField === sortKeyMap[label]" class="sort-indicator">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Diagnosis</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="sortedPatients.length" v-for="patient in sortedPatients" :key="patient.id">
            <td>{{ patient.firstName }}</td>
            <td>{{ patient.lastName }}</td>
            <td>{{ formatDate(patient.dateOfBirth) }}</td>
            <td>{{ patient.email }}</td>
            <td>{{ patient.phone }}</td>
            <td><span :class="[patient.gender==='Male'? 'gender-badge': 'gender-badge-Female']">{{ patient.gender }}</span></td>
            <td><span class="diagnosis-badge">{{ patient.diagnosis }}</span></td>
          </tr>
          <tr v-else>
            <td colspan="7" class="text-center">No patients found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
.patients-container {
  padding: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  min-height: 100vh;
}

.note{
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 20px;
}
.header-section h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 20px 0;
  letter-spacing: -0.5px;
  text-align: center;
}

.search-container {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  align-items: center;
  max-width: 600px;
}

.search-wrapper {
  flex: 1;
  position: relative;
}
.search-input {
  width: 100%;
  padding: 0.5rem 0.75rem 0.5rem 2rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  background-color: white;
}

.search-input:focus {
  border-color: #007d7d;
  box-shadow: 0 0 0 2px rgba(0, 125, 125, 0.3);
  outline: none;
}
.search{
  display: block;
  font-weight: 500;
  margin-bottom: 5px;
}
.search-icon {
  position: absolute;
  left: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  pointer-events: none;
  font-size: 0.875rem;
}

.search-select {
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background-color: white;
  font-size: 0.875rem;
  min-width: 120px;
  transition: all 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.8rem center;
  background-size: 0.8em;
}


.search-select:focus {
  border-color: #007d7d;
  box-shadow: 0 0 0 2px rgba(0, 125, 125, 0.3);
  outline: none;
}

.table-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: white;
}
.text-center{
  text-align: center;
  font-size: 1rem;
  color: #6b7280;
  padding: 1rem;
}
th, td {
  padding: 0.75rem 1rem;
  text-align: left;
}

th {
  background-color: #f1f5f9;
  font-weight: 600;
  color: #1e293b;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

th.sortable {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

th.sortable:hover {
  background-color: #e2e8f0;
}

.sort-indicator {
  margin-left: 0.5rem;
  color: #007d7d;
  font-weight: bold;
}

tbody tr {
  transition: all 0.2s ease;
  border-bottom: 1px solid #f1f5f9;
}

tbody tr:last-child {
  border-bottom: none;
}

tbody tr:hover {
  background-color: #f8fafc;
}

td {
  color: #334155;
  font-size: 0.875rem;
}

.gender-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: #e0f2fe;
  color: #0369a1;
}
.gender-badge-Female{
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: #fdcaf2;
  color: #f35da8;
}
.diagnosis-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: #fef3c7;
  color: #92400e;
}

@media (max-width: 1024px) {
  .patient-list {
    padding: 1rem;
  }
  
  .header {
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .search-container {
    flex-direction: column;
    max-width: 100%;
  }
  
  .search-select {
    width: 100%;
  }
  
  .table-container {
    overflow-x: auto;
  }
  
  th, td {
    padding: 0.75rem 0.5rem;
  }
}
</style>
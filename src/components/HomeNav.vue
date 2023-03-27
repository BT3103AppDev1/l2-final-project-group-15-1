<template>
    <nav>
      <ul>
        <li>
          <router-link to="/configure">Configure Medications/Supplements</router-link>
        </li>
        <li>
          <router-link to="/overview">Full Medication/Supplement Overview</router-link>
        </li>
        <li>
          <router-link to="/rewards">Reward Points</router-link>
        </li>
        <li>
          <router-link to="/screening">Screening Recommendations</router-link>
        </li>
        <li>
          <router-link to="/analytics">Patient Analytics</router-link>
        </li>
      </ul>
    </nav>
</template>
  
<script>
    export default {
        name: 'HomeNav'
    }
</script>
  
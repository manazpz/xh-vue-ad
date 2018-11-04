<template>
  <div class="dashboard-container">
    <component :is="currentRole"></component>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import shopDashboard from './shop'

  export default {
    name: 'dashboard',
    components: { shopDashboard },
    data() {
      return {
        currentRole: 'shopDashboard'
      }
    },
    computed: {
      ...mapGetters([
        'roles'
      ])
    },
    created() {
    }
  }
</script>

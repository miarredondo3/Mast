<template>
  <div class="row">
    <div class="col text-center">
      <h2>Logged Out Successfully</h2>
      <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "LogoutSuccess",
  mounted: function() {}
};
</script>
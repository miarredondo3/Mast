<template>
<div>
  <Landing />
  <!-- {{userInfo}} -->
  </div>
</template>

<script>
import Landing from '../components/Landing.vue';
import UserInfoStore from '../app/user-info-store';

export default {
  name: 'Home',

  components: {
    Landing,
  },

   data: function() {
        return{
            userInfo: UserInfoStore.state.cognitoInfo
        }
    }
};
</script>

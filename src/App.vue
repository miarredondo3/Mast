<template>
  <v-app>
    <v-app-bar app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Modern Academic Security Training (MAST)</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute left temporary>
      <v-list class="alert alert-info">
        <v-list-item-content>
      <v-list-item-title class="pa-3">Username: {{userInfo.username}}</v-list-item-title>
      </v-list-item-content>
      </v-list>
      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn outlined to="/logout">
            Logout
            <!-- <router-link to="/logout" block>Logout</router-link> -->
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import UserInfoStore from "@/app/user-info-store";
import Home from "@/views/Home.vue"
export default {
  name: "App",
  components: {
    Home,
  },

  data: function() {
    return {
      userInfo: UserInfoStore.state.cognitoInfo,
      drawer: false,
      items: [
        { title: "Home", icon: "mdi-home-city" },
        { title: "My Account", icon: "mdi-account" },
        { title: "Users", icon: "mdi-account-group-outline" }
      ]
    };
  }
};
</script>


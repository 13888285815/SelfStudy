<template>
  <div id="app">
    <el-container v-if="isAuthenticated">
      <el-header>
        <div class="header-content">
          <div class="logo" @click="$router.push('/')">
            <h2>意念科技</h2>
          </div>
          <el-menu
            :default-active="activeMenu"
            mode="horizontal"
            router
            class="nav-menu"
          >
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/courses">课程</el-menu-item>
            <el-menu-item index="/api">API</el-menu-item>
            <el-menu-item index="/billing">计费</el-menu-item>
            <el-menu-item index="/subscription">订阅</el-menu-item>
          </el-menu>
          <div class="user-info">
            <el-badge :value="user.tokenBalance" :max="99999" class="token-badge">
              <el-icon><Coin /></el-icon>
            </el-badge>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                {{ user.username }}
                <el-icon><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="profile">个人资料</el-dropdown-item>
                  <el-dropdown-item command="api-keys">API Keys</el-dropdown-item>
                  <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <router-view v-else />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from './store/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const user = computed(() => userStore.user)
const isAuthenticated = computed(() => userStore.isAuthenticated)
const activeMenu = computed(() => route.path)

onMounted(() => {
  userStore.loadUser()
})

const handleCommand = (command) => {
  switch (command) {
    case 'profile':
      router.push('/profile')
      break
    case 'api-keys':
      router.push('/api-keys')
      break
    case 'logout':
      userStore.logout()
      router.push('/login')
      break
  }
}
</script>

<style scoped>
#app {
  min-height: 100vh;
  background: #f5f5f5;
}

.el-header {
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 0;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
}

.logo {
  cursor: pointer;
}

.logo h2 {
  margin: 0;
  color: #409eff;
}

.nav-menu {
  flex: 1;
  margin: 0 40px;
  border-bottom: none;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.token-badge {
  cursor: pointer;
}

.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.el-main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}
</style>

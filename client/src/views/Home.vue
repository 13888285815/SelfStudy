<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="hero">
          <h1>意念科技 · 创新学习</h1>
          <p>专业的在线学习平台，提供AI API Tokens计费和智能学习服务</p>
          <el-button type="primary" size="large" @click="$router.push('/courses')">
            开始学习
          </el-button>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="features">
      <el-col :span="8">
        <div class="feature-card">
          <el-icon :size="48" color="#409eff"><Video-Camera /></el-icon>
          <h3>海量视频课程</h3>
          <p>涵盖办公、设计、编程等多个领域</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="feature-card">
          <el-icon :size="48" color="#67c23a"><Trophy /></el-icon>
          <h3>专业讲师团队</h3>
          <p>经验丰富的在职老师原创录制</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="feature-card">
          <el-icon :size="48" color="#e6a23c"><Trend-Charts /></el-icon>
          <h3>学习进度跟踪</h3>
          <p>实时记录您的学习历程</p>
        </div>
      </el-col>
    </el-row>

    <div class="courses-section">
      <h2>热门课程</h2>
      <el-row :gutter="20">
        <el-col :span="6" v-for="course in popularCourses" :key="course._id">
          <el-card shadow="hover" class="course-card">
            <img :src="course.thumbnail" class="course-thumbnail" />
            <h4>{{ course.title }}</h4>
            <p class="instructor">{{ course.instructorName }}</p>
            <div class="course-stats">
              <el-rate v-model="course.stats.averageRating" disabled />
              <span>{{ course.stats.enrollmentCount }} 人学习</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_BASE = process.env.VITE_API_BASE || 'http://localhost:3000/api'

const popularCourses = ref([])

onMounted(async () => {
  try {
    const response = await axios.get(`${API_BASE}/courses/featured/popular`)
    popularCourses.value = response.data.data.courses
  } catch (error) {
    console.error('加载热门课程失败:', error)
  }
})
</script>

<style scoped>
.home {
  padding: 20px;
}

.hero {
  text-align: center;
  padding: 80px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
  margin-bottom: 40px;
}

.hero h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.hero p {
  font-size: 20px;
  margin-bottom: 30px;
  opacity: 0.9;
}

.features {
  margin-bottom: 60px;
}

.feature-card {
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.feature-card h3 {
  margin: 20px 0 10px;
}

.courses-section h2 {
  margin-bottom: 30px;
  text-align: center;
}

.course-card {
  margin-bottom: 20px;
  cursor: pointer;
}

.course-thumbnail {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 5px;
}

.course-card h4 {
  margin: 15px 0 5px;
  font-size: 16px;
}

.instructor {
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
}

.course-stats {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: #999;
}
</style>

<template>
  <div>
    <h1 class="page-title">专业心理支持，陪你走过每一步</h1>
    <p class="page-subtitle">无论是短暂困扰还是长期困惑，这里都有适合你的帮助方式</p>
    <div class="filters-container">
      <label for="genderFilter">按性别筛选：</label>
      <select id="genderFilter" v-model="genderFilter">
        <option value="">全部</option>
        <option value="男">男</option>
        <option value="女">女</option>
      </select>
      <label for="approachFilter">按流派筛选：</label>
      <select id="approachFilter" v-model="approachFilter">
        <option value="">全部</option>
        <option value="CBT">CBT</option>
        <option value="精神分析">精神分析</option>
        <option value="正念">正念</option>
      </select>
    </div>
    <ul>
      <li v-for="counselor in filteredCounselors" :key="counselor.id">
        <img :src="counselor.avatar" alt="咨询师头像" />
        <div>
          <h3>{{ counselor.name }}</h3>
          <p>{{ counselor.qualification }}</p>
          <p>擅长领域：<span v-for="area in counselor.expertise" :key="area">{{ area }}</span></p>
          <button @click="viewDetails(counselor)">查看详情</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 模拟咨询师数据
const counselors = ref([
  {
    id: 1,
    name: '张三',
    gender: '男',
    qualification: '国家二级心理咨询师，10 年经验',
    expertise: ['焦虑干预', '情感关系'],
    approach: 'CBT',
    avatar: 'https://dummyimage.com/100x100/000/fff'
  },
  {
    id: 2,
    name: '李四',
    gender: '女',
    qualification: '国家三级心理咨询师，5 年经验',
    expertise: ['抑郁缓解', '亲子教育'],
    approach: '精神分析',
    avatar: 'https://dummyimage.com/100x100/000/fff'
  },
  {
    id: 3,
    name: '王五',
    gender: '男',
    qualification: '心理咨询师，3 年经验',
    expertise: ['压力管理', '自我成长'],
    approach: '正念',
    avatar: 'https://dummyimage.com/100x100/000/fff'
  }
]);

// 筛选条件
const genderFilter = ref('');
const approachFilter = ref('');

// 计算筛选后的咨询师列表
const filteredCounselors = computed(() => {
  return counselors.value.filter(counselor => {
    const genderMatch = genderFilter.value === '' || counselor.gender === genderFilter.value;
    const approachMatch = approachFilter.value === '' || counselor.approach === approachFilter.value;
    return genderMatch && approachMatch;
  });
});

// 查看详情方法
const viewDetails = (counselor) => {
  console.log(`查看咨询师 ${counselor.name} 的详情`);
};
</script>

<style scoped>
/* 新增样式 */
.page-title {
  color: #2c3e50;
  font-size: 28px;
  margin-bottom: 8px;
  text-align: center;
  font-weight: 600;
}

.page-subtitle {
  color: #7f8c8d;
  font-size: 16px;
  text-align: center;
  margin-bottom: 30px;
}

.filters-container {
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 15px;
}

/* 修改现有样式 */
li {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  gap: 15px;
  margin-bottom: 0;
  transition: all 0.3s ease;
}

img {
  width: 100px;
  height: 100px;
  border: 3px solid #f5f7fa;
}

button {
  background: linear-gradient(135deg, #4A90E2, #6A5ACD);
  box-shadow: 0 2px 4px rgba(74, 144, 226, 0.3);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .filters-container {
    flex-direction: column;
    align-items: flex-start;
  }
  
  li {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  img {
    margin-bottom: 15px;
  }
}

/* 主色调和背景 */
div {
  background-color: #F7F7F7;
  padding: 20px;
}

/* 卡片式布局 */
ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
  padding: 0;
}

/* 文本样式 */
h1 {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
}

h3 {
  color: #333;
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 5px 0;
}

p {
  color: #666;
  font-size: 14px;
  margin: 5px 0;
}

/* 按钮样式 */
button {
  background-color: #4A90E2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #3A7BC8;
}

/* 筛选器样式 */
select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-right: 15px;
  margin-bottom: 15px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  ul {
    grid-template-columns: 1fr;
  }
}
</style>    
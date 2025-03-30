<template>
  <div>
    <!-- 导航栏 -->
    <nav>
      <ul>
        <li v-for="category in categories" :key="category.id">
          <!-- 简化代码进行测试 -->
          <a href="#" data-category="article" class="active">
            {{ category.label }}
          </a>
        </li>
      </ul>
    </nav>
    <!-- 搜索框和筛选 -->
    <div class="search-filter">
      <input type="text" v-model="searchTerm" placeholder="搜索资源">
      <select v-model="sortType" @change="sortResources">
        <option value="default">默认排序</option>
        <option value="newest">最新发布</option>
        <option value="popular">最热门</option>
      </select>
    </div>
    <!-- 资源展示区域 -->
    <div class="resource-container">
      <div class="resource-item" v-for="resource in filteredResources" :key="resource.id">
        <img :src="resource.thumbnail" alt="资源缩略图">
        <h3>{{ resource.title }}</h3>
        <p>{{ resource.description }}</p>
        <a :href="resource.link">{{ resource.linkText }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 资源数据
const resources = [
  {
    id: 1,
    category: 'article',
    title: '如何应对压力',
    description: '介绍一些有效的应对压力的方法。',
    thumbnail: 'https://dummyimage.com/200x150/000/fff',
    link: '#',
    linkText: '查看文章',
    date: '2025-03-20',
    popularity: 80
  },
  {
    id: 2,
    category: 'video',
    title: '心理健康讲座视频',
    description: '专业人士的心理健康讲座视频。',
    thumbnail: 'https://dummyimage.com/200x150/000/fff',
    link: '#',
    linkText: '观看视频',
    date: '2025-03-25',
    popularity: 90
  },
  {
    id: 3,
    category: 'audio',
    title: '放松冥想音频',
    description: '帮助放松的冥想音频。',
    thumbnail: 'https://dummyimage.com/200x150/000/fff',
    link: '#',
    linkText: '播放音频',
    date: '2025-03-18',
    popularity: 70
  },
  {
    id: 4,
    category: 'book',
    title: '《心理健康枕边书》',
    description: '一本关于心理健康的实用书籍。',
    thumbnail: 'https://dummyimage.com/200x150/000/fff',
    link: '#',
    linkText: '查看书籍',
    date: '2025-03-22',
    popularity: 85
  }
];

// 分类数据
const categories = [
  { id: 1, label: '全部', value: 'all' },
  { id: 2, label: '文章', value: 'article' },
  { id: 3, label: '视频', value: 'video' },
  { id: 4, label: '音频', value: 'audio' },
  { id: 5, label: '书籍推荐', value: 'book' }
];

// 响应式数据
const currentCategory = ref('all');
const searchTerm = ref('');
const sortType = ref('default');

// 过滤资源
const filteredResources = computed(() => {
  return resources.filter(resource => {
    const categoryMatch = currentCategory.value === 'all' || resource.category === currentCategory.value;
    const searchMatch = resource.title.toLowerCase().includes(searchTerm.value.toLowerCase());
    return categoryMatch && searchMatch;
  }).sort((a, b) => {
    if (sortType.value === 'newest') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortType.value === 'popular') {
      return b.popularity - a.popularity;
    }
    return 0;
  });
});

// 过滤资源函数
const filterResources = (category) => {
  currentCategory.value = category;
};

// 排序资源函数
const sortResources = () => {
  // 排序逻辑已在 computed 中实现
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  background-color: #f4f4f4;
}

nav ul li {
  padding: 10px 20px;
}

nav ul li a {
  text-decoration: none;
  color: #333;
}

nav ul li a.active {
  font-weight: bold;
}

.search-filter {
  padding: 20px;
  background-color: #eaeaea;
}

input[type="text"] {
  padding: 8px;
  width: 300px;
  margin-right: 10px;
}

select {
  padding: 8px;
}

.resource-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.resource-item {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.resource-item img {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.resource-item h3 {
  margin: 0;
}

.resource-item p {
  margin: 10px 0;
}

.resource-item a {
  display: block;
  background-color: #007BFF;
  color: white;
  padding: 8px;
  text-decoration: none;
}
</style>
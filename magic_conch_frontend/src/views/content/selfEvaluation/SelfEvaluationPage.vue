<template>
  <div class="self-evaluation-container">
    <!-- 前置引导模块 -->
    <section class="intro-section" v-if="currentStep === 0">
      <h1 class="title">心理状态自我评估</h1>
      <p class="subtitle">简单几步，了解当下的自己（约5分钟）</p>
      <p class="description">
        本评估仅作为参考，所有数据将匿名处理
      </p>
      <button class="start-button" @click="showNoticeModal = true">
        开始评估
      </button>
      
      <!-- 用户须知弹窗 -->
      <Modal v-if="showNoticeModal" @close="showNoticeModal = false">
        <h2>评估须知</h2>
        <ul class="notice-list">
          <li>本评估完全自愿</li>
          <li>所有结果将严格保密</li>
          <li>评估结果仅供参考，非专业诊断</li>
        </ul>
        <button class="confirm-button" @click="startEvaluation">
          我已了解，开始评估
        </button>
      </Modal>
    </section>

    <!-- 评估流程模块 -->
    <section class="evaluation-section" v-if="currentStep > 0 && currentStep <= totalQuestions">
      <ProgressBar 
        :current="currentStep" 
        :total="totalQuestions"
      />
      
      <div class="question-card">
        <div class="question-header">
          <span class="question-number">问题 {{ currentStep }}</span>
          <Icon :name="currentQuestion.icon" />
        </div>
        
        <h3 class="question-text">{{ currentQuestion.text }}</h3>
        
        <!-- 单选题型 -->
        <div class="options" v-if="currentQuestion.type === 'single'">
          <div 
            v-for="(option, index) in currentQuestion.options" 
            :key="index"
            class="option"
            :class="{ selected: selectedOption === index }"
            @click="selectOption(index)"
          >
            {{ option }}
          </div>
        </div>
        
        <!-- 滑动条题型 -->
        <div class="slider-container" v-if="currentQuestion.type === 'scale'">
          <input 
            type="range" 
            min="1" 
            max="10" 
            v-model="sliderValue"
            class="slider"
          >
          <div class="slider-labels">
            <span>完全不符合</span>
            <span>完全符合</span>
          </div>
        </div>
      </div>
      
      <div class="navigation-buttons">
        <button 
          class="prev-button" 
          @click="prevQuestion"
          :disabled="currentStep === 1"
        >
          上一步
        </button>
        <button 
          class="next-button" 
          @click="nextQuestion"
          :disabled="!isAnswerSelected"
        >
          {{ currentStep === totalQuestions ? '查看结果' : '下一步' }}
        </button>
      </div>
    </section>

    <!-- 结果反馈模块 -->
    <section class="result-section" v-if="currentStep > totalQuestions">
      <h2 class="result-title">你的评估结果</h2>
      <div class="result-summary">
        <p>{{ resultSummary }}</p>
        <RadarChart :data="resultData" />
      </div>
      
      <div class="result-details">
        <div 
          v-for="(dimension, index) in resultDimensions" 
          :key="index"
          class="dimension"
        >
          <h3>{{ dimension.name }}: {{ dimension.score }}分</h3>
          <p>{{ dimension.advice }}</p>
        </div>
      </div>
      
      <div class="action-buttons">
        <button class="re-evaluate" @click="resetEvaluation">
          重新评估
        </button>
        <button class="get-advice" @click="goToResources">
          获取建议
        </button>
        <button class="contact" @click="showContactForm">
          联系咨询
        </button>
      </div>
    </section>
  </div>
</template>

<script>
// ... 现有导入 ...

export default {
  data() {
    return {
      currentStep: 0,
      totalQuestions: 10,
      showNoticeModal: false,
      selectedOption: null,
      sliderValue: 5,
      questions: [
        {
          id: 1,
          text: "最近一周，你是否经常感到难以入睡？",
          type: "single",
          icon: "sleep",
          options: ["从不", "偶尔", "有时", "经常", "总是"]
        },
        // ... 其他问题 ...
      ],
      resultSummary: "你的当前心理状态偏向'轻度压力'",
      resultData: {
        // 雷达图数据
      },
      resultDimensions: [
        {
          name: "压力管理",
          score: 8,
          advice: "试试每天5分钟呼吸练习"
        }
        // ... 其他维度 ...
      ]
    }
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentStep - 1]
    },
    isAnswerSelected() {
      return this.selectedOption !== null || 
             (this.currentQuestion.type === 'scale' && this.sliderValue !== null)
    }
  },
  methods: {
    startEvaluation() {
      this.currentStep = 1
      this.showNoticeModal = false
    },
    selectOption(index) {
      this.selectedOption = index
    },
    nextQuestion() {
      if (this.currentStep <= this.totalQuestions) {
        this.currentStep++
        this.selectedOption = null
      }
    },
    prevQuestion() {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    },
    resetEvaluation() {
      this.currentStep = 0
    },
    goToResources() {
      // 跳转到资源页面
    },
    showContactForm() {
      // 显示联系表单
    }
  }
}
</script>

<style scoped>
.self-evaluation-container {
  max-width: 800px;
  margin: 40px auto;  /* 修改为上下40px边距 */
  padding: 20px;
  background-color: #F8F9FA;
  border-radius: 12px;
  min-height: calc(100vh - 120px);  /* 新增：设置最小高度 */
  display: flex;  /* 新增：使用flex布局 */
  flex-direction: column;  /* 新增：垂直排列 */
  justify-content: center;  /* 新增：垂直居中 */
}

.title {
  color: #4A90E2;
  font-size: 28px;
  margin-bottom: 10px;
}

.subtitle {
  color: #666;
  font-size: 18px;
}

.start-button {
  background-color: #F5A623;
  color: white;
  padding: 12px 24px;
  border-radius: 24px;
  border: none;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.start-button:hover {
  transform: scale(1.05);
}

.question-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin: 20px 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.option {
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
}

.option.selected {
  background-color: #4A90E2;
  color: white;
}

.slider {
  width: 100%;
  margin: 20px 0;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.next-button {
  background-color: #4A90E2;
  color: white;
}

.next-button:disabled {
  background-color: #ccc;
}

/* ... 其他样式 ... */
</style> 
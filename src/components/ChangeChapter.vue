<template>
  <div class="chapter-container">
    <ul class="chapter-list">
      <li
        v-for="(chapter, index) in chapters"
        :key="index"
        class="chapter-card"
        :class="{ inactive: !chapter.active }"
      >
        <div class="chapter-content">
          <div class="chapter-media">
            <img v-if="chapter.media" :src="chapter.media" alt="media" class="media-preview" />
            <div v-else class="media-preview" />
          </div>
          <div class="chapter-info">
            <div class="chapter-header">
              Глава {{ index + 1 }}: <strong style="font-size: 14px">{{ chapter.title }}</strong>
            </div>
            <div class="chapter-controls">
              <label>
                <input
                  type="radio"
                  :name="'mode-' + index"
                  :value="1"
                  v-model="chapter.mode"
                  :disabled="!chapter.active"
                />
                Обычный
              </label>
              <label>
                <input
                  type="radio"
                  :name="'mode-' + index"
                  :value="2"
                  v-model="chapter.mode"
                  :disabled="!chapter.active"
                />
                Бесконечный
              </label>
              <button class="play-button" @click="playChapter(index)" :disabled="!chapter.active">
                Играть
              </button>
            </div>
          </div>
        </div>

        <!-- Накладка "Скоро" -->
        <div v-if="!chapter.active" class="coming-soon">СКОРО</div>
      </li>
    </ul>
    <button class="back-button" @click="emit('back-click')">Назад</button>
  </div>
</template>

<script setup>
  import { reactive } from 'vue'
  const emit = defineEmits(['play-chapter', 'back-click'])
  const chapters = reactive([
    {
      chapter_id: 1,
      title: 'Заезд',
      media: 'https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif',
      mode: 1,
      active: true,
    },
    {
      title: null,
      media: null,
      mode: 'normal',
      active: false,
    },
    {
      title: null,
      media: null,
      mode: 'normal',
      active: false,
    },
  ])

  const playChapter = (index) => {
    const chapter = chapters[index]
    if (!chapter.active) return
    emit('play-chapter', chapter)
  }
</script>

<style scoped>
  .back-button {
    position: absolute;
    color: white;
    background-color: transparent;
    border: none;
    font-family: 'pixel';
    font-size: 20px;
    font-weight: 600;
    bottom: 10px;
    right: 50%;
    transform: translateX(50%);
    cursor: pointer;
  }
  .chapter-container {
    height: 100%;
    width: 70%;
    padding: 10px 10px 0;
    margin-bottom: 40px;
    overflow-y: auto;
    font-family: 'pixel', monospace;
    color: #ffd700;
  }

  .chapter-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .chapter-card {
    position: relative;
    border: 2px solid #ffd700;
    border-radius: 4px;
    margin-bottom: 14px;
    background-color: #111;
    padding: 8px;
    overflow: hidden;
  }

  .chapter-card.inactive::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(128, 128, 128, 0.5);
    /* Серый полупрозрачный */
    z-index: 1;
    pointer-events: all;
  }

  .coming-soon {
    position: absolute;
    top: 10px;
    left: -40px;
    width: 160px;
    text-align: center;
    transform: rotate(-45deg);
    background-color: red;
    color: white;
    font-size: 10px;
    font-weight: bold;
    padding: 4px 0;
    padding-right: 40px;
    z-index: 2;
    pointer-events: none;
    box-shadow: 0 0 6px red;
  }

  .chapter-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    position: relative;
    z-index: 2;
    /* выше серого фильтра */
  }

  .chapter-media {
    flex: 0 0 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .media-preview {
    width: 200px;
    height: 100px;
    object-fit: cover;
    border: 1px dashed #ffd700;
  }

  .chapter-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .chapter-header {
    font-size: 10px;
    margin-bottom: 4px;
  }

  .chapter-controls {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .chapter-controls label {
    font-size: 12px;
  }

  .play-button {
    font-family: inherit;
    font-size: 9px;
    padding: 4px 8px;
    background-color: #ffd700;
    border: none;
    color: black;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 10px;
  }

  .play-button:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }

  .play-button:hover:enabled {
    background-color: #ffec80;
  }
</style>

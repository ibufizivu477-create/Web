// Data structures
const templates = [
  {
    id: 'life',
    name: 'Личная жизнь',
    emoji: '🌟',
    center: 'Моя жизнь',
    rays: [
      { name: 'Карьера', color: '#3B82F6', threads: ['Подготовить резюме', 'Изучить новый навык'] },
      { name: 'Семья', color: '#EC4899', threads: ['Совместный ужин', 'Позвонить родителям'] },
      { name: 'Здоровье', color: '#10B981', threads: ['Тренировка 3 раза в неделю', 'Здоровое питание'] },
      { name: 'Хобби', color: '#F59E0B', threads: ['Читать 30 мин в день'] },
      { name: 'Саморазвитие', color: '#8B5CF6', threads: ['Медитация', 'Онлайн-курс'] }
    ]
  },
  {
    id: 'project',
    name: 'Рабочий проект',
    emoji: '🎯',
    center: 'Новый проект',
    rays: [
      { name: 'Планирование', color: '#3B82F6', threads: ['Определить цели', 'Создать роадмап'] },
      { name: 'Разработка', color: '#10B981', threads: ['Настроить окружение', 'Написать код'] },
      { name: 'Маркетинг', color: '#F59E0B', threads: ['Создать landing page', 'Запустить рекламу'] },
      { name: 'Тестирование', color: '#EF4444', threads: ['Unit тесты', 'Бета-тестирование'] }
    ]
  },
  {
    id: 'book',
    name: 'Написание книги',
    emoji: '📖',
    center: 'Новая книга',
    rays: [
      { name: 'Персонажи', color: '#EC4899', threads: ['Биография Анны', 'Биография Михаила', 'Второстепенные герои'] },
      { name: 'Сюжет', color: '#3B82F6', threads: ['Набросок 1-3 главы', 'Поворотный пункт', 'Финал'] },
      { name: 'Исследования', color: '#8B5CF6', threads: ['Материалы о XIX веке', 'Исторические факты'] },
      { name: 'Публикация', color: '#10B981', threads: ['Найти издательство', 'Редактура'] }
    ]
  },
  {
    id: 'seo',
    name: 'SEO продвижение',
    emoji: '🚀',
    center: 'Продвижение сайта',
    rays: [
      { name: 'Техническая оптимизация', color: '#3B82F6', threads: ['Исправить 404 ошибки', 'Ускорить загрузку', 'Настроить robots.txt'] },
      { name: 'Контент', color: '#10B981', threads: ['Написать 10 статей', 'Оптимизировать заголовки', 'Добавить изображения'] },
      { name: 'Ссылочная масса', color: '#F59E0B', threads: ['Найти партнеров', 'Гостевые посты'] },
      { name: 'Аналитика', color: '#8B5CF6', threads: ['Настроить Google Analytics', 'Анализировать отказы', 'Отслеживать позиции'] }
    ]
  },
  {
    id: 'empty',
    name: 'Пустой холст',
    emoji: '⚡',
    center: 'Мой проект',
    rays: []
  }
];

const onboardingSteps = [
  {
    step: 1,
    title: 'Давайте создадим центр вашей паутины',
    description: 'Это центр - ваш главный проект, цель или область жизни',
    action: 'name_center',
    examples: ['Моя жизнь', 'Новый проект', 'Написание книги', 'Учеба']
  },
  {
    step: 2,
    title: 'Добавим первый луч - направление',
    description: 'Лучи - это ключевые направления вашей работы',
    action: 'add_ray',
    examples: ['Работа', 'Семья', 'Здоровье', 'Обучение']
  },
  {
    step: 3,
    title: 'Добавим первую нить - задачу',
    description: 'Нити - это конкретные действия на каждом направлении',
    action: 'add_thread',
    examples: ['Прочитать книгу', 'Позвонить другу', 'Сделать упражнение']
  },
  {
    step: 4,
    title: 'Добавим еще элементы',
    description: 'Добавьте еще 2-3 луча и нити, чтобы паутина стала плотнее',
    action: 'add_more'
  },
  {
    step: 5,
    title: 'Отлично! Ваша паутина готова',
    description: 'Теперь вы можете редактировать элементы, экспортировать паутину и следить за прогрессом',
    action: 'finish'
  }
];

const faqItems = [
  { question: 'Как добавить новую нить?', answer: 'Нажмите кнопку \'+Нить\' в панели инструментов или дважды кликните на луч, куда хотите добавить задачу.' },
  { question: 'Как переместить нить на другой луч?', answer: 'Кликните на нить, в окне редактирования выберите другой луч из выпадающего списка.' },
  { question: 'Как экспортировать паутину?', answer: 'Нажмите кнопку \'Экспорт\' в верхней панели и выберите формат PNG, SVG или JSON.' },
  { question: 'Где хранятся мои данные?', answer: 'Все данные хранятся локально в вашем браузере. Ничего не отправляется на сервер. Данные автоматически сохраняются при каждом изменении.' },
  { question: 'Как восстановить удаленный элемент?', answer: 'Используйте кнопку \'Отменить\' (↶) или нажмите Ctrl+Z для отмены последнего действия.' },
  { question: 'Что такое плотность паутины?', answer: 'Плотность показывает, насколько насыщена ваша паутина. Она рассчитывается на основе количества лучей и нитей. Чем больше связей, тем плотнее паутина.' }
];

// State
let appState = {
  currentPage: 'landing',
  onboardingStep: 1,
  projectName: 'Мой проект',
  center: 'Мой проект',
  rays: [],
  threads: [],
  history: [],
  historyIndex: -1,
  currentEditingThread: null,
  theme: 'light'
};

// Pan and Zoom state
let panZoomState = {
  isDragging: false,
  dragStart: { x: 0, y: 0 },
  viewOffset: { x: 0, y: 0 },
  zoomLevel: 1.0,
  minZoom: 0.3,
  maxZoom: 3.0,
  hasShownHint: false
};

let nextRayId = 1;
let nextThreadId = 1;

// Utility functions
function generateId(prefix) {
  if (prefix === 'ray') return `ray-${nextRayId++}`;
  if (prefix === 'thread') return `thread-${nextThreadId++}`;
}

function showPage(pageName) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  const page = document.getElementById(`${pageName}-page`);
  if (page) {
    page.classList.add('active');
    appState.currentPage = pageName;
  }
}

function saveState() {
  // State is maintained in memory only (no localStorage in sandbox)
  showAutosaveIndicator();
}

function loadState() {
  // State is maintained in memory only (no localStorage in sandbox)
  return false;
}

function showAutosaveIndicator() {
  const indicator = document.getElementById('autosave-indicator');
  indicator.classList.add('show');
  setTimeout(() => indicator.classList.remove('show'), 2000);
}

function addToHistory(action) {
  // Remove any history after current index
  appState.history = appState.history.slice(0, appState.historyIndex + 1);
  
  // Add new action
  appState.history.push({
    action,
    state: {
      projectName: appState.projectName,
      center: appState.center,
      rays: JSON.parse(JSON.stringify(appState.rays)),
      threads: JSON.parse(JSON.stringify(appState.threads))
    }
  });
  
  appState.historyIndex++;
  
  // Limit history
  if (appState.history.length > 20) {
    appState.history.shift();
    appState.historyIndex--;
  }
  
  updateUndoRedoButtons();
}

function undo() {
  if (appState.historyIndex > 0) {
    appState.historyIndex--;
    const historyState = appState.history[appState.historyIndex].state;
    appState.projectName = historyState.projectName;
    appState.center = historyState.center;
    appState.rays = JSON.parse(JSON.stringify(historyState.rays));
    appState.threads = JSON.parse(JSON.stringify(historyState.threads));
    renderCanvas();
    updateStats();
    updateUndoRedoButtons();
    saveState();
  }
}

function redo() {
  if (appState.historyIndex < appState.history.length - 1) {
    appState.historyIndex++;
    const historyState = appState.history[appState.historyIndex].state;
    appState.projectName = historyState.projectName;
    appState.center = historyState.center;
    appState.rays = JSON.parse(JSON.stringify(historyState.rays));
    appState.threads = JSON.parse(JSON.stringify(historyState.threads));
    renderCanvas();
    updateStats();
    updateUndoRedoButtons();
    saveState();
  }
}

function updateUndoRedoButtons() {
  const undoBtn = document.getElementById('undo-btn');
  const redoBtn = document.getElementById('redo-btn');
  undoBtn.disabled = appState.historyIndex <= 0;
  redoBtn.disabled = appState.historyIndex >= appState.history.length - 1;
}

function calculateDensity() {
  const rayCount = appState.rays.length;
  const threadCount = appState.threads.length;
  const maxThreads = rayCount * 5; // Assume max 5 threads per ray
  if (maxThreads === 0) return 0;
  return Math.min(100, Math.round((threadCount / maxThreads) * 100));
}

function updateStats() {
  document.getElementById('stat-rays').textContent = appState.rays.length;
  document.getElementById('stat-threads').textContent = appState.threads.length;
  document.getElementById('stat-density').textContent = calculateDensity() + '%';
}

// Pan and Zoom functions
function applyTransform() {
  const webGroup = document.getElementById('web-group');
  if (webGroup) {
    webGroup.setAttribute('transform', 
      `translate(${panZoomState.viewOffset.x}, ${panZoomState.viewOffset.y}) scale(${panZoomState.zoomLevel})`
    );
  }
  updateZoomDisplay();
}

function updateZoomDisplay() {
  const display = document.getElementById('zoom-display');
  if (display) {
    display.textContent = `🔍 ${Math.round(panZoomState.zoomLevel * 100)}%`;
  }
}

function resetZoom() {
  panZoomState.zoomLevel = 1.0;
  panZoomState.viewOffset = { x: 0, y: 0 };
  applyTransform();
}

function fitToScreen() {
  if (appState.rays.length === 0) {
    resetZoom();
    return;
  }
  
  const canvas = document.getElementById('web-canvas');
  const rect = canvas.getBoundingClientRect();
  
  // Calculate bounds of all elements
  const rayLength = 250;
  const maxDistance = rayLength + 100; // Include some padding
  
  // Calculate zoom to fit
  const scale = Math.min(rect.width / (maxDistance * 2), rect.height / (maxDistance * 2)) * 0.8;
  panZoomState.zoomLevel = Math.max(panZoomState.minZoom, Math.min(panZoomState.maxZoom, scale));
  
  // Center the view
  panZoomState.viewOffset = { x: rect.width / 2, y: rect.height / 2 };
  
  applyTransform();
}

function showPanHint() {
  if (!panZoomState.hasShownHint) {
    const hint = document.getElementById('pan-hint');
    if (hint) {
      hint.classList.add('show');
      setTimeout(() => {
        hint.classList.remove('show');
      }, 5000);
      panZoomState.hasShownHint = true;
    }
  }
}

function initializePanZoom() {
  const canvas = document.getElementById('web-canvas');
  const canvasArea = document.querySelector('.canvas-area');
  
  if (!canvas || !canvasArea) return;
  
  // Set initial viewBox and center position
  const rect = canvas.getBoundingClientRect();
  canvas.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
  panZoomState.viewOffset = { x: rect.width / 2, y: rect.height / 2 };
  applyTransform();
  
  // Show hint on first canvas load
  setTimeout(() => showPanHint(), 500);
  
  // Mouse pan events
  let isMouseDown = false;
  
  canvas.addEventListener('mousedown', (e) => {
    // Only pan if not clicking on an element
    if (e.target.closest('.web-thread') || e.target.closest('.web-center')) {
      return;
    }
    
    isMouseDown = true;
    panZoomState.isDragging = true;
    panZoomState.dragStart = { x: e.clientX, y: e.clientY };
    canvasArea.classList.add('dragging');
    e.preventDefault();
  });
  
  window.addEventListener('mousemove', (e) => {
    if (!panZoomState.isDragging) return;
    
    const dx = e.clientX - panZoomState.dragStart.x;
    const dy = e.clientY - panZoomState.dragStart.y;
    
    panZoomState.viewOffset.x += dx;
    panZoomState.viewOffset.y += dy;
    
    panZoomState.dragStart = { x: e.clientX, y: e.clientY };
    
    applyTransform();
  });
  
  window.addEventListener('mouseup', () => {
    if (panZoomState.isDragging) {
      panZoomState.isDragging = false;
      canvasArea.classList.remove('dragging');
    }
  });
  
  // Mouse wheel zoom
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(panZoomState.minZoom, Math.min(panZoomState.maxZoom, panZoomState.zoomLevel * delta));
    
    // Zoom toward mouse cursor position
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Adjust offset to keep mouse position fixed
    panZoomState.viewOffset.x = mouseX - (mouseX - panZoomState.viewOffset.x) * (newZoom / panZoomState.zoomLevel);
    panZoomState.viewOffset.y = mouseY - (mouseY - panZoomState.viewOffset.y) * (newZoom / panZoomState.zoomLevel);
    
    panZoomState.zoomLevel = newZoom;
    applyTransform();
  }, { passive: false });
  
  // Touch support
  let touchStartDistance = 0;
  let touchStartZoom = 1;
  let touches = [];
  
  canvas.addEventListener('touchstart', (e) => {
    touches = Array.from(e.touches);
    
    if (touches.length === 1) {
      // Single finger pan
      const touch = touches[0];
      panZoomState.isDragging = true;
      panZoomState.dragStart = { x: touch.clientX, y: touch.clientY };
    } else if (touches.length === 2) {
      // Two finger pinch zoom
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      touchStartDistance = Math.sqrt(dx * dx + dy * dy);
      touchStartZoom = panZoomState.zoomLevel;
    }
    
    e.preventDefault();
  }, { passive: false });
  
  canvas.addEventListener('touchmove', (e) => {
    touches = Array.from(e.touches);
    
    if (touches.length === 1 && panZoomState.isDragging) {
      // Single finger pan
      const touch = touches[0];
      const dx = touch.clientX - panZoomState.dragStart.x;
      const dy = touch.clientY - panZoomState.dragStart.y;
      
      panZoomState.viewOffset.x += dx;
      panZoomState.viewOffset.y += dy;
      
      panZoomState.dragStart = { x: touch.clientX, y: touch.clientY };
      applyTransform();
    } else if (touches.length === 2) {
      // Two finger pinch zoom
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const scale = distance / touchStartDistance;
      const newZoom = Math.max(panZoomState.minZoom, Math.min(panZoomState.maxZoom, touchStartZoom * scale));
      
      // Zoom toward center of two fingers
      const centerX = (touches[0].clientX + touches[1].clientX) / 2;
      const centerY = (touches[0].clientY + touches[1].clientY) / 2;
      
      const rect = canvas.getBoundingClientRect();
      const mouseX = centerX - rect.left;
      const mouseY = centerY - rect.top;
      
      panZoomState.viewOffset.x = mouseX - (mouseX - panZoomState.viewOffset.x) * (newZoom / panZoomState.zoomLevel);
      panZoomState.viewOffset.y = mouseY - (mouseY - panZoomState.viewOffset.y) * (newZoom / panZoomState.zoomLevel);
      
      panZoomState.zoomLevel = newZoom;
      applyTransform();
    }
    
    e.preventDefault();
  }, { passive: false });
  
  canvas.addEventListener('touchend', (e) => {
    touches = Array.from(e.touches);
    
    if (touches.length === 0) {
      panZoomState.isDragging = false;
    } else if (touches.length === 1) {
      // Reset for single finger pan
      const touch = touches[0];
      panZoomState.dragStart = { x: touch.clientX, y: touch.clientY };
    }
  });
  
  // Handle window resize
  window.addEventListener('resize', () => {
    const rect = canvas.getBoundingClientRect();
    canvas.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
  });
}

// Rendering functions
function renderCanvas() {
  const webGroup = document.getElementById('web-group');
  if (!webGroup) return;
  
  webGroup.innerHTML = '';
  
  const centerX = 0;
  const centerY = 0;
  const centerRadius = 40;
  const rayLength = 250;
  
  // Draw rays
  appState.rays.forEach((ray, index) => {
    const angle = (index / appState.rays.length) * Math.PI * 2 - Math.PI / 2;
    const endX = centerX + Math.cos(angle) * rayLength;
    const endY = centerY + Math.sin(angle) * rayLength;
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', centerX);
    line.setAttribute('y1', centerY);
    line.setAttribute('x2', endX);
    line.setAttribute('y2', endY);
    line.setAttribute('stroke', ray.color);
    line.setAttribute('class', 'web-ray');
    webGroup.appendChild(line);
  });
  
  // Draw threads
  appState.threads.forEach(thread => {
    const ray = appState.rays.find(r => r.id === thread.rayId);
    if (!ray) return;
    
    const rayIndex = appState.rays.indexOf(ray);
    const angle = (rayIndex / appState.rays.length) * Math.PI * 2 - Math.PI / 2;
    
    const rayThreads = appState.threads.filter(t => t.rayId === ray.id);
    const threadIndex = rayThreads.indexOf(thread);
    const distance = centerRadius + 30 + (threadIndex * 50);
    
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;
    
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('class', 'web-thread');
    group.setAttribute('data-thread-id', thread.id);
    group.style.color = ray.color;
    
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', 8);
    circle.setAttribute('class', 'web-thread-circle');
    group.appendChild(circle);
    
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x);
    text.setAttribute('y', y - 15);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('class', 'web-thread-text');
    text.textContent = thread.name;
    group.appendChild(text);
    
    group.addEventListener('click', () => openEditModal(thread.id));
    
    webGroup.appendChild(group);
  });
  
  // Draw center
  const centerGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  
  const centerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  centerCircle.setAttribute('cx', centerX);
  centerCircle.setAttribute('cy', centerY);
  centerCircle.setAttribute('r', centerRadius);
  centerCircle.setAttribute('class', 'web-center');
  centerGroup.appendChild(centerCircle);
  
  const centerText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  centerText.setAttribute('x', centerX);
  centerText.setAttribute('y', centerY + 5);
  centerText.setAttribute('text-anchor', 'middle');
  centerText.setAttribute('class', 'web-center-text');
  centerText.textContent = appState.center;
  centerGroup.appendChild(centerText);
  
  centerGroup.style.cursor = 'pointer';
  centerGroup.addEventListener('click', () => {
    const newName = prompt('Название центра:', appState.center);
    if (newName && newName.trim()) {
      appState.center = newName.trim();
      appState.projectName = newName.trim();
      document.getElementById('project-name').value = appState.projectName;
      addToHistory('edit-center');
      renderCanvas();
      saveState();
    }
  });
  
  webGroup.appendChild(centerGroup);
  
  // Update empty state
  const emptyState = document.getElementById('empty-state');
  if (appState.rays.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
  }
}

function renderOnboardingPreview() {
  const svg = document.getElementById('onboarding-svg');
  svg.innerHTML = '';
  
  const centerX = 200;
  const centerY = 200;
  const centerRadius = 30;
  const rayLength = 150;
  
  // Draw based on step
  if (appState.onboardingStep >= 2 && appState.rays.length > 0) {
    appState.rays.forEach((ray, index) => {
      const angle = (index / Math.max(appState.rays.length, 1)) * Math.PI * 2 - Math.PI / 2;
      const endX = centerX + Math.cos(angle) * rayLength;
      const endY = centerY + Math.sin(angle) * rayLength;
      
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', centerX);
      line.setAttribute('y1', centerY);
      line.setAttribute('x2', endX);
      line.setAttribute('y2', endY);
      line.setAttribute('stroke', ray.color);
      line.setAttribute('stroke-width', '2');
      line.setAttribute('opacity', '0.6');
      svg.appendChild(line);
    });
  }
  
  // Draw threads
  if (appState.onboardingStep >= 3 && appState.threads.length > 0) {
    appState.threads.forEach(thread => {
      const ray = appState.rays.find(r => r.id === thread.rayId);
      if (!ray) return;
      
      const rayIndex = appState.rays.indexOf(ray);
      const angle = (rayIndex / appState.rays.length) * Math.PI * 2 - Math.PI / 2;
      
      const rayThreads = appState.threads.filter(t => t.rayId === ray.id);
      const threadIndex = rayThreads.indexOf(thread);
      const distance = centerRadius + 20 + (threadIndex * 30);
      
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', x);
      circle.setAttribute('cy', y);
      circle.setAttribute('r', 6);
      circle.setAttribute('fill', ray.color);
      svg.appendChild(circle);
    });
  }
  
  // Draw center
  const centerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  centerCircle.setAttribute('cx', centerX);
  centerCircle.setAttribute('cy', centerY);
  centerCircle.setAttribute('r', centerRadius);
  centerCircle.setAttribute('fill', '#3B82F6');
  svg.appendChild(centerCircle);
  
  if (appState.center) {
    const centerText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    centerText.setAttribute('x', centerX);
    centerText.setAttribute('y', centerY + 5);
    centerText.setAttribute('text-anchor', 'middle');
    centerText.setAttribute('fill', 'white');
    centerText.setAttribute('font-size', '14');
    centerText.setAttribute('font-weight', '600');
    centerText.textContent = appState.center.length > 15 ? appState.center.substring(0, 12) + '...' : appState.center;
    svg.appendChild(centerText);
  }
}

// Onboarding
function updateOnboardingStep() {
  const step = onboardingSteps[appState.onboardingStep - 1];
  
  document.getElementById('onboarding-title').textContent = step.title;
  document.getElementById('onboarding-description').textContent = step.description;
  document.getElementById('current-step').textContent = step.step;
  document.getElementById('progress-fill').style.width = (step.step / 5 * 100) + '%';
  
  const content = document.getElementById('onboarding-step-content');
  content.innerHTML = '';
  
  if (step.action === 'name_center') {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'form-control';
    input.placeholder = 'Введите название центра';
    input.value = appState.center;
    input.addEventListener('input', (e) => {
      appState.center = e.target.value;
      renderOnboardingPreview();
    });
    content.appendChild(input);
    
    const suggestions = document.createElement('div');
    suggestions.className = 'example-suggestions';
    step.examples.forEach(example => {
      const chip = document.createElement('button');
      chip.className = 'suggestion-chip';
      chip.textContent = example;
      chip.addEventListener('click', () => {
        appState.center = example;
        input.value = example;
        renderOnboardingPreview();
      });
      suggestions.appendChild(chip);
    });
    content.appendChild(suggestions);
  } else if (step.action === 'add_ray') {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'form-control';
    input.placeholder = 'Введите название луча';
    content.appendChild(input);
    
    const suggestions = document.createElement('div');
    suggestions.className = 'example-suggestions';
    step.examples.forEach(example => {
      const chip = document.createElement('button');
      chip.className = 'suggestion-chip';
      chip.textContent = example;
      chip.addEventListener('click', () => {
        input.value = example;
      });
      suggestions.appendChild(chip);
    });
    content.appendChild(suggestions);
    
    const addBtn = document.createElement('button');
    addBtn.className = 'btn btn--primary';
    addBtn.textContent = 'Добавить луч';
    addBtn.addEventListener('click', () => {
      if (input.value.trim()) {
        const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6', '#EF4444'];
        appState.rays.push({
          id: generateId('ray'),
          name: input.value.trim(),
          color: colors[appState.rays.length % colors.length],
          threads: []
        });
        input.value = '';
        renderOnboardingPreview();
      }
    });
    content.appendChild(addBtn);
  } else if (step.action === 'add_thread') {
    if (appState.rays.length === 0) {
      const warning = document.createElement('p');
      warning.textContent = 'Сначала добавьте хотя бы один луч';
      warning.style.color = 'var(--color-error)';
      content.appendChild(warning);
    } else {
      const select = document.createElement('select');
      select.className = 'form-control';
      appState.rays.forEach(ray => {
        const option = document.createElement('option');
        option.value = ray.id;
        option.textContent = ray.name;
        select.appendChild(option);
      });
      content.appendChild(select);
      
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'form-control';
      input.placeholder = 'Введите название нити';
      input.style.marginTop = 'var(--space-12)';
      content.appendChild(input);
      
      const suggestions = document.createElement('div');
      suggestions.className = 'example-suggestions';
      suggestions.style.marginTop = 'var(--space-12)';
      step.examples.forEach(example => {
        const chip = document.createElement('button');
        chip.className = 'suggestion-chip';
        chip.textContent = example;
        chip.addEventListener('click', () => {
          input.value = example;
        });
        suggestions.appendChild(chip);
      });
      content.appendChild(suggestions);
      
      const addBtn = document.createElement('button');
      addBtn.className = 'btn btn--primary';
      addBtn.textContent = 'Добавить нить';
      addBtn.style.marginTop = 'var(--space-12)';
      addBtn.addEventListener('click', () => {
        if (input.value.trim()) {
          appState.threads.push({
            id: generateId('thread'),
            name: input.value.trim(),
            rayId: select.value,
            notes: ''
          });
          input.value = '';
          renderOnboardingPreview();
        }
      });
      content.appendChild(addBtn);
    }
  } else if (step.action === 'add_more') {
    const instruction = document.createElement('p');
    instruction.textContent = '👆 Используйте кнопки ниже для добавления элементов. Добавьте минимум 2 луча и 2 нити:';
    instruction.style.fontWeight = 'var(--font-weight-medium)';
    content.appendChild(instruction);
    
    // Create button container
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'onboarding-step4-buttons';
    
    const addRayBtn = document.createElement('button');
    addRayBtn.className = 'btn btn--primary btn--highlighted';
    addRayBtn.textContent = '+ Луч';
    addRayBtn.id = 'onboarding-add-ray';
    addRayBtn.style.pointerEvents = 'auto';
    addRayBtn.style.cursor = 'pointer';
    addRayBtn.style.zIndex = '10001';
    
    const addThreadBtn = document.createElement('button');
    addThreadBtn.className = 'btn btn--primary btn--highlighted';
    addThreadBtn.textContent = '+ Нить';
    addThreadBtn.id = 'onboarding-add-thread';
    addThreadBtn.style.pointerEvents = 'auto';
    addThreadBtn.style.cursor = 'pointer';
    addThreadBtn.style.zIndex = '10001';
    
    // Track initial counts
    const initialRayCount = appState.rays.length;
    const initialThreadCount = appState.threads.length;
    
    // Stats display
    const statsDiv = document.createElement('div');
    statsDiv.className = 'onboarding-step4-stats';
    statsDiv.id = 'step4-stats';
    
    function updateStep4Stats() {
      const addedRays = appState.rays.length - initialRayCount;
      const addedThreads = appState.threads.length - initialThreadCount;
      const totalAdded = addedRays + addedThreads;
      
      statsDiv.innerHTML = `
        <strong>Текущая паутина:</strong><br>
        Лучей: ${appState.rays.length} | Нитей: ${appState.threads.length}<br>
        <strong>Добавлено на этом шаге:</strong> ${addedRays} лучей, ${addedThreads} нитей
      `;
      
      // Enable next button if threshold met
      const nextBtn = document.getElementById('next-step-btn');
      if (totalAdded >= 2) {
        nextBtn.disabled = false;
        nextBtn.style.opacity = '1';
        statsDiv.innerHTML += '<br><span style="color: var(--color-success); font-weight: bold;">✓ Отлично! Теперь нажмите "Далее"</span>';
      } else {
        nextBtn.disabled = true;
        nextBtn.style.opacity = '0.5';
      }
    }
    
    // Add Ray handler
    addRayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Add Ray button clicked in step 4');
      
      const name = prompt('Название луча:', 'Новый луч');
      if (name && name.trim()) {
        const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6', '#EF4444'];
        appState.rays.push({
          id: generateId('ray'),
          name: name.trim(),
          color: colors[appState.rays.length % colors.length],
          threads: []
        });
        console.log('Ray added:', name);
        renderOnboardingPreview();
        updateStep4Stats();
      }
    });
    
    // Add Thread handler
    addThreadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Add Thread button clicked in step 4');
      
      if (appState.rays.length === 0) {
        alert('Сначала добавьте луч!');
        return;
      }
      
      const rayOptions = appState.rays.map(r => r.name).join(', ');
      const rayName = prompt('На какой луч? (' + rayOptions + ')', appState.rays[0].name);
      
      if (!rayName) return;
      
      const ray = appState.rays.find(r => r.name.toLowerCase().includes(rayName.toLowerCase()));
      
      if (ray) {
        const name = prompt('Название нити:', 'Новая нить');
        if (name && name.trim()) {
          appState.threads.push({
            id: generateId('thread'),
            name: name.trim(),
            rayId: ray.id,
            notes: ''
          });
          console.log('Thread added:', name);
          renderOnboardingPreview();
          updateStep4Stats();
        }
      } else {
        alert('Луч "' + rayName + '" не найден. Попробуйте еще раз.');
      }
    });
    
    buttonContainer.appendChild(addRayBtn);
    buttonContainer.appendChild(addThreadBtn);
    content.appendChild(buttonContainer);
    content.appendChild(statsDiv);
    
    // Initialize stats
    updateStep4Stats();
  } else if (step.action === 'finish') {
    const features = document.createElement('ul');
    features.style.listStyle = 'none';
    features.style.padding = '0';
    features.innerHTML = `
      <li style="margin-bottom: var(--space-8);">✓ Редактировать центр, лучи и нити</li>
      <li style="margin-bottom: var(--space-8);">✓ Экспортировать паутину в PNG, SVG или JSON</li>
      <li style="margin-bottom: var(--space-8);">✓ Использовать готовые шаблоны</li>
      <li style="margin-bottom: var(--space-8);">✓ Отслеживать статистику и плотность</li>
      <li style="margin-bottom: var(--space-8);">✓ Автоматическое сохранение</li>
    `;
    content.appendChild(features);
  }
  
  renderOnboardingPreview();
}

function nextOnboardingStep() {
  console.log('Next step clicked, current step:', appState.onboardingStep);
  
  if (appState.onboardingStep === 1) {
    if (!appState.center || appState.center.trim() === '') {
      alert('Пожалуйста, введите название центра');
      return;
    }
  } else if (appState.onboardingStep === 2) {
    if (appState.rays.length === 0) {
      alert('Пожалуйста, добавьте хотя бы один луч');
      return;
    }
  } else if (appState.onboardingStep === 3) {
    if (appState.threads.length === 0) {
      alert('Пожалуйста, добавьте хотя бы одну нить');
      return;
    }
  } else if (appState.onboardingStep === 4) {
    // Step 4 validation is handled by the button enable/disable logic
    // Just ensure we have the minimum
    if (appState.rays.length < 2 && appState.threads.length < 2) {
      alert('Добавьте еще элементы. Всего должно быть минимум 2 элемента (лучи + нити).');
      return;
    }
  }
  
  if (appState.onboardingStep < 5) {
    appState.onboardingStep++;
    updateOnboardingStep();
  } else {
    finishOnboarding();
  }
}

function finishOnboarding() {
  appState.projectName = appState.center;
  document.getElementById('project-name').value = appState.projectName;
  addToHistory('initial-setup');
  saveState();
  showPage('canvas');
  renderCanvas();
  updateStats();
  initializePanZoom();
}

// Template functions
function renderTemplates() {
  const grid = document.getElementById('template-grid');
  grid.innerHTML = '';
  
  templates.forEach(template => {
    const card = document.createElement('div');
    card.className = 'template-card';
    
    const emoji = document.createElement('div');
    emoji.className = 'template-emoji';
    emoji.textContent = template.emoji;
    card.appendChild(emoji);
    
    const title = document.createElement('h3');
    title.textContent = template.name;
    card.appendChild(title);
    
    const info = document.createElement('div');
    info.className = 'template-info';
    info.textContent = `${template.rays.length} лучей, ${template.rays.reduce((sum, ray) => sum + ray.threads.length, 0)} нитей`;
    card.appendChild(info);
    
    const btn = document.createElement('button');
    btn.className = 'btn btn--primary btn--full-width';
    btn.textContent = 'Выбрать';
    btn.addEventListener('click', () => loadTemplate(template));
    card.appendChild(btn);
    
    grid.appendChild(card);
  });
}

function loadTemplate(template) {
  appState.center = template.center;
  appState.projectName = template.center;
  appState.rays = [];
  appState.threads = [];
  
  template.rays.forEach(rayData => {
    const ray = {
      id: generateId('ray'),
      name: rayData.name,
      color: rayData.color,
      threads: []
    };
    appState.rays.push(ray);
    
    rayData.threads.forEach(threadName => {
      appState.threads.push({
        id: generateId('thread'),
        name: threadName,
        rayId: ray.id,
        notes: ''
      });
    });
  });
  
  document.getElementById('project-name').value = appState.projectName;
  addToHistory('load-template');
  saveState();
  showPage('canvas');
  renderCanvas();
  updateStats();
  initializePanZoom();
}

// Canvas interactions
function addRay() {
  const name = prompt('Название луча:');
  if (name && name.trim()) {
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6', '#EF4444'];
    const ray = {
      id: generateId('ray'),
      name: name.trim(),
      color: colors[appState.rays.length % colors.length],
      threads: []
    };
    appState.rays.push(ray);
    addToHistory('add-ray');
    renderCanvas();
    updateStats();
    saveState();
  }
}

function addThread() {
  if (appState.rays.length === 0) {
    alert('Сначала добавьте хотя бы один луч');
    return;
  }
  
  const rayName = prompt('На какой луч? (' + appState.rays.map(r => r.name).join(', ') + ')');
  const ray = appState.rays.find(r => r.name.toLowerCase().includes(rayName.toLowerCase()));
  
  if (ray) {
    const name = prompt('Название нити:');
    if (name && name.trim()) {
      appState.threads.push({
        id: generateId('thread'),
        name: name.trim(),
        rayId: ray.id,
        notes: ''
      });
      addToHistory('add-thread');
      renderCanvas();
      updateStats();
      saveState();
    }
  } else if (rayName) {
    alert('Луч не найден');
  }
}

function openEditModal(threadId) {
  const thread = appState.threads.find(t => t.id === threadId);
  if (!thread) return;
  
  appState.currentEditingThread = threadId;
  
  document.getElementById('modal-name').value = thread.name;
  document.getElementById('modal-notes').value = thread.notes || '';
  
  const raySelect = document.getElementById('modal-ray');
  raySelect.innerHTML = '';
  appState.rays.forEach(ray => {
    const option = document.createElement('option');
    option.value = ray.id;
    option.textContent = ray.name;
    if (ray.id === thread.rayId) option.selected = true;
    raySelect.appendChild(option);
  });
  
  document.getElementById('edit-modal').classList.add('active');
}

function closeEditModal() {
  document.getElementById('edit-modal').classList.remove('active');
  appState.currentEditingThread = null;
}

function saveEditModal() {
  const thread = appState.threads.find(t => t.id === appState.currentEditingThread);
  if (!thread) return;
  
  thread.name = document.getElementById('modal-name').value;
  thread.notes = document.getElementById('modal-notes').value;
  thread.rayId = document.getElementById('modal-ray').value;
  
  addToHistory('edit-thread');
  renderCanvas();
  saveState();
  closeEditModal();
}

function deleteThread() {
  if (confirm('Удалить эту нить?')) {
    appState.threads = appState.threads.filter(t => t.id !== appState.currentEditingThread);
    addToHistory('delete-thread');
    renderCanvas();
    updateStats();
    saveState();
    closeEditModal();
  }
}

// Export functions
function openExportModal() {
  document.getElementById('export-modal').classList.add('active');
}

function closeExportModal() {
  document.getElementById('export-modal').classList.remove('active');
}

function exportWeb() {
  const format = document.querySelector('input[name="export-format"]:checked').value;
  
  if (format === 'json') {
    const data = {
      projectName: appState.projectName,
      center: appState.center,
      rays: appState.rays,
      threads: appState.threads
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    downloadBlob(blob, 'stickyweb-export.json');
  } else if (format === 'svg') {
    const svg = document.getElementById('web-canvas');
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    downloadBlob(blob, 'stickyweb-export.svg');
  } else if (format === 'png') {
    // For PNG, we'll use a simple approach with canvas
    alert('PNG export требует дополнительной библиотеки. Используйте SVG экспорт.');
  }
  
  closeExportModal();
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Help and Settings
function renderFAQ() {
  const list = document.getElementById('faq-list');
  list.innerHTML = '';
  
  faqItems.forEach((item, index) => {
    const faqItem = document.createElement('div');
    faqItem.className = 'faq-item';
    
    const question = document.createElement('button');
    question.className = 'faq-question';
    question.innerHTML = `${item.question} <span>▼</span>`;
    question.addEventListener('click', () => {
      faqItem.classList.toggle('active');
    });
    faqItem.appendChild(question);
    
    const answer = document.createElement('div');
    answer.className = 'faq-answer';
    answer.textContent = item.answer;
    faqItem.appendChild(answer);
    
    list.appendChild(faqItem);
  });
}

function toggleTheme(theme) {
  appState.theme = theme;
  document.documentElement.setAttribute('data-color-scheme', theme);
  saveState();
}

function clearAllData() {
  if (confirm('Вы уверены? Все данные будут удалены безвозвратно.')) {
    appState = {
      currentPage: 'landing',
      onboardingStep: 1,
      projectName: 'Мой проект',
      center: 'Мой проект',
      rays: [],
      threads: [],
      history: [],
      historyIndex: -1,
      currentEditingThread: null,
      theme: 'light'
    };
    nextRayId = 1;
    nextThreadId = 1;
    showPage('landing');
    document.getElementById('settings-panel').classList.remove('active');
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Check if there's saved state
  const hasSavedState = loadState();
  
  // Landing page
  document.getElementById('create-web-btn').addEventListener('click', () => {
    showPage('onboarding');
    appState.onboardingStep = 1;
    updateOnboardingStep();
  });
  
  document.getElementById('view-examples-btn').addEventListener('click', () => {
    showPage('template');
    renderTemplates();
  });
  
  // Onboarding
  document.getElementById('next-step-btn').addEventListener('click', nextOnboardingStep);
  document.getElementById('skip-onboarding').addEventListener('click', () => {
    showPage('template');
    renderTemplates();
  });
  
  // Template page
  document.getElementById('back-to-landing').addEventListener('click', () => showPage('landing'));
  
  // Canvas toolbar
  document.getElementById('home-btn').addEventListener('click', () => {
    if (confirm('Вернуться на главную? Несохраненные изменения будут потеряны.')) {
      showPage('landing');
    }
  });
  
  document.getElementById('project-name').addEventListener('change', (e) => {
    appState.projectName = e.target.value;
    appState.center = e.target.value;
    renderCanvas();
    saveState();
  });
  
  document.getElementById('add-ray-btn').addEventListener('click', addRay);
  document.getElementById('add-thread-btn').addEventListener('click', addThread);
  document.getElementById('undo-btn').addEventListener('click', undo);
  document.getElementById('redo-btn').addEventListener('click', redo);
  document.getElementById('export-btn').addEventListener('click', openExportModal);
  
  document.getElementById('zoom-reset-btn').addEventListener('click', resetZoom);
  document.getElementById('fit-screen-btn').addEventListener('click', fitToScreen);
  
  document.getElementById('help-btn').addEventListener('click', () => {
    document.getElementById('help-panel').classList.add('active');
    renderFAQ();
  });
  
  document.getElementById('settings-btn').addEventListener('click', () => {
    document.getElementById('settings-panel').classList.add('active');
  });
  
  // Sidebar toggle
  document.getElementById('sidebar-toggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('collapsed');
  });
  
  // Edit modal
  document.getElementById('modal-close').addEventListener('click', closeEditModal);
  document.getElementById('modal-save').addEventListener('click', saveEditModal);
  document.getElementById('modal-delete').addEventListener('click', deleteThread);
  
  // Export modal
  document.getElementById('export-modal-close').addEventListener('click', closeExportModal);
  document.getElementById('export-modal-cancel').addEventListener('click', closeExportModal);
  document.getElementById('export-download').addEventListener('click', exportWeb);
  
  // Help panel
  document.getElementById('help-close').addEventListener('click', () => {
    document.getElementById('help-panel').classList.remove('active');
  });
  
  document.getElementById('restart-tutorial').addEventListener('click', () => {
    document.getElementById('help-panel').classList.remove('active');
    appState.onboardingStep = 1;
    appState.rays = [];
    appState.threads = [];
    appState.center = 'Мой проект';
    showPage('onboarding');
    updateOnboardingStep();
  });
  
  // Settings panel
  document.getElementById('settings-close').addEventListener('click', () => {
    document.getElementById('settings-panel').classList.remove('active');
  });
  
  document.querySelectorAll('input[name="theme"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (e.target.checked) {
        toggleTheme(e.target.value);
      }
    });
  });
  
  document.getElementById('clear-data-btn').addEventListener('click', clearAllData);
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if (e.key === 'z' && e.shiftKey || e.key === 'y') {
        e.preventDefault();
        redo();
      } else if (e.key === '0') {
        e.preventDefault();
        resetZoom();
      } else if (e.key === '=' || e.key === '+') {
        e.preventDefault();
        panZoomState.zoomLevel = Math.min(panZoomState.maxZoom, panZoomState.zoomLevel * 1.1);
        applyTransform();
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        panZoomState.zoomLevel = Math.max(panZoomState.minZoom, panZoomState.zoomLevel * 0.9);
        applyTransform();
      }
    }
  });
  
  // Apply saved theme
  if (appState.theme) {
    document.documentElement.setAttribute('data-color-scheme', appState.theme);
    document.querySelector(`input[name="theme"][value="${appState.theme}"]`).checked = true;
  }
  
  // If there's saved state, go to canvas
  if (hasSavedState && appState.rays.length > 0) {
    showPage('canvas');
    document.getElementById('project-name').value = appState.projectName;
    renderCanvas();
    updateStats();
    initializePanZoom();
  } else {
    showPage('landing');
  }
});
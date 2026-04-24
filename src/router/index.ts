import { createRouter, createWebHashHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import HomeView from '@/views/HomeView.vue';
import EditorView from '@/views/EditorView.vue';
import SettingsView from '@/views/SettingsView.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: '', name: 'home', component: HomeView },
        { path: 'editor', name: 'editor', component: EditorView },
        { path: 'settings', name: 'settings', component: SettingsView }
      ]
    }
  ]
});

export default router;

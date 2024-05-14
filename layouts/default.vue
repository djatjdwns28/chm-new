<template>
  <v-layout>
    <v-app-bar height="48" style="background-color: #343a40; color: white">
      <v-app-bar-title>
        <v-menu v-model="isOpen" :close-on-content-click="false" location="end">
          <template #activator="{ props }">
            <div class="d-flex align-center">
              <div style="font-weight: bold; font-size: 1.5rem">Ppb Studios Admin</div>
              <v-btn class="ml-6" v-bind="props" icon="mdi-menu" @change="openMenuCard" />
            </div>
          </template>

          <v-card width="800" height="900">
            <v-row no-gutters style="height: 100%">
              <v-col :cols="4" class="main-menu pa-8" style="height: 100%">
                <v-list-item
                  v-for="menu in menuList"
                  :key="menu.name"
                  :title="menu.title"
                  :value="menu.name"
                  :active="selectedMenu === menu.name"
                  @click="changeMenu(menu)"
                >
                </v-list-item>
              </v-col>
              <v-col :cols="8" class="sub-menu pa-8">
                <v-list-item
                  v-for="subMenu in subMenuList"
                  :key="subMenu.name"
                  :title="subMenu.title"
                  :value="subMenu.name"
                  :active="selectedSubMenu === subMenu.name"
                  @click="changeSubMenu(subMenu)"
                ></v-list-item>
              </v-col>
            </v-row>
          </v-card> </v-menu
      ></v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer class="mx-auto pa-4" style="background-color: #3e454c; color: white; font-weight: 400; line-height: 1.5; font-size: 1rem">
      <v-list-item
        v-for="(nestedSubMenu, index) in nestedSubMenuList"
        :key="index"
        :title="nestedSubMenu.title"
        :value="nestedSubMenu.name"
        @click="changeNestedSubMenu(nestedSubMenu)"
        :active="nestedSubMenu.name === selectedNestedSubMenu"
      ></v-list-item>
    </v-navigation-drawer>
    <v-main>
      <slot />
    </v-main>
  </v-layout>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useMenuStore } from '~/stores/menu';
import { menuList } from '~/config/menu';

const isOpen = ref(false);

const openMenuCard = () => {
  isOpen.value = !isOpen.value;
};

const menuStore = useMenuStore();
const router = useRouter();
const route = useRoute();

const subMenuList = ref([]);
const nestedSubMenuList = ref([]);

const selectedMenu = computed(() => menuStore.selectedMenu);
const selectedSubMenu = computed(() => menuStore.selectedSubMenu);
const selectedNestedSubMenu = computed(() => menuStore.selectedNestedSubMenu);

const getUpdatedState = (currentState, value) => {
  const newState = { ...currentState, selectedMenu: value.name };

  if (value.subMenuList) {
    newState.subMenuList = value.subMenuList;
  }
  if (value.path) {
    newState.subMenuList = [];
    newState.nestedSubMenuList = [];
    newState.newPath = value.path;
  }

  return newState;
};

const getUpdatedSubMenuState = (currentState, value) => {
  const newState = { ...currentState, selectedSubMenu: value.name };

  newState.nestedSubMenuList = value.nestedSubMenuList ?? [];
  newState.selectedNestedSubMenu = newState.nestedSubMenuList.length > 0 ? newState.nestedSubMenuList[0].name : '';
  if (value.path) {
    newState.newPath = value.path;
  } else if (value.nestedSubMenuList.length > 0) {
    newState.newPath = newState.nestedSubMenuList[0].path;
  }

  return newState;
};

const changeMenu = (value) => {
  const currentState = {
    selectedMenu: selectedMenu.value,
    subMenuList: subMenuList.value,
    nestedSubMenuList: nestedSubMenuList.value,
    newPath: null
  };

  const updateState = getUpdatedState(currentState, value);

  menuStore.setSelectedMenu(updateState.selectedMenu);
  subMenuList.value = updateState.subMenuList;
  nestedSubMenuList.value = updateState.nestedSubMenuList;

  if (updateState.newPath) {
    router.push(updateState.newPath).then(() => {
      menuStore.setSelectedSubMenu('');
      menuStore.setSelectedNestedSubMenu('');
    });
  }
};

const changeSubMenu = (value) => {
  const currentState = {
    selectedSubMenu: selectedSubMenu.value,
    nestedSubMenuList: nestedSubMenuList.value,
    newPath: null,
    selectedNestedSubMenu: selectedNestedSubMenu.value
  };

  const updatedState = getUpdatedSubMenuState(currentState, value);

  menuStore.setSelectedSubMenu(updatedState.selectedSubMenu);
  nestedSubMenuList.value = updatedState.nestedSubMenuList;
  menuStore.setSelectedNestedSubMenu(updatedState.selectedNestedSubMenu);

  if (updatedState.newPath) {
    router.push(updatedState.newPath);
  }
};
const changeNestedSubMenu = (value: any) => {
  menuStore.setSelectedNestedSubMenu(value.name);
  router.push(value.path);
};

const setMenuList = (newMenuList) => {
  const menu = newMenuList.find((menu) => menu.name === selectedMenu.value);
  if (menu.subMenuList) {
    subMenuList.value = menu.subMenuList;
  }
  if (selectedNestedSubMenu.value) {
    const subMenu = menu.subMenuList.find((subMenu) => subMenu.name === selectedSubMenu.value);
    if (subMenu.nestedSubMenuList) {
      nestedSubMenuList.value = subMenu.nestedSubMenuList;
    }
  }
};
onMounted(() => {
  menuStore.initializeMenus(route);
  setMenuList(menuList);
});

watch(route, (newRoute) => {
  menuStore.initializeMenus(newRoute);
});
</script>
<style scoped>
.main-menu {
  border-right: 1px solid #ccc; /* 오른쪽에 선 추가 */
  padding: 16px;
  height: 100%;
}

.sub-menu {
  padding: 16px;
}
</style>

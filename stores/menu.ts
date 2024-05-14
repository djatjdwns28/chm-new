export const useMenuStore = defineStore('menu', {
  state: () => ({
    selectedMenu: '',
    selectedSubMenu: '',
    selectedNestedSubMenu: ''
  }),
  actions: {
    setSelectedMenu(menu: string) {
      this.selectedMenu = menu;
    },
    setSelectedSubMenu(subMenu: string) {
      this.selectedSubMenu = subMenu;
    },
    setSelectedNestedSubMenu(nestedSubMenu: string) {
      this.selectedNestedSubMenu = nestedSubMenu;
    },
    kebabToCamel(str: string) {
      return str.replace(/-./g, (match) => match.charAt(1).toUpperCase());
    },
    initializeMenus(route: any) {
      const splitRoutePath = route.path.split('/').filter(Boolean);
      const camelCaseRoute = splitRoutePath.map((el: string) => this.kebabToCamel(el));
      const main = camelCaseRoute[0] || null;
      const sub = camelCaseRoute[1] || null;
      const nestedSub = camelCaseRoute[2] || null;
      if (main) this.setSelectedMenu(main);
      if (sub) this.setSelectedSubMenu(sub);
      if (nestedSub) this.setSelectedNestedSubMenu(nestedSub);
    }
  }
});

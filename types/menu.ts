export interface MenuBase {
  name: string;
  title: string;
  path: string;
}

export interface Menu extends MenuBase {
  subMenuList?: SubMenu[];
}

export interface SubMenu extends MenuBase {
  nestedSubMenuList?: Menu[];
}

export interface NestedSubMenu extends MenuBase {}

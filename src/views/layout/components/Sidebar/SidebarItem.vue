<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">

    <router-link v-if="hasOneShowing(item)||(hasOneShowingChild(item.children)&&!onlyOneChild.children&&!item.alwaysShow)" :to="resolvePath(onlyOneChild.path)">
      <el-menu-item v-if="!hasDashboard(onlyOneChild.name)" :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
        <svg-icon v-if="onlyOneChild.meta&&onlyOneChild.meta.icon" :icon-class="onlyOneChild.meta.icon"></svg-icon>
        <span v-if="onlyOneChild.meta&&onlyOneChild.meta.title" slot="title">{{generateTitle(onlyOneChild.meta.title)}}</span>
      </el-menu-item>
      <el-menu-item v-if="hasDashboard(onlyOneChild.name)" :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':isNest}">
        <img v-if="onlyOneChild.meta&&onlyOneChild.meta.img&&hasSidebar()" :src="onlyOneChild.meta.img" style="height: 30px; width:30px">
        <span v-if="onlyOneChild.meta&&onlyOneChild.meta.title" style="font-size: 20px" slot="title">{{generateTitle('ms')}}</span>
      </el-menu-item>
    </router-link>

    <el-submenu v-else :index="item.name||item.path" :class="{'submenu-title-noDropdown':isNest}">
      <template slot="title" :class="{'el-submenu__title':!isNest}">
        <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
        <span v-if="item.meta&&item.meta.title" slot="title">{{generateTitle(item.meta.title)}}</span>
      </template>
      <template v-for="child in item.children" v-if="!child.hidden" >
        <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :item="child" :key="child.path" :base-path="resolvePath(child.path)"></sidebar-item>
        <router-link v-else :to="resolvePath(child.path)" :key="child.name">
          <el-menu-item :index="resolvePath(child.path)" >
            <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
            <span v-if="child.meta&&child.meta.title" slot="title">{{generateTitle(child.meta.title)}}</span>
          </el-menu-item>
        </router-link>
      </template>
    </el-submenu>
  </div>
</template>

<script>
  import path from 'path'
  import { generateTitle } from '@/utils/i18n'
  import Cookies from 'js-cookie'

  export default {
    name: 'SidebarItem',
    props: {
      // route object
      item: {
        type: Object,
        required: true
      },
      isNest: {
        type: Boolean,
        default: true
      },
      basePath: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        onlyOneChild: null
      }
    },
    methods: {
      hasOneShowingChild(children) {
        const showingChildren = children.filter(item => {
          if (item.onlyShow) {
            this.onlyOneChild = item
            return true
          }
          if (item.hidden) {
            return false
          } else {
            // temp set(will be used if only has one showing child )
            this.onlyOneChild = item
            return true
          }
        })
        if (showingChildren.length === 1) {
          return true
        }
        return false
      },
      hasOneShowing(item) {
        if (item.onlyShow) {
          this.onlyOneChild = item
          return true
        }
        return false
      },
      hasDashboard(name) {
        if (name === 'dashboard') {
          return true
        } else {
          return false
        }
      },
      hasSidebar() {
        if (Cookies.get('sidebarStatus') === '1') {
          return true
        } else {
          return false
        }
      },
      resolvePath(...paths) {
        return path.resolve(this.basePath, ...paths)
      },
      generateTitle
    }
  }
</script>


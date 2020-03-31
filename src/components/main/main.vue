<template>
  <Layout class="main" style="height:100%">
    <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
      <side-menu :menu-list="menuList"></side-menu>
    </Sider>
    <Layout>
      <Header class="header-con"></Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <div class="tab-nav-wrapper"></div>
          <Content class="content-wrapper">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import SideMenu from './components/side-menu'

import './main.less'

export default {
  name: 'Main',
  components: {
    SideMenu
  },
  data () {
    return {
      collapsed: false,
    }
  },
  computed: {
    menuList () {
      return this.$store.getters.menuList
    }
  }
}
</script>

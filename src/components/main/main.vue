<template>
  <Layout class="main" style="height:100%">
    <Sider
      hide-trigger
      collapsible
      :width="256"
      :collapsed-width="64"
      v-model="collapsed"
      class="left-sider"
      :style="{overflow: 'hidden'}"
    >
      <side-menu :menu-list="menuList" @on-select="turnToPage"></side-menu>
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
  },
  methods: {
    turnToPage (route) {
      let name, params, query
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    }
  }
}
</script>

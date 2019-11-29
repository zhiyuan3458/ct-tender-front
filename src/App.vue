<template>
    <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
        <div id="app">
            <router-view></router-view>
        </div>
    </transition>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
}
</style>

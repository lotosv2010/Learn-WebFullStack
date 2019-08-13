<template>
  <div>
    <div ref="msg" :class="{msg: true, active: isActive}">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  data() {
    return {
      text: '',
      isActive: false
    }
  },
  methods: {
    msgPlugin(msg, time) {
      this.text = msg
      this.isActive = true
      time = time || 2000
      setTimeout(() => {
        this.isActive = false
      }, time)
    }
  },
};
</script>

<style lang="scss" scoped>
.msg {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 0px;
  min-height: 0px;
  text-align: center;
  border-radius: 5px;
  color: cadetblue;
  background-color: antiquewhite;
  transition: all 0.5s;
  z-index: -1;
  opacity: 0;
}
.active {
  width: 150px;
  min-height: 25px;
  opacity: 1;
  z-index: 11;
  }
</style>

<script setup>
  import detailSlot from '@/components/detail-slot/detail-slot.vue';
  import { ref, computed, onMounted } from 'vue';

  const props = defineProps({
    mapData : {
      type : Object,
      default : () => ({})
    }
  })

  // 创建获取div元素
  const mapRef = ref()
  
  // 可能页面还没有加载,就执行JavaScript代码
  onMounted(() => {
    // 实例百度地图类
    // 创建地图实例 
    const map = new BMapGL.Map(mapRef.value);
    // 创建点坐标  116.404, 39.915
    const point = new BMapGL.Point(props.mapData.longitude,props.mapData.latitude);
    // 初始化地图，设置中心点坐标和地图级别
    map.centerAndZoom(point, 15);
    const marker = new BMapGL.Marker(point); // 创建标注   
    map.addOverlay(marker);  // 将标注添加到地图中
  })
</script>


<template>
  <div class="map">
    <detail-slot title="位置周边" more-text="查看更多周边信息">
      <div class="inner-map" ref="mapRef"></div>
    </detail-slot>
  </div>
</template>


<style lang="less" scoped>
.inner-map {
  height: 400px;
}
</style>
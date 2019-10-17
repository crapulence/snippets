/**
 * 创建点
 * @param {object} options 
 */
export function createPoint(options = {}) {
  const isPoint = options.lng && options.lat
  const {
    lng,
    lat
  } = options
  return isPoint ? new BMap.Point(lng, lat) : null
}

/**
 * 获取当前位置
 */
export function getPosition() {
  new BMap.Geolocation().getCurrentPosition(pos => pos)
}

/**
 * 获取地图可视区域
 */
export function getMapBounds() {
  const bounds = this.map.getBounds()
  const bssw = bounds.getSouthWest()
  const bsne = bounds.getNorthEast()
  return {
    firstMapLng: bssw.lng,
    firstMapLat: bssw.lat,
    secondMapLng: bsne.lng,
    secondMapLat: bsne.lat
  }
}

/**
 * 向地图添加标注
 */
export function addMarker() {
  const icon = new BMap.Icon('/marker.png', new BMap.Size(24, 24))
  const marker = new BMap.Marker(point, { icon })
  this.map.addOverlay(marker)
}

/**
 * 获取地图移动的距离
 */
export function getDistanceMoved() {
  let startPoint = {}
  let endPoint = {}
  
  this.map.addEventListener('movestart', () => {
    startPoint = this.map.getCenter()
  })

  this.map.addEventListener('moveend', () => {
    endPoint = this.map.getCenter()
    return this.map.getDistance(startPoint, endPoint)
  })
}

/**
 * 获取区域边框坐标点集合
 */
export function getRegionBoundary () {
  return new Promise(resolve => {
    const bdary = new BMap.Boundary()
    bdary.get('广西壮族自治区', res => {
      const pointArray = []
      res.boundaries.forEach(bd => {
        let ply = new BMap.Polygon(bd)
        pointArray.push(ply.getPath())
      })
      resolve(pointArray)
    })
  })
}

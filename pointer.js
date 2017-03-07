var map = new BMap.Map("map");    // 创建Map实例
map.centerAndZoom(new BMap.Point(117.269945,31.86713), 13);  // 初始化地图,设置中心点坐标和地图级别
map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
var index = 0;
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放 

// 创建地址解析器实例
var myGeo = new BMap.Geocoder();
// 将地址解析结果显示在地图上,并调整地图视野
var adds = {
	"合肥市":[
		"合肥市寿春路93号钱柜星乐町KTV（逍遥津公园对面）",
		"庐阳区长江中路177号",
		"新站区胜利路89",
	],
	"安徽省":[
		"芜湖市"
	]
};

function bdGEO(){

	//var add = adds[index];
	for(var city in adds){
		for(index=0;index<adds[city].length;index++){
			geocodeSearch(city,adds[city][index]);
		}
	}
}
function geocodeSearch(city,add){
	if(index < adds.length){
		setTimeout(window.bdGEO,400);
	} 
	myGeo.getPoint(add, function(point){
		if (point) {
			document.getElementById("result").innerHTML +=  add + ":" + point.lng + "," + point.lat + "</br>";
			var address = new BMap.Point(point.lng, point.lat);
			addMarker(address,new BMap.Label(index+":"+add,{offset:new BMap.Size(20,-10)}));
		}
	}, city);
}
// 编写自定义函数,创建标注
function addMarker(point,label){
	var marker = new BMap.Marker(point);
	map.addOverlay(marker);
	marker.setLabel(label);
}
<template>
	<div class="SafetyAlarm_root">
		<!-- 导航菜单 以及大标题-->
		<div class='commonTop clearfix'>
			<el-breadcrumb separator="/" class="comBread">
				<el-breadcrumb-item :to="{ path: '/welcome' }">概览</el-breadcrumb-item>
				<el-breadcrumb-item>安全报警</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<!-- 统计部分 -->
		<div class="SafetyAlarm_statistics">
			<div class="SafetyAlarm_statistics_left SafetyAlarm_root_publicstyle animated zoomIn">
				<div class="SafetyAlarm_statistics_title">
					事件统计
				</div>
				<div class="SafetyAlarm_statistics_con">
					<div class="SafetyAlarm_statistics_chart">
						<div id="SafetyAlarm_statistics_chart" style="width:100%;height:100%">
						</div>
					</div>
					<div class="SafetyAlarm_statistics_chart_infor">
						<el-collapse accordion>
							<el-collapse-item v-for="item in activeNames" :title="item.name">
								<div>{{item.describe}}</div>
							</el-collapse-item>

						</el-collapse>
					</div>
				</div>
			</div>
			<div class="SafetyAlarm_statistics_right SafetyAlarm_root_publicstyle animated zoomIn">
				<p class="search_title">搜索</p>
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="开始时间" style="width:96%">
						<el-date-picker v-model="form.date1" type="datetime" placeholder="选择日期时间" style="width: 100%;" @change="setStartDate">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="结束时间" style="width:96%">
						<el-date-picker v-model="form.date2" type="datetime" placeholder="选择日期时间" style="width: 100%;" @change="setEndDate">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="站点" style="width: 96%;">
						<el-select v-model="form.siteId" clearable placeholder="请选择站点" style="width: 100%;">
							<el-option v-for="item in form.optionsData" :key='item.id' :label='item.siteName' :value='item.id'></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="类型" style="width:96%">
						<el-select v-model="form.type" clearable placeholder="请选择类型" style="width: 100%;">
							<el-option v-for="item in form.typeData" :key='item.id' :label='item.name' :value='item.id'></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button @click="onSubmit">搜索</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<!-- 信息列表 -->
		<div class="SafetyAlarm_list SafetyAlarm_root_publicstyle animated zoomIn">
			<div class="SafetyAlarm_list_title">
				报警事件列表
			</div>
			<div class="SafetyAlarm_list_table">
				<el-table :data="tableData" style="width: 100%">
					<el-table-column prop="time" label="日期" width="180" show-overflow-tooltip="ture">
					</el-table-column>
					<el-table-column prop="siteName" label="站点" show-overflow-tooltip="ture">
					</el-table-column>
					<el-table-column prop="siteUrl" label='URL' show-overflow-tooltip="ture">
					</el-table-column>
					<el-table-column prop="typeText" label="类型" show-overflow-tooltip="ture">
					</el-table-column>
					<el-table-column prop="text" label="描述" show-overflow-tooltip="ture">
					</el-table-column>
					<el-table-column label="操作" width="150" show-overflow-tooltip="ture">
						<template scope="scope">
							<el-button @click.native.prevent="editRow(scope.$index, tableData)" size="small"> 通知</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="SafetyAlarm_list_paging">
				<div class="block">
					<el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="5" layout="total,prev, pager, next, jumper" :total='total'>
					</el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	var common_tools = require("common_tools");
	export default {
		data() {
			return {
				form: {
					date1: '',
					date2: '',
					type: '',
					siteId: '',
					optionsData: [],
					typeData: []

				},
				tableData: [],
				currentPage: 1,
				activeNames: [],
				discribe: [],
				total: '',
				typeN: ''
			}
		},
		methods: {
			// 默认打开页面
			Initialize() {
				var _this = this;
				common_tools.AJAX('post', common_tools.interfaceurl + 'site/allList', {}, function(data) {
					if(data.status="200") {
						_this.form.optionsData = data.data;
						_this.form.site = _this.form.optionsData[0].siteName;
						_this.form.siteId = _this.form.optionsData[0].id;

						if(_this.form.type == '') {
							_this.form.type = ""
						} else {
							_this.form.type = _this.form.type
						};
						_this.getList(_this.form.siteId, _this.form.type);
						if(_this.typeN != '') {
							_this.typeN = 'one'
						} else {
							_this.typeN = 'all'
						};
						_this.statisChart(_this.form.siteId);
					}else{
						console.log('传参错误');
					}
				},function(data){
					console.log(data);
				})
			},
			// 搜索功能
			onSubmit() {
				var _this = this;
				var startDate = _this.form.date1;
				var endDate = _this.form.date2;
				console.log(_this.form.siteId);
				console.log(_this.form.date1)
				_this.getList(_this.form.siteId, _this.form.type);
				_this.statisChart(_this.form.siteId);
			},
			// 开始时间过滤
			setStartDate(val) {
				console.log(val);
				var _this = this;
				_this.form.date1 = val;
				console.log(_this.form.date1)
			},
			// 结束时间过滤
			setEndDate(val) {
				console.log(val);
				var _this = this;
				_this.form.date2 = val;
			},
			// 操作
			editRow(index, rows) {
				// rows.splice(index, 1
				this.$message({
					message: "已上报管理员，请等待",
					type: 'success'
				})
			},

			// 时间格式化
			dateformat(date) {
				var _this = this;
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = date.getDate() + ' ';
				var h = date.getHours() + ':';
				var m = date.getMinutes() + ':';
				var s = date.getSeconds();
				_this.form.date2 = Y + M + D + h + m + s
			},

			datebefore() {
				var _this = this;
				var before = new Date(),
					Y = before.getFullYear(),

					M = (before.getMonth() + 1 < 10 ? '0' + (before.getMonth() + 1) : before.getMonth() + 1),
					D = before.getDate();
				console.log(Y + M + D);
				_this.form.date1 = Y + '-' + M + "-" + '01' + " " + '00' + ":" + "00" + ":" + '00';

			},
			// 饼图
			statisChart(siteID) {
				var _this = this;

				if(_this.form.type != '') {
					_this.typeN = 'one'
				} else {
					_this.typeN = 'all'
				};

				let SafetyAlarm_statistics_chart = this.$echarts.init(document.getElementById('SafetyAlarm_statistics_chart'));
				common_tools.AJAX('post', common_tools.interfaceurl + 'security/securityCount', {
					"siteId": siteID,
					"strDate": _this.form.date1,
					"endDate": _this.form.date2,
					"type": _this.typeN
				}, function(data) {
					if(data.status="200"){
						var option = {
							tooltip: {
								trigger: 'item',
								formatter: "{a} <br/>{b}: {c} ({d}%)"
							},
							color: ['#3CA696', '#057E90', '#CB5D5C', '#F6803F', '#C2A72B', '#86AC18', '#3CA6C1'],
							legend: { //图例组件，颜色和名字
								left: '20',
								top: '20',
								orient: 'vertical',
								itemGap: 12, //图例每项之间的间隔
								itemWidth: 10,
								itemHeight: 10,
								icon: 'rect',
								data: data.data,
								textStyle: {
									color: '#ffffff',
									fontStyle: 'normal',
									fontFamily: '微软雅黑',
									fontSize: 12,
								}
							},
							grid: {
								left: '10%',
							},
							series: [{
								name: '安全信息',
								type: 'pie',
								clockwise: false, //饼图的扇区是否是顺时针排布
								minAngle: 20, //最小的扇区角度（0 ~ 360）
								radius: ['35%', '80%'], //饼图的半径
								center: ['60%', '50%'],
								avoidLabelOverlap: true, ////是否启用防止标签重叠
								itemStyle: { //图形样式
									normal: {
										borderWidth: 1.5,
									},
								},
								label: { //标签的位置
									normal: {
										show: true,
										position: 'inside', //标签的位置
										formatter: "{d}%",
										textStyle: {
											color: '#fff',
										}
									},
									emphasis: {
										show: true,
										textStyle: {
											fontWeight: 'bold'
										}
									}
								},
								data: data.data
							}, {
								name: '',
								type: 'pie',
								clockwise: false,
								silent: true,
								minAngle: 20, //最小的扇区角度（0 ~ 360）
								center: ['60%', '50%'], //饼图的中心（圆心）坐标
								radius: [0, '35%'], //饼图的半径
								itemStyle: { //图形样式
									normal: {
										borderWidth: 1.5,
										opacity: 0.25,
									}
								},
								label: { //标签的位置
									normal: {
										show: false,
									}
								},
								data: data.data
							}]
						}
						SafetyAlarm_statistics_chart.setOption(option);
						$(window).resize(function() {
							SafetyAlarm_statistics_chart.resize();
							SafetyAlarm_statistics_chart.setOption(option);
						})
					}else{
						console.log(data);
					}
				},function(data){
					console.log(data);
				})
			},
			// 分页
			handleCurrentChange(val) {
				var _this = this;
				_this.currentPage = val;
				_this.getList(_this.form.siteId, _this.form.type)

			},
			// 获取类型
			typeData() {
				var _this = this;
				common_tools.AJAX('post', common_tools.interfaceurl + 'security/securityTypeList', {}, function(data) {
					_this.form.typeData = data.data;
					_this.activeNames = data.data;
				})
			},
			// 获取列表信息
			getList(siteID, indexs) {
				var _this = this;
				common_tools.AJAX('post', common_tools.interfaceurl + 'security/warnTable', {
					"strDate": _this.form.date1,
					"endDate": _this.form.date2,
					"size": "5",
					"current": _this.currentPage,
					'siteId': siteID,
					"index": indexs,
					"type": _this.form.type
				}, function(data) {
					console.log(data.data.dataarr);
					_this.tableData = data.data.dataarr
					_this.total = data.data.totalCount;
				})
			}
		},
		mounted() {
			this.datebefore(),
				this.dateformat(new Date()),
				this.Initialize(),
				this.typeData()
		}
	}
</script>
<style>
	@import "SafetyAlarm.css"
</style>
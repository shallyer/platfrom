<template>
	<div class="wh100 suatainMonitor-root">
		<!--面包屑部分-->
		<div class='commonTop clearfix'>
			<el-breadcrumb separator="/" class="comBread">
				<el-breadcrumb-item :to="{ path: '/welcome' }">概览</el-breadcrumb-item>
				<el-breadcrumb-item>性能监控</el-breadcrumb-item>
				<el-breadcrumb-item>外链监控</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<!--选择部分  时间段+站点-->
		<div class="selectPart bg-fontColor notice_container clearfix animated zoomIn">
			<el-form :inline="true" class="cur-siteName">
				<el-form-item>
					<span class="select-title">站点：</span>
					<el-select v-model="commonOpt.siteId">
						<el-option v-for="item in websiteOptions" :key="item.id" :label="item.siteName" :size="large" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="calendarArea">
					<span class="select-title">时间段：</span>
					<el-date-picker v-model="commonOpt.strDate" type="datetime" placeholder="选择开始时间" @change="getStartDate">
					</el-date-picker>
					--
					<el-date-picker v-model="commonOpt.endDate" type="datetime" placeholder="选择结束时间" @change="getEndDate">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button @click="onSubmit" id="btn-search"><i class="el-icon-search"></i>&nbsp;&nbsp;&nbsp;查询</el-button>
				</el-form-item>
			</el-form>

		</div>
		<!--内容部分-->
		<div class="chartRow">
			<div class="pieChart part animated zoomIn bg-fontColor notice_container">
				<div class="panel-heading clearfix">
					<h3 class="panel-title">状态码分布</h3>
				</div>
				<div class="wh100 pie-chartK">
					<div class="wh100" id="chart1"></div>
				</div>
				<div class="wh100 pie-legend">
					<div class="wh100" style="overflow-x: hidden;" id="scrollbar">
						<div class="wh100">
							<div class="legend-info" v-for="(item,index) in codeData">
								<div class="legend-color" :style="{backgroundColor:colorLists[index]}"></div>
								<p class="ng-binding">
									{{item.name}}
									<span class="item-num">{{item.value}}个</span>
								</p>
								<div class="progress">
									<div class="progress-bar"></div>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
			<div class="lineChart part animated zoomIn">
				<div class="lineChart-cont wh100 bg-fontColor notice_container">
					<div class="panel-heading clearfix">
						<h3 class="panel-title">响应时间变化趋势</h3>
					</div>
					<div class="wh100 line-chartK">
						<div class="wh100" id="chart2"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="chartRow">
			<div class="tableChart chaine">
				<div class="wh100 animated zoomIn bg-fontColor notice_container">
					<div class="table-title panel-heading clearfix">
						<h3 class="panel-title">站点日志</h3>
					</div>
					<div class="table-cont">
						<div class="tableH">
							<el-table :data="tableData" class="listTable" style="width: 100%">
								<el-table-column prop="siteName" width="" label="站点">
								</el-table-column>
								<el-table-column prop="responseCode" width="" label="响应状态码">
								</el-table-column>
								<el-table-column prop="responseTime" width="" label="响应时间">
								</el-table-column>
								<el-table-column prop="time" width="" label="时间" show-overflow-tooltip="true">
								</el-table-column>
								<el-table-column prop="url" label="URL地址" show-overflow-tooltip="true">
								</el-table-column>
							</el-table>
						</div>
						<div class="pages">
							<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" layout="total, prev, pager, next,jumper" :page-size="pageSize" :total="total">
							</el-pagination>
						</div>
					</div>
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
				tableHeight: null,
				currentPage: 1, //当前页面
				pageSize: 5,
				total: 100, //总条数
				tableType: 0, //必须 控制表格的类型
				siteAll: 0, //站点总数
				webNum: 0, //当前站点名称
				//接口
				Url: {
					siteLists: 'http://192.168.120.208:8084/site/allList',
					linkCode: 'http://192.168.120.208:8084/link/linkcodeall',
					linkTime: 'http://192.168.120.208:8084/link/linktimeall',
					linkpage: 'http://192.168.120.208:8084/outlink/outlinkallpage',
					siteCount: 'http://192.168.120.208:8084/site/count'
				},
				codeData: [],
				lineData: [],
				tableData: [],
				//common参数
				commonOpt: {
					siteId: '',
					strDate: '',
					endDate: ''
				},
				//code参数
				optionCode: {
					siteId: '',
					strDate: '',
					endDate: '',
				},
				//line参数
				optionLine: {
					siteId: '',
					strDate: '',
					endDate: '',
					size: '15'
				},
				//table接口
				optionTable: {
					siteId: '',
					strDate: '',
					endDate: '',
					size: '5',
					type: '',
					current: ''
				},
				//站点数据
				websiteOptions: [],
				//                colorList: ['#199386', '#b9f2a1', '#6eba8c', '#1a7d74','#005562','#0e8174','#ddbb57',"#6f9004"],
				colorLists: ['#199386', '#b9f2a1', '#6eba8c', '#1a7d74', '#005562', '#0e8174', '#ddbb57', "#6f9004"],

			}

		},
		methods: {
			//获得开始时间
			getStartDate(val) {
				var _this = this;
				_this.commonOpt.strDate = val;
			},
			//获得结束时间
			getEndDate(val) {
				var _this = this;
				_this.commonOpt.endDate = val;
			},
			handleCurrentChange(val) {
				var _self = this;
				_self.currentPage = val;
				_self.tableChart();
			},
			onSubmit() {
				var _self = this;
				_self.tableType = 1;
				_self.pieChart();
				_self.lineChart();
				_self.tableChart();
			},
			getCurDate() {
				var _self = this,
					day, year, month, hour, minute, second;
				var date = new Date();
				var seperator1 = "-";
				var seperator2 = ':';
				year = date.getFullYear();
				month = date.getMonth() + 1;
				day = date.getDate();
				hour = date.getHours();
				minute = date.getMinutes();
				second = date.getSeconds();
				if(month >= 1 && month <= 9) {
					month = '0' + month
				};
				if(day >= 1 && day <= 9) {
					day = '0' + day
				};
				if(hour >= 1 && hour <= 9) {
					hour = '0' + hour
				};
				if(minute >= 1 && minute <= 9) {
					minute = '0' + minute
				};
				if(second >= 1 && second <= 9) {
					second = '0' + second
				};

				_self.curentDate1 = year + seperator1 + month + seperator1 + '01',
					_self.curentDate2 = year + seperator1 + month + seperator1 + day,
					_self.curentTime = hour + seperator2 + minute + seperator2 + second;
				_self.commonOpt.endDate = _self.curentDate2 + ' ' + _self.curentTime;
				_self.commonOpt.strDate = _self.curentDate1 + ' ' + '00:00:00';
				return true;
			},
			pieChart() {
				var _self = this;
				var pieID = _self.$echarts.init(document.getElementById('chart1'));
				_self.optionCode.strDate = _self.commonOpt.strDate;
				_self.optionCode.endDate = _self.commonOpt.endDate;
				_self.optionCode.siteId = _self.commonOpt.siteId;

				//接口
				common_tools.AJAX('post', _self.Url.linkCode, _self.optionCode, function(data) {
					_self.codeData = data.data;
					var chartOption = {
						tooltip: {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)"
						},
						series: [{
							name: '状态码',
							type: 'pie',
							radius: ['50%', '85%'],
							avoidLabelOverlap: false,
							color: _self.colorLists,
							label: {
								normal: {
									show: false,
									position: 'center'
								},
								emphasis: {
									show: true,
									textStyle: {
										fontSize: '30',
										fontWeight: 'bold'
									}
								}
							},
							labelLine: {
								normal: {
									show: false
								}
							},
							data: _self.codeData
						}]
					};
					pieID.setOption(chartOption, false);
					$(window).resize(function() {
						pieID.resize();
						pieID.setOption(chartOption);
					});
				}, function(data) {
					console.log(data);
				});

			},
			lineChart() {
				var _self = this;
				var mychart = _self.$echarts.init(document.getElementById('chart2'));
				var lineDataTime = [],
					lineDataRes = [];
				_self.optionLine.siteId = _self.commonOpt.siteId;
				_self.optionLine.strDate = _self.commonOpt.strDate;
				_self.optionLine.endDate = _self.commonOpt.endDate;
				console.log(_self.optionLine);
				common_tools.AJAX('post', _self.Url.linkTime, _self.optionLine, function(data) {
					_self.lineData = data.data;
					for(var i = 0; i < _self.lineData.length; i++) {
						lineDataRes.push(_self.lineData[i].responseTime);
						lineDataTime.push(_self.lineData[i].time);
					}

					var option = {
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								lineStyle: {
									color: '#cccccc'
								}
							}
						},
						xAxis: [{
							name: '时间',
							type: 'category',
							boundaryGap: false,
							axisLine: {
								lineStyle: {
									color: '#ffffff',
								}
							},
							data: lineDataTime
						}],
						yAxis: [{
							name: '响应时间',
							type: 'value',
							axisTick: {
								show: false
							},
							axisLine: {
								lineStyle: {
									color: '#ffffff',
									//                                type:'dotted'
								}
							},
							axisLabel: {
								margin: 10,
								textStyle: {
									fontSize: 14
								}
							},
							splitLine: {
								lineStyle: {
									color: 'rgba(122,139,139,1)'
								}
							}
						}],
						series: [{
							name: '响应时间',
							type: 'line',
							smooth: true,
							lineStyle: {
								normal: {
									width: 5
								}
							},
							areaStyle: {
								normal: {
									/*
//                                color: new _self.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
//                                    offset: 0,
//                                    color: 'rgba(0, 136, 212, 0.3)'
//                                }, {
//                                    offset: 0.8,
//                                    color: 'rgba(0, 136, 212, 0)'
//                                }], false),*/
									color: '#209e91',
									shadowColor: 'rgba(0, 0, 0, 0.1)',
									shadowBlur: 10
								}
							},
							itemStyle: {
								normal: {
									color: 'rgba(32,158,145,1)'
								}
							},
							data: lineDataRes
						}]
					};
					mychart.setOption(option, false);
					$(window).resize(function() {
						mychart.resize();
						mychart.setOption(option);
					});
				}, function(data) {
					console.log(data);
				})

			},
			tableChart() {
				var _self = this;
				_self.optionTable.endDate = _self.commonOpt.endDate;
				_self.optionTable.strDate = _self.commonOpt.strDate;
				_self.optionTable.siteId = _self.commonOpt.siteId;
				if(_self.tableType == 0) {
					_self.optionTable.type = 'all';
				} else {
					_self.optionTable.type = 'one';
				}
				_self.optionTable.current = _self.currentPage;
				console.log(_self.optionTable);
				common_tools.AJAX('post', _self.Url.linkpage, _self.optionTable, function(data) {
					_self.tableData = data.data.dataarr;
					_self.total = data.data.total;
					//					_self.pageCount=data.data.pagecount;
				}, function(data) {
					console.log(data);
				})
			},

		},
		mounted: function() {
			var _self = this;
			window.onresize = function(e) {
				var getWindowParm = e.target.innerWidth + 'px ' + (e.target.innerHeight) + 'px';
				$(".notice_container").css("background-size", getWindowParm);
				//                $(".notice_container").css("background-position",getWindowParm);
			};
			//				站点接口
			common_tools.AJAX('post', _self.Url.siteLists, {}, function(data) {
				console.log(data);
				_self.websiteOptions = data.data;
				_self.siteAll = _self.websiteOptions.length;
				_self.commonOpt.siteId = _self.websiteOptions[0].id;
				_self.getCurDate();
				_self.pieChart();
				_self.lineChart();
				_self.tableChart();
			}, function(data) {
				console.log(data);
			});
		}

	}
</script>

<style scope>
	/*通用部分*/
	
	.bg-fontColor {
		color: #ffffff;
		/*background: rgba(255,255,255,.2);*/
	}
	
	.wh100 {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		-webkit-border-radius: 4px;
		-moz-border-radius: 4px;
		border-radius: 4px;
	}
	
	.w50 {
		width: 50%;
		height: 100%;
	}
	
	.clearfix:before,
	.clearfix:after {
		display: table;
		content: " ";
		clear: both;
	}
	
	.clear:after {
		clear: both;
	}
	
	.notice_container {
		background: url(../../../public_resource/img/modal-bg.jpg) fixed;
		background-size: 1920px 1080px;
		box-shadow: 0 5px 5px 0 rgba(0, 0, 0, .25);
	}
	/*面包屑*/
	
	.content-top {
		color: #ffffff;
		box-sizing: border-box;
		padding-top: 13px;
		padding-bottom: 27px;
	}
	
	.suatainMonitor-root .el-input__inner {
		color: #ffffff;
		font-weight: 400;
		background-color: rgba(0, 0, 0, 0.2);
		border-color: #2aa198;
	}
	
	.suatainMonitor-root .el-button {
		background-color: rgba(0, 0, 0, 0.2);
		color: #ffffff;
	}
	
	.suatainMonitor-root .el-button:focus,
	.el-button:hover {
		color: #ffffff;
		border: 1px solid #bfcbd9;
	}
	
	.al-title {
		font-weight: 700;
		color: #fff;
		float: left;
		width: auto;
		margin: 0;
		padding: 0;
		font-size: 24px;
		opacity: .9;
	}
	
	.breadcrumb {
		padding: 8px 15px;
		margin-bottom: 20px;
		list-style: none;
		background-color: #f5f5f5;
		border-radius: 4px;
	}
	
	.breadcrumb li {
		float: left;
		font-size: 18px;
	}
	
	.al-breadcrumb {
		background: 0 0;
		color: #fff;
		padding: 11px 0 0;
		margin: 0;
		float: right;
	}
	
	.bread:before {
		padding: 0 5px;
		color: #ccc;
		content: "/\00a0";
	}
	/*选择部分*/
	
	.selectPart {
		width: 100%;
		/*height: 100px;*/
		box-sizing: border-box;
		margin: 0 0 24px 0;
		padding: 15px 0;
		border-radius: 4px;
	}
	/*.sitePart-cont{width: 30%;}*/
	/*.timePart-cont{width: 50%;}*/
	
	#btn-search {
		margin: 0 0 0 20px;
		background-color: #219E91;
		border: 1px solid #219E91;
	}
	
	.select-title {
		/*width: 10%;*/
		box-sizing: border-box;
		padding: 0 0 0 20px;
		text-align: center;
		font-size: 1.4rem;
		color: #ffffff;
		font-weight: 500;
		line-height: 36px;
	}
	
	.floatF {
		float: left;
	}
	/*内容部分*/
	
	.chartRow {
		width: 100%;
		box-sizing: border-box;
	}
	
	.part {
		float: left;
	}
	
	.panel-heading {
		border-bottom: 1px solid rgba(0, 0, 0, .12);
		font-size: 16px;
		padding: 14px 22px;
		box-shadow: 0 1px 0 0 rgba(255, 255, 255, .12);
	}
	
	.panel-title {
		font-weight: 400;
		opacity: .9;
	}
	
	.pieChart {
		width: 50%;
		height: 400px;
		position: relative;
	}
	
	.lineChart {
		width: 50%;
		height: 400px;
		box-sizing: border-box;
		padding: 0 0 0 30px;
		position: relative;
	}
	
	.pie-chartK,
	.pie-legend {
		width: 50% !important;
	}
	
	.pie-chartK,
	.line-chartK {
		position: absolute;
		top: 0;
		left: 0;
		box-sizing: border-box;
		padding: 66px 22px 15px 22px;
	}
	
	.pie-legend {
		position: absolute;
		top: 0;
		right: 0;
		box-sizing: border-box;
		padding: 66px 22px 15px 22px;
		/*overflow: hidden;*/
	}
	
	.line-chartK {
		padding: 66px 22px 15px 30px;
	}
	/*llll*/
	
	.legend-info {
		box-sizing: border-box;
		color: #ffffff;
		width: 75%;
		margin-left: 45px;
	}
	
	.legend-color {
		width: 30px;
		height: 30px;
		box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .25);
		position: relative;
		top: 27px;
		border-radius: 15px;
		left: -45px;
		background: #e7505a;
	}
	
	.ng-binding {
		margin-bottom: 9px;
		font-size: 18px;
		opacity: .9;
	}
	
	.item-num {
		display: inline-block;
		float: right;
	}
	
	.progress {
		height: 4px;
		border-radius: 0;
		width: 100%;
		margin-bottom: 0;
		background-color: rgba(0, 0, 0, .15);
		box-shadow: none;
	}
	
	#scrollbar::-webkit-scrollbar {
		width: 4px;
	}
	
	#scrollbar::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.44, rgb(108, 162, 148)), color-stop(0.72, rgb(94, 154, 144)), color-stop(0.86, rgb(63, 107, 116)));
	}
	
	.tableChart.chaine {
		width: 100%;
	}
	
	.tableChart,
	.others {
		box-sizing: border-box;
		float: left;
		/*height: 200px;*/
		margin: 24px 0;
	}
	
	.others {
		width: 30%;
		padding: 0 0 0 30px;
	}
	
	.table-cont {
		box-sizing: border-box;
		padding: 14px 22px;
	}
	
	.pages {
		width: 100%;
		box-sizing: border-box;
		padding: 15px 0;
		text-align: center;
	}
	
	.suatainMonitor-root .el-pager li,
	.suatainMonitor-root .el-pagination button.disabled,
	.suatainMonitor-root .el-pagination .btn-next,
	.el-pagination .btn-prev,
	.suatainMonitor-root .el-pagination__editor {
		background: transparent;
	}
	
	.suatainMonitor-root .el-pagination__editor,
	.suatainMonitor-root .el-pager li:hover,
	.suatainMonitor-root .el-table__empty-text {
		color: #ffffff;
	}
	
	.suatainMonitor-root .el-table,
	.suatainMonitor-root .el-table th>.cell,
	.suatainMonitor-root .el-pagination {
		color: #ffffff;
		border: 0px;
		font-weight: 300;
	}
	
	.suatainMonitor-root .el-table tr,
	.suatainMonitor-root .el-table,
	.suatainMonitor-root .el-table::after,
	.el-table::before,
	.suatainMonitor-root .el-table th>.cell,
	.suatainMonitor-root .el-table th {
		background-color: transparent;
	}
	
	.suatainMonitor-root .el-pager li.active {
		border: 1px solid #d1dbe5;
	}
	
	.suatainMonitor-root .el-pagination__editor:focus {
		border-color: #219E91;
	}
	
	.suatainMonitor-root .el-table tr {
		background-color: rgba(0, 0, 0, 0.2);
	}
	
	.suatainMonitor-root .el-table--enable-row-hover .el-table__body tr:hover>td {
		background-color: rgba(255, 255, 255, .1);
	}
	
	.suatainMonitor-root .el-table td,
	.el-table th.is-leaf {
		border-bottom: 1px solid rgba(144, 144, 144, .3);
	}
	
	.suatainMonitor-root .el-pager li.active {
		border-color: #fff;
		background-color: #219E91;
		cursor: default;
	}
	
	.suatainMonitor-root .el-pagination .btn-next,
	.suatainMonitor-root .el-pagination .btn-prev {
		background-color: transparent;
		color: #fff;
	}
	
	.suatainMonitor-root .el-pagination button.disabled {
		background-color: transparent;
		color: #fff;
	}
	
	.suatainMonitor-root .el-pager li {
		background-color: transparent;
		border-radius: 4px;
		color: #fff;
	}
	
	.el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover,
	.el-select-dropdown__item.hover,
	.el-select-dropdown__item:hover {
		background-color: transparent;
	}
	
	.el-select-dropdown {
		background: rgba(0, 0, 0, .4);
		color: #ffffff;
		border: 1px solid #219E91;
	}
	
	.el-select-dropdown__item span {
		color: #ffffff;
	}
	
	.el-select-dropdown__item.selected.hover {
		background-color: #2aa198;
	}
	
	.el-select-dropdown__item.selected {
		background-color: #2aa198;
	}
	
	.suatainMonitor-root .el-form-item {
		margin: 0;
	}
	
	.el-select .el-input__inner:focus {
		border-color: #2aa198;
	}
	
	.suatainMonitor-root .el-collapse-item__wrap {
		background: rgba(0, 0, 0, .4);
		color: #fff;
		border: 2px solid #219E91;
	}
	
	.suatainMonitor-root .el-collapse-item__content {
		color: #fff;
	}
	
	.el-select:hover .el-input__inner {
		border-color: #2aa198;
	}
	/*总计*/
	
	
	
	
	.listTable table {
		overflow: hidden;
	}
	
	.listTable .cell {
		text-align: center;
	}
</style>
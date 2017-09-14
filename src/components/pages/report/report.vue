<template>
	<div class="wh100 suatainMonitor-root">
		<!--面包屑部分-->
		<div class='commonTop clearfix'>
			<el-breadcrumb separator="/" class="comBread">
				<el-breadcrumb-item :to="{ path: '/welcome' }">概览</el-breadcrumb-item>
				<el-breadcrumb-item>报表输出</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div><button class="reportPrint" @click="print"><i class="fa fa-download"></i>生成pdf并下载</button></div>
		<div class="printArea">
			<div class="selectPart bg-fontColor notice_container clearfix animated zoomIn">
				<el-form :inline="true" class="cur-siteName">
					<el-form-item>
						<span class="select-title-header">持续性监测</span>
						<span class="select-title">站点：</span>
						<el-select v-model="commonOpt1.siteId">
							<el-option v-for="item in websiteOptions" :key="item.id" :label="item.siteName" :size="large" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="calendarArea">
						<span class="select-title">时间段：</span>
						<el-date-picker v-model="commonOpt1.strDate" type="datetime" placeholder="选择开始时间" @change="getStartDate1">
						</el-date-picker>
						--
						<el-date-picker v-model="commonOpt1.endDate" type="datetime" placeholder="选择结束时间" @change="getEndDate1">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button @click="onSubmit1" class="btn-search btn-search1"><i class="el-icon-search"></i>&nbsp;&nbsp;&nbsp;查询</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="chartRow clearfix">
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
								<div class="legend-info" v-for="(item,index) in codeData1">
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

			<div class="selectPart bg-fontColor notice_container clearfix animated zoomIn">
				<el-form :inline="true" class="cur-siteName">
					<el-form-item>
						<span class="select-title-header">外链监测</span>
						<span class="select-title">站点：</span>
						<el-select v-model="commonOpt2.siteId">
							<el-option v-for="item in websiteOptions" :key="item.id" :label="item.siteName" :size="large" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="calendarArea">
						<span class="select-title">时间段：</span>
						<el-date-picker v-model="commonOpt2.strDate" type="datetime" placeholder="选择开始时间" @change="getStartDate2">
						</el-date-picker>
						--
						<el-date-picker v-model="commonOpt2.endDate" type="datetime" placeholder="选择结束时间" @change="getEndDate2">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button @click="onSubmit2" class="btn-search btn-search2"><i class="el-icon-search"></i>&nbsp;&nbsp;&nbsp;查询</el-button>
					</el-form-item>
				</el-form>

			</div>
			<div class="chartRow clearfix">
				<div class="pieChart part animated zoomIn bg-fontColor notice_container">
					<div class="panel-heading clearfix">
						<h3 class="panel-title">状态码分布</h3>
					</div>
					<div class="wh100 pie-chartK">
						<div class="wh100" id="chart3"></div>
					</div>
					<div class="wh100 pie-legend">
						<div class="wh100" style="overflow-x: hidden;" id="scrollbar">
							<div class="wh100">
								<div class="legend-info" v-for="(item,index) in codeData2">
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
							<div class="wh100" id="chart4"></div>
						</div>
					</div>
				</div>
			</div>
			<!--安全报警-->
			<div class="selectPart bg-fontColor notice_container clearfix animated zoomIn">
				<el-form :inline="true" class="cur-siteName">
					<el-form-item>
						<span class="select-title-header">报警信息</span>
						<span class="select-title">站点：</span>
						<el-select v-model="commonOpt3.siteId">
							<el-option v-for="item in websiteOptions" :key="item.id" :label="item.siteName" :size="large" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="calendarArea">
						<span class="select-title">时间段：</span>
						<el-date-picker v-model="commonOpt3.strDate" type="datetime" placeholder="选择开始时间" @change="getStartDate3">
						</el-date-picker>
						--
						<el-date-picker v-model="commonOpt3.endDate" type="datetime" placeholder="选择结束时间" @change="getEndDate3">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button @click="onSubmit3" class="btn-search btn-search2"><i class="el-icon-search"></i>&nbsp;&nbsp;&nbsp;查询</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="chartRow clearfix">
				<div class="pieChart wh100 part animated zoomIn bg-fontColor notice_container">
					<div class="panel-heading clearfix">
						<h3 class="panel-title">事件统计</h3>
					</div>
					<div class="wh100 pie-chartK" style="width:100% !important;">
						<div class="wh100" id="chart5"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	var common_tools = require("common_tools");
	require("../../../public_resource/vendor/jspdf.debug.js");
	require("../../../public_resource/vendor/html2canvas-0.4.1.js");
	var jsPDF = require("jspdf");
	export default {
		data() {
			return {
				curentDate1: '',
				curentDate2: '',
				curentTime: '',
				tableType: 0, //必须 控制表格的类型
				//接口
				Url: {
					siteLists: 'http://192.168.120.208:8084/site/allList',
					linkCode1: 'http://192.168.120.208:8084/link/linkcode',
					linkTime1: 'http://192.168.120.208:8084/link/linktime',
					linkpage1: 'http://192.168.120.208:8084/link/linkpage',
					linkCode2: 'http://192.168.120.208:8084/link/linkcodeall',
					linkTime2: 'http://192.168.120.208:8084/link/linktimeall',
					linkpage2: 'http://192.168.120.208:8084/outlink/outlinkallpage',
				},
				codeData1: [],
				codeData2: [],
				lineData1: [],
				lineData2: [],
				//common参数
				commonOpt1: {
					siteId: '',
					strDate: '',
					endDate: ''
				},
				commonOpt2: {
					siteId: '',
					strDate: '',
					endDate: ''
				},
				commonOpt3: {
					siteId: '',
					strDate: '',
					endDate: ''
				},
				//code参数
				optionCode1: {
					siteId: '',
					strDate: '',
					endDate: '',
				},
				optionCode2: {
					siteId: '',
					strDate: '',
					endDate: '',
				},
				//line参数
				optionLine1: {
					siteId: '',
					strDate: '',
					endDate: '',
					size: '15'
				},
				optionLine2: {
					siteId: '',
					strDate: '',
					endDate: '',
					size: '15'
				},
				alarmPie: {
					type: '',
					siteId: '',
					strDate: '',
					endDate: ''
				},
				//站点数据
				websiteOptions: [],
				//                colorList: ['#199386', '#b9f2a1', '#6eba8c', '#1a7d74','#005562','#0e8174','#ddbb57',"#6f9004"],
				colorLists: ['#199386', '#b9f2a1', '#6eba8c', '#1a7d74', '#005562', '#0e8174', '#ddbb57', "#6f9004"],

			}

		},
		methods: {
			print() {
				var targetDom = $(".printArea")[0];
				//				$('body').append(copyDom);
				html2canvas(targetDom, {
					onrendered: function(canvas) {
						console.log(canvas);
						var contentWidth = canvas.width;
						var contentHeight = canvas.height;

						//一页pdf显示html页面生成的canvas高度;
						var pageHeight = contentWidth / 595.28 * 841.89;
						//未生成pdf的html页面高度
						var leftHeight = contentHeight;
						//页面偏移
						var position = 0;
						//a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
						var imgWidth = 595.28;
						var imgHeight = 595.28 / contentWidth * contentHeight;

						var pageData = canvas.toDataURL('image/jpeg', 1.0);

						var pdf = new jsPDF('', 'pt', 'a4');
						//有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
						//当内容未超过pdf一页显示的范围，无需分页
						if(leftHeight < pageHeight) {
							pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
						} else {
							while(leftHeight > 0) {
								pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
								leftHeight -= pageHeight;
								position -= 841.89;
								//避免添加空白页
								if(leftHeight > 0) {
									pdf.addPage();
								}
							}
						}
						pdf.save('content.pdf');
					},
				});
			},
			svg2canvas(targetElem) {
				var svgElem = targetElem.find('svg');
				svgElem.each(function(index, node) {
					var parentNode = node.parentNode;
					//由于现在的IE不支持直接对svg标签node取内容，所以需要在当前标签外面套一层div，通过外层div的innerHTML属性来获取
					var tempNode = document.createElement('div');
					tempNode.appendChild(node);
					var svg = tempNode.innerHTML;
					var canvas = document.createElement('canvas');
					//转换
					canvg(canvas, svg);
					parentNode.appendChild(canvas);
				});
			},
			//获得开始时间
			getStartDate1(val) {
				var _self = this;
				_self.commonOpt1.strDate = val;
			},
			getStartDate2(val) {
				var _self = this;
				_self.commonOpt2.strDate = val;
			},
			getStartDate3(val) {
				var _self = this;
				_self.commonOpt3.strDate = val;
			},
			//获得结束时间
			getEndDate1(val) {
				var _self = this;
				_self.commonOpt1.endDate = val;
			},
			getEndDate2(val) {
				var _self = this;
				_self.commonOpt2.endDate = val;
			},
			getEndDate3(val) {
				var _self = this;
				_self.commonOpt3.endDate = val;
			},
			handleCurrentChange(val) {
				var _self = this;
				_self.currentPage = val;
				console.log(val);

			},
			onSubmit1() {
				var _self = this;
				_self.tableType = 1;
				_self.pieChartIn();
				_self.lineChartIn();
			},
			onSubmit2() {
				var _self = this;
				_self.tableType = 1;
				_self.pieChartOut();
				_self.lineChartOut();
			},
			onSubmit3() {
				var _self = this;
				_self.tableType = 1;
				_self.statisChart();
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
				_self.commonOpt3.endDate = _self.commonOpt2.endDate = _self.commonOpt1.endDate = _self.curentDate2 + ' ' + _self.curentTime;
				_self.commonOpt3.strDate = _self.commonOpt2.strDate = _self.commonOpt1.strDate = _self.curentDate1 + ' ' + '00:00:00';
				return true;
			},
			pieChartIn() {
				var _self = this;
				var pieID = _self.$echarts.init(document.getElementById('chart1'));
				_self.optionCode1.strDate = _self.commonOpt1.strDate;
				_self.optionCode1.endDate = _self.commonOpt1.endDate;
				_self.optionCode1.siteId = _self.commonOpt1.siteId;
				//接口
				common_tools.AJAX('post', _self.Url.linkCode1, _self.optionCode1, function(data) {
					_self.codeData1 = data.data;
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
							data: _self.codeData1
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
			pieChartOut() {
				var _self = this;
				var pieID2 = _self.$echarts.init(document.getElementById('chart3'));
				_self.optionCode2.strDate = _self.commonOpt2.strDate;
				_self.optionCode2.endDate = _self.commonOpt2.endDate;
				_self.optionCode2.siteId = _self.commonOpt2.siteId;

				//接口
				common_tools.AJAX('post', _self.Url.linkCode2, _self.optionCode2, function(data) {
					_self.codeData2 = data.data;
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
							data: _self.codeData2
						}]
					};
					pieID2.setOption(chartOption, false);
					$(window).resize(function() {
						pieID2.resize();
						pieID2.setOption(chartOption);
					});
				}, function(data) {
					console.log(data);
				});

			},
			lineChartIn() {
				var _self = this;
				var mychart1 = _self.$echarts.init(document.getElementById('chart2'));
				var lineDataTime = [],
					lineDataRes = [];
				_self.optionLine1.siteId = _self.commonOpt1.siteId;
				_self.optionLine1.strDate = _self.commonOpt1.strDate;
				_self.optionLine1.endDate = _self.commonOpt1.endDate;
				common_tools.AJAX('post', _self.Url.linkTime1, _self.optionLine1, function(data) {
					_self.lineData1 = data.data;
					for(var i = 0; i < _self.lineData1.length; i++) {
						lineDataRes.push(_self.lineData1[i].responseTime);
						lineDataTime.push(_self.lineData1[i].time);
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
					mychart1.setOption(option, false);
					$(window).resize(function() {
						mychart1.resize();
						mychart1.setOption(option);
					});
				}, function(data) {
					console.log(data);
				})

			},
			lineChartOut() {
				var _self = this;
				var mychart2 = _self.$echarts.init(document.getElementById('chart4'));
				var lineDataTime = [],
					lineDataRes = [];
				_self.optionLine2.siteId = _self.commonOpt2.siteId;
				_self.optionLine2.strDate = _self.commonOpt2.strDate;
				_self.optionLine2.endDate = _self.commonOpt2.endDate;
				common_tools.AJAX('post', _self.Url.linkTime2, _self.optionLine2, function(data) {
					_self.lineData2 = data.data;
					for(var i = 0; i < _self.lineData2.length; i++) {
						lineDataRes.push(_self.lineData2[i].responseTime);
						lineDataTime.push(_self.lineData2[i].time);
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
					mychart2.setOption(option, false);
					$(window).resize(function() {
						mychart2.resize();
						mychart2.setOption(option);
					});
				}, function(data) {
					console.log(data);
				})

			},
			statisChart() {
				var _self = this;
				if(_self.alarmPie.type != '') {
					_self.alarmPie.type = 'one';
				} else {
					_self.alarmPie.type = 'all';
				};
				let alarmChart = _self.$echarts.init(document.getElementById('chart5'));
				_self.alarmPie.siteId = _self.commonOpt3.siteId;
				_self.alarmPie.strDate = _self.commonOpt3.strDate;
				_self.alarmPie.endDate = _self.commonOpt3.endDate;
				common_tools.AJAX('post', common_tools.interfaceurl + 'security/securityCount', _self.alarmPie, function(data) {
					if(data.status = '200') {
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
								name: '事件类型',
								type: 'pie',
								clockwise: false, //饼图的扇区是否是顺时针排布
								minAngle: 20, //最小的扇区角度（0 ~ 360）
								radius: ['35%', '80%'], //饼图的半径
								center: ['50%', '50%'],
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
								center: ['50%', '50%'], //饼图的中心（圆心）坐标
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
						alarmChart.setOption(option);
						$(window).resize(function() {
							alarmChart.resize();
							alarmChart.setOption(option);
						})
					} else {
						console.log('传参错误');
					}
				}, function(data) {
					console.log(data);
				})

			},
		},
		mounted: function() {
			console.log(new jsPDF);
			var _self = this;
			window.onresize = function(e) {
				var getWindowParm = e.target.innerWidth + 'px ' + (e.target.innerHeight) + 'px';
				$(".notice_container").css("background-size", getWindowParm);
			};
			//				站点接口
			common_tools.AJAX('post', _self.Url.siteLists, {}, function(data) {
				if(data.status = "200") {
					_self.websiteOptions = data.data;
					_self.siteAll = _self.websiteOptions.length;
					_self.commonOpt3.siteId = _self.commonOpt2.siteId = _self.commonOpt1.siteId = _self.websiteOptions[0].id;
					console.log(_self.commonOpt1.siteId, _self.commonOpt2.siteId);
					_self.getCurDate();
					_self.pieChartIn();
					_self.pieChartOut();
					_self.lineChartIn();
					_self.lineChartOut();
					_self.statisChart();
				} else {
					console.log('传参错误！');
				}
			}, function(data) {
				console.log(data);
			})
		}

	}
</script>

<style>
	/*通用部分*/
	/*@import "../SafetyAlarm/SafetyAlarm.css";*/
	
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
	
	.btn-search {
		margin: 0 0 0 20px;
		background-color: #219E91 !important;
		border: 1px solid #219E91 !important;
	}
	
	.select-title-header {
		box-sizing: border-box;
		padding: 0 0 0 20px;
		text-align: center;
		font-size: 1.6rem;
		color: #ffffff;
		font-weight: 500;
		line-height: 36px;
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
		margin-bottom: 20px;
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
	
	.suatainMonitor-root .el-form-item {
		margin: 0;
	}
	/*总计*/
	
	.listTable table {
		overflow: hidden;
	}
	
	.listTable .cell {
		text-align: center;
	}
	
	.SafetyAlarm_left {
		float: left;
		width: 50%;
		height: 350px;
	}
	
	.SafetyAlarm_right {
		float: left;
		width: 48.5%;
		margin-left: 1.5%;
		height: 350px;
	}
	
	.reportPrint {
		border: none;
		padding: 8px 15px;
		color: #fff;
		background: #209E91;
		border-radius: 4px;
		margin-bottom: 20px;
		cursor: pointer;
	}
</style>
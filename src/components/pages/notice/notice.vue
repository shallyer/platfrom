<template>
	<div id='notice' class='notice'>
		<div class='commonTop clearfix'>
			<el-breadcrumb separator="/" class="comBread">
				<el-breadcrumb-item :to="{ path: '/welcome' }">概览</el-breadcrumb-item>
				<el-breadcrumb-item>消息通知</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class='define_container animated zoomIn'>
			<div class='define_container_title'>
				<h3>系统日志</h3>
			</div>
			<div class='notice_search clearfix'>
				<div class='defineInput'>
					<div class="block">
						<span class="demonstration">操作IP：</span>
						<el-input v-model="searchParm.ip" placeholder="请输入操作IP" style='width: 75%;'></el-input>
					</div>
				</div>
				<div class='detineDateTimePicker'>
					<div class="block">
						<span class="demonstration">操作时间：</span>
						<el-date-picker v-model="searchParm.time" type="datetimerange" @change='getTime' placeholder="选择时间范围">
						</el-date-picker>
					</div>
				</div>
				<div class='defineSelect'>
					<span class="demonstration">日志类型：</span>
					<el-select v-model="searchParm.type" placeholder="请选择" style='min-width: 240px;'>
						<el-option v-for="item in getsearchParm.type" :key="item.value" :label="item.label" :value="item.value" style='min-width: 240px;'>
						</el-option>
					</el-select>
				</div>
				<div class='detineButton'>
					<el-button icon="search" @click='tableChart'>查询</el-button>
				</div>
			</div>
			<div class='define_container_body defineTable'>
				<el-table :data="tableData" class="listTable" style="width: 100%">
					<el-table-column prop="createDate" label="操作时间">
					</el-table-column>
					<el-table-column prop="operateType" label="日志类型">
					</el-table-column>
					<el-table-column prop="ip" label="操作IP">
					</el-table-column>
					<el-table-column prop="createName" label="操作用户">
					</el-table-column>
					<el-table-column prop="content" label="日志内容">
					</el-table-column>
				</el-table>
			</div>
			<div class="pages">
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" layout="total, prev, pager, next,jumper" :page-size="pageSize" :total="total">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
	var common_tools = require("common_tools");
	import defineStyle from '../../../public_resource/css/define.css';
	export default {
		data() {
			return {
				test: '',
				total: '',
				pageSize: 10,
				currentPage: 1,
				searchParm: {
					type: "",
					createDateStart: "",
					createDateEnd: "",
					time: "",
					ip: "",
					size: 10,
					current: ""
				},
				getsearchParm: {
					type: [{
							value: '10',
							label: '登录'
						},
						{
							value: '20',
							label: '登出'
						},
						{
							value: '30',
							label: '添加'
						},
						{
							value: '40',
							label: '更新'
						},
						{
							value: '50',
							label: '删除'
						},
						{
							value: '60',
							label: '注册'
						},
					],
				},
				tableData: []
			}
		},
		computed: {},
		methods: {
			handleCurrentChange(val) {
				var _self = this;
				_self.currentPage = val;
				_self.tableChart();
			},
			getTime(val) {
				this.searchParm.createDateStart = val.substring(0, 19);
				this.searchParm.createDateEnd = val.substring(22, 41);
			},
			tableChart() {
				var _self = this;
				common_tools.AJAX('POST', common_tools.interfaceurl+'log/list/'+_self.currentPage+"/"+_self.searchParm.size, {
					"createDateStart": _self.searchParm.createDateStart,
					"createDateEnd": _self.searchParm.createDateEnd,
					"operateType": _self.searchParm.type,
					"ip": _self.searchParm.ip
				}, function(data) {
					//success callback
					if(data.status == '200') {
						_self.tableData = data.data;
						_self.total=data.pageInfo.totalRecord;
					} else {
						_self.$message('返回数据：' + data.msg);
					};
				}, function(data) {
					//error callback
					console.log(data);
				});
			}
		},
		mounted: function() {
			var getWindowParm = window.innerWidth + 'px ' + (window.innerHeight + 150) + 'px';
			$(".define_container").css("background-size", getWindowParm);
			window.onresize = function(e) {
				var getWindowParm = e.target.innerWidth + 'px ' + (e.target.innerHeight + 150) + 'px';
				$(".define_container").css("background-size", getWindowParm);
			};
			this.tableChart();
		}
	}
</script>
<style>
	div.notice_search {
		width: 100%;
		box-sizing: border-box;
		padding: 10px 22px 5px 22px;
		text-align: left;
	}
	
	div.notice_search>div {
		display: inline-block;
	}
	
	.pages {
		width: 100%;
		box-sizing: border-box;
		padding: 15px 0;
		text-align: center;
	}
	
	.notice .el-pager li,
	.notice .el-pagination button.disabled,
	.notice .el-pagination .btn-next,
	.el-pagination .btn-prev,
	.notice .el-pagination__editor {
		background: transparent;
	}
	
	.notice .el-pagination__editor,
	.notice .el-pager li:hover,
	.notice .el-table__empty-text {
		color: #ffffff;
	}
	
	.notice .el-table,
	.notice .el-table th>.cell,
	.notice .el-pagination {
		color: #ffffff;
		border: 0px;
		font-weight: 300;
	}
	
	.notice .el-table tr,
	.notice .el-table,
	.notice .el-table::after,
	.el-table::before,
	.notice .el-table th>.cell,
	.notice .el-table th {
		background-color: transparent;
	}
	
	.notice .el-pager li.active {
		border: 1px solid #d1dbe5;
	}
	
	.notice .el-pagination__editor:focus {
		border-color: #219E91;
	}
	
	.notice .el-table tr {
		background-color: rgba(0, 0, 0, 0.2);
	}
	
	.notice .el-table--enable-row-hover .el-table__body tr:hover>td {
		background-color: rgba(255, 255, 255, .1);
	}
	
	.notice .el-table td,
	.el-table th.is-leaf {
		border-bottom: 1px solid rgba(144, 144, 144, .3);
	}
	
	.notice .el-pager li.active {
		border-color: #fff;
		background-color: #219E91;
		cursor: default;
	}
	
	.notice .el-pagination .btn-next,
	.notice .el-pagination .btn-prev {
		background-color: transparent;
		color: #fff;
	}
	
	.notice .el-pagination button.disabled {
		background-color: transparent;
		color: #fff;
	}
	
	.notice .el-pager li {
		background-color: transparent;
		border-radius: 4px;
		color: #fff;
	}
	.demonstration{
		font-size:1.4rem;
	}
	.listTable table {
		overflow: hidden;
	}
	
	.listTable .cell {
		text-align: center;
	}
</style>
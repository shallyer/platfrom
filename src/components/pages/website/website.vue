<template>
	<div id='webOperation' class='notice'>
		<div class='commonTop clearfix'>
			<el-breadcrumb separator="/" class="comBread">
				<el-breadcrumb-item :to="{ path: '/welcome' }">概览</el-breadcrumb-item>
				<el-breadcrumb-item>系统管理</el-breadcrumb-item>
				<el-breadcrumb-item>站点维护</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class='define_container animated zoomIn'>
			<div class='define_container_title'>
				<h3>站点维护</h3>
			</div>
			<div class='notice_search clearfix'>
				<div class='detineButton define_fl' style="margin: 0;">
					<el-button icon="plus" @click="addWebSite()">添加站点</el-button>
				</div>
			</div>
			<div class='define_container_body noticeTable'>
				<el-table :data="tableData" border style="width: 100%" empty-text='您还未添加站点或数据加载异常'>
					<el-table-column prop="siteName" label="名称"></el-table-column>
					<el-table-column prop="description" label="描述"></el-table-column>
					<el-table-column prop="url" label="URL"></el-table-column>
					<el-table-column prop="ip" label="固定IP"></el-table-column>
					<el-table-column label="操作" min-width="100">
						<template scope="scope">
							<div class='detineButton define_fl'>
								<el-button size="small" @click="setWebSiteStrategyData(scope)">策略</el-button>
							</div>
							<div class='detineButton define_fl'>
								<el-button size="small" @click="changeWebSiteInfoData(scope)">修改</el-button>
							</div>
							<el-button type="danger" size="small" @click="delWebSite(scope)" style='float: left; margin: 5px 0 5px 20px;'>删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="pages">
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" layout="total, prev, pager, next,jumper" :page-size="pageSize" :total="total">
				</el-pagination>
			</div>
		</div>
		<!--  提示层      -->
		<el-dialog title="提示" :visible.sync="alertDialog" size="tiny" :before-close="handleClose">
			<span>{{alertDialog_tips}}</span>
			<span slot="footer" class="dialog-footer">
		    <el-button  class="websiteAddCancle" @click="alertDialog = false">取 消</el-button>
		    <el-button  class="websiteAddConfirm" type="primary"  @click="confirmBtn()">确 定</el-button>
		  </span>
		</el-dialog>
		<!--  提示层      -->
		<!--  添加站点      -->
		<el-dialog title="添加站点" :visible.sync="addWebSiteInfoDialog" size="">
			<div class='form_frame websiteEdit'>
				<el-form label-width="80px">
					<el-form-item label="站点名称">
						<el-input v-model="addWebSiteInfo.webSiteName"></el-input>
					</el-form-item>
					<el-form-item label="描述">
						<el-input v-model="addWebSiteInfo.webSiteDescription"></el-input>
					</el-form-item>
					<el-form-item label="URL">
						<el-input v-model="addWebSiteInfo.webSiteURL"></el-input>
					</el-form-item>
					<el-form-item label="固定IP">
						<el-input type="textarea" :rows="2" v-model="addWebSiteInfo.IP" placeholder="实例：127.0.0.1,0.0.0.0">
						</el-input>
					</el-form-item>
				</el-form>
				<div class='website_DefaultWebSiteStrategy_show'>
					<span style='margin-bottom: 10px;display: block;'>初始化设置站点策略：</span>
					<div v-for='items in addWebSiteInfo.getDefaultWebSiteStrategy'>
						<span v-if="items.type=='5'">{{items.name}}：{{items.defaltPolicy}}等级</span>
						<span v-if="items.type=='4'">{{items.name}}：{{items.defaltPolicy}}分钟</span>
						<span v-if="items.type=='3'">{{items.name}}：<font><</font>{{items.defaltPolicy}}<font>></font></span>
						<span v-if="items.type=='1'">{{items.name}}：{{items.defaltPolicy}}分钟</span>
						<span v-if="items.type=='2'">{{items.name}}：{{items.defaltPolicy}}分钟</span>
					</div>
				</div>
				<span style="padding-left:80px;">URL需要以"http(s)://www."开头</span>

			</div>

			<span slot="footer" class="dialog-footer">
		    <el-button class="websiteAddCancle" @click="addWebSiteInfoDialog = false">取 消</el-button>
		    <el-button class="websiteAddConfirm" type="primary"  @click="confirmBtn()">确 定</el-button>
		  </span>
		</el-dialog>
		<!--  添加站点      -->
		<!--  修改站点      -->
		<el-dialog title="修改站点" :visible.sync="changeWebSiteInfoDialog" size="">
			<div class='form_frame websiteEdit'>
				<el-form label-width="80px">
					<el-form-item label="站点名称">
						<el-input v-model="changeWebSiteInfo.webSiteName"></el-input>
					</el-form-item>
					<el-form-item label="描述">
						<el-input v-model="changeWebSiteInfo.webSiteDescription"></el-input>
					</el-form-item>
					<el-form-item label="URL">
						<el-input v-model="changeWebSiteInfo.webSiteURL"></el-input>
					</el-form-item>
					<el-form-item label="固定IP">
						<el-input type="textarea" :rows="2" v-model="changeWebSiteInfo.ip"></el-input>
					</el-form-item>
					<span>URL需要以"http(s)://www."开头</span>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
		    <el-button class="websiteAddCancle" @click="changeWebSiteInfoDialog = false">取 消</el-button>
		    <el-button class="websiteAddConfirm" type="primary" @click="confirmBtn()">确 定</el-button>
		  </span>
		</el-dialog>
		<!--  修改站点      -->
		<!--  策略设置      -->
		<el-dialog title="策略设置" :visible.sync="setWebSiteStrategyDialog" size="">
			<div class='form_frame'>
				<el-form label-width="140px">
					<el-form-item v-bind:label='items.name' v-if='items.type==5' v-for='items in setWebSiteStrategy.getCurrentWebSiteStrategy'>
						<el-radio-group v-model="setWebSiteStrategy.deepLevel">
							<el-radio v-bind:disabled="setWebSiteStrategy.isCost=='N'" v-bind:label='item.policyValue' v-if="items.isCheckbox=='N'" v-for='item in items.list'>{{item.policyValue}}级</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item v-bind:label='items.name' v-if='items.type==4' v-for='items in setWebSiteStrategy.getCurrentWebSiteStrategy'>
						<el-radio-group v-model="setWebSiteStrategy.timeout">
							<el-radio v-bind:disabled="setWebSiteStrategy.isCost=='N'" v-bind:label='item.policyValue' v-if="items.isCheckbox=='N'" v-for='item in items.list'>{{item.policyValue}}分钟</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item v-bind:label='items.name' v-if='items.type==3' v-for='items in setWebSiteStrategy.getCurrentWebSiteStrategy'>
						<el-checkbox-group v-model="setWebSiteStrategy.label">
							<el-checkbox v-bind:disabled="setWebSiteStrategy.isCost=='N'" v-bind:label='item.policyValue' v-if="items.isCheckbox=='Y'" v-for='item in items.list'><span><</span>{{item.policyValue}}<span>></span></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item v-bind:label='items.name' v-if='items.type==1' v-for='items in setWebSiteStrategy.getCurrentWebSiteStrategy'>
						<el-radio-group v-model="setWebSiteStrategy.externalChain">
							<el-radio v-bind:disabled="setWebSiteStrategy.isCost=='N'" v-bind:label='item.policyValue' v-if="items.isCheckbox=='N'" v-for='item in items.list'>{{item.policyValue}}分钟</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item v-bind:label='items.name' v-if='items.type==2' v-for='items in setWebSiteStrategy.getCurrentWebSiteStrategy'>
						<el-radio-group v-model="setWebSiteStrategy.internalChain">
							<el-radio v-bind:disabled="setWebSiteStrategy.isCost=='N'" v-bind:label='item.policyValue' v-if="items.isCheckbox=='N'" v-for='item in items.list'>{{item.policyValue}}分钟</el-radio>
						</el-radio-group>
					</el-form-item>

				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
		    <el-button class="websiteAddCancle" @click="setWebSiteStrategyDialog = false">取 消</el-button>
		    <el-button class="websiteAddConfirm" type="primary" @click="confirmBtn()">确 定</el-button>
		  </span>
		</el-dialog>
		<!--  策略设置      -->
	</div>
</template>
<script>
	var common_tools = require("common_tools");
	import defineStyle from '../../../public_resource/css/define.css';
	export default {
		data() {
			return {
				total: 0,
				pageSize: 10,
				currentPage: 1,
				addWebSiteInfo: {
					webSiteName: '',
					webSiteDescription: '',
					webSiteURL: 'http://',
					defaultWebSiteStrategy: {
						deepLevel: '',
						depthLevelType: '',
						timeout: '',
						intervalTimeType: '',
						label: [],
						tagsType: '',
						internalChain: '',
						siteIntervalTimeType: '',
						externalChain: '',
						outLinkIntervalTimeType: ''
					},
					getDefaultWebSiteStrategy: []
				},
				changeWebSiteInfo: {
					webSiteID: '',
					webSiteName: '',
					webSiteDescription: '',
					webSiteURL: 'http://',
					ip:''
				},
				setWebSiteStrategy: {
					webSiteID: '',
					deepLevel: '',
					depthLevelType: '',
					timeout: '',
					intervalTimeType: '',
					label: [],
					tagsType: '',
					internalChain: '',
					siteIntervalTimeType: '',
					externalChain: '',
					outLinkIntervalTimeType: '',
					getCurrentWebSiteStrategy: [],
					isCost: null
				},
				tableData: [],
				currentWebSiteID: null,
				//state
				addWebSiteInfoDialog: false,
				changeWebSiteInfoDialog: false,
				setWebSiteStrategyDialog: false,
				alertDialog: false,
				alertDialog_tips: '',
				confirmBtnType: null
			}
		},
		computed: {},
		methods: {
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getInitData();
			},
			getInitData() {
				var _self = this;
				common_tools.AJAX('POST', common_tools.interfaceurl + 'site/list', {
					"pageNum": _self.currentPage,
					"pageSize": _self.pageSize
				}, function(data) {
					//success callback
					if(data.status == '200') {
						_self.tableData = data.data.list;
						_self.total = data.data.totalCount;
					} else {
						if(data.status == '402') {
							_self.$router.push('/login')
						};
						_self.$message('返回数据：' + data.msg);
					};
				}, function(data) {
					//error callback
					console.log(data);
				});
			},
			changeWebSiteInfoData(_scope) {
				let getID = _scope.row.id;
				let getSiteName = _scope.row.siteName;
				let getDescription = _scope.row.description;
				let getURL = _scope.row.url;
				let ip = _scope.row.ip;
				this.changeWebSiteInfo.webSiteName = getSiteName;
				this.changeWebSiteInfo.webSiteDescription = getDescription;
				this.changeWebSiteInfo.webSiteURL = getURL;
				this.changeWebSiteInfo.webSiteID = getID;
				this.changeWebSiteInfo.ip = ip;
				this.confirmBtnType = 1;
				this.changeWebSiteInfoDialog = true;
			},
			setWebSiteStrategyData(_scope) {
				var _self = this;
				let getID = _scope.row.id;
				this.currentWebSiteID = getID;
				common_tools.AJAX('POST', common_tools.interfaceurl + 'sitepolicy/updateBefore', {
					"id": getID
				}, function(data) {
					//success callback
					if(data.status == '200') {
						_self.setWebSiteStrategy.getCurrentWebSiteStrategy = data.data.policysList;
						_self.setWebSiteStrategy.isCost = data.data.isCost;

						_self.setWebSiteStrategy.deepLevel = data.data.suateamYjjPolicysBeforeEntity.depthLevel;
						_self.setWebSiteStrategy.timeout = data.data.suateamYjjPolicysBeforeEntity.intervalTime;
						_self.setWebSiteStrategy.externalChain = data.data.suateamYjjPolicysBeforeEntity.outLinkIntervalTime;
						_self.setWebSiteStrategy.internalChain = data.data.suateamYjjPolicysBeforeEntity.siteIntervalTime;
						_self.setWebSiteStrategy.label = data.data.suateamYjjPolicysBeforeEntity.tags.split(",");

						_self.setWebSiteStrategy.depthLevelType = '5';
						_self.setWebSiteStrategy.intervalTimeType = '4'
						_self.setWebSiteStrategy.tagsType = '3';
						_self.setWebSiteStrategy.siteIntervalTimeType = '2';
						_self.setWebSiteStrategy.outLinkIntervalTimeType = '1';

						_self.confirmBtnType = 4;
						_self.setWebSiteStrategyDialog = true;
					} else {
						_self.$message('状态：' + data.msg);
					};

				}, function(data) {
					//error callback
					console.log(data);
				});
			},
			addWebSite() {
				var _self = this;
				this.addWebSiteInfo = {
					webSiteName: '',
					webSiteDescription: '',
					webSiteURL: 'http://',
					defaultWebSiteStrategy: {
						deepLevel: '',
						depthLevelType: '',
						timeout: '',
						intervalTimeType: '',
						label: [],
						tagsType: '',
						internalChain: '',
						siteIntervalTimeType: '',
						externalChain: '',
						outLinkIntervalTimeType: ''
					},
					getDefaultWebSiteStrategy: []
				};
				common_tools.AJAX('POST', common_tools.interfaceurl + 'site/getPolicy', {}, function(data) {
					//success callback
					if(data.status == '200') {
						_self.addWebSiteInfo.getDefaultWebSiteStrategy = data.data.defaltPolicy;
						for(var a = 0; a < data.data.defaltPolicy.length; a++) {
							if(data.data.defaltPolicy[a].type == '5') {
								_self.addWebSiteInfo.defaultWebSiteStrategy.depthLevelType = '5';
								_self.addWebSiteInfo.defaultWebSiteStrategy.deepLevel = data.data.defaltPolicy[a].defaltPolicy;
							} else if(data.data.defaltPolicy[a].type == '1') {
								_self.addWebSiteInfo.defaultWebSiteStrategy.outLinkIntervalTimeType = '1';
								_self.addWebSiteInfo.defaultWebSiteStrategy.externalChain = data.data.defaltPolicy[a].defaltPolicy;
							} else if(data.data.defaltPolicy[a].type == '2') {
								_self.addWebSiteInfo.defaultWebSiteStrategy.siteIntervalType = '2';
								_self.addWebSiteInfo.defaultWebSiteStrategy.internalChain = data.data.defaltPolicy[a].defaltPolicy;
							} else if(data.data.defaltPolicy[a].type == '3') {
								_self.addWebSiteInfo.defaultWebSiteStrategy.tagsType = '3';
								_self.addWebSiteInfo.defaultWebSiteStrategy.label = data.data.defaltPolicy[a].defaltPolicy;
							} else if(data.data.defaltPolicy[a].type == '4') {
								_self.addWebSiteInfo.defaultWebSiteStrategy.intervalTimeType = '4';
								_self.addWebSiteInfo.defaultWebSiteStrategy.timeout = data.data.defaltPolicy[a].defaltPolicy;
							}
						};
						_self.addWebSiteInfoDialog = true;
						_self.confirmBtnType = 2;
					} else {
						_self.$message('状态：' + data.msg);
					};
				}, function(data) {
					//error callback
					console.log(data);
				});

			},
			delWebSite(_scope) {
				let getID = _scope.row.id;
				this.currentWebSiteID = getID;
				this.alertDialog = true;
				this.confirmBtnType = 3;
				this.alertDialog_tips = '您确定要删除“' + _scope.row.siteName + '”的站点及相关策略吗？';
			},
			confirmBtn() {
				var _self = this;
				if(this.confirmBtnType !== null) {
					switch(this.confirmBtnType) {
						case 1:
							common_tools.AJAX('POST', common_tools.interfaceurl + 'site/update', {
								"siteName": _self.changeWebSiteInfo.webSiteName,
								"description": _self.changeWebSiteInfo.webSiteDescription,
								"url": _self.changeWebSiteInfo.webSiteURL,
								"id": _self.changeWebSiteInfo.webSiteID,
								"ip":_self.changeWebSiteInfo.ip,
							}, function(data) {
								//success callback
								if(data.status == '200') {
									_self.$message({
										message: '修改站点：' + data.msg,
										type: 'success'
									});
									_self.getInitData();
									_self.changeWebSiteInfoDialog = false;
								} else {
									_self.$message('状态：' + data.msg);
								};
							}, function(data) {
								//error callback
								console.log(data);
							});
							break;
						case 2:
							common_tools.AJAX('POST', common_tools.interfaceurl + 'site/add', {
								"siteName": _self.addWebSiteInfo.webSiteName,
								"description": _self.addWebSiteInfo.webSiteDescription,
								"url": _self.addWebSiteInfo.webSiteURL,
								"IP":_self.addWebSiteInfo.IP,
								"depthLevel": _self.addWebSiteInfo.defaultWebSiteStrategy.deepLevel,
								"intervalTime": _self.addWebSiteInfo.defaultWebSiteStrategy.timeout,
								"tags": _self.addWebSiteInfo.defaultWebSiteStrategy.label,
								"outLinkIntervalTime": _self.addWebSiteInfo.defaultWebSiteStrategy.externalChain,
								"siteIntervalTime": _self.addWebSiteInfo.defaultWebSiteStrategy.internalChain,

								"depthLevelType": _self.addWebSiteInfo.defaultWebSiteStrategy.depthLevelType,
								"intervalTimeType": _self.addWebSiteInfo.defaultWebSiteStrategy.intervalTimeType,
								"tagsType": _self.addWebSiteInfo.defaultWebSiteStrategy.tagsType,
								"outLinkIntervalTimeType": _self.addWebSiteInfo.defaultWebSiteStrategy.outLinkIntervalTimeType,
								"siteIntervalTimeType": _self.addWebSiteInfo.defaultWebSiteStrategy.siteIntervalType,
							}, function(data) {
								//success callback
								if(data.status == '200') {
									_self.$message({
										message: '添加站点：' + data.msg,
										type: 'success'
									});
									_self.getInitData();
									_self.addWebSiteInfoDialog = false;
								} else {
									_self.$message('状态：' + data.msg);
								};
							}, function(data) {
								//error callback
								console.log(data);
							});
							break;
						case 3:
							common_tools.AJAX('POST', common_tools.interfaceurl + 'site/delete', {
								"siteId": _self.currentWebSiteID
							}, function(data) {
								//success callback
								if(data.status == '200') {
									_self.$message({
										message: '删除站点：' + data.msg,
										type: 'success'
									});
									_self.getInitData();
									_self.alertDialog = false;
								} else {
									_self.$message('状态：' + data.msg);
								};
							}, function(data) {
								//error callback
								console.log(data);
							});
							break;
						case 4:
							common_tools.AJAX('POST', common_tools.interfaceurl + 'sitepolicy/update', {
								"siteId": _self.currentWebSiteID,
								"depthLevel": _self.setWebSiteStrategy.deepLevel,
								"intervalTime": _self.setWebSiteStrategy.timeout,
								"tags": _self.setWebSiteStrategy.label.join(','),
								"outLinkIntervalTime": _self.setWebSiteStrategy.externalChain,
								"siteIntervalTime": _self.setWebSiteStrategy.internalChain,

								"depthLevelType": _self.setWebSiteStrategy.depthLevelType = '5',
								"intervalTimeType": _self.setWebSiteStrategy.intervalTimeType = '4',
								"tagsType": _self.setWebSiteStrategy.tagsType = '3',
								"outLinkIntervalTimeType": _self.setWebSiteStrategy.outLinkIntervalTimeType = '1',
								"siteIntervalTimeType": _self.setWebSiteStrategy.siteIntervalTimeType = '2',

							}, function(data) {
								//success callback
								if(data.status == '200') {
									_self.$message({
										message: '修改站点策略：' + data.msg,
										type: 'success'
									});
									_self.getInitData();
									_self.setWebSiteStrategyDialog = false;
								} else {
									_self.$message('状态：' + data.msg);
								};
							}, function(data) {
								//error callback
								console.log(data);
							});
							break;

					}
				} else {
					console.log("confirmBtnType:" + this.confirmBtnType);
				};
			}
		},
		mounted() {
			var getWindowParm = window.innerWidth + 'px ' + (window.innerHeight + 150) + 'px';
			$(".define_container").css("background-size", getWindowParm);
			window.onresize = function(e) {
				var getWindowParm = e.target.innerWidth + 'px ' + (e.target.innerHeight + 150) + 'px';
				$(".define_container").css("background-size", getWindowParm);
			};
			this.getInitData();
		}
	}
</script>
<style>
	div.notice_search {
		width: 100%;
		box-sizing: border-box;
		padding: 10px 22px 5px 22px;
	}
	
	div.form_frame {
		width: 482px;
		margin: 15px;
		box-sizing: border-box;
		display: block;
	}
	
	div.website_DefaultWebSiteStrategy_show {
		line-height: 2;
		margin: 20px auto;
		padding-left: 80px;
	}
	
	.define_container_body .el-table {
		background-color: transparent;
		border-color: #ADC1B8;
		border: none;
	}
	
	.define_container_body .el-table th {
		background-color: transparent;
	}
	
	.define_container_body .el-table .cell {
		background-color: transparent;
		color: #ffffff;
		opacity: .9;
		text-align: center;
	}
	
	.define_container_body .el-table tr {
		background-color: rgba(0, 0, 0, 0.2);
	}
	
	/*.define_container_body .el-table tr:hover {
		background-color: rgba(144, 144, 144, .3)
	}*/
	/*.SafetyAlarm_root .SafetyAlarm_list_table .el-table tr:hover {
    background-color: rgba(255, 255, 255, .1);
}*/
	
	.define_container_body .el-table td,
	.el-table th {
		padding: 0;
		border-right: transparent;
	}
	
	.define_container_body .el-table::after,
	.el-table::before {
		background-color: transparent;
	}
	
	.define_container_body .el-table--enable-row-hover .el-table__body tr:hover>td {
		background-color: transparent;
		border-color: 1px solid rgba(144, 144, 144, .3);
	}
	
	.define_container_body .el-table td,
	.el-table th .is-leaf {
		border-bottom: 1px solid rgba(144, 144, 144, .3);
		border-right: transparent;
	}
	
	.define_container_body .el-table td,
	.el-table th.is-leaf {
		border-bottom: 1px solid rgba(144, 144, 144, .3);
	}
	
	.notice .el-dialog {
		border: 1px solid #219E91;
		color: #ffffff;
		background-color: rgba(0, 0, 0, 0.6)
	}
	
	.notice .el-dialog__body {
		color: #fff;
	}
	
	.notice .el-form-item__label {
		color: #fff;
	}
	
	.el-radio {
		color: #fff;
	}
	
	.el-checkbox {
		color: #fff;
	}
	
	.websiteEdit .el-input__inner {
		background: none;
		color: #fff;
	}
	
	.websiteEdit .el-input__inner:focus {
		border-color: #219E91;
	}
	
	.websiteAddConfirm.el-button--primary {
		background: #219E91;
		border-color: #219E91;
	}
	
	.websiteAddCancle.el-button--default {
		background: none;
		color: #fff;
		border-color: #219E91;
	}
	
	.form_frame .el-radio__input.is-checked .el-radio__inner {
		background: #219E91;
		border-color: #219E91;
	}
	.form_frame .el-textarea__inner {
		background:none;
		color:#fff;
	}
	.form_frame .el-textarea__inner:focus {
		border-color: #219E91;
	}
	
	.form_frame .el-checkbox__input.is-checked .el-checkbox__inner {
		background: #219E91;
		border-color: #219E91;
	}
	
	.el-dialog__title {
		color: #fff;
	}
</style>
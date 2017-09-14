<template>
	<div class="problemFeedback-root">
		<!--面包屑部分-->
		<div class='commonTop clearfix'>
			<el-breadcrumb separator="/" class="comBread">
				<el-breadcrumb-item :to="{ path: '/welcome' }">概览</el-breadcrumb-item>
				<el-breadcrumb-item>系统管理</el-breadcrumb-item>
				<el-breadcrumb-item>问题反馈</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<!---->
		<div class="problemPart bg-fontColor notice_container animated zoomIn">
			<div class="panel-heading clearfix">
				<h3 class="panel-title">问题反馈</h3>
			</div>
			<div class="problem-body">
				<el-form :label-position="problem" label-width="80px" :model="problem">
					<el-form-item label="问题">
						<el-input v-model="problem.feedbackTitle" maxlength="50" minlength="1" placeholder="请输入您遇到的问题" autofocus="true"></el-input>
					</el-form-item>
					<el-form-item label="问题描述">
						<el-input type="textarea" style="min-height: 200px;" v-model="problem.feedbackContent" maxlength="500" minlength="10" placeholder="请详细描述您遇到的问题">></el-input>
					</el-form-item>
				</el-form>
				<button class="submit el-button el-button--default" @click="submitProblem">提交问题</button>

			</div>

		</div>

	</div>
</template>

<script>
	var common_tools = require("common_tools");
	export default {
		data() {
			return {
				labelPosition: 'right',
				problem: {
					feedbackTitle: '',
					feedbackContent: ''
				}

			}
		},
		methods: {
			submitProblem() {
				var _self = this;
				common_tools.AJAX('post', common_tools.interfaceurl + 'commit/feedback', _self.problem, function(data) {
					if(data.status == "200" && data.msg == "反馈成功") {
						_self.$message({
							message: '反馈成功，您反馈的问题我们会尽快解决',
							type: 'success'
						})
					} else {
						console.log("传参错误");
					}
				}, function(data) {
					console.log(data);
				})
			},
		},
		mounted: function() {

		}
	}
</script>

<style>
	.bg-fontColor {
		color: #ffffff;
	}
	
	.clearfix:before,
	.clearfix:after {
		display: table;
		content: " ";
		clear: both;
	}
	
	.notice_container {
		background: url(../../../public_resource/img/modal-bg.jpg) fixed;
		background-size: 1920px 1080px;
		box-shadow: 0 5px 5px 0 rgba(0, 0, 0, .25);
	}
	
	.select-title {
		/*width: 10%;*/
		box-sizing: border-box;
		padding: 0 0 0 20px;
		text-align: center;
		font-size: 14px;
		color: #ffffff;
		font-weight: 500;
		line-height: 36px;
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
	
	.problemPart {
		width: 100%;
		box-sizing: border-box;
		-webkit-border-radius: 4px;
		-moz-border-radius: 4px;
		border-radius: 4px;
		padding: 0 0 50px 0;
	}
	
	.problem-body {
		width: 100%;
		box-sizing: border-box;
		padding: 25px 30px;
		color: #ffffff;
	}
	
	.submit {
		line-height: 1;
		white-space: nowrap;
		cursor: pointer;
		background: #209e91;
		border: 1px solid #209e91;
		color: #ffffff;
		margin: 0;
		padding: 10px 15px;
		border-radius: 4px;
		text-align: center;
		float: right;
	}
	
	.problemFeedback-root .el-input__inner,
	.problemFeedback-root .el-textarea__inner {
		background: rgba(0, 0, 0, .15);
		border: 1px solid transparent;
		color: #fff;
	}
	
	.problemFeedback-root .el-form-item__label {
		color: #ffffff;
	}
	
	.problemFeedback-root .el-textarea textarea {
		min-height: 250px;
	}
	
	.problemFeedback-root .el-button:focus,
	.el-button:hover {
		border: 1px solid #209e91;
		color: #fff;
	}
</style>
<template>
	<div class="wh100 welcome-root">
		<!--面包屑部分-->
		<div class="content-top clearfix">
			<h1 class="al-title">概览</h1>
		</div>
		<!--站点总数及选择-->
		<div class="allSite bg-fontColor notice_container animated zoomIn clearfix">
			<el-form :inline="true">
				<el-form-item>
					<span class="select-title">站点：</span>
					<el-select v-model="firstId">
						<el-option v-for="item in siteAll" :key="item.id" :label="item.siteName" :size="large" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button @click="onSubmit" id="btn-search"><i class="el-icon-search"></i>&nbsp;&nbsp;&nbsp;查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!--总体部分 总体得分：分别得分 -->
		<div class="allPart bg-fontColor  clearfix ">
			<div class=" leftPart">
				<div class="wh100">
					<div class="smallpartL wh50 floatF">
						<div class="wh100 smallpart notice_container animated zoomIn">
							<div class="chart floatF" id="chart1"></div>
							<div class="title-num floatF">总体得分</div>
							<div class="part-icon floatR">{{allGrades.sumScore}}</div>
						</div>
					</div>
					<div class="smallpartR wh50 floatF">
						<div class="wh100 smallpart notice_container animated zoomIn">
							<div class="chart floatF" id="chart2"></div>
							<div class="title-num floatF">web漏洞</div>
							<div class="part-icon floatR">{{allGrades.webCount}}</div>
						</div>
					</div>
				</div>
			</div>
			<div class=" rightPart">
				<div class="wh100">
					<div class="smallpartL wh50 floatF">
						<div class="wh100 smallpart notice_container animated zoomIn">
							<div class="chart floatF" id="chart3"></div>
							<div class="title-num floatF">报警总数</div>
							<div class="part-icon floatR">{{allGrades.alarmCount}}</div>
						</div>
					</div>
					<div class="smallpartR wh50 floatF">
						<div class="wh100 smallpart notice_container animated zoomIn">
							<div class="chart floatF" id="chart4"></div>
							<div class="title-num floatF">更新次数</div>
							<div class="part-icon floatR">{{allGrades.updateCount}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--内容介绍部分-->
		<!-- 左右结构的-->
		<div class="introduce-Part bg-fontColor  clearfix">
			<div class="smallLeftPart leftPart">
				<div class="wh100 notice_container animated zoomIn">
					<div class="introduce-cont">
						<div class="introduce-header">
							<div class="cube">
								<div class="cube-circle"></div>
								<div class="cubeLine safeCubeLine"></div>
							</div>
							<p class="introduce-header-title">
								<span>安全得分：</span>
								<span>{{allGrades.safeScore}}</span>
							</p>
						</div>
						<div class="introduce-body safe-body">
							<div class="lists">
								<div class="li li1">
									<el-row :span="24">
										<el-col :span="2">
											<div class="connect"></div>
										</el-col>
										<el-col :span="22">
											<div class="libody">
												<h3 class="libody-title">暗链<i class=" fa yw" :class="[zeroPD==allGrades.anLianCount ? 'yes fa-check':'wrong fa-close']"></i></h3>
												<p class="libody-content">恶意攻击者通过添加暗链的方式可以有效、快速的提高网站PR值，降低用户网站的信誉度</p>
											</div>
										</el-col>
									</el-row>
								</div>
								<div class="li li1">
									<el-row :span="24">
										<el-col :span="2">
											<div class="connect"></div>
										</el-col>
										<el-col :span="22">
											<div class="libody">
												<h3 class="libody-title">网马<i class=" fa yw" :class="[zeroPD==allGrades.guamaCount ? 'yes fa-check':'wrong fa-close']"></i></h3>
												<p class="libody-content">网马是指恶意攻击者利用浏览器漏洞自动下载包含自己恶意代码的木马文件，迫使用户成为肉鸡</p>
											</div>
										</el-col>
									</el-row>
								</div>
								<div class="li li1">
									<el-row :span="24">
										<el-col :span="2">
											<div class="connect"></div>
										</el-col>
										<el-col :span="22">
											<div class="libody">
												<h3 class="libody-title">网站漏洞<i class=" fa yw" :class="[zeroPD==allGrades.webCount ? 'yes fa-check':'wrong fa-close']"></i></h3>
												<p class="libody-content">当Web服务器存在网站漏洞时，恶意攻击者可以通过网站漏洞达成数据盗取、钓鱼、命令执行等恶意操作</p>
											</div>
										</el-col>
									</el-row>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class=" rightPart">
				<div class="wh100 notice_container animated zoomIn">
					<div class="introduce-cont">
						<div class="introduce-header">
							<div class="cube">
								<div class="cube-circle"></div>
								<div class="cubeLine xnCubeLine"></div>
							</div>
							<p class="introduce-header-title">
								<span>性能得分：</span>
								<span>{{allGrades.capabilityScore}}</span>
							</p>
						</div>
						<div class="introduce-body xingneng-body">
							<div class="lists">
								<div class="li li1">
									<el-row :span="24">
										<el-col :span="2">
											<div class="connect"></div>
										</el-col>
										<el-col :span="22">
											<div class="libody">
												<h3 class="libody-title">死链<i class=" fa yw" :class="[zeroPD==allGrades.deadCount ? 'yes fa-check':'wrong fa-close']"></i></h3>
												<p class="libody-content">死链是指由于服务器设置改变造成无法找到地址对应内容。</p>
											</div>
										</el-col>
									</el-row>
								</div>
								<div class="li li2">
									<el-row :span="24">
										<el-col :span="2">
											<div class="connect"></div>
										</el-col>
										<el-col :span="22">
											<div class="libody">
												<h3 class="libody-title">网站响应时间<i class=" fa yw" :class="[zeroPD==allGrades.requestCount ? 'yes fa-check':'wrong fa-close']"></i></h3>
												<p class="libody-content">网站响应时间是指用户发出请求到服务器返回响应所花费的时间</p>
											</div>
										</el-col>
									</el-row>
								</div>
								<div class="li li3">
									<el-row :span="24">
										<el-col :span="2">
											<div class="connect"></div>
										</el-col>
										<el-col :span="22">
											<div class="libody">
												<h3 class="libody-title">网站停摆<i class=" fa yw" :class="[zeroPD==allGrades.serverCount ? 'yes fa-check':'wrong fa-close']"></i></h3>
												<p class="libody-content">网站停摆是指由于服务端原因用户无法访问该网站</p>
											</div>
										</el-col>
									</el-row>
								</div>
							</div>
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
                safecubeLineH:0,
                xingnengcubeLineH:0,
				siteAll:[],
                welcomeUrl:{
                    siteLists:'http://192.168.120.208:8084/site/allList',
                    siteCounts:'http://192.168.120.208:8084/site/count',
                },
				allGrades:{},
				firstId:'',
                zeroPD:0,

            }
        },
        methods: {
            onSubmit(){
				var _self=this;
				console.log('选择站点');
				console.log(_self.firstId);
				_self.getGrade(_self.firstId);


			},
			getGrade(val){
                var _self=this;
                common_tools.AJAX('post',_self.welcomeUrl.siteCounts,{'siteId':val},function (data) {
                    _self.allGrades=data.data;
                },function (data) {
                    console.log(data);
                })
			},
            comChart(){
                var _self=this;
				var chart1=_self.$echarts.init(document.getElementById('chart1'));
				var chart2=_self.$echarts.init(document.getElementById('chart2'));
				var chart3=_self.$echarts.init(document.getElementById('chart3'));
				var chart4=_self.$echarts.init(document.getElementById('chart4'));
				//不同的情况分不同的类

				var percent= 40;
                function getData() {
                    return [{
                        value: percent,
                        itemStyle: {
                            normal: {
                                color: '#fb358a',
                                shadowBlur: 10,
                                shadowColor: '#fb358a'
                            }
                        }
                    }, {
                        value: 100 - percent,
                        itemStyle: {
                            normal: {
                                color: 'transparent'
                            }
                        }
                    }];
                }
                var comOption = {
//                    title: {
//                        text: (percent * 1) + '%',
//                        x: 'center',
//                        y: 'center',
//                        textStyle: {
//                            color: '#ffffff',
//                            fontWeight: 'bolder',
//                            fontSize: 14,
//                        }
//                    },
                    series: [{
                        type: 'pie',
                        radius: ['69%', '79%'],
                        silent: true,
                        label: {
                            normal: {
                                show: false,
                            }
                        },
                        data: [{
                            value: 1,
                            itemStyle: {
                                normal: {
                                    color: 'rgba(255,255,255,0.3)',
                                    shadowBlur: 10,
                                    shadowColor: '#1b1e25',
                                }
                            }
                        }],
                        animation: false
                    },
                        {
                            type: 'pie',
                            radius: ['79%', '89%'],
                            silent: true,
                            label: {
                                normal: {
                                    show: false,
                                }
                            },
                            data: [{
                                value: 1,
                                itemStyle: {
                                    normal: {
                                        color: 'rgba(255,255,255,0.3)',
                                        shadowBlur: 50,
                                        shadowColor: '#1b1e25'
                                    }
                                }
                            }],
                            animation: false
                        },
                        {
                            name: 'main',
                            type: 'pie',
                            radius: ['90%', '98%'],
                            label: {
                                normal: {
                                    show: false,
                                }
                            },
                            data: getData(),
                            animation:false,

                        }
                    ]
                };

                chart1.setOption(comOption,false);
                chart2.setOption(comOption,false);
                chart3.setOption(comOption,false);
                chart4.setOption(comOption,false);
			}




        },
        mounted:function () {
            var _self=this;
			this.comChart();
            _self.safecubeLineH=$('.safe-body').height();
            _self.xingnengcubeLineH=$('.xingneng-body').height();
            $('.safeCubeLine').css('height',_self.safecubeLineH);
            $('.xnCubeLine').css('height',_self.xingnengcubeLineH);
			window.onresize=function () {
                _self.safecubeLineH=$('.safe-body').height();
                _self.xingnengcubeLineH=$('.xingneng-body').height();
                $('.safeCubeLine').css('height',_self.safecubeLineH);
                $('.xnCubeLine').css('height',_self.xingnengcubeLineH);
            }

            common_tools.AJAX('post',_self.welcomeUrl.siteLists,{},function (data) {
				console.log(data);
				_self.siteAll=data.data;
				_self.firstId=_self.siteAll[0].id;
				//各个分值初始化
				_self.getGrade(_self.firstId);
				_self.comChart();
            })


        }

    }
</script>

<style scope>
	/*通用部分*/
	.bg-fontColor{
		color: #ffffff;
	}
	.wh100{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		-webkit-border-radius: 4px;
		-moz-border-radius: 4px;
		border-radius: 4px;
	}
	.clearfix:before,.clearfix:after{
		display: table;
		content: " ";
		clear: both;
	}
	.clear:after{
		clear: both;
	}
	.notice_container{
		background:url(../../../public_resource/img/modal-bg.jpg) fixed;
		background-size: 1920px 1080px;
		box-shadow: 0 5px 5px 0 rgba(0,0,0,.25);
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

	/*面包屑*/
	.content-top{
		color: #ffffff;
		box-sizing: border-box;
		padding-top: 13px;
		padding-bottom: 27px;
	}
	.suatainMonitor-root .el-input__inner{
		color: #ffffff;
		font-weight: 400;
		background-color:rgba(0, 0, 0, 0.2);
	}
	.suatainMonitor-root .el-button{
		background-color:rgba(0, 0, 0, 0.2);
		color: #ffffff;
	}
	.suatainMonitor-root .el-button:focus, .el-button:hover{
		color: #ffffff;
		border: 1px solid #bfcbd9;

	}
	.al-title{
		font-weight: 700;
		color: #fff;
		float: left;
		width: auto;
		margin: 0;
		padding: 0;
		font-size: 24px;
		opacity: .9;
	}
	.breadcrumb{
		padding: 8px 15px;
		margin-bottom: 20px;
		list-style: none;
		background-color: #f5f5f5;
		border-radius: 4px;
	}
	.breadcrumb li{
		float: left;
		font-size: 18px;
	}
	.al-breadcrumb{
		background: 0 0;
		color: #fff;
		padding: 11px 0 0;
		margin: 0;
		float: right;
	}
	.bread:before{
		padding: 0 5px;
		color: #ccc;
		content: "/\00a0";
	}
	/*站点列表*/
	.allSite{
		width: 100%;
		box-sizing: border-box;
		margin: 0 0 24px 0;
		padding: 15px 0;
		border-radius: 4px;
	}
	.panel-heading{
		border-bottom: 1px solid rgba(0,0,0,.12);
		font-size: 16px;
		padding: 14px 22px;
		box-shadow:0 1px 0 0 rgba(255,255,255,.12);
	}
	.panel-title{
		font-weight: 400;
		opacity: .9;
	}
	.navUl{
		width: 100%;
		font-size: 1.5rem;
		box-sizing: border-box;
		padding: 0 16px;
	}
	.nav {
		/*width: 12.5%;*/
		float: left;
		box-sizing: border-box;
		text-align: center;
		position: relative;
		padding: 8px 10px;
		cursor: pointer;
		opacity: 0.9;
		color: #FFF;
		background: rgba(0, 0, 0, 0.2);
		border-radius: 6px;
		margin: 10px 10px;
		letter-spacing: 1px;
		text-shadow: rgba(0, 0, 0, 0.9) 0px 1px 2px;
	}
	.nav:hover{
		background: #209e91;
		transition: all 0.3s ease-in;
	}
	.isActive{background: #209e91;}
	/*.navNotSelect{background: rgba(0, 0, 0, 0.2);}*/

	/*分数网站部分*/
	.allPart{
		width: 100%;
		height: 114px;
		box-sizing: border-box;
		margin: 0 0 24px 0;
		/*padding: 15px;*/
		border-radius: 4px;
	}
	.floatF{
		float: left;
	}
	.floatR{
		float: right;
	}
	.wh50{
		width: 50%;
		height: 100%;
		box-sizing: border-box;
	}
	.leftPart,.rightPart{
		width: 50%;
		height: 100%;
		box-sizing: border-box;
		float: left;
	}
	.leftPart{
		padding:0px 15px 0px 0;
	}
	.rightPart{
		padding: 0px 0px 0px 15px;
	}
	.smallpartL{
		padding:0 15px 0 0;
	}
	.smallpartR{
		padding:0 0 0 15px;
	}
	.smallpart{
		padding: 15px;
	}
	.chart{
		width: 30%;
		height: 100%;
	}
	.title-num{
		width: 25%;
		box-sizing: border-box;
		/*padding: 0 10px 0 20px;*/
		line-height: 84px;
		font-size: 2rem;
		text-align: center;
	}
	.part-icon{
		width: 45%;
		text-align: center;
		line-height: 84px;
		font-size: 4rem;
	}
	/*内容介绍部分 */
	.yw{
		width: 20px;
		height: 20px;
		text-align: center;
		line-height: 20px;
		box-sizing: border-box;
		margin: 0 20px;
		border-radius: 25px;
		float: right;
	}
	.yes{
		background: #209e91;
	}
	.wrong{
		background: #e44b56;
	}
	.introduce-cont{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 30px;
		position: relative;
	}
	.cube{
		position: absolute;
		width: 30px;
		height: 30px;
		top: 30px;
		left: 30px;
		background: #477374;
		border-radius: 8px;
	}
	.cubeLine{
		width: 1px;
		height: 200px;
		background: #477374;
		position: absolute;
		top:100%;
		left: 50%;
		margin-left: -0.5px;
		z-index: 99;
	}
	.cube-circle{
		width: 15px;
		height: 15px;
		position: absolute;
		top:50%;
		left: 50%;
		margin-left: -7.5px;
		margin-top: -7.5px;
		background:rgba(255, 255, 255, 0.65);
		border-radius: 20px;
	}
	.introduce-header{
		width: 100%;
		line-height: 30px;
		font-size: 2.5rem;
	}
	.introduce-header-title{
		margin-left: 45px;
	}
	.introduce-body{
		width: 100%;
		/*height: 150px;!*可改的 *!*/
		margin: 30px 15px 15px 15px;
	}
	.connect,.libody{
		float: left;
	}
	.connect{
		box-sizing: border-box;
		height: 37px;
	}
	.libody{
		width: 85%;
	}
	.libody-title{
		font-size: 2rem;
		box-sizing: border-box;
		padding: 0 5px 10px 5px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.5);
	}
	.libody-content{
		font-size: 1.5rem;
		box-sizing: border-box;
		padding: 10px 5px 40px 5px;
	}


	/*左右部分的*/
	.introduce-contL,.introduce-contR{
		width: 50%;
		height: 100%;
		float: left;
	}
	/*左右部分完*/


	/*媒体查询*/
	@media only screen and (max-width: 1780px) and (min-width: 1500px) {
		/*.part-icon{display: none;}*/
		.chart{width: 40%;}
		.title-num{
			/*width: 75%;*/
			width: auto;
			text-align: center;
			font-size: 1.7rem;
		}
		.part-icon{
			width: 30%;
			font-size: 3rem;
		}
	}
	@media only screen and (max-width: 1500px) {
		.leftPart,.rightPart{
			width: 100%;
			float: none;
			padding: 0;
			margin: 0 0 24px 0;
		}
		.title-num{
			/*width: 35%;*/
			text-align: left;
		}
		.part-icon{display: block;}
		.smallLeftPart{margin: 24px 0;}
	}


	#scrollbar::-webkit-scrollbar{
		width: 4px;
	}
	#scrollbar::-webkit-scrollbar-thumb{
		border-radius: 10px;
		background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.44, rgb(108, 162, 148)), color-stop(0.72, rgb(94, 154, 144)), color-stop(0.86, rgb(63, 107, 116)));
	}


	.welcome-root .el-button{
		background-color: #219E91;
		color: #ffffff;
	}
	#btn-search {
		margin: 0 0 0 20px;
		background-color: #219E91;
		border: 1px solid #219E91;
	}


	.welcome-root .el-form-item{
		margin-bottom: 0;
	}
	.el-select-dropdown{
		border: 1px solid #219E91;
	}
	.welcome-root .el-input__inner{
		background-color: transparent;
		color: #ffffff;
		border: 1px solid #219E91;
	}
	.welcome-root .el-input__inner:hover,.el-select:hover .el-input__inner{
		border: 1px solid #219E91;
	}




</style>
<template>
	 <div class='notfound'>
    	<h1>404 Error</h1>
    	<p>对不起，该页面不存在！<span>回到首页...</span></p>
	 </div>
</template>
<script>
	
	export default {
		name: 'notfound',
		data: function () {
            return {
            	banner:null,
				notfound:require('./banner.jpg')
            }
       }
	}
</script>
<style>
	.notfound{
		position:absolute;
		left:50%;
		top:50%;
	    width: 638px;
	    margin: 0 auto;
	    background: rgba(0,0,0,.5);
	    border-radius: 5px;
	    font-weight: 300;
	    color: #fff;
	    padding: 32px;
	    text-align: center;
	    transform:translate(-50%,-50%)
	}
	.notfound h1{
	   	font-weight: 300;
    	margin-bottom: 32px;
	}
	.notfound p{
	   	font-size:1.6rem;
	   	line-height: 24px;
	}
	.notfound p span{
	   	color:#209e91;
	   	margin-left:15px;
	   	cursor:pointer;
	}
	.notfound p span:hover{
	   	color:#1b867b;
	}
</style>
//方法一、直接在前天页面的<head></head>中加入：

<!-- 下面语句实现60秒刷新一次 -->
<meta http-equiv="refresh" content="5"/>

//方法二同样直接加在 < head > < / head > 中

<script>
setTimeout("self.location.reload();", 1000);
setTimeout("window.location.reload()",1000);
</script>


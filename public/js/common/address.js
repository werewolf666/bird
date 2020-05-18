/**
 * 地区省市的二级联动函数
 * 使用方式：
 * var address = new Address();
 * address.main(); 入口主函数（必须调用）
 * address.setAddress(province, city); 设置默认省市的函数（非必须调用）
 * @constructor
 */
function Address() {
	/**
	 * 入口主函数
	 */
	this.main = function () {
		this.initProvince();
		this.initCity();
		this.getCity();
	};
	/**
	 * 初始化省份
	 */
	this.initProvince = function() {
		var provinceObj = document.getElementById("province");
		for (var i = 0; i < province.length; i++) {
			provinceObj[i] = new Option(province[i], province[i]);
		}
	};
	/**
	 * 初始化城市
	 */
	this.initCity = function ()
	{
		var cityObj = document.getElementById("city");
		var cityArr = city[0].split(",");
		for(var i = 0;i < cityArr.length; i++) {
			cityObj[i] = new Option(cityArr[i], cityArr[i]);
		}
	};
	/**
	 * 选择省份时拉取对应的城市
	 */
	this.getCity = function () {
		$("#province").change(function () {
			var cityObj = document.getElementById("city");
			var index = $(this)[0].selectedIndex;
			var cityArr = city[index].split(",");
			cityObj.length = 0;
			//将城市数组中的值填充到城市下拉框中
			for(var i = 0;i < cityArr.length; i++) {
				cityObj[i] = new Option(cityArr[i], cityArr[i]);
			}
		});
	};
	/**
	 * 设置省份和城市，需要单独调用
	 * @param choose_province
	 * @param choose_city
	 */
	this.setAddress = function (choose_province, choose_city) {
		var cityObj = document.getElementById("city");
		var index = 0;
		var provinceOption = $("#province option");
		for (var j = 0; j < province.length; j++) {
			if (province[j] == choose_province) {
				index = j;
				$(provinceOption[j]).attr('selected', true);
			}
		}
		var cityArr = city[index].split(",");
		cityObj.length = 0;
		//将城市数组中的值填充到城市下拉框中
		for(var i = 0;i < cityArr.length; i++) {
			cityObj[i] = new Option(cityArr[i], cityArr[i]);
			if (cityArr[i] == choose_city) {
				$(cityObj[i]).attr('selected', true);
			}
		}
	};
	var province = [];
	province[0]="北京";
	province[1]="上海";
	province[2]="天津";
	province[3]="重庆";
	province[4]="河北";
	province[5]="山西";
	province[6]="内蒙古";
	province[7]="辽宁";
	province[8]="吉林";
	province[9]="黑龙江";
	province[10]="江苏";
	province[11]="浙江";
	province[12]="安徽";
	province[13]="福建";
	province[14]="江西";
	province[15]="山东";
	province[16]="河南";
	province[17]="湖北";
	province[18]="湖南";
	province[19]="广东";
	province[20]="广西";
	province[21]="海南";
	province[22]="四川";
	province[23]="贵州";
	province[24]="云南";
	province[25]="西藏";
	province[26]="陕西";
	province[27]="甘肃";
	province[28]="宁夏";
	province[29]="青海";
	province[30]="新疆";
	province[31]="香港";
	province[32]="澳门";
	province[33]="台湾";
	var city =[];
	city[0 ]="东城,西城,崇文,宣武,朝阳,丰台,石景山,海淀,门头沟,房山,通州,顺义,昌平,大兴,平谷,怀柔,密云,延庆";
	city[1]="黄浦,卢湾,徐汇,长宁,静安,普陀,闸北,虹口,杨浦,闵行,宝山,嘉定,浦东,金山,松江,青浦,南汇,奉贤,崇明";
	city[2 ]="和平,东丽,河东,西青,河西,津南,南开,北辰,河北,武清,红挢,塘沽,汉沽,大港,宁河,静海,宝坻,蓟县";
	city[3 ]="万州,涪陵,渝中,大渡口,江北,沙坪坝,九龙坡,南岸,北碚,万盛,双挢,渝北,巴南,黔江,长寿,綦江,潼南,铜梁,大足,荣昌,壁山,梁平,城口,丰都,垫江,武隆,忠县,开县,云阳,奉节,巫山,巫溪,石柱,秀山,酉阳,彭水,江津,合川,永川,南川";
	city[4 ]="石家庄,邯郸,邢台,保定,张家口,承德,廊坊,唐山,秦皇岛,沧州,衡水";
	city[5 ]="太原,大同,阳泉,长治,晋城,朔州,吕梁,忻州,晋中,临汾,运城";
	city[6 ]="呼和浩特,包头,乌海,赤峰,呼伦贝尔盟,阿拉善盟,哲里木盟,兴安盟,乌兰察布盟,锡林郭勒盟,巴彦淖尔盟,伊克昭盟";
	city[7 ]="沈阳,大连,鞍山,抚顺,本溪,丹东,锦州,营口,阜新,辽阳,盘锦,铁岭,朝阳,葫芦岛";
	city[8 ]="长春,吉林,四平,辽源,通化,白山,松原,白城,延边";
	city[9 ]="哈尔滨,齐齐哈尔,牡丹江,佳木斯,大庆,绥化,鹤岗,鸡西,黑河,双鸭山,伊春,七台河,大兴安岭";
	city[10 ]="南京,镇江,苏州,南通,扬州,盐城,徐州,连云港,常州,无锡,宿迁,泰州,淮安";
	city[11 ]="杭州,宁波,温州,嘉兴,湖州,绍兴,金华,衢州,舟山,台州,丽水";
	city[12 ]="合肥,芜湖,蚌埠,马鞍山,淮北,铜陵,安庆,黄山,滁州,宿州,池州,淮南,巢湖,阜阳,六安,宣城,亳州";
	city[13 ]="福州,厦门,莆田,三明,泉州,漳州,南平,龙岩,宁德";
	city[14 ]="南昌市,景德镇,九江,鹰潭,萍乡,新馀,赣州,吉安,宜春,抚州,上饶";
	city[15 ]="济南,青岛,淄博,枣庄,东营,烟台,潍坊,济宁,泰安,威海,日照,莱芜,临沂,德州,聊城,滨州,菏泽";
	city[16 ]="郑州,开封,洛阳,平顶山,安阳,鹤壁,新乡,焦作,濮阳,许昌,漯河,三门峡,南阳,商丘,信阳,周口,驻马店,济源";
	city[17 ]="武汉,宜昌,荆州,襄樊,黄石,荆门,黄冈,十堰,恩施,潜江,天门,仙桃,随州,咸宁,孝感,鄂州";
	city[18 ]="长沙,常德,株洲,湘潭,衡阳,岳阳,邵阳,益阳,娄底,怀化,郴州,永州,湘西,张家界";
	city[19 ]="广州,深圳,珠海,汕头,东莞,中山,佛山,韶关,江门,湛江,茂名,肇庆,惠州,梅州,汕尾,河源,阳江,清远,潮州,揭阳,云浮";
	city[20 ]="南宁,柳州,桂林,梧州,北海,防城港,钦州,贵港,玉林,南宁地区,柳州地区,贺州,百色,河池";
	city[21 ]="海口,三亚";
	city[22 ]="成都,绵阳,德阳,自贡,攀枝花,广元,内江,乐山,南充,宜宾,广安,达川,雅安,眉山,甘孜,凉山,泸州";
	city[23 ]="贵阳,六盘水,遵义,安顺,铜仁,黔西南,毕节,黔东南,黔南";
	city[24 ]="昆明,大理,曲靖,玉溪,昭通,楚雄,红河,文山,思茅,西双版纳,保山,德宏,丽江,怒江,迪庆,临沧";
	city[25 ]="拉萨,日喀则,山南,林芝,昌都,阿里,那曲";
	city[26 ]="西安,宝鸡,咸阳,铜川,渭南,延安,榆林,汉中,安康,商洛";
	city[27 ]="兰州,嘉峪关,金昌,白银,天水,酒泉,张掖,武威,定西,陇南,平凉,庆阳,临夏,甘南";
	city[28 ]="银川,石嘴山,吴忠,固原";
	city[29 ]="西宁,海东,海南,海北,黄南,玉树,果洛,海西";
	city[30 ]="乌鲁木齐,石河子,克拉玛依,伊犁,巴音郭勒,昌吉,克孜勒苏柯尔克孜,博 尔塔拉,吐鲁番,哈密,喀什,和田,阿克苏";
	city[31 ]="香港";
	city[32 ]="澳门";
	city[33 ]="台北,高雄,台中,台南,屏东,南投,云林,新竹,彰化,苗栗,嘉义,花莲,桃园,宜兰,基隆,台东,金门,马祖,澎湖";
}
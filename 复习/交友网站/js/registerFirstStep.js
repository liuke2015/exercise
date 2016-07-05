var RegisterStepOne = function(){

    this.cityList = $('#my_citylist');
    this.init();
};
RegisterStepOne.prototype = {
    platform: window.navigator.userAgent,
    init: function () {
        this.setCityVal();
        this.setBirthVal();
        this.setPurpose();
    },
    setBirthVal: function () {//生日
        var birthday = $("#birthday");
        var currYear = (new Date()).getFullYear();
        var opt = {};
        opt.date = {
            preset: 'date', defaultValue: new Date(1985, 05, 15), startYear: currYear - 99,
            endYear: currYear - 18, preset: "date"
        };
        opt.default = {
            theme: 'android-ics light',
            display: 'modal',
            mode: 'scroller',
            lang: 'zh',
            animate: 'fade'
        };
        birthday.mobiscroll().date({
            theme: 'android-holo-light',
            mode: 'scroller',
            display: 'bottom',
            lang: 'zh',
            defaultValue: new Date(1985, 05, 15),
            startYear: currYear - 99,
            endYear: currYear - 18,
            dateFormat: 'yyyy-mm-dd'
        });
    },
    setCityVal: function () {
        var self = this;
        var myCity = $('#my_city');
        var cityArry = city.addWorkCity("10119016", "my_citylist");
        var cityDefaultValue = cityArry.codeArr;
        myCity.on("click", function () {
            self.createCityScroll(cityDefaultValue);
            self.cityList.mobiscroll('show');
        });
    },
    createCityScroll: function (cityDefaultValue) {
        var self = this;
        self.cityList.mobiscroll().treelist({
            theme: 'android-holo-light',
            mode: 'scroller',
            display: 'bottom',
            lang: 'zh',
            labels: ['provicne', 'city', 'county'],
            defaultValue: cityDefaultValue
        });
    },
    setPurpose: function () {
        var self = this;
        var purpose = $('#purpose');
        var cityArry = city.addWorkCity("10119016", "my_citylist");
        var cityDefaultValue = cityArry.codeArr;

        purpose.on("click", function () {
            self.createPurposeScroll(cityDefaultValue);
            self.cityList.mobiscroll('show');
        });
    },
    createPurposeScroll: function (cityDefaultValue) {
        var self = this;
        self.cityList.mobiscroll().treelist({
            theme: 'android-holo-light',
            mode: 'scroller',
            display: 'bottom',
            lang: 'zh',
            labels: ['provicne', 'city', 'county'],
            defaultValue: cityDefaultValue
        });
    }
}
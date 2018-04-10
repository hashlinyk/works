webpackJsonp([1],{"7+l4":function(e,t){},NHnr:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("qM1Q"),n={data:function(){return{labelWidth:"80px",controlMaxWidth:400,controlMaxHeight:400,myCroppa:{},sizeList:["自定义宽高","100x100","130x240","260x480","300x300","350x180","600x600","1280x210"],currentSizeIndex:0,customWidth:300,customHeight:300,MIMEtypes:["image/jpeg","image/png"],compressionRates:["默认","0.9","0.8","0.7","0.6","0.5","0.4","0.3","0.2","0.1"],curMIMEtypeIndex:0,curCompressionRateIndex:0,previewSrc:"",generatingFlag:!1}},computed:{sizeInfo:function(){var e=this.sizeList[this.currentSizeIndex];return"自定义宽高"===e?[this.customWidth||5,this.customHeight||5]:e.split("x")},w:function(){return parseInt(this.sizeInfo[0],10)},h:function(){return parseInt(this.sizeInfo[1],10)},scale:function(){return this.w<=this.controlMaxWidth&&this.h<=this.controlMaxHeight?1:this.w>=this.h?this.controlMaxWidth/this.w:this.controlMaxHeight/this.h},width:function(){var e=this.w*this.scale;return e>this.controlMaxWidth?this.controlMaxWidth:e},height:function(){var e=this.h*this.scale;return e>this.controlMaxHeight?this.controlMaxHeight:e},quality:function(){return this.w/this.width}},watch:{"myCroppa.imgData":{handler:function(){this.generatingFlag||this.updatePreviewImage()},deep:!0}},methods:{cut:function(){this.previewSrc?this.generateImage():this.$alert("请先选择一张图片进行裁剪！",{type:"warning"})},generateImage:function(e){var t=this;if(!this.curMIMEtypeIndex&&this.curCompressionRateIndex)var i=parseFloat(this.compressionRates[this.curCompressionRateIndex]);else i=1;this.myCroppa.generateBlob(function(i){"function"==typeof e?e(i):(t.$emit("generateImageBlob",i),t.myCroppa.remove())},this.MIMEtypes[this.curMIMEtypeIndex],i)},updatePreviewImage:function(){var e=this;this.generatingFlag=!0,this.generateImage(function(t){if(e.generatingFlag=!1,t){var i=URL.createObjectURL(t);e.previewSrc=i}})},imageRemove:function(){this.previewSrc=""}}},r={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"image-croppa"},[i("el-row",{staticClass:"croppa-panel"},[i("el-col",{attrs:{span:11}},[i("div",{staticClass:"box-title"},[e._v("裁剪框")]),e._v(" "),i("div",{staticClass:"center-block"},[i("div",{staticClass:"croppa-wrapper-control",style:{width:e.controlMaxWidth+"px",height:e.controlMaxHeight+"px"}},[i("croppa",{ref:"croppa",attrs:{width:e.width,height:e.height,placeholder:"点击或拖拽一张图片到这里","zoom-speed":5,quality:e.quality,"prevent-white-space":!0},on:{"new-image-drawn":e.updatePreviewImage,"image-remove":e.imageRemove},model:{value:e.myCroppa,callback:function(t){e.myCroppa=t},expression:"myCroppa"}})],1)])]),e._v(" "),i("el-col",{staticClass:"update-view-control",attrs:{span:2}}),e._v(" "),i("el-col",{attrs:{span:11}},[i("div",{staticClass:"box-title"},[e._v("预览")]),e._v(" "),i("div",{staticClass:"center-block"},[i("div",{staticClass:"croppa-wrapper-control",style:{width:e.controlMaxWidth+"px",height:e.controlMaxHeight+"px"}},[i("div",{staticClass:"preview-image-box",style:{width:e.width+"px",height:e.height+"px"}},[i("img",{attrs:{src:e.previewSrc,alt:"预览图",width:"100%",height:"100%"}})])])])])],1),e._v(" "),i("div",{staticClass:"croppa-control-bar"},[i("el-form",[i("el-col",{attrs:{span:4}},[i("el-form-item",{attrs:{label:"常用尺寸",align:"right","label-width":e.labelWidth}},[i("el-select",{model:{value:e.currentSizeIndex,callback:function(t){e.currentSizeIndex=t},expression:"currentSizeIndex"}},e._l(e.sizeList,function(e,t){return i("el-option",{key:t,attrs:{label:e,value:t}})}))],1)],1),e._v(" "),i("el-col",{attrs:{span:7}},[i("el-form-item",{directives:[{name:"show",rawName:"v-show",value:0===e.currentSizeIndex,expression:"currentSizeIndex===0"}],attrs:{label:"自定尺寸","label-width":e.labelWidth}},[i("el-col",{attrs:{span:10}},[i("el-input",{attrs:{type:"number"},model:{value:e.customWidth,callback:function(t){e.customWidth=e._n(t)},expression:"customWidth"}})],1),e._v(" "),i("el-col",{attrs:{span:4,align:"center"}},[e._v("x")]),e._v(" "),i("el-col",{attrs:{span:10}},[i("el-input",{attrs:{type:"number"},model:{value:e.customHeight,callback:function(t){e.customHeight=e._n(t)},expression:"customHeight"}})],1)],1)],1),e._v(" "),i("el-col",{attrs:{span:4}},[i("el-form-item",{attrs:{label:"图片类型","label-width":e.labelWidth}},[i("el-select",{on:{change:e.updatePreviewImage},model:{value:e.curMIMEtypeIndex,callback:function(t){e.curMIMEtypeIndex=t},expression:"curMIMEtypeIndex"}},e._l(e.MIMEtypes,function(e,t){return i("el-option",{key:t,attrs:{label:e,value:t}})}))],1)],1),e._v(" "),i("el-col",{attrs:{span:4}},[e.curMIMEtypeIndex?e._e():i("el-form-item",{attrs:{label:"压缩率","label-width":e.labelWidth}},[i("el-select",{on:{change:e.updatePreviewImage},model:{value:e.curCompressionRateIndex,callback:function(t){e.curCompressionRateIndex=t},expression:"curCompressionRateIndex"}},e._l(e.compressionRates,function(e,t){return i("el-option",{key:t,attrs:{label:e,value:t}})}))],1)],1),e._v(" "),i("el-col",{attrs:{span:5,align:"center"}},[i("el-button",{attrs:{type:"primary",size:"medium"},on:{click:e.cut}},[e._v("裁剪并下载")])],1)],1)],1)],1)},staticRenderFns:[]};var s={name:"App",methods:{generateImageBlob:function(e){var t=URL.createObjectURL(e),i=document.createElement("a");i.download="filename",i.href=t,i.click(),URL.revokeObjectURL(t)}},components:{ImageCroppa:i("X4nt")(n,r,!1,function(e){i("id09")},null,null).exports}},o={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("image-croppa",{on:{generateImageBlob:this.generateImageBlob}})],1)},staticRenderFns:[]};var l=i("X4nt")(s,o,!1,function(e){i("7+l4")},null,null).exports,c=i("mwE6"),p=i.n(c),u=i("0U5F"),h=i.n(u);i("cU5d"),i("QfGb");a.default.use(p.a),a.default.use(h.a),a.default.config.productionTip=!1,new a.default({el:"#app",render:function(e){return e(l)}})},QfGb:function(e,t){},cU5d:function(e,t){},id09:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.b0e1ed72afdc76133b5e.js.map
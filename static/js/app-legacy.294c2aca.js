(function(){"use strict";var e={2207:function(e,a,n){n(750),n(6639),n(8803),n(5967);var t=n(5702),i=function(){var e=this,a=e.$createElement,n=e._self._c||a;return n("div",{attrs:{id:"app"}},[n("lang-actions",{attrs:{position:"top"},on:{"unicode-convert":e.handleUnicodeConvert}}),n("lang-editor",{ref:"langEditor"}),n("lang-actions",{attrs:{position:"bottom"}})],1)},o=[],l=function(){var e=this,a=e.$createElement,n=e._self._c||a;return n("div",{staticClass:"lang-actions"},[n("div",{staticClass:"wrapper"},["top"===e.position?[n("b-button",{attrs:{type:"is-info"},on:{click:function(a){return e.selectFile()}}},[e._v("添加文件")]),n("input",{ref:"inputFile",staticClass:"input-file",attrs:{type:"file",accept:".json,.lang"},on:{change:function(a){return e.getLangFile(a)}}}),n("b-button",{attrs:{type:"is-success",disabled:!e.isSetLangCode},on:{click:function(a){return e.exportFile()}}},[e._v("保存文件")]),n("b-button",{attrs:{type:"is-danger"},on:{click:function(a){return e.resetData()}}},[e._v("重置数据")]),n("div",{staticClass:"lang-select"},[n("b-tooltip",{attrs:{label:"来源语言",position:"is-left",type:"is-dark"}},[n("b-select",{model:{value:e.langCodeSrc,callback:function(a){e.langCodeSrc=a},expression:"langCodeSrc"}},[n("option",{attrs:{value:""}},[e._v("无")]),e._l(e.langCodes,(function(a){return n("option",{key:a,domProps:{value:a}},[e._v(e._s(a))])}))],2)],1),n("b-tooltip",{attrs:{label:"编辑语言",position:"is-left",type:"is-dark"}},[n("b-select",{model:{value:e.langCodeEdit,callback:function(a){e.langCodeEdit=a},expression:"langCodeEdit"}},[n("option",{attrs:{value:""}},[e._v("无")]),e._l(e.langCodes,(function(a){return n("option",{key:a,domProps:{value:a}},[e._v(e._s(a))])}))],2)],1),n("b-tooltip",{staticClass:"lang-transfer",attrs:{label:"互换",position:"is-left",type:"is-dark"}},[n("b-button",{attrs:{type:"is-info","icon-right":"arrow-left-right"},on:{click:function(a){return e.transferLangCode()}}})],1)],1),n("b-button",{attrs:{type:"is-light"},on:{click:function(a){return e.$emit("unicode-convert","encode")}}},[e._v("Unicode 编码")]),n("b-button",{attrs:{type:"is-light"},on:{click:function(a){return e.$emit("unicode-convert","decode")}}},[e._v("Unicode 解码")])]:"bottom"===e.position?[n("b-pagination",{directives:[{name:"show",rawName:"v-show",value:e.isSetLangCode,expression:"isSetLangCode"}],attrs:{"per-page":e.pageSize,total:e.totalSize,"range-before":2,"range-after":2,"debounce-page-input":500,order:"is-centered","page-input-position":"is-input-right","page-input":""},model:{value:e.pageNum,callback:function(a){e.pageNum=a},expression:"pageNum"}}),n("b-select",{model:{value:e.pageSize,callback:function(a){e.pageSize=a},expression:"pageSize"}},e._l(e.pageSizeList,(function(a){return n("option",{key:a,domProps:{value:a}},[e._v(e._s(a)+" 条 / 页")])})),0)]:e._e()],2)])},s=[],r=n(770),c=(n(4692),n(9701),n(1014),n(299),n(275),n(9492),n(731),n(2206),n(3541),n(1227)),u=n(8906),g=n(6132),d=n.n(g),m=n(639),p=n(2402),f=(n(292),n(9966),n(7579),n(777),n(1599),n(6905),n(7244),n(776),n(2484),n(7328),n(8222)),b=function(){function e(){(0,m.Z)(this,e)}return(0,p.Z)(e,[{key:"lang2json",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if(""===e)return{};if("string"!==typeof e)return console.error("转换失败，参数格式错误！"),null;var a=e.replace(/\r/g,""),n=a.split("\n"),t={};return n.forEach((function(e){if(e&&!e.startsWith("#")){var a=e.split("=");t[a[0]]=a[1]||""}})),t}},{key:"objPagination",value:function(e){var a=e.obj,n=void 0===a?null:a,t=e.pageNum,i=void 0===t?1:t,o=e.pageSize,l=void 0===o?20:o,s=n&&n.constructor===Object&&"number"===typeof i&&"number"===typeof l;if(!s)return console.error("获取数据失败，参数格式错误！"),null;var r=(i-1)*l,c=r+l,u=Object.keys(n),g=u.slice(r,c),d=u.length,m=g.length,p={};return g.forEach((function(e){p[e]=n[e]})),{obj:p,maxPage:Math.ceil(d/l),currPage:i,startPos:r+1,endPos:c,maxSize:d,currSize:m}}},{key:"readFileAsText",value:function(e,a){var n=[],t=e.currentTarget,i=t.files;if(!i||0===i.length)return Promise.resolve(n);var o=function(e,o){for(var l=[],s=function(e){var a=i[e],n=new FileReader,t=function(e,t){n.onload=function(){e({name:a.name||"unknown",content:n.result})},n.onerror=function(){t({name:a.name||"unknown",content:null})},n.readAsText(a)};l.push(new Promise(t))},r=0;r<i.length;r++)s(r);Promise.all(l).then((function(n){e(n),a&&(t["value"]="")})).catch((function(){o(n)}))};return new Promise(o)}},{key:"toast",value:function(e){var a=e.duration,n=void 0===a?2e3:a,t=e.indefinite,i=void 0!==t&&t,o=e.message,l=void 0===o?"":o,s=e.type,r=void 0===s?"is-info":s;return f.V.open({duration:n,indefinite:i,message:l,pauseOnHover:!0,type:r})}},{key:"uniDecode",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if("string"!==typeof e)return console.error("转换失败，参数数据类型错误！"),null;if(""===e)return"";var a=new RegExp("\\\\u","g"),n=e.replace(a,"%u");try{return unescape(n)}catch(t){return console.error("转换失败",t),null}}},{key:"uniEncode",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if("string"!==typeof e)return console.error("转换失败，参数数据类型错误！"),null;if(""===e)return"";for(var a=[],n=0;n<e.length;n++)a.push(e.charCodeAt(n).toString(16).padStart(4,"0"));return"\\u"+a.join("\\u")}}]),e}(),_=new b,h=_;n(9106),n(2366);function v(){return(new Date).getTime()}t.Z.use(u.ZP);var y=new u.ZP.Store({state:{isDebug:"1"===localStorage.getItem("isDebug"),langCodes:[],langCodeEdit:"",langCodeSrc:"",langItemsDefault:{},langItemsEdit:{},langItemsUpdates:v(),pageNum:1,pageSize:20,totalSize:0},getters:{},mutations:{changePageNum:function(e,a){e.pageNum="number"===typeof a?a:1},changePageSize:function(e,a){e.pageSize="number"===typeof a?a:20},changeTotalSize:function(e,a){e.totalSize="number"===typeof a?a:0},resetLangItems:function(e){e.langCodeEdit="",e.langCodeSrc="",e.langCodes=[],e.pageNum=1,e.totalSize=0,e.langItemsDefault={},e.langItemsEdit={},e.langItemsUpdates=v()},setLangCode:function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=a.type,t=a.code,i="string"===typeof n&&"string"===typeof t;if(!i)return console.error("设置失败，参数格式错误！"),!1;if("src"===n)e.langCodeSrc=t;else{if("edit"!==n)return console.error("设置失败，type 不存在。"),!1;e.langCodeEdit=t}return!0},syncLangItems:function(e,a){a&&a.constructor===Object?e.langItemsEdit=a:console.error("同步失败，参数格式错误！")}},actions:{addLangItem:function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n={success:!1,msg:""},t=e.state,i=a.langCode,o=a.content,l="string"===typeof i&&"undefined"!==typeof o&&o.constructor===Object;if(!l)return n.msg="添加失败，参数格式错误！",n;var s=t.langCodes,r=JSON.parse(JSON.stringify(t.langItemsDefault)),c=JSON.parse(JSON.stringify(t.langItemsEdit));if(s.includes(i))return n.msg="当前 Language Code 已存在，取消添加。",n;for(var u in o){var g=o[u];if("string"!==typeof g)return n.msg="文件内容格式错误，添加失败。",n;!r[u]&&(r[u]={}),!c[u]&&(c[u]={}),r[u][i]=g,c[u][i]=g}return t.langItemsDefault=r,t.langItemsEdit=c,s.push(i),t.langItemsUpdates=v(),n.success=!0,n.msg="添加成功",n}},modules:{}}),C={name:"LangActions",props:{position:{type:String,default:"top"}},data:function(){return{pageSizeList:[10,20,30,40,50,100,200,500,1e3]}},computed:(0,r.Z)((0,r.Z)({},(0,u.rn)(["langCodes","langItemsEdit","totalSize"])),{},{isSetLangCode:function(e){return e.langCodeEdit&&e.langCodeSrc},langCodeSrc:{get:function(){return y.state.langCodeSrc},set:function(e){y.commit("setLangCode",{type:"src",code:e})}},langCodeEdit:{get:function(){return y.state.langCodeEdit},set:function(e){y.commit("setLangCode",{type:"edit",code:e})}},pageNum:{get:function(){return y.state.pageNum},set:function(e){y.commit("changePageNum",e)}},pageSize:{get:function(){return y.state.pageSize},set:function(e){y.commit("changePageSize",e)}}}),methods:{exportFile:function(){var e=this.langCodeEdit,a=this.langItemsEdit,n={};for(var t in a){var i=a[t][e];i&&(n[t]=i)}try{var o=JSON.stringify(n,null,4),l=o.replace(/\\\\u/g,"\\u"),s=new Blob([l],{type:"application/json;charset=utf-8"});(0,c.saveAs)(s,"".concat(e,".json"))}catch(r){console.error("[保存失败]",r),h.toast({duration:3e3,message:"保存失败！",type:"is-danger"})}},getLangFile:function(e){var a=this;h.readFileAsText(e,!0).then((function(e){var n=e[0];if(n){var t=new RegExp(/(\.json|\.lang)$/),i=new RegExp(/\\u/,"g"),o=n.name.toLowerCase(),l=o.match(t),s=null===l||void 0===l?void 0:l[0],r="",c=null,u=null;try{r=o.replace(t,"")}catch(f){console.warn("[Language Code 识别失败]",f)}if(s){try{c=n.content.replace(i,"\\\\u")}catch(f){console.error("[转义]",f),h.toast({duration:5e3,message:"转义 Unicode 编码失败！",type:"is-danger"})}if(".json"===s)try{u=d().parse(c)}catch(f){var g="JSON 解析失败（".concat(String(f),"）");return void h.toast({duration:5e3,message:g,type:"is-danger"})}else{if(".lang"!==s)return void console.error("解析方式匹配失败！");if(u=h.lang2json(c),!u)return void h.toast({duration:5e3,message:"LANG 文件解析失败！",type:"is-danger"})}var m=function(e){h.toast({duration:3e3,message:e.msg,type:e.success?"is-success":"is-warning"})},p=function(e){a.$store.dispatch("addLangItem",{langCode:e,content:u}).then(m)};a.$buefy.dialog.prompt({message:"当前文件的 Language Code",inputAttrs:{maxlength:16,placeholder:"例：en_us、zh_cn",value:r},onConfirm:p})}else h.toast({duration:5e3,message:"文件扩展名错误，应为 .json 或 .lang。",type:"is-danger"})}}))},selectFile:function(){var e=this.$refs["inputFile"];e&&e.click()},resetData:function(){var e=this,a=function(){e.$store.commit("resetLangItems"),h.toast({message:"已重置",type:"is-success"})};this.$buefy.dialog.confirm({message:"确定要重置编辑器的数据吗？",onConfirm:a})},transferLangCode:function(){var e=this.langCodeEdit,a=this.langCodeSrc;y.commit("setLangCode",{type:"edit",code:a}),y.commit("setLangCode",{type:"src",code:e})}}},S=C,E=n(8e3),k=(0,E.Z)(S,l,s,!1,null,"ad600f16",null),z=k.exports,L=function(){var e=this,a=e.$createElement,n=e._self._c||a;return n("div",{staticClass:"lang-editor"},[e.isDebug?n("div",{staticClass:"editor-debug"},[n("b-button",{attrs:{type:"is-light"},on:{click:function(a){return e.pullEditDatas()}}},[e._v("拉取 state")]),n("b-button",{attrs:{type:"is-light"},on:{click:function(a){return e.pushEditDatas(!0)}}},[e._v("推送 state")])],1):e._e(),n("div",{ref:"editorContent",staticClass:"editor-content",on:{click:function(a){return e.handleClickContent(a)}}},[e.showLangItems?e._l(e.editDatasPage,(function(a,t,i){return n("div",{key:t,staticClass:"lang-item",class:{"is-add":!a[e.langCodeSrc]&&a[e.langCodeEdit],"is-del":a[e.langCodeSrc]&&!a[e.langCodeEdit]}},[n("div",{staticClass:"lang-key"},[n("span",{staticClass:"info-label"}),n("span",{staticClass:"info-value"},[e._v(e._s(t))]),n("div",{staticClass:"item-actions"},[n("b-tooltip",{attrs:{label:"复制到剪贴板",position:"is-left",type:"is-dark"}},[n("b-icon",{staticClass:"btn",attrs:{icon:"content-copy"},nativeOn:{click:function(a){return e.copyToClipboard(i)}}})],1),n("b-tooltip",{attrs:{label:"复制到编辑区",position:"is-left",type:"is-dark"}},[n("b-icon",{staticClass:"btn",attrs:{icon:"content-duplicate"},nativeOn:{click:function(n){return e.copyToEdit(a)}}})],1)],1)]),n("b-field",{attrs:{label:e.langNameSrc}},[n("b-input",{attrs:{readonly:""},model:{value:a[e.langCodeSrc],callback:function(n){e.$set(a,e.langCodeSrc,n)},expression:"langItem[langCodeSrc]"}})],1),n("b-field",{attrs:{label:e.langNameEdit}},[n("b-input",{attrs:{type:"textarea","custom-class":"is-info","data-key":t,lazy:""},model:{value:a[e.langCodeEdit],callback:function(n){e.$set(a,e.langCodeEdit,n)},expression:"langItem[langCodeEdit]"}})],1)],1)})):e._e()],2)])},N=[],D=(n(98),{af_za:{iso:"afr_ZA",label:"南非荷兰语",name:"Afrikaans"},ar_sa:{iso:"ara_SA",label:"阿拉伯语",name:"اللغة العربية"},ast_es:{iso:"ast_ES",label:"阿斯图里亚斯语",name:"Asturianu"},az_az:{iso:"aze_AZ",label:"阿塞拜疆语",name:"Azərbaycanca"},ba_ru:{iso:"bak_RU",label:"巴什基尔语",name:"Башҡортса"},bar:{iso:"bar_DE",label:"巴伐利亚语",name:"Boarisch"},be_by:{iso:"bel_BY",label:"白俄罗斯语",name:"Беларуская"},bg_bg:{iso:"bul_BG",label:"保加利亚语",name:"Български"},br_fr:{iso:"bre_FR",label:"布列塔尼语",name:"Brezhoneg"},brb:{iso:"qbr_NL",label:"布拉邦特语",name:"Braobans"},bs_ba:{iso:"bos_BA",label:"波斯尼亚语",name:"Bosanski"},ca_es:{iso:"cat_ES",label:"加泰罗尼亚语",name:"Català"},cs_cz:{iso:"ces_CZ",label:"捷克语",name:"Čeština"},cy_gb:{iso:"cym_GB",label:"威尔士语",name:"Cymraeg"},da_dk:{iso:"dan_DK",label:"丹麦语",name:"Dansk"},de_at:{iso:"bar_AT",label:"奥地利德语",name:"Österreichisches Deitsch"},de_ch:{iso:"gsw_CH",label:"瑞士德语",name:"Schwiizerdutsch"},de_de:{iso:"deu_DE",label:"德语",name:"Deutsch"},el_gr:{iso:"ell_GR",label:"希腊语",name:"Ελληνικά"},en_au:{iso:"eng_AU",label:"澳大利亚英语",name:"English（Australia）"},en_ca:{iso:"eng_CA",label:"加拿大英语",name:"English（Canada）"},en_gb:{iso:"eng_GB",label:"英式英语",name:"English（United Kingdom）"},en_nz:{iso:"eng_NZ",label:"新西兰英语",name:"English（New Zealand）"},en_pt:{iso:"qpe",label:"海盗英语",name:"Pirate Speak"},en_ud:{iso:"eng-Qabs_GB",label:"颠倒英语",name:"ɥsᴉꞁᵷuƎ（uʍoᗡ ǝpᴉsd∩）"},en_us:{iso:"",label:"美式英语",name:"English（US）"},enp:{iso:"qep",label:"纯粹英语",name:"Anglish"},enws:{iso:"qes",label:"莎士比亚风格英语",name:"Shakespearean English"},eo_uy:{iso:"epo",label:"世界语",name:"Esperanto"},es_ar:{iso:"spa_AR",label:"阿根廷西班牙语",name:"Español（Argentina）"},es_cl:{iso:"spa_CL",label:"智利西班牙语",name:"Español（Chile）"},es_ec:{iso:"spa_EC",label:"厄瓜多尔西班牙语",name:"Español（Ecuador）"},es_es:{iso:"spa_ES",label:"西班牙语",name:"Español（España）"},es_mx:{iso:"spa_MX",label:"墨西哥西班牙语",name:"Español（México）"},es_uy:{iso:"spa_UY",label:"乌拉圭西班牙语",name:"Español（Uruguay）"},es_ve:{iso:"spa_VE",label:"委内瑞拉西班牙语",name:"Español（Venezuela）"},esan:{iso:"spa_ES-AN",label:"安达卢西亚语",name:"Andalûh"},et_ee:{iso:"ets_EE",label:"爱沙尼亚语",name:"Eesti"},eu_es:{iso:"eus_ES",label:"巴斯克语",name:"Euskara"},fa_ir:{iso:"fas_IR",label:"波斯语",name:"فارسی"},fi_fi:{iso:"fin_FI",label:"芬兰语",name:"Suomi"},fil_ph:{iso:"fil_PH",label:"菲律宾语",name:"Filipino"},fo_fo:{iso:"fao_FO",label:"法罗语",name:"Føroyskt"},fr_ca:{iso:"fra_CA",label:"加拿大法语",name:"Français québécois"},fr_fr:{iso:"fra_FR",label:"法语",name:"Français"},fra_de:{iso:"vmf_DE",label:"东法兰克语",name:"Frängisch"},fur_it:{iso:"fur_IT",label:"弗留利语",name:"Furlan"},fy_nl:{iso:"fry_NL",label:"弗里斯兰语",name:"Frysk"},ga_ie:{iso:"gle_IE",label:"爱尔兰语",name:"Gaeilge"},gd_gb:{iso:"gla_GB",label:"苏格兰盖尔语",name:"Gàidhlig"},gl_es:{iso:"glg_ES",label:"加利西亚语",name:"Galego"},haw_us:{iso:"haw_US",label:"夏威夷语",name:"ʻŌlelo Hawaiʻi"},he_il:{iso:"heb_IL",label:"希伯来语",name:"עברית"},hi_in:{iso:"hin_IN",label:"印地语",name:"हिन्दी"},hr_hr:{iso:"hrv_HR",label:"克罗地亚语",name:"Hrvatski"},hu_hu:{iso:"hun_HU",label:"匈牙利语",name:"Magyar"},hy_am:{iso:"hye_AM",label:"亚美尼亚语",name:"Հայերեն"},id_id:{iso:"ind_ID",label:"印尼语",name:"Bahasa Indonesia"},ig_ng:{iso:"ibo_NG",label:"伊博语",name:"Igbo"},io_en:{iso:"ido",label:"伊多语",name:"Ido"},is_is:{iso:"isl_IS",label:"冰岛语",name:"Íslenska"},isv:{iso:"qis",label:"斯拉夫共通语",name:"Medžuslovjasky"},it_it:{iso:"ita_IT",label:"意大利语",name:"Italiano"},ja_jp:{iso:"jpn_JP",label:"日语",name:"日本語"},jbo_en:{iso:"jbo",label:"逻辑语",name:"la .lojban."},ka_ge:{iso:"kat_GE",label:"格鲁吉亚语",name:"ქართული"},kk_kz:{iso:"kaz_KZ",label:"哈萨克语",name:"Қазақша"},kn_in:{iso:"kan_IN",label:"卡纳达语",name:"ಕನ್ನಡ"},ko_kr:{iso:"kor_KR",label:"韩语/朝鲜语",name:"한국어"},ksh:{iso:"ksh_DE",label:"科隆语/利普里安语",name:"Kölsch/Ripoarisch"},kw_gb:{iso:"cor_GB",label:"康沃尔语",name:"Kernewek"},la_la:{iso:"lat_VA",label:"拉丁语",name:"Latina"},lb_lu:{iso:"ltz_LU",label:"卢森堡语",name:"Lëtzebuergesch"},li_li:{iso:"lim_NL",label:"林堡语",name:"Limburgs"},lmo:{iso:"lmo_IT",label:"伦巴第语",name:"Lombard"},lol_us:{iso:"qll",label:"小猫皮钦语",name:"LOLCAT"},lt_lt:{iso:"lit_LT",label:"立陶宛语",name:"Lietuvių"},lv_lv:{iso:"lav_LV",label:"拉脱维亚语",name:"Latviešu"},lzh:{iso:"lzh",label:"文言文",name:"文言（華夏）"},mk_mk:{iso:"mkd_MK",label:"马其顿语",name:"Македонски"},mn_mn:{iso:"mon_MN",label:"蒙古语",name:"Монгол"},ms_my:{iso:"zlm_MY",label:"马来语",name:"Bahasa Melayu"},mt_mt:{iso:"mlt_MT",label:"马耳他语",name:"Malti"},nds_de:{iso:"nds_DE",label:"低地德语",name:"Platdüütsk"},nl_be:{iso:"nld_BE",label:"弗拉芒语",name:"Vlaams"},nl_nl:{iso:"nld_NL",label:"荷兰语",name:"Nederlands"},nn_no:{iso:"nno_NO",label:"挪威尼诺斯克语",name:"Norsk nynorsk"},no_no:{iso:"nob_NO",label:"巴克摩挪威语",name:"Norsk Bokmål"},oc_fr:{iso:"oci_FR",label:"奥克语",name:"Occitan"},ovd:{iso:"ovd_SE",label:"艾尔夫达伦语",name:"Övdalsk"},pl_pl:{iso:"pol_PL",label:"波兰语",name:"Polski"},pt_br:{iso:"por_BR",label:"巴西葡萄牙语",name:"Português（Brasil）"},pt_pt:{iso:"por_PT",label:"葡萄牙语",name:"Português（Portugal）"},qya_aa:{iso:"qya",label:"昆雅语",name:"Quenya"},ro_ro:{iso:"ron_RO",label:"罗马尼亚语",name:"Română"},rpr:{iso:"qpr",label:"俄语（革命前）",name:"Дореформенный русскій"},ru_ru:{iso:"rus_RU",label:"俄语",name:"Русский"},se_no:{iso:"sme_NO",label:"北萨米语",name:"Davvisámegiella"},sk_sk:{iso:"slk_SK",label:"斯洛伐克语",name:"Slovenčina"},sl_si:{iso:"slv_SI",label:"斯洛文尼亚语",name:"Slovenščina"},so_so:{iso:"som_SO",label:"索马里语",name:"Af-Soomaali"},sq_al:{iso:"sqi_AL",label:"阿尔巴尼亚语",name:"Shqip"},sr_sp:{iso:"srp_RS",label:"塞尔维亚语",name:"Српски"},sv_se:{iso:"swe_SE",label:"瑞典语",name:"Svenska"},sxu:{iso:"sxu_DE",label:"上萨克森德语",name:"Säggs'sch"},szl:{iso:"szl_PL",label:"西里西亚语",name:"Ślōnskŏ"},ta_in:{iso:"tam_IN",label:"泰米尔语",name:"தமிழ்"},th_th:{iso:"tha_TH",label:"泰语",name:"ภาษาไทย"},tl_ph:{iso:"tgl_PH",label:"他加禄语",name:"Tagalog"},tlh_aa:{iso:"tlh",label:"克林贡语",name:"tlhIngan Hol"},tok:{iso:"tok",label:"道本语",name:"toki pona"},tr_tr:{iso:"tur_TR",label:"土耳其语",name:"Türkçe"},tt_ru:{iso:"tat_RU",label:"鞑靼语",name:"Татарча"},uk_ua:{iso:"ukr_UA",label:"乌克兰语",name:"Українська"},val_es:{iso:"cat_ES-VC",label:"瓦伦西亚语",name:"Català（Valencià）"},vec_it:{iso:"vec_IT",label:"威尼斯语",name:"Vèneto"},vi_vn:{iso:"vie_VN",label:"越南语",name:"Tiếng Việt"},yi_de:{iso:"yid_IL",label:"意第绪语",name:"ייִדיש"},yo_ng:{iso:"yor_NG",label:"约鲁巴语",name:"Yorùbá"},zh_cn:{iso:"zho-Hans_CN",label:"简体中文",name:"简体中文（中国）"},zh_hk:{iso:"zho-Hant_HK",label:"繁体中文",name:"繁體中文（香港）"},zh_tw:{iso:"zho-Hant_TW",label:"繁体中文",name:"繁體中文（台灣）"}}),I=D,w={name:"LangEditor",data:function(){return{editDatas:null,editDatasPage:null,langKeyEditing:"",lastPushTimestamp:0,paginationDebounce:null}},computed:(0,r.Z)((0,r.Z)({},(0,u.rn)(["isDebug","langCodeSrc","langCodeEdit","langItemsEdit","langItemsUpdates","pageNum","pageSize"])),{},{langNameEdit:function(e){var a,n=e.langCodeEdit,t=null===(a=I[n])||void 0===a?void 0:a.label;return t?"".concat(n," [").concat(t,"]"):n},langNameSrc:function(e){var a,n=e.langCodeSrc,t=null===(a=I[n])||void 0===a?void 0:a.label;return t?"".concat(n," [").concat(t,"]"):n},showLangItems:function(e){var a=e.langCodeSrc,n=e.langCodeEdit,t=e.editDatasPage;return a&&n&&t}}),watch:{langItemsUpdates:{handler:function(){console.log("[更新] langItemsUpdates"),this.pullEditDatas()}},pageNum:{handler:function(){console.log("[更新] pageNum"),this.getPageDatas()}},pageSize:{handler:function(){console.log("[更新] pageSize"),this.getPageDatas()}}},methods:{copyToClipboard:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,a=this.$refs["editorContent"];if(a){var n=a.querySelectorAll(".lang-item input"),t=n[e];t?(t.focus(),t.select(),document.execCommand("copy")):console.error("复制失败，找不到对应的输入框元素元素！")}else console.error("复制失败，编辑区元素不存在！")},copyToEdit:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=this.langCodeEdit,n=this.langCodeSrc,t=e[a];e[a]=e[n]||"","string"!==typeof t&&this.$forceUpdate()},getPageDatas:function(){var e=this;clearTimeout(this.paginationDebounce),this.paginationDebounce=setTimeout((function(){console.log("[更新] getPageDatas");var a=h.objPagination({obj:e.editDatas,pageNum:e.pageNum,pageSize:e.pageSize});a&&(e.editDatasPage=a.obj,e.$store.commit("changeTotalSize",a.maxSize))}),200)},handleClickContent:function(e){var a=e.target,n=a.dataset.key;this.langKeyEditing="string"===typeof n?n:"",this.pushEditDatas()},pullEditDatas:function(){this.editDatas=JSON.parse(JSON.stringify(this.langItemsEdit)),this.getPageDatas()},pushEditDatas:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],a=this.editDatas;if(a){var n=this.lastPushTimestamp,t=(new Date).getTime(),i=1e4;if(e||t-n>=i){console.log("[更新] 推送编辑器数据到 state");var o=JSON.parse(JSON.stringify(a));this.$store.commit("syncLangItems",o),this.lastPushTimestamp=t}}},unicodeConvert:function(e){if("undefined"!==typeof window.getSelection){var a=this.editDatas,n=this.langCodeEdit,t=this.langKeyEditing,i=String(window.getSelection());if(t&&i){var o=a[t],l=o[n];if("decode"===e){var s=h.uniDecode(i),r=l.replace(i,s);o[n]=r}else if("encode"===e){var c=h.uniEncode(i),u=l.replace(i,c);o[n]=u}else console.error("操作失败，该 type 不存在。")}else h.toast({duration:3e3,message:"请先选中编辑文本。",type:"is-warning"})}else h.toast({duration:3e3,message:"操作失败，当前浏览器不支持 getSelection()。",type:"is-warning"})}}},P=w,T=(0,E.Z)(P,L,N,!1,null,"168df9ec",null),O=T.exports,x={name:"App",components:{LangActions:z,LangEditor:O},data:function(){return{}},methods:{handleUnicodeConvert:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",a=this.$refs["langEditor"],n="unicodeConvert";a&&a[n]?a[n](e):console.error("处理失败，元素或函数不存在！")}}},A=x,j=(0,E.Z)(A,i,o,!1,null,null,null),F=j.exports,U=n(1571);n(4017);t.Z.config.productionTip=!1,t.Z.use(U.ZP,{defaultIconPack:"mdi",defaultDialogConfirmText:"确定",defaultDialogCancelText:"取消"}),new t.Z({store:y,render:function(e){return e(F)}}).$mount("#app")}},a={};function n(t){var i=a[t];if(void 0!==i)return i.exports;var o=a[t]={exports:{}};return e[t].call(o.exports,o,o.exports,n),o.exports}n.m=e,function(){var e=[];n.O=function(a,t,i,o){if(!t){var l=1/0;for(u=0;u<e.length;u++){t=e[u][0],i=e[u][1],o=e[u][2];for(var s=!0,r=0;r<t.length;r++)(!1&o||l>=o)&&Object.keys(n.O).every((function(e){return n.O[e](t[r])}))?t.splice(r--,1):(s=!1,o<l&&(l=o));if(s){e.splice(u--,1);var c=i();void 0!==c&&(a=c)}}return a}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[t,i,o]}}(),function(){n.n=function(e){var a=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(a,{a:a}),a}}(),function(){n.d=function(e,a){for(var t in a)n.o(a,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:a[t]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)}}(),function(){var e={143:0};n.O.j=function(a){return 0===e[a]};var a=function(a,t){var i,o,l=t[0],s=t[1],r=t[2],c=0;if(l.some((function(a){return 0!==e[a]}))){for(i in s)n.o(s,i)&&(n.m[i]=s[i]);if(r)var u=r(n)}for(a&&a(t);c<l.length;c++)o=l[c],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(u)},t=self["webpackChunkminecraft_lang_file_editor"]=self["webpackChunkminecraft_lang_file_editor"]||[];t.forEach(a.bind(null,0)),t.push=a.bind(null,t.push.bind(t))}();var t=n.O(void 0,[998],(function(){return n(2207)}));t=n.O(t)})();
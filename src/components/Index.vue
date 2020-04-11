<template>
    <div>
        <div class="title">
            <div class="header weight-1400">
                <div class="api-name left">
                    java-smart-api
                </div>
                <div class="right">
                    <div class="space">
                        选择分组
                    </div>
                    <el-select v-model="group_name" size="mini" style="width: 300px" @change="changeGroup">
                        <el-option v-for="item in group_names" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <div class="main weight-1400">
            <div class="config left">
                <div class="config-title left">
                    {{api_project.title}}
                </div>
                <div class="clear"></div>
                <div class="config-base-url left">
                    [ Base URL: {{url}}/{{api_project.name}} ]
                </div>
                <div class="clear"></div>
                <div class="config-url">
                    <a v-if="api_project.projectName" v-bind:href="url+'/'+api_project.name+'/api?group='+group_name">{{url}}?group={{group_name}}</a>
                    <a v-else v-bind:href="url.replace('/'+api_project.name+'/','/')+'?group='+group_name">{{url.replace('/'+api_project.name+'/','/')}}/api?group={{group_name}}</a>
                </div>
                <div class="clear"></div>
                <i class="config-description left">
                    {{api_project.description}}
                </i>
                <div class="clear"></div>
                <div class="left">
                    <a target="_blank" v-bind:href="api_project.website">{{api_project.website}}</a>
                </div>
                <div class="clear"></div>
                <div class="left">
                    <a target="_blank" v-bind:href="api_project.email">{{api_project.email}}</a>
                </div>
            </div>
            <div class="clear"></div>
            <div class="width-b100 left">
                <ul>
                    <li class="left" v-for="(item,key) in api_project.classList" :key="key">
                        <div class="line-height-20 margin-top-bottom-10" :class="[{'border-bottom-line':!item.isShow}]">
                            <div class="pointer" @click="isShow(item)">
                                <div class="left margin-right-10 font-bold-20">{{item.description}}</div>
                                <div class="left font-14">{{item.className}}</div>
                                <div class="clear"></div>
                            </div>
                            <div class="left width-b100" :class="[{'display':!item.isShow}]">
                                <ul>
                                    <li class="left" v-for="(item,key) in api_project.classList[key].apiMethods"
                                        :key="key">
                                        <div class="method pointer"
                                             :class="[{'border-radius-top':item.isShow},{'border-radius':!item.isShow},item.mode.toLowerCase()]"
                                             @click="isShow(item)">
                                            <div class="method-mode left font-weight white"
                                                 :class="'mode-'+item.mode.toLowerCase()">
                                                {{item.mode}}
                                            </div>
                                            <div v-if="!item.underline" class="margin-left-10 left">{{item.name}}</div>
                                            <div v-if="item.underline" class="margin-left-10 left">
                                                {{item.underlineName}}
                                            </div>
                                            <div
                                                    class="margin-left-10 left font-14">{{item.description}}
                                            </div>
                                            <div class="clear"></div>
                                        </div>
                                        <div class="method-param"
                                             :class="[{'display':!item.isShow},item.mode.toLowerCase()]">
                                            <div>
                                                <div class="clear"></div>
                                                <div class="left request">
                                                    request
                                                </div>
                                                <div class="clear"></div>
                                                <div class="padding-left-right-25  json" v-if="item.inJson">
                                                    <div class="clear"></div>
                                                    <div>
                                                        <div>
                                                            <div class="left font-14  pointer"
                                                                 :class="[{'font-weight':!item.inShowModel}]"
                                                                 @click="inShowModel(item,false)">示例
                                                            </div>
                                                            <div class="left margin-left-right-5 font-14 font-weight">
                                                                |
                                                            </div>
                                                            <div class="left font-14  pointer"
                                                                 :class="[{'font-weight':item.inShowModel}]"
                                                                 @click="inShowModel(item,true)">模型
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div class="clear"></div>
                                                            <pre class="left" style="text-align: left"
                                                                 v-if="!item.inShowModel">{{jsonExample(item.inJsonApiParameter)}}</pre>
                                                            <div class="clear"></div>
                                                            <div class="clear"></div>
                                                            <div class="font-10 height-20" style="text-align: left"
                                                                 v-if="item.inShowModel">
                                                                <div v-if="!item.inJsonApiParameter.underline"
                                                                     class="width-120">
                                                                    {{item.inJsonApiParameter.name}}
                                                                </div>
                                                                <div v-if="item.inJsonApiParameter.underline"
                                                                     class="width-120">
                                                                    {{item.inJsonApiParameter.underlineName}}
                                                                </div>
                                                                <div class="left padding-left-right-25"
                                                                     v-if="item.inJsonApiParameter">
                                                                    {
                                                                    <div class="padding-left-right-25 "
                                                                         v-if="item.inJsonApiParameter.type===''&& !item.inJsonApiParameter.isArray">
                                                                        <div class="clear"></div>
                                                                        <i class="left">描述：</i>
                                                                        <i class="padding-left-right-25 left">
                                                                            {{item.inJsonApiParameter.description}}
                                                                        </i>
                                                                    </div>
                                                                    <div class="clear"></div>
                                                                    <list class="padding-left-right-25"
                                                                          :list="item.inJsonApiParameter.apiParameters"
                                                                          :is-param="true"></list>
                                                                    }
                                                                    <div class="clear"></div>
                                                                </div>
                                                            </div>
                                                            <div class="clear"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-data padding-left-right-25" v-else>
                                                    <ul>
                                                        <li>
                                                            <div class="left width-b45">
                                                                <div class="font-14 left font-weight">名称</div>
                                                            </div>
                                                            <div class="right width-b45">
                                                                <div class="left font-14 font-weight">描述</div>
                                                            </div>
                                                            <div class="clear"></div>
                                                            <div class="border-bottom-line "></div>
                                                        </li>
                                                        <li v-for="(item,key) in item.inFormDataApiParameters"
                                                            :key="key">
                                                            <div class="left width-b45">
                                                                <div v-if="!item.underline"
                                                                     class="font-14 font-weight left height-20">
                                                                    {{item.name}}
                                                                </div>
                                                                <div v-if="item.underline"
                                                                     class="font-14 font-weight left height-20">
                                                                    {{item.underlineName}}
                                                                </div>
                                                                <!--                                                                <div v-if="item.require">*</div>-->
                                                                <div class="left font-bold-16 line-height-20 margin-left-10 red"
                                                                     v-if="item.require">
                                                                    *
                                                                </div>
                                                                <div class="clear"></div>
                                                                <i class="font-10 left height-20">
                                                                    {{item.type}}
                                                                </i>
                                                            </div>
                                                            <div class="right width-b45">
                                                                <i class="left font-14 height-20">
                                                                    {{item.description}}
                                                                </i>
                                                            </div>
                                                            <div class="clear"></div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="clear"></div>
                                            <div>
                                                <div class="left responses">
                                                    responses
                                                </div>
                                                <div class="clear"></div>
                                                <div class="padding-left-right-25">
                                                    <div>
                                                        <div class="left font-14  pointer"
                                                             :class="[{'font-weight':!item.outShowModel}]"
                                                             @click="outShowModel(item,false)">示例
                                                        </div>
                                                        <div class="left margin-left-right-5 font-14 font-weight">|
                                                        </div>
                                                        <div class="left font-14 pointer"
                                                             :class="[{'font-weight':item.outShowModel}]"
                                                             @click="outShowModel(item,true)">
                                                            模型
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div class="clear"></div>
                                                        <pre class="left" style="text-align: left"
                                                             v-if="!item.outShowModel">{{jsonExample(item.outApiParameter)}}</pre>
                                                        <div class="clear"></div>
                                                        <div class="font-10 height-20" style="text-align: left"
                                                             v-if="item.outShowModel">
                                                            <div v-if="!item.underline" class="width-120">
                                                                {{item.outApiParameter.name}}
                                                            </div>
                                                            <div v-if="item.underline" class="width-120">
                                                                {{item.outApiParameter.underlineName}}
                                                            </div>

                                                            <div class="padding-left-right-25 "
                                                                 v-if="item.outApiParameter.type===''&& !item.outApiParameter.isArray">
                                                                <div class="clear"></div>
                                                                <i class="left">描述：</i>
                                                                <i class="padding-left-right-25 left">
                                                                    {{item.outApiParameter.description}}
                                                                </i>
                                                            </div>
                                                            <div class="clear"></div>
                                                            <list class="padding-left-right-25"
                                                                  :list="item.outApiParameter.apiParameters"
                                                                  :is-param="false"></list>
                                                        </div>
                                                        <div class="clear"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <div class="clear"></div>
                                </ul>
                            </div>
                        </div>

                    </li>
                    <div class="clear"></div>

                </ul>
            </div>
        </div>
        <div class="bottom">

        </div>
        <div class="clear"></div>
    </div>
</template>

<script>
    import List from './List'

    export default {
        name: 'Index',
        components: {
            List
        },
        data() {
            return {
                group_name: "",
                url: document.location.href.substr(0, document.location.href.lastIndexOf('/')),
                api_project: {},
                group_names: []
            }
        },
        mounted() {
            this.apiConfig();
        },
        methods: {
            apiConfig() {
                this.axios.get(this.url+  "/spaces").then((response) => {
                    this.group_names = response.data;
                    if (response.data.length > 0) {
                        this.group_name = response.data[0];
                        this.apiProject();
                    }
                })
            },
            changeGroup() {
                this.apiProject()
            },
            apiProject() {
                this.axios.get(this.url+ "?group=" + this.group_name).then((response) => {
                    // response.data.classList.forEach((item)=>{
                    //     item.isShow=false;
                    // })
                    this.api_project = response.data;
                })
            },
            jsonExample(apiParameter) {
                let name = apiParameter.underline ? apiParameter.underlineName : apiParameter.name;
                let type = apiParameter.type;
                let defaultValue = apiParameter.defaultValue;
                let example = apiParameter.example;
                let isArray = apiParameter.isArray;
                let json = {};
                if (apiParameter.apiParameters) {
                    //基本数据类型一定没有子参数（json形式）
                    //有子参数分两种1  对象类型  2数组类型
                    if (isArray) {
                        let arr = [];
                        //如果是数组类型  有且只有一个子参数
                        arr.push(this.jsonExample(apiParameter.apiParameters[0]));
                        if (name) {
                            json[name] = arr;
                            return json;
                        } else {
                            return arr;
                        }
                    }
                    let childJson = {};
                    for (let i = 0; i < apiParameter.apiParameters.length; i++) {
                        let parameter = apiParameter.apiParameters[i];
                        childJson = Object.assign(childJson, this.jsonExample(parameter));
                    }
                    if (type === "") {
                        return childJson;
                    }
                    json[name] = childJson;
                    return json;
                }
                switch (type) {
                    case "string":
                        example = "";
                        break;
                    case "boolean":
                        example = true;
                        break;
                    case "long":
                        example = 0;
                        break;
                    case "int":
                        example = 0;
                        break;
                    case "datetime":
                        example = this.getDate(1);
                        break;
                    case "date":
                        example = this.getDate(2);
                        break;
                    case "time":
                        example = this.getDate(3);
                        break;
                    default:
                        example = null;
                }
                if (defaultValue) {
                    example = defaultValue;
                }
                if (!name) {
                    return example;
                }
                json[name] = example;
                return json;
            },
            jsonModel() {

            },
            getDate(type) {
                let myDate = new Date();
                //获取当前年
                let year = myDate.getFullYear();
                //获取当前月
                let month = myDate.getMonth() + 1;
                //获取当前日
                let date = myDate.getDate();
                let h = myDate.getHours(); //获取当前小时数(0-23)
                let m = myDate.getMinutes(); //获取当前分钟数(0-59)
                let s = myDate.getSeconds();
                switch (type) {
                    case 1:
                        return year + '-' + this.conver(month) + "-" + this.conver(date) + " " + this.conver(h) + ':' + this.conver(m) + ":" + this.conver(s);
                    case 2:
                        return year + '-' + this.conver(month) + "-" + this.conver(date);
                    case 3:
                        return this.conver(h) + ':' + this.conver(m) + ":" + this.conver(s);
                    default :
                        return "";
                }
            },
            //日期时间处理
            conver(s) {
                return s < 10 ? '0' + s : s;
            },

            isShow(item) {
                this.$set(item, 'isShow', !item.isShow);
            },

            inShowModel(item, status) {
                this.$set(item, 'inShowModel', status);
            },

            outShowModel(item, status) {
                this.$set(item, 'outShowModel', status);
            }
        }
    }
</script>

<style scoped>
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        width: 100%;
    }

    li {
        margin: 10px 0 0;
        width: 100%;
    }

    .border-bottom-line {
        border-bottom: 1px solid gray;
    }

    .margin-top-bottom-10 {
        padding-bottom: 12px;
    }

    .margin-right-10 {
        margin-right: 10px;
    }

    .font-bold-20 {
        font-weight: bold;
        font-size: 20px;
    }

    .font-bold-16 {
        font-weight: bold;
        font-size: 16px;
    }

    .font-weight {
        font-weight: bold;
    }

    .white {
        color: white;
    }

    .red {
        color: red;
    }

    .font-10 {
        font-size: 10px;
    }

    .font-14 {
        font-size: 14px;
    }

    .padding-left-right-25 {
        margin-left: 25px;
        margin-right: 25px;
    }

    .margin-left-right-5 {
        margin-left: 5px;
        margin-right: 5px;
    }

    .margin-left-10 {
        margin-left: 10px;
    }

    .line-height-30 {
        height: 30px;
        line-height: 30px;
    }

    .weight-1400 {
        width: 1400px;
    }

    .main, .header {
        margin: 0 auto;
    }

    .title {
        background-color: #679ad6;

    }

    .width-b45 {
        width: 45%;
    }

    .width-120 {
        width: 150px;
    }

    .height-20 {
        height: 20px;
        line-height: 20px;
    }

    .line-height-20 {
        line-height: 20px;
    }

    .clear {
        clear: both
    }

    .width-b100 {
        width: 100%;
    }

    .header {
        height: 50px;
        line-height: 50px;
    }

    .right {
        float: right;
    }

    .header .api-name {
        font-size: 22px;
        font-weight: bold;
        color: white;
    }

    .space {
        float: left;
        font-weight: bold;
        margin-right: 10px;
        margin-top: 2px;
        margin-bottom: 2px;
        font-size: 18px;
        line-height: 50px;
    }

    .left {
        float: left;
    }

    .main .config > div {
        margin-bottom: 5px;
    }

    .main .config .config-title {
        font-size: 36px;
        font-weight: bold;
    }

    .main .config .config-base-url {
        font-size: 12px;
    }

    .main .config .config-url {
        font-size: 10px;
    }

    .method-mode {
        font-size: 14px;
        width: 80px;
        border-radius: 3px;
    }

    .method {
        border: 1px #679ad6 solid;
        padding: 5px;
        height: 30px;
        line-height: 30px;
        border-radius: 5px 5px 0 0;
    }

    .border-radius-top {
        border-radius: 5px 5px 0 0;
    }

    .border-radius-bottom {
        border-radius: 0 0 5px 5px;
    }

    .border-radius {
        border-radius: 5px;
    }

    .method-param {
        border-radius: 0 0 5px 5px;
        padding: 15px;
        border: 1px #679ad6 solid;
        border-top: none;
    }

    .form-data-parameters {

    }

    .mode-post {
        background-color: rgb(73, 204, 144);

    }

    .mode-get {
        background-color: rgb(97, 175, 254);

    }

    .mode-put {
        background-color: rgb(73, 204, 2);

    }

    .mode-delete {
        background-color: rgb(158, 0, 4);

    }

    .post {
        border-color: rgb(73, 204, 144);
        background-color: rgba(73, 204, 144, 0.1);
    }

    .get {
        border-color: rgb(97, 175, 254);
        background-color: rgba(97, 175, 254, 0.1);
    }

    .put {
        border-color: rgb(73, 204, 2);
        background-color: rgba(73, 204, 2, 0.1);
    }

    .delete {
        border-color: rgb(158, 0, 4);
        background-color: rgba(158, 0, 4, 0.1);
    }

    .pointer {
        cursor: pointer;
    }

    .display {
        display: none;
    }

    pre {
        /*border: 1px solid black;*/
        padding: 10px;
        color: white;
        background-color: rgba(35, 35, 35, 0.83);
        border-radius: 10px;
    }

    .request, .responses {
        background-color: rgba(103, 171, 255, 0.38);
        height: 30px;
        line-height: 30px;
        width: calc(100% - 15px);
        text-align: left;
        padding-left: 15px;
        margin: 15px 0;
        border-radius: 5px;
        font-weight: bold;
    }
</style>

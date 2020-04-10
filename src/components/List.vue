<template>
    <div>
        <ul v-for="(item,key) in list" :key="key">
            <li class="left">
                <div class="left width-120 ">
                    <div  v-if="!item.underline"  class="left font-weight">{{item.name}}</div>
                    <div  v-if="item.underline"  class="left font-weight">{{item.underlineName}}</div>
                    <div class="left font-bold-16 line-height-20 margin-left-10 red"
                         v-if="item.require&&isParam">
                        *
                    </div>
                </div>
                <div class="left width-200" v-if="!checkType(item.type) && item.isArray">
                    <i>{{item.description}}</i>
                    <div><i>{{item.type}}</i></div>
                    <div class="clear"></div>
                </div>
                <div class="left" v-else>
                    <i>{{item.description}}</i>
                    <div class="" v-if="item.isArray">
                        <div class="left  pointer margin-top-5"
                             :class="item.open?'el-icon-arrow-down':'el-icon-arrow-right'"
                             @click="open(item)"></div>
                        <!--                        <div class="left font-weight margin-left-right-5 pointer" @click="open(item,true)">▶</div>-->
                        <div class="left">[</div>
                        <div class="left" :class="[{'display':item.open}]">···]</div>
                    </div>
                    <div v-if="!item.isArray&&checkType(item.type)">
                        <div class="left">
                            {{item.typeFullName?item.typeFullName.lastIndexOf('.')===-1?item.typeFullName:item.typeFullName.substring(item.typeFullName.lastIndexOf('.')+1):""}}
                        </div>
                        <div class="left  pointer margin-top-5"
                             :class="item.open?'el-icon-arrow-down':'el-icon-arrow-right'"
                             @click="open(item)"></div>
                        <!--                        <div class="left font-weight margin-left-right-5 pointer" @click="open(item,true)">▶</div>-->
                        <div class="left">{</div>
                        <div class="left" :class="[{'display':item.open}]">···}</div>
                    </div>
                    <div class="margin-left-10" :class="[{'display':!item.open}]">
                        <div class="clear"></div>
                        <div v-if="item.type===''&&!item.isArray&&item.description">
                            <i>description:</i>
                            <i>{{item.description}}</i>
                            <div class="clear"></div>
                        </div>
                        <div v-if="item.apiParameters">
                            <list :list="item.apiParameters"></list>
                        </div>
                        <div v-if="item.isArray">
                            ]
                        </div>
                        <div :class="[{'display':!item.open}]" v-if="!item.isArray&&checkType(item.type)">
                            }
                        </div>
                    </div>
                </div>
            </li>
            <div class="clear"></div>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "list",
        props: {
            list: Array,
            isParam: Boolean
        },
        methods: {
            checkType(type) {
                switch (type) {
                    case "string":
                    case "boolean":
                    case "long":
                    case "int":
                    case "datetime":
                    case "date":
                    case "time":
                        return false;
                    default:
                        return true;
                }
            },
            open(item) {
                this.$set(item, 'open', !item.open);
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
        margin: 5px 0;
        width: 100%;
    }

    .margin-left-10 {
        margin-left: 10px;
    }

    .margin-left-10 {
        margin-left: 10px;
    }

    .margin-top-5 {
        margin-top: 5px
    }

    .line-height-20 {
        line-height: 20px;
    }

    .clear {
        clear: both
    }

    .left {
        float: left;
    }

    .left {
        float: left;
    }

    .width-200 {
        width: 200px;
    }

    .width-120 {
        width: 120px;
    }

    .font-weight {
        font-weight: bold;
    }

    .font-bold-16 {
        font-weight: bold;
        font-size: 16px;
    }

    .margin-left-right-5 {
        margin-left: 5px;
        margin-right: 5px;
    }

    .pointer {
        cursor: pointer;
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

    .display {
        display: none;
    }
</style>
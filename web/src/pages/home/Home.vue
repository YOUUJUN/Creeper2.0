<template>

    <div class="main-container" id="menu">

        <div>
            <button class="btn" v-on:click="actBuff()">BUFF爬虫启动！！</button>
            <button class="btn" v-on:click="actPageBuff()">BUFF启动从</button><input v-model="actPage" type="text" class="field-text" style="width: 27px;line-height: 22px;vertical-align: middle;">
            <button class="btn" v-on:click="stopBuff()">BUFF爬虫关闭！！</button>
            <button class="btn" v-on:click="gatherBuff()">启动BUFF数据汇总</button>
            <button class="btn" v-on:click="reverseBuff()">启动BUFF数据汇总(倒序)</button>
            <button class="btn" v-on:click="historyBuff()">启动BUFF历史数据加载</button>
            <button class="btn" v-on:click="actBuffHistoryPrices()">BUFF历史价格爬虫启动！！</button>
            <button class="btn" v-on:click="stopBuffHistoryPrices()">BUFF历史价格爬虫关闭！！</button>
            <button class="btn" v-on:click="clearBuff()">清除BUFF数据！！</button>
            <button class="btn" onclick="actIgxe('on')">IGXE爬虫启动！！</button>
            <button class="btn" onclick="actIgxe('off')">IGXE爬虫关闭！！</button>
            <button class="btn" onclick="purifier('igxe')">清除IGXE临时数据！！</button>
            <button class="btn" onclick="purifier('summary')">清除BUFF汇总数据！！</button>
            <button class="btn" onclick="purifier('difference')">清除IGX汇总数据！！</button>
            <button class="btn" onclick="sortByNums('summary')">按BUFF销售量排序</button>
            <button class="btn" onclick="sortByRate('summary')">按BUFF损失率排序</button>
            <button class="btn" onclick="calculate('difference')">启动IGXE合并汇总（可能等待时间会有点长）</button>
            <button class="btn" onclick="calculate('difference',true)">启动IGXE合并汇总(倒序)</button>
        </div>

        <div class="data-container">

            <div class="data-item" v-for="data in buffGatherData">
                <div class="name">
                    <span>名称：</span><span>{{data.name}}</span>
                </div>
                <div class="info">
                    <span>性价比：</span><span>{{data.costPerformance}}</span>
                </div>
                <div class="info">
                    <span>buff历史价格：</span><span>{{data.historyPrices}}</span>
                </div>
                <div class="info">
                    <span>成本：</span><span>{{data.cost}}</span>
                </div>
                <div class="info">
                    <span>steam价格：</span><span>{{data.steamPrice}}</span>
                </div>
                <div class="info">
                    <span>差价：</span><span>{{data.difference}}</span>
                </div>
                <div class="info">
                    <span>销售量：</span><span>{{data.buyNum}}</span>
                </div>
                <div class="info">
                    <span>预估利润：</span><span>{{data.buffProfits}}</span>
                </div>
                <button class="btn" v-on:click="goTo(data.steamUrl)">跳转steam</button>
                <button class="btn" v-on:click="getName(data.name)">复制名称</button>
            </div>


            <div class="data-item">
                <div class="name">
                    <span>名称：</span><span>印花 | hazed（闪亮）| 2015年克卢日-纳波卡锦标赛</span>
                </div>
                <div class="info">
                    <span>BUFF性价比：</span><span>23.29</span>
                </div>
                <div class="info">
                    <span>IGXE性价比：</span><span>23.29</span>
                </div>
                <div class="info">
                    <span>BUFF成本：</span><span>23.29</span>
                </div>
                <div class="info">
                    <span>IGXE成本：</span><span>23.29</span>
                </div>
                <div class="info">
                    <span>steam价格：</span><span>23.29</span>
                </div>
                <div class="info">
                    <span>BUFF差价：</span><span>23.29</span>
                </div>
                <div class="info">
                    <span>IGXE差价：</span><span>23.29</span>
                </div>
                <div class="info">
                    <span>销售量：</span><span>23.29</span>
                </div>
                <div class="info">
                    <span>BUFF预估利润：</span><span>23.29</span>
                </div>
                <div class="info">
                    <span>IGXE预估利润：</span><span>23.29</span>
                </div>
            </div>

        </div>


    </div>

</template>

<style>

    @import "../../assets/css/component.css";

    .btn {
        margin: 4px;
    }


    .main-container{
        background-color: #f4f5f5;
        margin:8px;
    }

    .data-container {
        margin: 10px auto;
    }

    .response-info {
        color: red;
        font-size: 15px;
        margin: 4px 0;
    }

    .data-item {
        background: #eee;
        padding: 5px 10px;
        font-size: 14px;
        border: 1px solid #ddd;
        margin-bottom: 6px;
    }

    .name {
        font-size: 15px;
        font-weight: 600;
    }

    .info {
        color: rgba(0, 0, 0, 0.7);
    }


</style>

<script>
    export default {
        data() {
            return {
                name: 'youjun',
                actPage : 0,
                buffGatherData : []
            };
        },

        methods : {
            actBuff () {
                this.$axios({
                    url : "/actBuff",
                    method: 'POST'
                }).then(msg => {
                    var msg = msg.data;
                    alert(msg.message);
                }).catch(err => {
                    console.log(err);
                })
            },

            actPageBuff() {
                this.$axios({
                    url : "/actBuff",
                    method: 'POST',
                    data : {
                        page : this.actPage
                    }
                }).then(msg => {
                    var msg = msg.data;
                    alert(msg.message);
                }).catch(err => {
                    console.log(err);
                })
            },

            stopBuff (){
                this.$axios({
                    url : "/stopBuff",
                    method: 'POST'
                }).then(msg => {
                    var msg = msg.data;
                    alert(msg.message);
                }).catch(err => {
                    console.log(err);
                })
            },

            clearBuff (){
                this.$axios({
                    url : "/clearBuff",
                    method: 'POST'
                }).then(msg => {
                    var msg = msg.data;
                    alert(msg.message);
                }).catch(err => {
                    console.log(err);
                })
            },

            gatherBuff(){
                this.$axios({
                    url : "/gatherBuff",
                    method: 'POST'
                }).then(msg => {
                    var msg = msg.data;
                    this.buffGatherData = msg.data;
                    alert(msg.message);
                }).catch(err => {
                    console.log(err);
                })
            },

            reverseBuff(){
                if(this.buffGatherData.length === 0){
                    this.gatherBuff();
                }
                this.buffGatherData.reverse();
            },

            actBuffHistoryPrices(){
                this.$axios({
                    url : "/actBuffHistoryPrices",
                    method: 'POST'
                }).then(msg => {
                    var msg = msg.data;
                    alert(msg.message);
                }).catch(err => {
                    console.log(err);
                })
            },

            stopBuffHistoryPrices(){
                this.$axios({
                    url : "/stopBuffHistoryPrices",
                    method: 'POST'
                }).then(msg => {
                    var msg = msg.data;
                    alert(msg.message);
                }).catch(err => {
                    console.log(err);
                })
            },

            historyBuff(){
                this.$axios({
                    url : "/getBuffHistoryPrices",
                    method: 'POST'
                }).then(msg => {
                    var msg = msg.data;
                    this.buffGatherData = msg.data;
                    alert(msg.message);
                }).catch(err => {
                    console.log(err);
                })
            },

            getName (name){
                console.log("name",name);
                var input = document.createElement("input");
                // input.style.visibility = "hidden";
                input.value = name;
                document.body.appendChild(input);
                input.select();
                document.execCommand("Copy");
            },

            goTo(url){
                window.open(url,'__blank');
            }
        }
    };
</script>

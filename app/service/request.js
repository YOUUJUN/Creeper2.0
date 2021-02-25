const Path = require('path');
const Service =  require(Path.join(process.cwd(), 'nut')).Service;

const rp = require('request-promise');
const fs = require('fs');

class requireService extends Service{

    //根据请求类别,请求页面页数生成url
    spawnUrl (target, page){
        let url = null;
        switch (target) {
            case 'major':
                // url = "https://buff.163.com/api/market/goods?game=csgo&page_num=" + num;
                // url = "https://buff.163.com/api/market/goods?game=csgo&page_num=1&_=1597632222054"; //new suck it !
                url = "https://buff.163.com/api/message/notification?_=1597650003843"; //new suck it !
                break;
            case 'history':
                url = "https://buff.163.com/api/market/goods/price_history/buff?game=csgo&goods_id="+num+"&currency=CNY&days=30&_=1578467810429";
                break;

            case 'stickers':
                url = "https://buff.163.com/api/market/goods?game=csgo&page_num="+ num +"&category_group=sticker&_=1567139513159";
                break;
        }

        return url;
    }

    //发起请求
    async launchRequest(url){
        let header = this.headerGenerator(url);

        let options = {
            url : url,
            gzip : true,
            headers : header
        };

        let responseData = new Promise((resolve, reject) => {
            rp(options, (err, res, body)=>{
                if(err){
                    reject(err);
                }

                let data = JSON.parse(body).data;
                resolve(data);
            })
        });

        return responseData;
    }

    //生成header;
    async headerGenerator(url){
        let cookie = this.spawnLastestCookie(url);
        let header = {
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
            "Connection": "keep-alive",
            "Cookie" : cookie,
            "Referer": "https://buff.163.com/market/?game=csgo",
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0",
        };

        return header;
    }

    //生成cookie
    async spawnLastestCookie(url){

    }


    //触发请求循环
    async launchRequestLoop (target, start, page, time = 1500){

        let handle = null;

        const Loop = (current) => {

            let url = this.spawnUrl(target)(current);

            if(current <= page){
                 handle = setTimeout(()=>{

                    this.launchRequest(url).then(data => {

                        //..deal with the data here

                    }).catch(err=>{
                        console.error("request failed !", err);
                    });

                    handle = setTimeout(() =>{
                        Loop(current + 1);
                    })


                },time);
            }else{
                console.log('\x1B[32m','The whole loop is done now.............');
            }

        };

        return handle;
    }




}






















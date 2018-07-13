

var dataType = 'json';
var teamGroup = {
    'A':[],
};
var ss = `ssssttss`;
console.log(ss);
//主数据
function getMainInfo() {
    var ss = `sssssss`;
    jQuery.support.cors = true;
    $.ajax({url:'./data/data.json',type:'get',success:function (data) {
        // console.log(data)
            var res;
            // if (baseUrl) {
            //     res=JSON.parse(data);
            //     // res=(data);
            // }else {
            //     res = data;
            // }
            res = data;
            // console.log(res);
            // setTopCarousel(res.channels[0].modules[0]);
            if (res.channels[0].modules[1].elements.length>0) {
                setHitWorldCup(res.channels[0].modules[1]);
            }else {
                $('#hit_world').css('display', 'none');
            }
            if (res.channels[0].modules[2].elements.length>0) {
                setGameInfo(res.channels[0].modules[2]);
            }
            if (res.channels[0].modules[3].elements.length>0) {
                setPlayGameInfo(res.channels[0].modules[3]);
            }else {
                $('#play_game').css('display', 'none');
            }
            if (res.channels[0].modules[4].elements.length>0) {
                setSuperStar(res.channels[0].modules[4]);
            }else {
                $('#super_star').css('display', 'none');
            }
            if (res.channels[0].modules[5].elements.length>0) {
                setFooterCarousel(res.channels[0].modules[5],0);
            }else {
                $('#world_cup_2014').css('display', 'none');
            }
            if (res.channels[0].modules[6].elements.length>0) {
                setFooterCarousel(res.channels[0].modules[6],1);
            }else {
                $('#highlights').css('display', 'none');
            }

        }});
}
getMainInfo();
var setGroupScheduleInfo;
//比赛信息
function  getSinaTopEvent() {
    var url = 'http://api.data.2018.sohu.com/api/schedule/time';

    jQuery.support.cors = true;
    $.ajax({url:url,type:'get',dataType:'jsonp',success:function (data) {
            // console.log(data);
            var res;
            // if (baseUrl) {
            //     res=JSON.parse(data);
            //     // res=(data);
            // }else {
            //     res = data;
            // }
            res = data;
            setSinaTopCarousel(res.result);
            setAllSchedule(res.result);
        },error:function (res) {
            // console.log(JSON.stringify(res))
        }})
}
//积分榜数据
function  getRankInfo() {
    var url = 'http://api.data.2018.sohu.com/api/rank/integral';

    jQuery.support.cors = true;
    $.ajax({url:url,type:'get',dataType:'jsonp',success:function (data) {
            var res;
            // if (baseUrl) {
            //     res=JSON.parse(data);
            //     // res=(data);
            // }else {
            //     res = data;
            // }
            res = data;
            for (var i=0;i<res.result.length;i++) {
                if (!teamGroup[res.result[i].group]) {
                    teamGroup[res.result[i].group] = [];
                }
                teamGroup[res.result[i].group].push(res.result[i]);
                // if (teamGroup[res.result[i].group][res.result[i].place-1]) {
                //     teamGroup[res.result[i].group][res.result[i].place]=res.result[i];
                // }else {
                //     teamGroup[res.result[i].group][res.result[i].place-1]=res.result[i];
                // }
            }
            setRankInfo('A');
        }})
}
//淘汰赛数据
function  getPlayoffsInfo() {
    var url = 'http://api.data.2018.sohu.com/api/schedule/playoff';
    jQuery.support.cors = true;
    $.ajax({url:url,type:'get',dataType:'jsonp',success:function (data) {
            var res;
            // if (baseUrl) {
            //     res=JSON.parse(data);
            //     // res=(data);
            // }else {
            //     res = data;
            // }
            res = data;
            setPlayoffsInfo(res.result);
        }})
}
//

getRankInfo();
getSinaTopEvent();
getPlayoffsInfo();
//接口顶部轮播
function setTopCarousel(obj) {
    var parent = $('.top_carousel .carousel_container ul');
    var num = Math.ceil(obj.elements.length / 3);
    var ele = obj.elements;
    var content = '';
    for (var i=0;i<num;i++) {
        if (i!= num-1){
            for (var j=0;j<3;j++) {
                content += '<li class="api_info"> <a href="'+ele[3*i+j].clickUrl +'"> <img src="'+ ele[3*i+j].poster +'" alt=""></a></li>';
            }
        } else {
            for (var j=3;j>0;j--) {
                content += '<li class="api_info"> <a href="'+ele[ele.length-j].clickUrl +'"> <img src="'+ele[ele.length-j].poster +'" alt=""></a></li>';
            }
        }
    }
    parent.append(content).css('width',num*930+'px');
}
//sina顶部轮播
function setSinaTopCarousel(obj) {
    var parent = $('.top_carousel .carousel_container ul');
    var total = 6;
    // var ele = obj;
    var num = Math.ceil(total / 3);
    var content = '';
    var eventUrl=[
        {"url":"http://worldcup.cctv.com/2018/match/13245886/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13245922/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13245916/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13245872/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13245962/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13246014/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13245974/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13246024/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13246008/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13246022/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13245882/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13246028/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13246044/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13246048/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13245990/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13245976/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13245940/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13245918/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13245966/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13245920/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13245992/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13245874/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13245880/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13246016/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13246032/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13246018/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13246050/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13246034/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13246030/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13246052/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13245998/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13245994/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13245870/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13245988/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13245924/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13245938/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13246002/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13246000/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13246040/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13246042/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13246036/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13246038/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13246020/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13246026/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13246010/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13246012/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13246054/index.shtml"},
        {"url":"http://worldcup.cctv.com/2018/match/13246056/index.shtml"}
    ];
    var arr = [];
    var reportInfo = '';
    // console.log(obj);
    for (var m=0;m<obj.length;m++){
        // console.log((new Date()).getTime() );
        // console.log(Date.parse(obj[m].game_date.replace(/-/g,"/")));
        if ((new Date().getTime() - Date.parse(obj[m].game_date.replace(/-/g,"/")))<60*60*4*1000) {
            arr = obj.slice(m, m+total);
            break;
        }
    }
    // console.log(getGameState(arr[0].game_date))
    for (var i=0;i<num;i++) {
        for(var j=0;j<3;j++){
            // console.log(arr[i * 3 + j]);
            var gameState = getGameState(arr[i * 3 + j].game_date);
            var gameObj = arr[i * 3 + j];
            reportInfo =' report_module_id="07"  report_element_id='+ gameObj.home_team_name+'vs'+ gameObj.visiting_team_name +' report_index='+(m+i * 3 + j+1);
            content += ' <li class="sina_info report_base" '+reportInfo +'>' +
                '                        <a href="'+eventUrl[gameObj.id-1].url +'" target="_blank">\n' +
                '                            <div class="top_title">\n' +
                '                                <span class="game_date">'+gameState.gdate+'</span>\n' +
                '                                <span class="game_time">'+gameState.gtime+'</span>\n' +
                '                                <div class="title">小组赛</div>\n' +
                '                            </div>\n' +
                '                            <div class="game_content">\n' +
                '                                <div class="country">\n' +
                '                                    <img class="home_team_img" src="/img/team_icon/'+gameObj.home_team_id +'.png" alt="">\n' +
                '                                    <span class="home_team_name">'+gameObj.home_team_name +'</span>\n' +
                '                                </div>\n' +
                '                                <i>VS</i>\n' +
                '                                <div class="country">\n' +
                '                                    <img class="visiting_team_img" src="/img/team_icon/'+gameObj.visiting_team_id +'.png" alt="">\n' +
                '                                    <span class="home_team_name">'+gameObj.visiting_team_name +'</span>\n' +
                '                                </div>\n' +
                '                            </div>';
            if (gameState.gstate == 2) {
                content += '<div class="footer clearFix"><p>进入直播</p></div></a></li>';
            } else if (gameState.gstate == 1) {
                content += '<div class="footer clearFix"> <div class="live">直播/竞猜/数据</div>\n' +
                    '                                <div class="source">直播源：央视网</div></div></a></li>';
            }
        }
        if (i == num -1){
            for(var j=0;j<3;j++){
                var gameState = getGameState(arr[j].game_date);
                var gameObj =arr[j];
                reportInfo =' report_module_id="07"  report_element_id='+ gameObj.home_team_name+'vs'+ gameObj.visiting_team_name +' report_index='+(m+i * 3 + j+1);
                content += ' <li class="sina_info report_base" '+reportInfo +'>' +
                    '                        <a href="'+eventUrl[gameObj.id-1].url +'" target="_blank">\n' +
                    '                            <div class="top_title">\n' +
                    '                                <span class="game_date">'+gameState.gdate+'</span>\n' +
                    '                                <span class="game_time">'+gameState.gtime+'</span>\n' +
                    '                                <div class="title">小组赛</div>\n' +
                    '                            </div>\n' +
                    '                            <div class="game_content">\n' +
                    '                                <div class="country">\n' +
                    '                                    <img class="home_team_img" src="/img/team_icon/'+gameObj.home_team_id +'.png" alt="">\n' +
                    '                                    <span class="home_team_name">'+gameObj.home_team_name +'</span>\n' +
                    '                                </div>\n' +
                    '                                <i>VS</i>\n' +
                    '                                <div class="country">\n' +
                    '                                    <img class="visiting_team_img" src="/img/team_icon/'+gameObj.visiting_team_id +'.png" alt="">\n' +
                    '                                    <span class="home_team_name">'+gameObj.visiting_team_name +'</span>\n' +
                    '                                </div>\n' +
                    '                            </div>';
                if (gameState.gstate == 2) {
                    content += '<div class="footer clearFix"><p>进入直播</p></div></a></li>';
                } else if (gameState.gstate == 1) {
                    content += '<div class="footer clearFix"> <div class="live">直播/竞猜/数据</div>\n' +
                        '                                <div class="source">直播源：央视网</div></div></a></li>';
                }
            }
        }
    }
    parent.append(content).css('width',(num+1)*100+'%');
}
//直击世界杯
function setHitWorldCup(obj) {
    var parent = $('.hit_world .hit_left .hit_content');
    var ele = obj.elements;
    var content = '';
    var reportInfo = [];
    for (var j=0;j<4;j++) {
        if (ele[j].jumpType=='detail') {
            reportInfo[j] = ' report_channel_id='+ele[j].channelId +' report_element_type='+ele[j].elementType +' report_element_id='+ele[j].elementId+' report_module_id='+ele[j].moduleId+' player_id='+ele[j].outAlbumId +' report_index='+(j+1) +' report_video_id='+ele[j].jumpId;
        } else {
            reportInfo[j] = ' report_channel_id='+ele[j].channelId +' report_element_type='+ele[j].elementType +' report_element_id='+ele[j].elementId+' report_module_id='+ele[j].moduleId+' report_index='+(j+1);

        }
    }
    if (ele[0].jumpType =="detail") {
        content += '<div class="top_img player_base" '+ reportInfo[0]+'><img class="poster" src="'+ ele[0].poster+'" alt=""> <div class="play_icon"></div> <div class="desc"> <p style="float:left;">'+ ele[0].elementName+'</p><span style="color:#ffffff;float: right;margin-right: 22px;">来源：央视网</span></div></div> <ul>';

    }else {
        content += '<div class="top_img report_base" '+ reportInfo[0]+'><a target="_blank" href="'+ ele[0].clickUrl +'"> <img class="poster" src="'+ ele[0].poster+'" alt=""> <div class="play_icon"></div><div class="desc"> <p style="float:left;">'+ ele[0].elementName+' </p><span style="color:#ffffff;float: right;line-height: 46px;margin-right: 22px;">来源：央视网</span></div></a></div> <ul>';
    }

    for (var i=1;i<4; i++) {
        if (ele[i].jumpType=='detail') {
            content += '<li class="player_base" '+ reportInfo[i]+' > <img src="'+ ele[i].poster+'" alt=""></li>';
        }else {
            content += '<li class="report_base" '+ reportInfo[i]+' > <a target="_blank" href="'+ele[i].clickUrl +'"><img src="'+ ele[i].poster+'" alt=""></a></li>';

        }
    }
    content += '</ul>';
    parent.append(content);
}
//赛事资讯
function setGameInfo(obj) {
    var parent = $('.hit_world .hit_right .hit_content');
    var ele = obj.elements;
    var content = '';
    var reportInfo = '';
    var realObj;
    for (var i=0;i<7;i++) {
        realObj = ele[i];
        reportInfo = ' report_channel_id='+realObj.channelId +' report_element_type='+realObj.elementType +' report_element_id='+realObj.elementId+' report_module_id='+realObj.moduleId+' player_id='+realObj.outAlbumId +' report_url= "'+ realObj.clickUrl+'" ' +' report_index='+(i+1);
        content += '<li class="report_base item_'+ (i%2==0 ? 'odd':'even') +'" '+ reportInfo+'>  <a target="_blank" href="'+ ele[i].clickUrl+'"> <p><span style="color:#333333;">'+ ele[i].elementName+'</span><span style="float: right;">'+ ele[i].title+'</span></p> <p class="source" style="margin-top: 3px;color: #999999;">来源：央视网</p> </a></li>';
    }
    parent.append(content);
}
// 游戏
function setPlayGameInfo(obj) {
    var parent = $('.play_game_content');
    var ele = obj.elements;
    var realObj = ele[0];
    var reportInfo = ' report_channel_id='+realObj.channelId +' report_element_type='+realObj.elementType +' report_element_id='+realObj.elementId+' report_module_id='+realObj.moduleId +' report_url= "'+ realObj.clickUrl+'" ' +' report_index=1';
    var content = '<div class="report_base" '+reportInfo +' ><a href="'+ ele[0].clickUrl+'" target="_blank"><img class="poster" src="'+ele[0].poster +'" alt="">  <img id="start_game" src="/img/start_game_button.png" alt="">' +
        '                <img id="start_game_start" src="/img/start_game_button_clicked.png" alt=""></a></div>';
    parent.append(content);
}
// 2018
function setAllSchedule(obj) {
    var parent1 = $('#game_schedule .schedule_info .schedule_date');
    var parent2 = $('#game_schedule .schedule_info .schedule_team');
    var total = 4;
    var ele = obj.elements;
    var content1 = '';
    var content2 = '';
    var arr = [];
    for (var m=0;m<obj.length;m++){
        if ((new Date().getTime() - Date.parse(obj[m].game_date.replace(/-/g,"/")))<60*60*4*1000) {
            arr = obj.slice(m, m+total);
            break;
        }
    }
    // console.log(arr);
    var gameDate,gameObj;
    for (var i=0;i<arr.length;i++) {
        gameObj = arr[i];
        gameDate = getGameState(arr[i].game_date);
        content1 += '<li> <span>'+ gameDate.gdate2+'</span> <span>'+ gameDate.gweek+'</span> <span>'+ gameDate.gtime+'</span></li>';
        content2 += '<li><div class="schedule_content"><span class="home_team_name">'+ gameObj.home_team_name+'</span> <img class="home_team_img" src="/img/team_icon/'+gameObj.home_team_id+'.png" alt=""> <i>VS</i> <img class="visiting_team_img" src="/img/team_icon/'+gameObj.visiting_team_id+'.png" alt=""><span class="visiting_team_name">'+ gameObj.visiting_team_name+'</span></div></li>';
    }
    // console.log(content2);
    parent1.append(content1);
    parent2.append(content2);
}
//积分榜
function setRankInfo(index) {
    var parent=$('.group_info')
    var group = teamGroup[index];
    var arr = ['first','second','third','fourth'];
    var content = '';
    var arr2 = [];
    // console.log(teamGroup[index]);
    var obj;
    var len = group.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (group[j].points < group[j+1].points) { //相邻元素两两对比
                var temp = group[j+1]; //元素交换
                group[j+1] = group[j];
                group[j] = temp;
            }
        }
    }

    // console.log(group);

    for (var i=0;i<group.length;i++) {
        if (group[i]){
            content += '<li class="item_'+(i%2==0 ? 'odd':'even')+'"><div class="rank"><img src="/img/'+arr[i]+'.png" alt=""></div><div class="rank_team"> <img src="/img/team_icon/'+group[i].team_id +'.png" alt=""> <span class="team_name">'+ group[i].name_cn+'</span> <span class="played_num">'+ group[i].games_played+'</span> <span>场 积</span><span class="team_score">'+group[i].points +'</span><span>分</span></div></li>';
        }
    }
    parent.html(content);
}
//淘汰赛
function setPlayoffsInfo(obj) {
    var parent = $('.playoffs_info ul');
    var content = [];
    var index,gameObj,gameDate;
    var num;
   for (var j =0;j<obj.length;j++){
       gameObj = obj[j];
       if (j==0||j==1||j==4||j==5) {
           index = 0;
       }else if (j==2||j==3||j==6||j==7) {
           index = 6;
       }else if (j==8||j==9) {
           index = 1;
       }else if (j==10||j==11) {
           index = 5;
       }else if (j==12) {
           index = 2;
       }else if (j==13) {
           index = 4;
       }else if (j==14||j==15) {
           index = 3;
       }
       // console.log(index);
       gameDate = getGameState(gameObj.game_date);
       if (!content[index]) {
           content[index] = '';
       }
       if (content[index].length>1) {
           num = 2;
       }else {
           num = 1;
       }

       content[index] += '<li class="item'+ (num) +'"><div class="playoffs_date"><span>'+ gameDate.gweek2+'</span> <span class="date">'+ gameDate.gdate3+'</span><span>'+ gameDate.gtime+'</span></div><div class="team_info"><div class="home_team"><span>'+ gameObj.home_team_outcome +'</span><span>'+ (gameObj.home_team_name ? gameObj.home_team_name : '?')+'</span></div><div class="visiting_team"><span>'+ gameObj.visiting_team_outcome +'</span><span>'+ (gameObj.visiting_team_name ? gameObj.visiting_team_name : '?')+'</span></div> </div></li>';
   }
    for (var i=0;i<parent.length;i++) {
        $(parent[i]).append(content[i]);
    }
}
//超级巨星
function setSuperStar(obj) {
    // console.log('star',obj);
    var parent=$('.super_star .star_info');
    var content = '';
    var realObj;
    var reportInfo = '';
    for(var i=0;i<obj.elements.length;i++){
        realObj = obj.elements[i];
        if (realObj.jumpType=='detail') {
            reportInfo = ' report_channel_id='+realObj.channelId +' report_element_type='+realObj.elementType +' report_element_id='+realObj.elementId+' report_module_id='+realObj.moduleId+' player_id='+realObj.outAlbumId +' report_video_id='+ realObj.jumpId  +' report_index='+(i+1);
            content += '<li class="player_base item'+(i+1)+'" '+reportInfo +' ><a href="javascript:;"><img src="'+ realObj.poster+'" alt=""></a></li>';
        } else {
            reportInfo = ' report_channel_id='+realObj.channelId +' report_element_type='+realObj.elementType +' report_element_id='+realObj.elementId+' report_module_id='+realObj.moduleId  +' report_index='+(i+1);
            content += '<li class="report_base item'+(i+1) +'" '+reportInfo +'><a target="_blank" href="'+ realObj.clickUrl+'"><img src="'+ realObj.poster+'" alt=""></a></li>';
        }
    }
    parent.append(content);
}
//2014  精彩花絮
function setFooterCarousel(obj,index) {
    // console.log(obj);
    var list = ['.carousel_2014 .carousel_container ul','.carousel_highlights .carousel_container ul'];
    var parent = $(list[index]);
    var ele = obj.elements;
    var total = 5;
    var num = Math.ceil(obj.elements.length / total);
    var content = '';
    var arr = [];
    var realObj;
    for (var i=0;i<num;i++) {
        if (i!= num-1){
            for (var j=0;j<total;j++) {
                arr.push(total * i + j);
            }
        } else {
            for (var j=total;j>0;j--) {
                arr.push(ele.length - j);
            }
            for(var m=0;m<total;m++){
                arr.push(m);
            }
        }
    }
    var reportInfo = '';

    for (var n=0;n<arr.length;n++) {
        realObj = ele[arr[n]];
        if (realObj.jumpType='detail') {
            reportInfo = ' report_channel_id='+realObj.channelId +' report_element_type='+realObj.elementType +' report_element_id='+realObj.elementId+' report_module_id='+realObj.moduleId+' player_id='+realObj.outAlbumId +' report_video_id='+ realObj.jumpId  +' report_index='+(arr[n]+1);
            content += '<li class="player_base api_info" '+ reportInfo+'> <div class="carousel_footer_poster" > <img src="'+realObj.poster +'" alt=""></div> <a class="carousel_footer_title" href="javascript:;">'+ realObj.title+'</a></li>';
        }else {
            realObj = ele[arr[n]];
            reportInfo = ' report_channel_id='+realObj.channelId +' report_element_type='+realObj.elementType +' report_element_id='+realObj.elementId+' report_module_id='+realObj.moduleId +' report_index='+(arr[n]+1);
            content += '<li class="report_base api_info" '+ reportInfo+'> <a class="carousel_footer_poster" href="'+realObj.clickUrl +'"> <img src="'+realObj.poster +'" alt=""></a> <a class="carousel_footer_title" href="'+ realObj.clickUrl+'">'+ realObj.title+'</a></li>';
        }

    }

    parent.append(content).css('width',(num+1)*100+'%');
}
//获取状态 gstate  1  未开始  2  直播中  3  已结束
function getGameState(gameDate) {
    var gd = Date.parse(gameDate.replace(/-/g,"/"));
    gd = new Date(gd);
    var nt = new Date();
    var state = {};
    var hours = '';
    var min = '';
    if (nt.getTime() - gd.getTime() < 0) {
        state.gstate = 1;
    }else if (nt.getTime() - gd.getTime()>=0 && nt.getTime() - gd.getTime() <60*4*60*1000) {
        state.gstate = 2;
    }else {
        state.gstate = 3;
    }
    state.gdate = (gd.getMonth() +1) + '月' + gd.getDate() + '日';
    state.gdate2 = (gd.getMonth() +1) + '-' + gd.getDate();
    state.gdate3 = (gd.getMonth() +1) + '/' + gd.getDate();
    if (gd.getHours()<10) {
        hours = '0' + gd.getHours();
    }else {
        hours = gd.getHours();
    }
    if (gd.getMinutes()<10) {
        min = '0' + gd.getMinutes();
    }else {
        min = gd.getMinutes();
    }
    switch (gd.getDay()){
        case 1:
            state.gweek = '星期一';
            state.gweek2 = '周一';
            break;
        case 2:
            state.gweek = '星期二';
            state.gweek2 = '周二';
            break;
        case 3:
            state.gweek = '星期三';
            state.gweek2 = '周三';
            break;
        case 4:
            state.gweek = '星期四';
            state.gweek2 = '周四';
            break;
        case 5:
            state.gweek = '星期五';
            state.gweek2 = '周五';
            break;
        case 6:
            state.gweek = '星期六';
            state.gweek2 = '周六';
            break;
        case 0:
            state.gweek = '星期日';
            state.gweek2 = '周日';
            break;
    }
    state.gtime = hours + ':' + min;
    return state;
}

//轮播
function toRight(obj,num,lost){
    var slider = $(obj);
    var relSlider;
    var test = parseInt($('#example').css('width'));
    num = test;
    lost = 2;
    for (var i=0;i<slider.length;i++) {
        if ($(slider[i]).css('display') != 'none') {
            relSlider=$(slider[i])
        }
    }
    var timer = setInterval(function () {
        if (Math.abs(parseInt(relSlider.css('left'))) >= (parseInt(relSlider.width())-num)){
            relSlider.css('left','0');
        }
        relSlider.css('left',(parseInt(relSlider.css('left'))/test*100 - lost) + '%');
        console.log(Math.abs(parseInt(relSlider.css('left')) % num));
        console.log(parseInt((test*2/100)));
        if (Math.abs(parseInt(relSlider.css('left')) % num) < parseInt((test*2/100))-2){
            relSlider.css('left', Math.round(parseFloat(relSlider.css('left')) / num)*100 +'%');
            clearInterval(timer)
        }
    },1)
}
function toLeft(obj,num,lost){
    var slider = $(obj);
    var relSlider;
    var test = parseFloat($('#example').css('width'));
    num = test;
    lost = 2;
    for (var i=0;i<slider.length;i++) {
        if ($(slider[i]).css('display') != 'none') {
            relSlider=$(slider[i])
        }
    }
    var timer = setInterval(function () {
        if (Math.abs(parseInt(relSlider.css('left'))) < 10){
            // console.log(-Math.round(parseFloat(relSlider.width()) / test - 1)*100);
            relSlider.css('left',-Math.round(parseFloat(relSlider.width())/test-1)*100+'%');
        }
        relSlider.css('left',( parseInt(relSlider.css('left'))/test*100 + lost) + '%');
        // console.log(relSlider.css('left'));
        // console.log(Math.abs(parseFloat(relSlider.css('left')) % num ));
        if (Math.abs(parseFloat(relSlider.css('left')) % num ) < 20 ){
            relSlider.css('left', Math.round( parseFloat(relSlider.css('left')) / test)*100 +'%');
            clearInterval(timer)
        }
    },1)
}




$(function () {
    hideSome();
    $(".nano").nanoScroller();
    $('.schedule_group li').click(function () {
        $('.schedule_group li').removeClass('checked');
        $(this).addClass('checked');
        var index = $(this).find('span').html();
        setRankInfo(index);
    });
    //播放
    $('#change_account').click(changeAccount);
    $('#login_out').click(loginOut);
    //监听滚动条事件
    // if(window.addEventListener){
    //     window.addEventListener('scroll', scrollBottom);
    // }else if(window.attachEvent){
    //     window.attachEvent('on'+'scroll', scrollBottom);
    // }
    // function scrollBottom() {
    //     var sch = document.documentElement.scrollHeight;
    //     var ch = document.documentElement.clientHeight;
    //     var st;
    //     if (window.pageYOffset){
    //         st = window.pageYOffset;
    //     }else {
    //         st = document.documentElement.scrollTop;
    //     }
    //     if(ch - st < 0){
    //         $('#back_top').css('display', 'block');
    //     }else {
    //         $('#back_top').css('display', 'none');
    //     }
    // }
    $('body').on('click','.nav li a',function () {
        var href = $(this).attr("href");
        var pos = $(href).offset().top;
        // console.log(pos);
        $(".nano").nanoScroller({ scrollTop: pos });
        return false;
    })
    $('#user_info').click(function (e) {
        event = e || window.event;
        event.stopPropagation();
        if ($('#more_set').css('display')=='block') {
            $('#more_set').css('display', 'none');
        }else {
            $('#more_set').css('display', 'block');
        }
    });
    $('#back_top').click(function () {
        $(".nano").nanoScroller({ scroll: 'top' });

    });
    $(document).on('click', function () {
        setTimeout(function () {
            $('#more_set').css('display', 'none');
        }, 0);
    });
    $('#top_carousel .to_left')
        .mousedown(function () {
            $(this).find('img').attr('src','/img/click_to_left1.png')
        })
        .mouseup(function () {
            $(this).find('img').attr('src','/img/to_left.png')
        })
    $('#top_carousel .to_right')
        .mousedown(function () {
            $(this).find('img').attr('src','/img/click_to_right1.png')
        })
        .mouseup(function () {
            $(this).find('img').attr('src','/img/to_right.png')
        })
    $('#world_cup_2014 .to_left,#highlights .to_left')
        .mousedown(function () {
            $(this).find('img').attr('src','/img/click_to_left.png')
        })
        .mouseup(function () {
            $(this).find('img').attr('src','/img/to_left1.png')
        })
    $('#world_cup_2014 .to_right,#highlights .to_right')
        .mousedown(function () {
            $(this).find('img').attr('src','/img/click_to_right.png')
        })
        .mouseup(function () {
            $(this).find('img').attr('src','/img/to_right1.png')
        });
})
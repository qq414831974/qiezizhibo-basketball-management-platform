import React, {Component} from 'react';
// import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import {Route, Redirect, Switch} from 'react-router-dom';
import AdminUserManagement from '../manage/AdminUser/UserManagement';
import UserManagement from '../manage/User/UserManagement';
import UserDetailManagement from '../manage/User/UserDetailManagement';
import ExpManagement from '../manage/Exp/ExpManagement';
import GrowthManagement from '../manage/Growth/GrowthManagement';
import BasketballPlayerManagement from "../manage/Basketball/Player/BasketballPlayerManagement";
import BasketballPlayerDetailManagement from "../manage/Basketball/Player/BasketballPlayerDetailManagement";
import LiveManagement from "../manage/Live/LiveManagement";
import LiveDetailManagement from "../manage/Live/LiveDetailManagement";
import BasketballTeamManagement from "../manage/Basketball/Team/BasketballTeamManagement";
import TeamDetailManagement from "../manage/Basketball/Team/BasketballTeamDetailManagement";
import BasketballMatchManagement from "../manage/Basketball/Match/BasketballMatchManagement";
import MatchDetailManagement from "../manage/Basketball/Match/BasketballMatchDetailManagement";
import BasketballLeagueMatchManagement from "../manage/Basketball/League/BasketballLeagueMatchManagement";
import BasketballLeagueMatchSeriesManagement from "../manage/Basketball/League/Series/BasketballLeagueMatchSeriesManagement";
import BasketballLeagueMatchDetailManagement from "../manage/Basketball/League/BasketballLeagueMatchDetailManagement";
import ImportManagement from "../manage/Basketball/Import/ImportManagement";
import RoleManagement from "../manage/Role/RoleManagement";
import PermissionManagement from "../manage/Permission/PermissionManagement";
import AreasManagement from "../manage/Areas/AreasManagement";
import CommentManagement from "../manage/Comment/CommentManagement";
import Dashboard from "../manage/Dashboard/Dashboard";
import BannerSetting from "../manage/Setting/Banner/BannerSetting";
import BulletinSetting from "../manage/Setting/Bulletin/BulletinSetting";
import WechatSetting from "../manage/Setting/WechatSetting";
import BasketballMatchSchedule from "../manage/Basketball/Match/BasketballMatchSchedule";
import ProductManagement from "../manage/Pay/Product/ProductManagement";
import OrderManagement from "../manage/Pay/Order/OrderManagement";
import CashManagement from "../manage/Pay/Cash/CashManagement";
import FreeTicketManagement from "../manage/Pay/FreeTicket/FreeTicketManagement";
import DepositManagement from "../manage/Pay/Deposit/DepositManagement";
import MatchMonopolyManagement from "../manage/Pay/Monopoly/MatchMonopolyManagement";
import ShareSentenceManagement from "../manage/Setting/ShareSentence/ShareSentenceManagement";
import GiftManagement from "../manage/Pay/Gift/GiftManagement";
import BasketballLeagueChargeManagement from "../manage/Basketball/Charge/League/BasketballLeagueChargeManagement";
import BasketballMatchChargeManagement from "../manage/Basketball/Charge/Match/BasketballMatchChargeManagement";
import BasketballLeagueHeatManagement from "../manage/Basketball/Heat/League/BasketballLeagueHeatManagement";
import BasketballMatchHeatManagement from "../manage/Basketball/Heat/Match/BasketballMatchHeatManagement";
import BasketballLeagueBetManagement from "../manage/Basketball/Bet/League/BasketballLeagueBetManagement";
import BasketballMatchBetManagement from "../manage/Basketball/Bet/Match/BasketballMatchBetManagement";
import UserBetManagement from "../manage/Basketball/Bet/UserBetManagement";
import BasketballLeagueClipManagement from "../manage/Basketball/Clip/League/BasketballLeagueClipManagement";
import BasketballMatchClipManagement from "../manage/Basketball/Clip/Match/BasketballMatchClipManagement";
import BasketballLeagueAdManagement from "../manage/Basketball/Ad/League/BasketballLeagueAdManagement";
import BasketballLeagueEncryptionManagement from "../manage/Basketball/Encryption/League/BasketballLeagueEncryptionManagement";
import BasketballMatchEncrypitonManagement from "../manage/Basketball/Encryption/Match/BasketballMatchEncryptionManagement";
import BasketBallLeagueStatisticsManagement from "../manage/Basketball/Statistics/BasketBallLeagueStatisticsManagement";
import BasketballLeagueRegistrationManagement from "../manage/Basketball/Registration/BasketBallLeagueRegistrationManagement";
import TeamRegistrationManagement from "../manage/Basketball/Registration/Team/TeamRegistrationManagement";
import PlayerRegistrationManagement from "../manage/Basketball/Registration/Player/PlayerRegistrationManagement";
import BasketballLeagueMatchBillAnalysis from "../manage/Basketball/League/Bill/BasketballLeagueMatchBillAnalysis";
import BasketballLeagueDetailSetting from "../manage/Basketball/League/Detail/BasketballLeagueDetailSetting";
import PaymentConfigManagement from "../manage/Setting/Payment/PaymentConfigManagement";
import Unauthorized from '../manage/Pages/Unauthorized';
import LogManagement from '../manage/Log/LogManagement';
import FeedbackManagement from '../manage/Setting/Feedback/FeedbackManagement';

var UrlPattern = require('url-pattern');

export default class CRouter extends Component {
    requireAuth = (url, component) => {
        const page401 = Unauthorized;
        const {permissions} = this.props;
        if (permissions) {
            let vaild = false;
            for (let permission of permissions) {
                if(permission){
                    var pattern = new UrlPattern(permission);
                    if (pattern.match(url)) {
                        vaild = true;
                        break;
                    }
                }
            }
            if (vaild) {
                return component
            } else {
                return page401
            }
        }
        return page401;
    };

    render() {
        return (
            <Switch>
                <Route exact path="/index" component={Dashboard}/>
                <Route exact path="/user/user" component={this.requireAuth("/user/user" ,UserManagement)}/>
                <Route exact path="/user/admin" component={this.requireAuth("/user/admin",AdminUserManagement)}/>
                <Route exact path="/exp/exp" component={this.requireAuth("/exp/exp",ExpManagement)}/>
                <Route exact path="/exp/growth" component={this.requireAuth("/exp/growth",GrowthManagement)}/>
                <Route exact path="/role/role" component={this.requireAuth("/role/role",RoleManagement)}/>
                <Route exact path="/role/permission" component={this.requireAuth("/role/permission",PermissionManagement)}/>
                <Route exact path="/area" component={this.requireAuth("/area",AreasManagement)}/>
                <Route exact path="/basketball/basketballPlayer" component={this.requireAuth("/basketball/basketballPlayer",BasketballPlayerManagement)}/>
                <Route exact path="/basketball/basketballTeam" component={this.requireAuth("/basketball/basketballTeam",BasketballTeamManagement)}/>
                <Route exact path="/basketball/basketballMatch" component={this.requireAuth("/basketball/basketballMatch",BasketballMatchManagement)}/>
                <Route exact path="/basketball/basketballLeagueMatch" component={this.requireAuth("/basketball/basketballLeagueMatch",BasketballLeagueMatchManagement)}/>
                <Route exact path="/live" component={this.requireAuth("/live",LiveManagement)}/>
                <Route exact path="/setting/banner" component={this.requireAuth("/setting/banner",BannerSetting)}/>
                <Route exact path="/setting/wechat" component={this.requireAuth("/setting/wechat",WechatSetting)}/>
                <Route exact path="/setting/bulletin" component={this.requireAuth("/setting/bulletin",BulletinSetting)}/>
                <Route exact path="/setting/sharesentence" component={this.requireAuth("/setting/sharesentence",ShareSentenceManagement)}/>
                <Route exact path="/setting/payment" component={this.requireAuth("/setting/payment",PaymentConfigManagement)}/>
                <Route exact path="/pay/product" component={this.requireAuth("/pay/product",ProductManagement)}/>
                <Route exact path="/pay/order" component={this.requireAuth("/pay/order",OrderManagement)}/>
                <Route exact path="/pay/cash" component={this.requireAuth("/pay/cash",CashManagement)}/>
                <Route exact path="/pay/freeTicket" component={this.requireAuth("/pay/freeTicket",FreeTicketManagement)}/>
                <Route exact path="/pay/monopoly" component={this.requireAuth("/pay/monopoly",MatchMonopolyManagement)}/>
                <Route exact path="/pay/gift" component={this.requireAuth("/pay/gift",GiftManagement)}/>
                <Route exact path="/pay/deposit" component={this.requireAuth("/pay/deposit",DepositManagement)}/>
                <Route exact path="/basketball/import" component={this.requireAuth("/basketball/import",ImportManagement)}/>
                <Route exact path="/basketball/league/charge" component={this.requireAuth("/basketball/league/charge",BasketballLeagueChargeManagement)}/>
                <Route exact path="/basketball/match/charge" component={this.requireAuth("/basketball/match/charge",BasketballMatchChargeManagement)}/>
                <Route exact path="/basketball/league/heat" component={this.requireAuth("/basketball/league/heat",BasketballLeagueHeatManagement)}/>
                <Route exact path="/basketball/match/heat" component={this.requireAuth("/basketball/match/heat",BasketballMatchHeatManagement)}/>
                <Route exact path="/basketball/league/bet" component={this.requireAuth("/basketball/league/bet",BasketballLeagueBetManagement)}/>
                <Route exact path="/basketball/match/bet" component={this.requireAuth("/basketball/match/bet",BasketballMatchBetManagement)}/>
                <Route exact path="/basketball/league/clip" component={this.requireAuth("/basketball/league/clip",BasketballLeagueClipManagement)}/>
                <Route exact path="/basketball/match/clip" component={this.requireAuth("/basketball/match/clip",BasketballMatchClipManagement)}/>
                <Route exact path="/basketball/league/encryption" component={this.requireAuth("/basketball/league/encryption",BasketballLeagueEncryptionManagement)}/>
                <Route exact path="/basketball/match/encryption" component={this.requireAuth("/basketball/match/encryption",BasketballMatchEncrypitonManagement)}/>
                <Route exact path="/basketball/league/ad" component={this.requireAuth("/basketball/league/ad",BasketballLeagueAdManagement)}/>
                <Route exact path="/basketball/league/registration" component={this.requireAuth("/basketball/league/registration",BasketballLeagueRegistrationManagement)}/>
                <Route exact path="/basketball/league/registration/team" component={this.requireAuth("/basketball/league/registration/team",TeamRegistrationManagement)}/>
                <Route exact path="/basketball/league/registration/player" component={this.requireAuth("/basketball/league/registration/player",PlayerRegistrationManagement)}/>
                <Route exact path="/basketball/league/statistics" component={this.requireAuth("/basketball/league/statistics",BasketBallLeagueStatisticsManagement)}/>
                <Route exact path="/pay/bet" component={this.requireAuth("/pay/bet",UserBetManagement)}/>
                <Route path="/basketball/comment/:id" component={this.requireAuth("/basketball/comment/:id",CommentManagement)}/>
                <Route path="/live/:id" component={this.requireAuth("/live/:id",LiveDetailManagement)}/>
                <Route path="/user/user/:id" component={this.requireAuth("/user/user/:id" ,UserDetailManagement)}/>
                <Route path="/basketball/basketballTeam/:id" component={this.requireAuth("/basketball/basketballTeam/:id",TeamDetailManagement)}/>
                <Route path="/basketball/basketballMatch/:id" component={this.requireAuth("/basketball/basketballMatch/:id",MatchDetailManagement)}/>
                <Route path="/basketball/league/detail/:id" component={this.requireAuth("/basketball/basketballLeagueMatch/:id",BasketballLeagueDetailSetting)}/>
                <Route path="/basketball/basketballLeagueMatch/:id" component={this.requireAuth("/basketball/basketballLeagueMatch/:id",BasketballLeagueMatchDetailManagement)}/>
                <Route path="/basketball/basketballLeagueSeries/:id" component={this.requireAuth("/basketball/basketballLeagueSeries/:id",BasketballLeagueMatchSeriesManagement)}/>
                <Route path="/basketball/basketballPlayer/:id" component={this.requireAuth("/basketball/basketballPlayer/:id",BasketballPlayerDetailManagement)}/>
                <Route path="/basketball/schedule" component={this.requireAuth("/basketball/schedule",BasketballMatchSchedule)}/>
                <Route path="/analysis/bill" component={this.requireAuth("/analysis/bill",BasketballLeagueMatchBillAnalysis)}/>
                <Route path="/sys/log" component={this.requireAuth("/sys/log",LogManagement)}/>
                <Route path="/sys/feedback" component={this.requireAuth("/sys/feedback",FeedbackManagement)}/>
                <Route render={() => <Redirect to="/index"/>}/>
            </Switch>
        )
    }
}
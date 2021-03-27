import React from 'react';
import {
    Form,
    Avatar,
    Button,
    Row,
    Col,
    List,
    Card,
    Modal,
    Radio,
    Switch,
    Skeleton,
} from 'antd';
import moment from 'moment'
import 'moment/locale/zh-cn';
import {receiveData} from "../../../action";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    getLeagueMatchById,
    getLeagueTeam,
    addTeamToLeague,
    updateTeamInLeague,
    deleteTeamInLeague,
    addLeaguePlayer,
    updatePlayerInLeague,
    delPlayerInLeague,
    genLeagueTeamRank,
    genLeaguePlayerRank,
    genLeagueReport,
    getLeagueReport,
    getLeagueRankSetting,
    updateLeagueRankSetting,
} from "../../../axios/index";
import avatar from '../../../static/avatar.jpg';
import logo from '../../../static/logo.png';
import {Link, Redirect} from 'react-router-dom';
import BreadcrumbCustom from '../../Components/BreadcrumbCustom';
import BasketballLeagueMatchAddTeamDialog from "./BasketballLeagueMatchAddTeamDialog";
import BasketballLeagueMatchModifyTeamDialog from "./BasketballLeagueMatchModifyTeamDialog";
import {message} from "antd/lib/index";

moment.locale('zh-cn');

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 4},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};

class BasketballLeagueMatchDetailManagement extends React.Component {
    state = {teamList: [], playerList: [], teamSwitch: true}

    componentDidMount() {
        if (!(this.props.match.params && this.props.match.params.id)) {
            return;
        }
        this.fetch();
    }

    fetch = () => {
        getLeagueMatchById(this.props.match.params.id).then(data => {
            if (data && data.code == 200 && data.data) {
                this.setState({
                    data: data.data,
                    teamListloading: true,
                });
                if (data.data && data.data.id) {
                    getLeagueTeam({leagueId: data.data.id}).then(res => {
                        if (res && res.code == 200) {
                            this.setState({teamList: res.data, teamListloading: false});
                        }
                    })
                }
            }
        });
        getLeagueRankSetting({leagueId: this.props.match.params.id}).then(data => {
            let autoRank = false;
            let showLeagueTeam = false;
            if (data && data.data && data.data.id) {
                autoRank = data.data.autoRank;
                showLeagueTeam = data.data.showLeagueTeam;
            }
            this.setState({teamSwitch: showLeagueTeam, sortradiovalue: autoRank})
        });
        // getLeagueReport({leagueId: this.props.match.params.id}).then(data => {
        //     if (data && data.code == 200) {
        //         if (data.data) {
        //             this.setState({reportUrl: data.data.url});
        //         }
        //     }
        // })
    }
    refresh = () => {
        this.fetch();
    }
    refreshReport = () => {
        getLeagueReport({leagueId: this.props.match.params.id}).then(data => {
            if (data && data.code == 200) {
                this.setState({reportUrl: data.data.url});
            }
        })
    }
    onAddTeamClick = (e) => {
        this.setState({addTeamVisible: true});
    }
    onTeamClick = (record) => {
        this.setState({currentTeam: record, modifyTeamVisible: true});
    }
    handleAddTeamOK = () => {
        const form = this.addTeamForm;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            addTeamToLeague(values).then((data) => {
                if (data && data.code == 200) {
                    if (data.data) {
                        this.refresh();
                        message.success('添加成功', 1);
                    } else {
                        message.warn(data.message, 1);
                    }
                } else {
                    message.error('添加失败：' + (data ? data.code + ":" + data.message : data), 3);
                }
            });
            form.resetFields();
            this.setState({addTeamVisible: false});
        });
    }
    handleModifyTeamOK = () => {
        const form = this.modifyTeamForm;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            updateTeamInLeague(values).then((data) => {
                if (data && data.code == 200) {
                    if (data.data) {
                        this.refresh();
                        message.success('修改成功', 1);
                    } else {
                        message.warn(data.message, 1);
                    }
                } else {
                    message.error('修改失败：' + (data ? data.code + ":" + data.message : data), 3);
                }
            });
            form.resetFields();
            this.setState({modifyTeamVisible: false});
        });
    }
    handleAddTeamCancel = () => {
        this.setState({addTeamVisible: false});
    }
    saveAddTeamDialogRef = (form) => {
        this.addTeamForm = form;
    }
    handleModifyTeamCancel = () => {
        this.setState({modifyTeamVisible: false});
    }
    saveModifyTeamDialogRef = (form) => {
        this.modifyTeamForm = form;
    }
    handleTeamDelete = () => {
        this.setState({deleteVisible: true, handleDeleteOK: this.handleDeleteTeamOK});
    }
    handleDeleteTeamOK = () => {
        this.state.currentTeam &&
        deleteTeamInLeague({
            leagueId: this.state.currentTeam.leagueId,
            teamId: this.state.currentTeam.teamId
        }).then(data => {
            this.setState({deleteVisible: false, modifyTeamVisible: false});
            if (data && data.code == 200) {
                if (data.data) {
                    this.refresh();
                    message.success('删除成功', 1);
                } else {
                    message.success(data.message, 1);
                }
            } else {
                message.error('删除失败：' + (data ? data.result + "-" + data.message : data), 3);
            }
        });
    }
    handleDeleteCancel = () => {
        this.setState({deleteVisible: false});
    }
    onSortRadioChange = (e) => {
        updateLeagueRankSetting({leagueId: this.props.match.params.id, autoRank: e.target.value}).then((data) => {
            if (data && data.code == 200) {
                if (data.data) {
                    this.refresh();
                    message.success('修改成功', 1);
                    this.setState({
                        sortradiovalue: e.target.value,
                    });
                } else {
                    message.warn(data.message, 1);
                }
            } else {
                message.error('修改失败：' + (data ? data.code + ":" + data.message : data), 3);
            }
        });
    }
    onLeagueTeamSwitchChange = (e) => {
        updateLeagueRankSetting({leagueId: this.props.match.params.id, showLeagueTeam: e}).then((data) => {
            if (data && data.code == 200) {
                if (data.data) {
                    this.refresh();
                    message.success('修改成功', 1);
                    this.setState({teamSwitch: e});
                } else {
                    message.warn(data.message, 1);
                }
            } else {
                message.error('修改失败：' + (data ? data.code + ":" + data.message : data), 3);
            }
        });
    }
    getGroupLegueTeam = () => {
        let dom = [];
        if (this.state.teamListloading) {
            return <Skeleton active/>;
        }
        if (this.state.teamList) {
            const indexes = Object.keys(this.state.teamList).sort();
            indexes.forEach(key => {
                const leagueTeam = this.state.teamList[key];
                dom.push(
                    <List
                        key={key}
                        rowKey={record => record.id}
                        header={key}
                        size="small"
                        dataSource={leagueTeam ? leagueTeam : []}
                        loading={this.state.teamListloading}
                        renderItem={item => (<div className="cell-hover pa-s cursor-hand"
                                                  onClick={this.onTeamClick.bind(this, item)}>
                            <Avatar size="large" src={item.team.headImg ? item.team.headImg : logo}/>
                            <span className="ml-s">{item.team.name}</span>
                            <div className="pull-right pa-s">
                                <span
                                    className="pl-s pr-s">{item.matchTotal ? item.matchTotal : 0}</span>
                                <span
                                    className="pl-s pr-s">{`${item.matchWin ? item.matchWin : 0}/${item.matchDraw ? item.matchDraw : 0}/${item.matchLost ? item.matchLost : 0}`}</span>
                                <span
                                    className="pl-s pr-s">{`${item.totalGoal ? item.totalGoal : 0}/${item.totalGoalLost ? item.totalGoalLost : 0}`}</span>
                                <span className="pl-s pr-s">{item.ranks ? item.ranks : 0}</span>
                            </div>
                        </div>)}
                    />)
            })
        }
        return dom;
    }
    genLeagueTeamRank = () => {
        message.info("正在生成，请稍后", 10)
        genLeagueTeamRank({leagueId: this.state.data.id}).then(data => {
            if (data && data.code == 200) {
                if (data.data) {
                    this.refresh();
                    message.success('生成成功', 1);
                } else {
                    message.warn(data.message, 1);
                }
            } else {
                message.error('生成失败：' + (data ? data.code + ":" + data.message : data), 3);
            }
        });
    }
    genLeagueReport = () => {
        message.info("正在生成，请稍后", 10)
        genLeagueReport({leagueId: this.state.data.id}).then(data => {
            if (data && data.code == 200) {
                if (data.data && data.data.id) {
                    this.refreshReport();
                    message.destroy();
                    message.success('生成成功', 1);
                } else {
                    message.warn(data.message, 1);
                }
            } else {
                message.error('生成失败：' + (data ? data.code + ":" + data.message : data), 3);
            }
        })
    }

    render() {
        const isMobile = this.props.responsive.data.isMobile;
        if (!(this.props.match.params && this.props.match.params.id)) {
            return <Redirect push to="/basketball/basketballLeagueMatch"/>;
        }
        const AddTeamDialog = Form.create()(BasketballLeagueMatchAddTeamDialog);
        const ModifyTeamDialog = Form.create()(BasketballLeagueMatchModifyTeamDialog);
        return (
            <div>
                <BreadcrumbCustom first={<Link to={'/basketball/basketballLeagueMatch'}>联赛管理</Link>} second="详细设置"/>
                <div className="dark-white pa-s">
                    <div className="w-full center">
                        <Avatar size="large"
                                src={this.state.data ? (this.state.data.headImg ? this.state.data.headImg : logo) : logo}/>
                    </div>
                    <div className="w-full center">
                        <span style={{fontSize: 18}}>{this.state.data ? this.state.data.name : "无联赛名"}</span>
                    </div>
                    <div className="w-full center">
                        <span>{this.state.data ? `${this.state.data.dateBegin} - ${this.state.data.dateEnd}` : ""}</span>
                    </div>
                    {/*<div className="w-full center">*/}
                    {/*    <Button type="primary" onClick={this.genLeagueReport}>一键生成海报图</Button>*/}
                    {/*</div>*/}
                    {/*<div className="w-full center">*/}
                    {/*    {this.state.reportUrl ?*/}
                    {/*        <a style={{textDecoration: "underline"}}*/}
                    {/*           target="_blank"*/}
                    {/*           href={this.state.reportUrl}>*/}
                    {/*            <span>{this.state.reportUrl}</span>*/}
                    {/*        </a>*/}
                    {/*        :*/}
                    {/*        <span>暂无海报</span>*/}
                    {/*    }*/}
                    {/*</div>*/}

                    <div className="w-full">
                        <div className="w-full center">
                            <span style={{fontSize: 20, fontWeight: 'bold'}}>积分榜</span>
                            <Switch checked={this.state.teamSwitch} onChange={this.onLeagueTeamSwitchChange}/>
                        </div>
                        <div className="w-full center">
                            <Button type="primary" onClick={this.genLeagueTeamRank}>一键生成</Button>
                        </div>
                        <Card className="mt-m" title={<div>
                            <Button type="primary" shape="circle" icon="plus" onClick={this.onAddTeamClick}/>
                            <span className="ml-s mr-s">队伍</span>
                            <Radio.Group onChange={this.onSortRadioChange}
                                         value={this.state.sortradiovalue}>
                                <Radio value={true}>自动</Radio>
                                <Radio value={false}>手动</Radio>
                            </Radio.Group>
                            <span className="pull-right pa-s">{"赛   胜/平/负   进/失 积分"}</span>
                        </div>}>
                            {this.getGroupLegueTeam()}
                        </Card>
                    </div>
                </div>
                <Modal
                    className={isMobile ? "top-n" : ""}
                    title="添加队伍"
                    okText="确定"
                    visible={this.state.addTeamVisible}
                    onOk={this.handleAddTeamOK}
                    onCancel={this.handleAddTeamCancel}
                    zIndex={1001}
                    destroyOnClose="true"
                >
                    <AddTeamDialog
                        visible={this.state.addTeamVisible}
                        record={this.state.data}
                        ref={this.saveAddTeamDialogRef}/>
                </Modal>
                <Modal
                    className={isMobile ? "top-n" : ""}
                    title="编辑队伍"
                    okText="确定"
                    visible={this.state.modifyTeamVisible}
                    onOk={this.handleModifyTeamOK}
                    onCancel={this.handleModifyTeamCancel}
                    zIndex={1001}
                    destroyOnClose="true"
                    footer={[
                        <Button key="delete" type="danger" className="pull-left"
                                onClick={this.handleTeamDelete}>删除</Button>,
                        <Button key="back" onClick={this.handleModifyTeamCancel}>取消</Button>,
                        <Button key="submit" type="primary" onClick={this.handleModifyTeamOK}>
                            确定
                        </Button>
                    ]}
                >
                    <ModifyTeamDialog
                        visible={this.state.modifyTeamVisible}
                        record={this.state.currentTeam}
                        league={this.state.data}
                        ref={this.saveModifyTeamDialogRef}/>
                </Modal>
                <Modal
                    className={isMobile ? "top-n" : ""}
                    title="确认删除"
                    visible={this.state.deleteVisible}
                    onOk={this.state.handleDeleteOK}
                    onCancel={this.handleDeleteCancel}
                    zIndex={1001}
                >
                    <p className="mb-n" style={{fontSize: 14}}>是否确认删除？</p>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {auth = {data: {}}, responsive = {data: {}}} = state.httpData;
    return {auth, responsive};
};
const mapDispatchToProps = dispatch => ({
    receiveData: bindActionCreators(receiveData, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BasketballLeagueMatchDetailManagement);
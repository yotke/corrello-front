import {connect} from 'react-redux'
import { ActivitiesList } from '../activities-list'
import {Popover} from './popover'
import { ReactComponent as NoNotifications } from '../../assets/img/icons/no-notifications.svg'

function _PopoverNotifcs ({loggedInUser,board}){

    function getNotifcsActivities(){
        if(!loggedInUser)return
        const sortedActivities = board.activities.sort((a, b) => b.createdAt - a.createdAt)
        const userNotifics=sortedActivities.reduce((acc,activity)=>{
            if(activity.card?.members){
                activity.card.members.forEach(member=>{
                    if(loggedInUser._id===member._id&&loggedInUser._id!==activity.byMember._id){
                        acc.push(activity)
                    }
                })
            }
            return acc
        },[])
        return userNotifics.slice(0,15)
    }

    const notifcsActivities=getNotifcsActivities()

    return <Popover title="Notifications">
        {console.log(notifcsActivities)}
        <div className="user-notifics">
            <ActivitiesList activities={notifcsActivities} isGeneral={true}/>
            {!notifcsActivities.length&& 
                    <div className="no-notifications flex column align-center">
                    <NoNotifications />
                    <div className="txt">
                      <h3>No unread notifications</h3>
                      {/* <p>Click <span onClick={this.onToggleShowAll}>View all</span> to view all of your notifications</p> */}
                    </div>
                  </div>
            }
        </div>
    </Popover>
}

function mapStateToProps(state){
    return {
        loggedInUser:state.userModule.loggedInUser,
        board:state.boardModule.board
    }
}

export const PopoverNotifics = connect(mapStateToProps,null)(_PopoverNotifcs)
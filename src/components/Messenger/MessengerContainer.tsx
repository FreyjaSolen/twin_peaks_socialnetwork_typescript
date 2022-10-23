import React from 'react';
import { ActorType, MessageType } from '../../types/types';
import { sendMessage } from '../../redux/messengerReducer';
import Messenger from './Messenger';
import { connect } from 'react-redux';
import { HocRedirect } from '../../hoc/HocRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/reduxStore';

type MapStatePropsType = {
    messengerActors: Array<ActorType>,
    MsrMessages: Array<MessageType>
  }

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        messengerActors: state.messengerPage.messengerActors,
        MsrMessages: state.messengerPage.MsrMessages
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {sendMessage}),
    HocRedirect
)(Messenger);
// const MessengerContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

// export default MessengerContainer;
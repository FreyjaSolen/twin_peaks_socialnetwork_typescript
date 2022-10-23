import React from 'react';
import { ActorType, MessageType } from '../../types/types';
import Message from './Message/Message';
import MessageForm from './MessageForm/MessageForm';
import style from './Messenger.module.css';
import MsrActor from './MsrActor/MsrActor';

type PropsType = {
    messengerActors: Array<ActorType>,
    MsrMessages: Array<MessageType>,
    sendMessage: (newMsgText: string) => void
}

const Messenger: React.FC<PropsType> = (props) => {

    let mapMsrActors = props.messengerActors.map(actor => (<div key={actor.id}> 
        <MsrActor id={actor.id} name={actor.name} />
        </div>
    ));

    let mapMsrMessages = props.MsrMessages.map(message => (
        <div key={message.id}> 
        <Message id={message.id} message={message.message} />
        </div>
    ));

    return (
        <div className={style.messengerWrapper}>
            <div className={style.dialogConteiner}>
                {mapMsrActors}
            </div>
            <div className={style.dialogsItemConteiner}>
                <div>
                    {mapMsrMessages}
                </div>
                <div>
                    <MessageForm addMessage={props.sendMessage}/>
                </div>
            </div>
        </div>
    );
}

export default Messenger;
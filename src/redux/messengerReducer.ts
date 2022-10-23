import { type } from 'os';
import { ActorType, MessageType } from '../types/types';
const SEND_MESSAGE = 'messenger/SEND-MESSAGE';

let initialState = {
  messengerActors: [
    { id: 1, name: 'Sheriff Harry S. Truman' },
    { id: 2, name: 'Audrey Horne' },
    { id: 3, name: 'Deputy Tommy Hawk Hill' },
    { id: 4, name: 'Shelly Johnson' }
  ] as Array<ActorType>,

  MsrMessages: [
    { id: 1, message: 'Hello' },
    { id: 2, message: 'How are you?' },
    { id: 3, message: 'I miss you...' },
  ] as Array<MessageType>
};

export type InitialStateType = typeof initialState;

type ActionsTypes = SendMessageType 

const messengerReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE: {
      let newMessage: MessageType = {
        id: state.MsrMessages.length + 1,
        message: action.newMsg
      };
      return {
        ...state,
        MsrMessages: [...state.MsrMessages, newMessage]
      }
    }

    default: return state;
  }
}

type SendMessageType = {
  type: typeof SEND_MESSAGE,
  newMsg: string
}

export const sendMessage = (newMsg: string): SendMessageType => ({ type: SEND_MESSAGE, newMsg })

export default messengerReducer;
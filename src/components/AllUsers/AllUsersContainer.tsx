import React from 'react';
import { followCommand, unFollowCommand, setCurrentPage, getAllUsers} from '../../redux/allUsersReducer';
import { connect } from 'react-redux';
import AllUsers from './AllUsers';
import Preloader from '../common/Preloader/Preloader';
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/reduxStore';

type MapStatePropsType = {
  users: Array<UserType>,
  idRequestWait: Array<number>,
  currentPage: number, 
  pageSize: number,
  totalUsersCount: number,
  isAuth: boolean,
  isFetching: boolean
}
type MapDispatchPropsType = {
  followCommand: (id: number) => void,
  unFollowCommand: (id: number) => void,
  setCurrentPage: (pageNum: number) => void,
  getAllUsers: (pageNum: number, pageSize: number) => void
}
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class AllUsersContainer extends React.Component<PropsType> {

  componentDidMount(){
      this.getUsers();
  }

  getUsers = () =>{
      if (this.props.users.length === 0) {
        this.props.getAllUsers(this.props.currentPage, this.props.pageSize);
      }
  }

  onPageChange = (pageNum: number) =>{
      this.props.setCurrentPage(pageNum);
      this.props.getAllUsers(pageNum, this.props.pageSize);
  }

  render() {    
      return <>
      { this.props.isFetching ? <Preloader />: null }
       <AllUsers totalUsersCount = {this.props.totalUsersCount}
          pageSize = {this.props.pageSize}
          currentPage = {this.props.currentPage}
          users = {this.props.users}
          idRequestWait = {this.props.idRequestWait}
          unFollowCommand = {this.props.unFollowCommand}
          followCommand = {this.props.followCommand}
          onPageChange = {this.onPageChange}
          isAuth = {this.props.isAuth}/> 
          </>          
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: state.allUsersPage.users,
    pageSize: state.allUsersPage.pageSize,
    totalUsersCount: state.allUsersPage.totalUsersCount,
    currentPage: state.allUsersPage.currentPage,
    isFetching: state.allUsersPage.isFetching,
    idRequestWait: state.allUsersPage.idRequestWait,
    isAuth: state.authPage.isAuth
  }
}

export default connect<MapStatePropsType, MapDispatchPropsType,  OwnPropsType, AppStateType>(mapStateToProps, {
  followCommand,
  unFollowCommand,
  setCurrentPage,
  getAllUsers
})(AllUsersContainer);
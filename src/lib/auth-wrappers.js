import { UserAuthWrapper } from 'redux-auth-wrapper'
import Loading from './components/Loading'

export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user.email,
  failureRedirectPath: '/login',
  authenticatingSelector: state => state.user.isFetching,
  LoadingComponent: Loading,
  allowRedirectBack: false,
  wrapperDisplayName: 'UserIsAuthenticated'
})
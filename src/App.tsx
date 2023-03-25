import store, { RootState } from './store/store'
import { Provider, useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRoutes from './routes'
import SnackBarModal from './components/UI/SnackBar'
import { uiSLiceActions } from './store/ui/ui.slice'
import useAppDispatch from './hooks/useAppDispatch'

function AppContent() {
  const dispatch = useAppDispatch()
  const snackbar = useSelector((state: RootState) => state.ui.snackbar)

  return (
    <div className="App">
      <SnackBarModal
        isOpen={snackbar.isOpen}
        severity={snackbar.severity}
        message={snackbar.message}
        onClose={() => dispatch(uiSLiceActions.closeSnackBar())}
      />
      <AppRoutes />
    </div>
  )
}

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  )
}
export default App

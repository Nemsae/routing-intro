import AppDispatcher from '../AppDispatcher';

const ServerActions = {

  sendData(dataPackage) {
    AppDispatcher.dispatch({
      type: 'SEND_DATA',
      payload: { dataPackage }
    })
  },

  sendLookup(data) {
    AppDispatcher.dispatch({
      type: 'SEND_LOOKUP',
      payload: { data }
    })
  },

}

export default ServerActions;

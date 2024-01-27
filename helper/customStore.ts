

type ActionType = {
  type: string,
  payload: any,
  key?: string,
}

type StoreState = {
  changedValues?: {
    actionsToHide?: any
    displayLocationOnRecordDetail?: string;
    colorSettings?: any
  };
  currentPluginConfig?: any
};

const initialState: StoreState = {};

const ACTION_TYPES = {
  UPDATE_VALUE_COMPONENT: 'UPDATE_VALUE_COMPONENT',
  SET_GLOBAL_PLUGIN_CONFIG: 'SET_GLOBAL_PLUGIN_CONFIG',
};

function reducer(action: ActionType, state = initialState) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_VALUE_COMPONENT: {
      const dictionary: Record<string, string> = {
        actionsToHide: 'actionsToHide',
        displayLocationOnRecordDetail: 'displayLocationOnRecordDetail',
        colorSettings: 'colorSettings',
      };
      if (!action.key) return state;
      return {...state, changedValues: {...state.changedValues, [dictionary[action.key]]: action.payload}};
    }
    case ACTION_TYPES.SET_GLOBAL_PLUGIN_CONFIG: {
      return {...state, currentPluginConfig: action.payload,};
    }
    default: return state;
  }
}

function updateComponentValue<T>(data: T, key: string) {
  return {type: ACTION_TYPES.UPDATE_VALUE_COMPONENT, payload: data, key};
}

function setGlobalPluginConfig(data: any) {
  return {type: ACTION_TYPES.SET_GLOBAL_PLUGIN_CONFIG, payload: data};
}

const store = {
  state: initialState,
  getState() {
    return this.state;
  },
  getPluginConfig() {
    return this.state.currentPluginConfig;
  },
  dispatch(action: ActionType) {
    this.state = reducer(action, store.getState());
  }
};

export {store, updateComponentValue, setGlobalPluginConfig};

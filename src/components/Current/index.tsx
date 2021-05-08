import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IStore } from '../../common/interfaces/IStore';
import { ICurrentState } from '../../store/reducers/current.reducer';

import Current from './Current';


const getCurrentSelector = createSelector(
    (state: IStore) => state.current,
    (current: ICurrentState) => current,
);

const mapStateToProps = (state: IStore) => {
    return {
        currentState: getCurrentSelector(state),
    };
};


export default connect(mapStateToProps)(Current);

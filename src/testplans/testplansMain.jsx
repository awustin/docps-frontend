import { hot } from 'react-hot-loader';
import React from 'react';
import AppLayout from '../AppLayout';

class TestplansMain extends React.Component {
    render() {
        return(
            <AppLayout>
                <div>
                    Testplans
                </div>
            </AppLayout>
        );
    }
}

export default hot(module)(TestplansMain);
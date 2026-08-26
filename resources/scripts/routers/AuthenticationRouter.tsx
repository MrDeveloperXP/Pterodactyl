import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import LoginContainer from '@/components/auth/LoginContainer';
import RegisterContainer from '@/components/auth/RegisterContainer';
import ForgotPasswordContainer from '@/components/auth/ForgotPasswordContainer';
import ResetPasswordContainer from '@/components/auth/ResetPasswordContainer';
import LoginCheckpointContainer from '@/components/auth/LoginCheckpointContainer';
import { NotFound } from '@/components/elements/ScreenBlock';
import { useHistory, useLocation } from 'react-router';
import { useStoreState } from 'easy-peasy';

export default () => {
    const history = useHistory();
    const location = useLocation();
    const { path } = useRouteMatch();
    const loginEnabled = useStoreState((state: any) => state.settings.data!.auth.loginEnabled);

    return (
        <div className={'pt-8 md:pt-16 xl:pt-20'}>
            <Switch location={location}>
                <Route path={`${path}/login`} render={() => loginEnabled ? <LoginContainer /> : <NotFound onBack={() => history.push('/')} />} exact />
                <Route path={`${path}/register`} component={RegisterContainer} exact />
                <Route path={`${path}/login/checkpoint`} component={LoginCheckpointContainer} />
                <Route path={`${path}/password`} component={ForgotPasswordContainer} exact />
                <Route path={`${path}/password/reset/:token`} component={ResetPasswordContainer} />
                <Route path={`${path}/checkpoint`} />
                <Route path={'*'}>
                    <NotFound onBack={() => history.push('/auth/login')} />
                </Route>
            </Switch>
        </div>
    );
};

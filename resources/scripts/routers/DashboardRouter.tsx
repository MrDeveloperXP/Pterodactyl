import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import DashboardHomeContainer from '@/components/dashboard/DashboardHomeContainer';
import MyServersContainer from '@/components/dashboard/MyServersContainer';
import AvailableServersContainer from '@/components/dashboard/AvailableServersContainer';
import { NotFound } from '@/components/elements/ScreenBlock';
import TransitionRouter from '@/TransitionRouter';
import { useLocation } from 'react-router';
import Spinner from '@/components/elements/Spinner';
import routes from '@/routers/routes';
import tw from 'twin.macro';
import { useStoreState } from 'easy-peasy';

export default () => {
    const location = useLocation();
    const pages = useStoreState((state: any) => state.settings.data!.pages);
    const fallback = pages.servers ? '/servers' : pages.store ? '/store' : pages.account ? '/account' : null;

    if (location.pathname === '/' && !pages.dashboard && fallback) {
        return <Redirect to={fallback} />;
    }

    return (
        <>
            <Sidebar />
            <div css={tw`lg:ml-[21rem] mr-4 pt-20 lg:pt-4 pb-4`}>
                <TransitionRouter>
                    <React.Suspense fallback={<Spinner centered />}>
                        <Switch location={location}>
                            {pages.dashboard && <Route path={'/'} exact>
                                <DashboardHomeContainer />
                            </Route>}
                            {pages.servers && <Route path={'/servers'} exact>
                                <MyServersContainer />
                            </Route>}
                            {pages.store && <Route path={'/store'} exact>
                                <AvailableServersContainer />
                            </Route>}
                            {routes.account.filter(({ accessKey }) => !accessKey || pages[accessKey] !== false).map(({ path, component: Component }) => (
                                <Route key={path} path={`/account/${path}`.replace('//', '/')} exact>
                                    <Component />
                                </Route>
                            ))}
                            <Route path={'*'}>
                                <NotFound />
                            </Route>
                        </Switch>
                    </React.Suspense>
                </TransitionRouter>
            </div>
        </>
    );
};

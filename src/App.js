import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ACTIONS } from "./accessControl/actions";
import Can from "./accessControl/Can";
import { Sidebar } from "./components/ui/common";
import { SidebarTemplate } from "./components/ui/templates";
import { initialRoutesByRoles } from "./content/initialRoutersByRoles.data";
import { useAuth } from "./context/auth/authContext";
import {
  ACTION_ITEMS,
  ADD,
  CHILDREN,
  COMMUNICATION_TEMPLATES,
  CONTACTS,
  FORGOT_PASSWORD,
  LOGIN,
  NEW_PASSWORD,
  ORGANIZATIONS,
  REPORTS,
  RESOURCES,
  SEARCHVECTOR,
  SETTINGS,
  USERS,
} from "./helpers/routes";
import {
  ActionItemsPage,
  AddChildPage,
  AddCommunicationTemplatePage,
  AddOrganizationPage,
  AddUserPage,
  ChildProfilePage,
  ChildrenPage,
  CommunicationTemplatesPage,
  ComponentWrapper,
  NewPassword,
  NotFound,
  OrganizationsPage,
  Preloader,
  ReportsPage,
  ResetPassword,
  ResourcesPage,
  SearchVectorsPage,
  SettingsPage,
  UsersPage,
} from "./pages";
import { AccessDenied } from "./pages/AccessDenied";
import ContactsSettingPage from "./pages/ContactsSettingPage";
import LoginPage from "./pages/Login";
import { localStorageKey } from "./utils/requestHandler";

const PrivateRoute = ({ perform, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        window.localStorage.getItem(localStorageKey) ? (
          <ComponentWrapper>
            <Can
              perform={perform}
              yes={() => <Component {...props} />}
              no={() => <AccessDenied />}
            />
          </ComponentWrapper>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

function App() {
  const { user } = useAuth();
  return (
    <div style={{ display: "flex" }}>
      <Router>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
        />
        <SidebarTemplate sidebar={<Sidebar />} />
        <React.Suspense fallback={<Preloader />}>
          <Switch>
            <PrivateRoute
              exact
              path={`/`}
              component={() =>
                user ? (
                  <Redirect to={`/${initialRoutesByRoles[user.role]}`} />
                ) : (
                  <Preloader />
                )
              }
            />
            <Route
              exact
              path={`/${LOGIN}`}
              component={() => (user ? <Redirect to="/" /> : <LoginPage />)}
            />
            <Route
              exact
              path={`/${FORGOT_PASSWORD}`}
              component={ResetPassword}
            />
            <Route exact path={`/${NEW_PASSWORD}`} component={NewPassword} />
           
            <PrivateRoute
              exact
              perform={`${SETTINGS}:${ACTIONS.VISIT}`}
              path={`/${SETTINGS}`}
              component={SettingsPage}
            />
           
           
            
           
            <PrivateRoute
              exact
              perform={`${USERS}:${ACTIONS.VISIT}`}
              path={`/${USERS}`}
              component={(props) => (
                <UsersPage isOrganization={false} {...props} />
              )}
            />
            <PrivateRoute
              exact
              perform={`${ORGANIZATIONS}:${ACTIONS.VISIT}`}
              path={`/${ORGANIZATIONS}`}
              component={OrganizationsPage}
            />
            <PrivateRoute
              exact
              perform={`${ORGANIZATIONS}:${ACTIONS.ADD}`}
              path={`/${ORGANIZATIONS}-${ADD}`}
              component={AddOrganizationPage}
            />
            <PrivateRoute
              exact
              perform={`${USERS}:${ACTIONS.ADD}`}
              path={`/${USERS}-${ADD}`}
              component={AddUserPage}
            />
            <PrivateRoute
              exact
              perform={`${USERS}:${ACTIONS.VISIT_ONE}`}
              path={`/${USERS}/:id`}
              component={UsersPage}
            />
            <PrivateRoute
              exact
              perform={`${CHILDREN}:${ACTIONS.ADD}`}
              path={`/${CHILDREN}-${ADD}`}
              component={AddChildPage}
            />
            <PrivateRoute
              exact
              perform={`${ORGANIZATIONS}:${ACTIONS.VISIT_ONE}`}
              path={`/${ORGANIZATIONS}/:id`}
              component={OrganizationsPage}
            />
            
            <PrivateRoute
              exact
              perform={`${CHILDREN}:${ACTIONS.VISIT}`}
              path={`/${CHILDREN}`}
              component={ChildrenPage}
            />
            <PrivateRoute
              exact
              perform={`${CHILDREN}:${ACTIONS.VISIT_ONE}`}
              path={`/${CHILDREN}/:id`}
              component={ChildProfilePage}
            />
           
            <PrivateRoute component={NotFound} />
          </Switch>
        </React.Suspense>
      </Router>
    </div>
  );
}

export default App;

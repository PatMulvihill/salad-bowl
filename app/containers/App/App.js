import React from 'react';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {Link, Route, Switch} from 'react-router-dom';
import {css} from 'emotion';
import i18n from 'i18n';
import {MEDIA, SHADES} from 'styles/consts';
import {ToastContainer} from 'react-toastify';
import Loadable from 'react-loadable';
import {Col, Container, Input, Row} from 'reactstrap';
import {auth, database} from 'services/firebase';
import {setLanguageAction, setTranslations, setUserIdAction} from 'actions/root';
import {setCustomLocations, setSelectedLocations} from 'actions/config';
import {TRANSLATIONS} from 'consts';

import SpinnerModal from 'components/SpinnerModal/SpinnerModal';
import SaladIcon from 'components/SaladIcon/SaladIcon';

const LoadableSettings = Loadable({loader: () => import('../Settings/Settings'), loading: SpinnerModal});
const LoadableGame = Loadable({loader: () => import('../Game/Game'), loading: SpinnerModal});
const LoadableJoinRoom = Loadable({loader: () => import('../JoinRoom/JoinRoom'), loading: SpinnerModal});

export class App extends React.Component{
  componentDidMount() {
    const { setUserId } = this.props;
    auth.signInAnonymously().then((authUser) => {
      setUserId(authUser.user.uid);
      this.importTranslations();
    });
  }

  importTranslations = async () => {
    // imported less than 6 hours ago
    if(this.props.translationsImportTime && Date.now() - this.props.translationsImportTime < 6 * 60 * 60 * 1000) return null;

    const translationsSnapshot = await database.ref('translations').once('value');
    this.props.setTranslations(translationsSnapshot.val() || {});
  };

  setLanguage = (language) => {
    const { setLanguage } = this.props;
    i18n.changeLanguage(language);
    setLanguage(language);
  };

  render() {
    const { language, translations = {} } = this.props;
    return (
      <Container className={styles.container}>
        <Helmet
          defaultTitle="Salad Bowl"
        >
          <meta name="description" content="Ensemble React Web Template" />
        </Helmet>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Row className="align-items-center justify-content-center">
              <Col xs="12" sm="4" className="text-center">
                <Link to="/">
                  <SaladIcon />
                  Salad Bowl
                </Link>
              </Col>
            </Row>
            <Switch>
              <Route exact path="/settings" component={LoadableSettings} />
              <Route exact path="/join" component={LoadableJoinRoom} />
              <Route exact path="/" component={LoadableGame} />
            </Switch>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    );
  }
}

const styles = {
  container: css({
    paddingTop: 50,
  }),
  languageSelector: css({
    [MEDIA.xsOnly]: {
      marginTop: 10,
    },
  }),
  localizationContainer: css({
    marginTop: 40,
    fontSize: '0.8rem',
  }),
  localizationLink: css({
    marginLeft: 10,
  }),
  footer: css({
    marginTop: 20,
    marginBottom: 30,
    fontSize: '0.8rem',
    color: SHADES.light,
  }),
};

const mapStateToProps = (state) => ({
  language: state.root.language,
  translations: state.root.translations,
  translationsImportTime: state.root.translationsImportTime,
});

const mapDispatchToProps = (dispatch) => ({
  setUserId: (userId) => dispatch(setUserIdAction(userId)),
  setLanguage: (language) => dispatch(setLanguageAction(language)),
  setSelectedLocations: (selectedLocations) => dispatch(setSelectedLocations(selectedLocations)),
  setCustomLocations: (customLocations) => dispatch(setCustomLocations(customLocations)),
  setTranslations: (translations) => dispatch(setTranslations(translations)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const ProjectTitle = props => (
      <h2 className="projectTitle">
        {props.title}
        <small>{props.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle tagline={siteConfig.tagline} title={siteConfig.title} />
          <PromoSection>
            <Button href={docUrl('overview.html')}>Documentation</Button>
            <Button href={siteConfig.repoUrl}>Github</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const Badges = () => (
      <div
        className="productShowcaseSection"
        style={{textAlign: 'center'}}>
        <MarkdownBlock>
        [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
        [![build](https://github.com/d2a4u/sqs4s/actions/workflows/build-main.yml/badge.svg?branch=master)](https://github.com/d2a4u/sqs4s/actions/workflows/build-main.yml)
        [![Codacy Badge](https://api.codacy.com/project/badge/Grade/8a331de033cb4700acddb175af4148bb)](https://www.codacy.com/app/d2a4u/sqs4s?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=d2a4u/sqs4s&amp;utm_campaign=Badge_Grade)
        [![Download](https://badgen.net/maven/v/maven-central/io.github.d2a4u/sqs4s-native_2.13)](https://search.maven.org/search?q=g:io.github.d2a4u%20AND%20a:sqs4s-*)
        [![Join the chat at https://gitter.im/sqs4s/community](https://badges.gitter.im/sqs4s/community.svg)](https://gitter.im/sqs4s/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
        </MarkdownBlock>
      </div>
    );
    const Index = () => (
      <div>
        <MarkdownBlock>
        ## Get Started
        </MarkdownBlock>
        <MarkdownBlock>
        Add the following to your `build.sbt`, see the badge above for latest version. Supports Scala 2.12 and 2.13.
        </MarkdownBlock>
        <MarkdownBlock>
        ```
        libraryDependencies += "io.github.d2a4u" %% "sqs4s-native" % "LATEST_VERSION"
        ```
        </MarkdownBlock>
      </div>
    );

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
            <div className="index">
              <Badges />
              <Index />
            </div>
        </div>
      </div>
    );
  }
}

module.exports = Index;

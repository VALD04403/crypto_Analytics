import React, { Component } from 'react';
import { ReCaptcha } from 'react-recaptcha-google';
class RecaptchaComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
  }
  componentDidMount() {
    if (this.captchaDemo) {
      this.captchaDemo.reset();
      this.captchaDemo.execute();
    }
  }
  onLoadRecaptcha() {
    if (this.captchaDemo) {
      this.captchaDemo.reset();
      this.captchaDemo.execute();
    }
  }
  verifyCallback(recaptchaToken) {
    console.log(recaptchaToken, '<= your recaptcha token');
  }
  render() {
    return (
      <div style={{ opacity: '0' }}>
        <ReCaptcha
          ref={(el) => {
            this.captchaDemo = el;
          }}
          size='invisible'
          render='explicit'
          sitekey='6LcIwK4ZAAAAAIYxQImv3DMX-vxqUEZdbqqpVzuk'
          onloadCallback={this.onLoadRecaptcha}
          verifyCallback={this.verifyCallback}
        />
      </div>
    );
  }
}
export default RecaptchaComponent;

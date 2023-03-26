<template>
    <div class="footer-footer" v-bind:class="rootClassName">
      <div class="footer-content">
        <div class="footer-information">
          <div class="footer-heading"><h1>{{ heading }}</h1></div>
          <div class="footer-socials"></div>
        </div>
        <div class="footer-container">
          <div class="footer-column">
            <span class="footer-header">{{ Header }}</span>
            <span class="footer-text1">{{ text2 }}</span>
          </div>
        </div>
      </div>
      <span class="footer-text2">{{ text }}</span>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Footer',
    props: {
      text: {
        type: String,
        default: '© 2023 PillPal All Rights Reserved.',
      },
      heading: {
        type: String,
        default: 'PillPal',
      },
      Header: {
        type: String,
        default: 'Any questions? Feel free to contact us!',
      },
      text2: {
        type: String,
        default: 'Email: PillPal@gmail.com',
      },
      rootClassName: String,
    },
  }
  </script>
  
  <style scoped>
  .footer-footer {
    gap: var(--dl-space-space-threeunits);
    color: white;
    width: 100%;
    display: flex;
    position: relative;
    align-items: center;
    padding-top: var(--dl-space-space-sixunits);
    padding-left: var(--dl-space-space-fiveunits);
    padding-right: var(--dl-space-space-fiveunits);
    flex-direction: column;
    padding-bottom: var(--dl-space-space-sixunits);
    background-color: #094e01;
  }
  .footer-content {
    width: 100%;
    display: flex;
    max-width: 1200px;
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-between;
  }
  .footer-information {
    gap: var(--dl-space-space-unit);
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
  .footer-heading {
    gap: var(--dl-space-space-unit);
    flex: 0 0 auto;
    width: 100%;
    display: flex;
    max-width: 265px;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
  }
  .footer-socials {
    gap: var(--dl-space-space-unit);
    flex: 0 0 auto;
    width: 100%;
    display: flex;
    max-width: 265px;
    align-items: flex-start;
    flex-direction: row;
    justify-content: flex-start;
  }
  .footer-container {
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-between;
  }
  .footer-column {
    gap: var(--dl-space-space-unit);
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
  }
  .footer-header {
    font-size: 2em;
    font-style: normal;
    font-family: Poppins;
    font-weight: 500;
    line-height: 30px;
  }
  .footer-text1 {
    font-size: 1.5em;
    margin-top: var(--dl-space-space-oneandhalfunits);
  }
  .footer-text2 {
    color: #ffffff;
    width: 100%;
    font-size: 14px;
    max-width: 1200px;
    line-height: 21px;
  }
  .footer-root-class-name {
    background-color: #14a400;
  }
 
  </style>
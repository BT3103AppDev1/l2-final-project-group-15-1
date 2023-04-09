<template>
    <div class="footer" >
      <div class="content">
        <div class="information">
          <div class="heading"><h1> PillPal </h1></div>
          <div class="socials"></div>
        </div>
        <div class="container">
          <div class="column">
            <span class="header">'Any questions? Feel free to contact us!'</span>
            <span class="text1">Email: PillPal@gmail.com</span>
          </div>
        </div>
      </div>
      <span class="text2"> © 2023 PillPal All Rights Reserved.</span>
    </div>
  </template>
  
  <style scoped>

  .footer {
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
    background-color: #14a400;
    height:100px;
  }
  .content {
    width: 100%;
    display: flex;
    max-width: 1200px;
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-between;
  }
  .information {
    gap: var(--dl-space-space-unit);
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
  .heading {
    gap: var(--dl-space-space-unit);
    flex: 0 0 auto;
    width: 100%;
    display: flex;
    max-width: 265px;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
  }
  .socials {
    gap: var(--dl-space-space-unit);
    flex: 0 0 auto;
    width: 100%;
    display: flex;
    max-width: 265px;
    align-items: flex-start;
    flex-direction: row;
    justify-content: flex-start;
  }
  .container {
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-between;
  }
  .column {
    gap: var(--dl-space-space-unit);
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
  }
  .header {
    font-size: 2em;
    font-style: normal;
    font-family: Poppins;
    font-weight: 500;
    line-height: 30px;
  }
  .text1 {
    font-size: 1.5em;
    margin-top: var(--dl-space-space-oneandhalfunits);
  }
  .text2 {
    color: #ffffff;
    width: 100%;
    font-size: 14px;
    max-width: 1200px;
    line-height: 21px;
  }
  </style>
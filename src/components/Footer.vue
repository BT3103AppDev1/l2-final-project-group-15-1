<template>
    <div class="footer" >
      <div class="content">
        <div class="information">
          <div class="heading"><h1> PillPal </h1></div>
          <span class="copyright"> © 2023 PillPal All Rights Reserved.</span>
        </div>
        <div class="container">
          <div class="column">
            <span class="header">Any questions? Feel free to contact us!</span>
            <span class="email">Email: PillPal@gmail.com</span>
          </div>
        </div>
      </div>
      
    </div>
  </template>
  
  <style scoped>

  .footer {
    color: white;
    width: 100%;
    background-color: #14a400;
    height:200px;
  }

  .content {
    width: 100%;
    display: flex;
    padding:2rem;
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-between;
  }
  .information *, .container *{
    margin:10px;
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
  .container {
    display: flex;
    align-content: space-between;
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
    font-weight: 500;
    line-height: 30px;
  }
  .email {
    font-size: 1.5em;
  }
  .copyright {
    color: #ffffff;
    width: 100%;
    font-size: 14px;
    max-width: 1200px;
    line-height: 21px;
  }
  </style>
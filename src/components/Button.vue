<template>
    <div class="button-container">
      <button class="button-button button">{{ button }}</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Button',
    props: {
      button: {
        type: String,
        default: 'Button',
      },
      
    },
  }
  </script>
  
  <style scoped>
  .button-container {
    width: 169px;
    height: 44px;
    display: flex;
    position: relative;
    align-items: flex-start;
    flex-direction: column;
  }
  .button-button {
    width: 100%;
    height: 100%;
    box-shadow: 5px 5px 10px 0px #d4d4d4;
    text-align: center;
    background-color: #ADE2DF;
    cursor:pointer;
  }

  .button:hover {
  background-color: lightgreen;
  box-shadow: 0px 0px 20px -18px;
}
  
  </style>
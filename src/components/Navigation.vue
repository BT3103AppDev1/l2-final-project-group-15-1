<template>
    <nav class="navigation-navbar" v-bind:class="rootClassName">
      <div class="navigation-container">
        <svg viewBox="0 0 877.7142857142857 1024" class="navigation-icon">
          <path
            d="M713.143 73.143c90.857 0 164.571 73.714 164.571 164.571v548.571c0 90.857-73.714 164.571-164.571 164.571h-107.429v-340h113.714l17.143-132.571h-130.857v-84.571c0-38.286 10.286-64 65.714-64l69.714-0.571v-118.286c-12-1.714-53.714-5.143-101.714-5.143-101.143 0-170.857 61.714-170.857 174.857v97.714h-114.286v132.571h114.286v340h-304c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571z"
          ></path></svg>
          <svg viewBox="0 0 877.7142857142857 1024" class="navigation-icon2">
          <path
            d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"
          ></path></svg>
          <svg viewBox="0 0 950.8571428571428 1024" class="navigation-icon4">
          <path
            d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"
          ></path>
        </svg>
        <h1 class="navigation-text">{{ PillPal }}</h1>
        <div class="navigation-quick-actions">
          <router-link to="/home" class="link">Log in</router-link>
          <router-link to="/home" class="navigation-navlink">
            <div class="navigation-sign-up-btn">
              <span class="navigation-sign-up">
                <span>Register</span>
                <br />
              </span>
            </div>
          </router-link>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  
  export default {
    name: 'Navigation',
    props: {
      PillPal: {
        type: String,
        default: 'PillPal',
      },
      rootClassName: String,
    },
  }
  </script>
  
  <style scoped>
  .navigation-navbar {
    width: 100%;
    display: flex;
    position: relative;
    max-width: 1200px;
    padding-top: var(--dl-space-space-twounits);
    padding-left: var(--dl-space-space-unit);
    padding-right: var(--dl-space-space-unit);
    flex-direction: column;
    padding-bottom: var(--dl-space-space-twounits);
    justify-content: space-between;
  }
  .navigation-container {
    flex: 0 0 auto;
    width: auto;
    height: auto;
    display: flex;
    position: relative;
    align-items: flex-start;
  }
  .navigation-icon {
    width: 50px;
    height: 50px;
    margin-right: var(--dl-space-space-oneandhalfunits);
  }
  .navigation-icon2 {
    width: 50px;
    height: 50px;
    margin-right: var(--dl-space-space-oneandhalfunits);
  }
  .navigation-icon4 {
    width: 50px;
    height: 50px;
  }
  .navigation-text {
    top: 10px;
    left: 40%;
    right: 40%;
    position: absolute;
    text-align: center;
  }
  .navigation-quick-actions {
    gap: var(--dl-space-space-oneandhalfunits);
    top: 0px;
    right: var(--dl-space-space-unit);
    width: auto;
    height: 50px;
    display: flex;
    position: absolute;
    align-items: center;
    flex-direction: row;
    justify-content: flex-end;
  }
  .navigation-navlink {
    display: contents;
  }
  .navigation-sign-up-btn {
    display: flex;
    transition: 0.3s;
    align-items: flex-start;
    padding-top: var(--dl-space-space-unit);
    padding-left: var(--dl-space-space-oneandhalfunits);
    border-radius: var(--dl-radius-radius-radius8);
    padding-right: var(--dl-space-space-oneandhalfunits);
    flex-direction: row;
    padding-bottom: var(--dl-space-space-unit);
    justify-content: center;
    text-decoration: none;
    background-color: #ADE2DF;
  }
  .navigation-sign-up-btn:hover {
    background-color: rgba(173, 226, 223, 0.5);
  }
  .navigation-sign-up {
    font-style: normal;
    font-weight: 500;
  }
  .navigation-root-class-name {
    max-width: 100%;
  }
  </style>
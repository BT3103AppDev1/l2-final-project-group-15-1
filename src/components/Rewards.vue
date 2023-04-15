<template>
  <div class = 'background'>
    <div class = box>
      
        <!-- Display the user's name, reward points, and current rewards -->
        <div class ="userDetails" v-if="user">
          <h1>{{ user.name }}</h1> <br><br>
          <h3>Points: <span class="points">{{ user.points }}</span></h3>
        </div>

        <div class="userRewards">
          <h1>Your Rewards</h1>
          <ul v-if="user">
            <li v-for="reward in user.rewards" :key="reward.id">
              {{ reward.name }}
              <button v-if='reward.redeemable' @click="getRedemptionCode(reward)">Get Code </button>  
            </li>
          </ul>
        </div>
    </div> 
        <!-- Display the list of available rewards -->
      <div class="allRewards">
        <h1>Available Rewards</h1>
        <div class="rewards">
          <div v-for="reward in rewards" :key="reward.id" class ='rewardCard'>
            <h2>{{ reward.name }}</h2>
            <h3>Points: {{ reward.points }}</h3>
            <button :disabled="reward.points >= user.points" @click="redeemReward(reward)">Redeem</button>
          </div>
        </div>
      </div>
  </div>

</template>


<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { increment, arrayUnion,collection, getDoc, doc, getDocs, updateDoc } from "firebase/firestore";

export default {

  data() {
    return {
      user: {
				name: '',
				points:'',
				rewards:'',
			},
      rewards: [],
      redeemable: true,
      emailSent: false,
      
    };
  },

  mounted() {
    this.display();
    
    let script= document.createElement('script')
    script.setAttribute('src', "https://cdn.jsdelivr.net/npm/emailjs-com@2.4.0/dist/email.min.js")
    document.head.appendChild(script)
    
  },

  methods: {
    async display() {
      const db = getFirestore(firebaseApp);
      const auth = getAuth(firebaseApp);
      const user = auth.currentUser;
      const USERID = user.email;

      const docRef = doc(db, "PillPal", USERID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.user = {
          name: docSnap.data().Name,
          points: docSnap.data().Reward_Points,
          rewards: docSnap.data().Rewards,
        };
      }

      const rewardsRef = collection(db, "AllRewards");
      const querySnapshot = await getDocs(rewardsRef);

      querySnapshot.forEach((doc) => {
        this.rewards.push({
          id: doc.id,
          name: doc.data().Reward_Name,
          points: doc.data().Points,
        });
      });
    },

    // Redeem a reward
    async redeemReward(reward) {
      // Update Firestore to deduct the reward points and add the redeemed reward
      const db = getFirestore(firebaseApp);
      const auth = getAuth(firebaseApp);
      const user = auth.currentUser;
      const USERID = user.email;
      
      reward.redeemable = true;
      reward.redemptionCode = Math.random().toString(36).substring(2,10)
      await updateDoc(doc(db, "PillPal", USERID), {
          Reward_Points: increment(-reward.points),
          Rewards: arrayUnion(reward),
        })
        
      
        // Update the user's data in the component
        this.user.points -= reward.points;
        this.user.rewards.push(reward);
      
    },

    async getRedemptionCode(reward) {
      const auth = getAuth(firebaseApp);
      const user = auth.currentUser;
      const USERID = user.email;
      emailjs.init('YPI4wyOhSA5g6D-cS');
      const code = reward.redemptionCode;
      var params = {
        to_name: this.user.name,
        reward_name: reward.name,
        redemption_code: `${code}`,
        //to change
        to_email: user.email

      }
        emailjs.send('service_mab6y4u','template_h3w5tgr',params)
        reward.redeemable = false;
        this.emailSent = true;
        alert('Check your email for your redemption code.');
      },
  },
};
</script>

<style scoped>

.background {
  background-image: url('../assets/background-image2.png');
  background-repeat: no-repeat;
  background-size:cover;
}
.box {
	display:flex;
	flex-direction: row;
	justify-content:space-between;
  
}

.userDetails{
  display: flex;
  min-width: 300px;
  justify-content: center;
  flex-direction: column;
  border: 2px solid #ccc;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius:10px;
  margin: 2rem;
  background-color:white;
}

.userDetails h1, .userDetails h3{
  text-align:left;
  color: darkblue
}

.points{
  color:black;
}

.userRewards {
  display: flex;
  
  justify-content: center;
  flex-direction: column;
  border: 2px solid #ccc;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius:10px;
  margin: 2rem;
  background-color:white;
}

.userRewards h1 {
  text-align: center;
}

.userRewards ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.userRewards li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px ;
  font-weight: bold;
}

button {
  cursor:pointer;
  background-color: rgb(75, 255, 75); 
  padding:6px;
  margin-left:10px;
  border-radius:10px;
  
  box-shadow: 0 0 20px -20px;
  color:black;
}

button:disabled {
  background-color: lightgray;
  color: gray;
  cursor: not-allowed;
}

button:not(:disabled):hover {
  background-color: lightgreen;
  box-shadow: 0px 0px 20px -18px;
  border: 2.5px solid lightgreen;
}

button:not(:disabled):active {
  transform: scale(0.9);
}

.rewards {
  display:flex;
  justify-content: space-evenly;
  text-align:center;
  /* background: palegreen; */
}

.rewardCard * {
  margin:10px;
}
.rewardCard {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  padding: 2rem;
  margin: 10px;
  display: flex;
  box-sizing: border-box;
  text-align: center;
  align-items:center;
  flex-direction:column;
  height: 300px;
  width:30%;
  justify-content:center;
  background-clip: padding-box;
  background-color:white;
}

.rewardCard h2 {
  color:darkblue;
}

/* .box{
  background-color:paleturquoise;
} */

.allRewards h1{
  margin:1rem;
}


</style>
  
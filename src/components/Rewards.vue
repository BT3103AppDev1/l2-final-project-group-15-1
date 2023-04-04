<template>
	<div class = box>
		
			<!-- Display the user's name, reward points, and current rewards -->
			<div v-if="user">
				<h1>{{ user.name }}</h1>
				<h3>Points: {{ user.points }}</h3>
			</div>

			<div>
				<h1>Your Rewards</h1>
				<ul v-if="user">
					<li v-for="reward in user.rewards" :key="reward.id">{{ reward.name }}</li>
				</ul>
			</div>
	</div> <br><br>
			<!-- Display the list of available rewards -->
		<div>
			<h3>Available Rewards</h3>
			<div class="rewards">
				<div v-for="reward in rewards" :key="reward.id">
					<h2>{{ reward.name }}</h2>
					<h3>Points: {{ reward.points }}</h3>
					<button :disabled="reward.points >= user.points" @click="redeemReward(reward)">Redeem</button>
				</div>
			</div>
		</div>
	
	
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
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
    };
  },

  mounted() {
    this.display();
  },

  methods: {
    async display() {
      const db = getFirestore(firebaseApp);
      const USERID = "johndoe@gmail.com";

      const docRef = doc(db, "PillPal", USERID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.user = {
          name: docSnap.data().Name,
          points: docSnap.data().Reward_Points,
          rewards: docSnap.data().Rewards,
        };
      }

      const rewardsRef = collection(db, "PillPal", "AllRewards", "Rewards");
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
      const USERID = "johndoe@gmail.com";
      
      await updateDoc(doc(db, "PillPal", USERID), {
          Reward_Points: increment(-reward.points),
          Rewards: arrayUnion(reward),
        })
        
        // Update the user's data in the component
        this.user.points -= reward.points;
        this.user.rewards.push(reward);
        
    },
  },
};
</script>

<style scoped>
.box {
	display:flex;
	flex-direction: row;
	justify-content:space-between;
}
</style>
  
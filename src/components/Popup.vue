<template>
    <div class="button">
        <p>{{ popupMessage }}</p>
        <button @click="close">Close</button>
    </div>
</template>
  
<script>
export default {
    props: ['popupMessage'],
    methods: {
        close() {
            this.$emit('close');
        },
    },
};
</script>
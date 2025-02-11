export default{
    template:`
    <div>
        <div v-if="this.$store.state.role==='Admin'">
        </div>
        <div v-if="this.$store.state.role==='Customer'">
        </div>
        <div v-else>
        </div>
    </div>
    
    `
}
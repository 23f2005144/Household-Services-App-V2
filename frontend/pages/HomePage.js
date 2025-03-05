export default{
    template:`
    <div>
        <h1 class="Login-Title display-1 text-center">Abode Mantra:Your A-Z Cleaning Experts</h1>
        <hr style="border:9px dashed lightseagreen;">
        <p class="Login-subtitle text-center">Experience the Comfort and Satisfaction of a Perfectly Maintained Home</p><br>
        <img class="img-fluid rounded float-end" style="height: 440px; width: 440px;" src="/static/bucket-303265_640-copywritefreefromPixabay.png">
        <img class="img-fluid rounded float-start" style="height: 440px; width: 440px;" src="/static/cleaning-up-294085_1920-copywritefreefromPixabay.png"><br>
        <div style="border: 5px solid teal; padding: 15px; border-radius: 7px; width: 40%; margin: auto; text-align: center;">
            <h3 class="text-center">Why Choose Abode Mantra?</h3><br>
            <div style="display: flex; flex-direction: column; align-items: center;">
                <div style="width: 60%; text-align: center; padding: 10px;">
                    <h5>👷‍♂️ Verified Service Professionals</h5>
                    <p>All experts go through background checks to ensure safety and quality.</p>
                </div>
                <div style="width: 60%; text-align: center; padding: 10px;">
                    <h5>📝 Hassle-Free Booking</h5>
                    <p>Book any service in just a few clicks without complications.</p>
                </div>
                <div style="width: 60%; text-align: center; padding: 10px;">
                    <h5>💵 Affordable Pricing</h5>
                    <p>Get the best home services at the most competitive rates.</p>
                </div>
            </div><br>
            <p style="font-weight: bold;" class="text-center fs-5">📧 For any queries or support, contact us at support@abodemantra.in</p>
        </div>
    </div>  
    `,
    mounted() {
        this.style=document.createElement('style')
        this.style.textContent=`
        .Login-Title {
            background-color: lightgoldenrodyellow;
            font-style: italic;
            font-weight: bolder;
            padding: 20px;
            font-size: 80px;
            font-family: 'Times New Roman', Times, serif;
            color: #00827f;
        }

        .Login-subtitle {
            background-color: lightgoldenrodyellow;
            font-style: italic;
            padding: 15px;
            font-size: 30px;
            font-weight: bolder;
            color: lightseagreen;
        }

        .Login-welcome {
            background-color: lightgoldenrodyellow;
            padding: 5px;
            font-size: 35px;
            font-weight: bolder;
            color: black;
            margin: auto;
        }
        body{
        background-color: lightgoldenrodyellow;
        }`
        document.head.appendChild(this.style)
    },
    beforeDestroy(){
        if (this.style) {
            document.head.removeChild(this.style)
        }
    },
    data(){
        return{
            style:null
        }
    }
}
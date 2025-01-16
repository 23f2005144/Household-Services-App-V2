export default{
    template:`
        <div>
        <h1 class="Login-Title display-1 text-center">Abode Mantra:Your A-Z Cleaning Experts</h1>
        <hr style="border:9px dashed lightseagreen;">
        <p class="Login-subtitle text-center">Experience the Comfort and Satisfaction of a Perfectly Maintained Home</p><br>
        <!--<img class="img-fluid rounded float-end" style="height: 440px; width: 440px;" src="/static/bucket-303265_640-copywritefreefromPixabay.png">
        <img class="img-fluid rounded float-start" style="height: 440px; width: 440px;" src="/static/cleaning-up-294085_1920-copywritefreefromPixabay.png">-->
    </div>
    `,
    mounted() {
        this.style=document.createElement('style')
        this.style.innerHTML=`
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
    unmounted() {
        if (this.style) {
            document.head.removeChild(this.style);
        }
    },
    data(){
        return{
            style:null
        }
    }
}
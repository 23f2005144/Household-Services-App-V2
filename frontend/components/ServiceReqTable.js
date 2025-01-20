export default{
    props:{
        service_reqs_data:Array
    },
    template:`
    <div>
        <div class="container">
            <p class="mb-0" style="color:teal; font-size:35px; font-weight:bold;">Service Requests</p>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Service ID </th>
                        <th>Service Name</th>
                        <th>Pro ID</th>
                        <th>Pro Name</th>
                        <th>Date of Request</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="sreq in service_reqs_data" :key="sreq.serv_req_id">
                        <td><button class="btn btn-primary" @click="$emit("Serv_Req_Details",sreq.serv_req_id)">{{sreq.serv_req_id}}</button></td>
                        <td><button class="btn btn-primary" @click="$emit("Serv_Details",sreq.serv_id)">{{sreq.serv_id}}</button></td>
                        <td>{{sreq.serv_name}}</td>
                        <td><button class="btn btn-primary" @click="$emit("Pro_Details",sreq.pro_id)">{{sreq.pro_id}}</button></td> <!-- added func for modal for service and pro -->
                        <td>{{sreq.pro_name}}</td>
                        <td>{{sreq.date_of_req}}</td>
                        <td>{{sreq.service_status}}</td>
                    </tr>
                </tbody> 
            </table>
        </div>
    </div>
    `,
}
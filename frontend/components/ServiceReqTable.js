export default{
    props:{
        service_reqs_data:Array
    },
    template:`
    <div>
        <div class="container">
            <div v-if="$store.state.role==='Admin'">
                <p class="mb-0" style="color:teal; font-size:35px; font-weight:bold;">Service Requests</p>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Service ID </th>
                            <th>Service Name</th>
                            <th>Pro ID</th>
                            <th>Pro Name</th>
                            <th>DateTime_of_Request</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="sreq in service_reqs_data" :key="sreq.serv_req_id">
                            <td><button type="button" class="btn btn-primary" @click="$emit("Serv_Req_Details",sreq.serv_req_id)">{{sreq.serv_req_id}}</button></td>
                            <td><button type="button" class="btn btn-primary" @click="$emit("Serv_Details",sreq.serv_id)">{{sreq.serv_id}}</button></td>
                            <td>{{sreq.serv_name}}</td>
                            <td><button type="button" class="btn btn-primary" @click="$emit("Pro_Details",sreq.pro_id)">{{sreq.pro_id}}</button></td> <!-- added func for modal for service and pro -->
                            <td>{{sreq.pro_name}}</td>
                            <td>{{sreq.serv_request_datetime}}</td>
                            <td>{{sreq.service_status}}</td>
                        </tr>
                    </tbody> 
                </table>
            </div>
            <div v-else-if="$store.state.role==='Customer'">
                <p class="mb-0" style="color:teal; font-size:40px; font-weight:bold;">Service History</p>
                <table class="table table-hover table-bordered border-primary">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Service Type</th>
                            <th>Service Name</th>
                            <th>Service Price</th>
                            <th>Assigned Professional</th>
                            <th>Contact Number</th>
                            <th>DateTime_of_Request</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tr v-for="sreq in service_reqs_data" :key="sreq.serv_req_id">
                        <td><button type="button" class="btn btn-primary" @click="$emit("Serv_Req_Details_Cust",sreq.serv_req_id)">{{sreq.serv_req_id}}</button></td>
                        <td>{{sreq.serv_type}}</td>
                        <td>{{sreq.serv_name}}</td>
                        <td>{{sreq.serv_price}}</td>
                        <td>{{sreq.pro_name}}</td>
                        <td>{{sreq.pro_contact_no}}</td>
                        <td>{{sreq.serv_request_datetime}}</td>
                        <td>{{sreq.serv_status}}</td>
                        <td>
                            <div v-if="sreq.service_status==='Requested'">
                                <button type="button" class="btn btn-danger" @click="$emit("Serv_Req_Cancel",sreq.serv_req_id)">Cancel Service?</button>
                            </div>
                            <div v-else-if="sreq.service_status==='Accepted'">
                                <button type="button" class="btn btn-danger" @click="$emit("Serv_Req_Cancel",sreq.serv_req_id)">Cancel Service?</button>
                                <button type="button" class="btn btn-warning" @click="$emit("Serv_Req_Close",sreq.serv_req_id)">Close Service?</button>
                            </div>
                            <div v-else-if="sreq.service_status==='Closed'">
                                <p>The service was rated {{sreq.serv_rating}}</p>
                                <p>The professional was rated{{sreq.pro_rating}}</p>
                            </div>
                            <div v-else>
                                <p>This service was cancelled</p>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    `,
}
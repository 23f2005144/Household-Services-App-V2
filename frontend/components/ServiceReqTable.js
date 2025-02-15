export default{
    props:{
        service_reqs_data:Array,
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
                            <td><button type="button" class="btn btn-secondary" @click="$emit('Serv_Req_Details',sreq.serv_req_id)">{{sreq.serv_req_id}}</button></td>
                            <td><button type="button" class="btn btn-warning" @click="$emit('Serv_Details',sreq.serv_id)">{{sreq.serv_id}}</button></td>
                            <td>{{sreq.serv_name}}</td>
                            <td>
                                <div v-if="sreq.pro_id">
                                    <button type="button" class="btn btn-primary" @click="$emit('Pro_Details',sreq.pro_id)">{{sreq.pro_id}}</button>
                                </div>
                                <div v-else>
                                    <p> Not yet assigned</p>
                                </div>
                            </td>
                            <td>
                                <div v-if="sreq.pro_name">
                                    {{sreq.pro_name}}
                                </div>
                                <div v-else>
                                    <p> Not yet assigned</p>
                                </div>
                            </td>
                            <td>{{sreq.serv_request_datetime}}</td>
                            <td>{{sreq.serv_status}}</td>
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
                            <th>Service Name</th>
                            <th>Service Price ₹</th>
                            <th>Service Duration (hrs)</th>
                            <th>Assigned Professional</th>
                            <th>Contact Number</th>
                            <th>DateTime_of_Request</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="sreq in service_reqs_data" :key="sreq.serv_req_id">
                            <td><button type="button" class="btn btn-primary" @click="$emit('Serv_Req_Details_Cust',sreq.serv_req_id)">{{sreq.serv_req_id}}</button></td>
                            <td>{{sreq.serv_name}}</td>
                            <td>{{sreq.serv_price}}</td>
                            <td>{{sreq.serv_duration}}</td>
                            <td>
                                <div v-if="sreq.pro_name">
                                    <button type="button" class="btn btn-info" @click="$emit('Pro_Details',sreq.pro_id)">{{sreq.pro_name}}</button>
                                </div>
                                <div v-else>
                                    <p> Not yet assigned</p>
                                </div>
                            </td>
                            <td>
                                <div v-if="sreq.pro_contact_no">
                                    {{sreq.pro_contact_no}}
                                </div>
                                <div v-else>
                                    <p> Not yet assigned</p>
                                </div>
                            </td>
                            <td>{{sreq.serv_request_datetime}}</td>
                            <td>{{sreq.serv_status}}</td>
                            <td>
                                <div v-if="sreq.serv_status==='Requested' ">
                                    <button type="button" class="btn btn-danger" @click="$emit('Serv_Req_Cancel',sreq.serv_req_id)">Cancel Service?</button>
                                </div>
                                <div v-else-if="sreq.serv_status==='Accepted'">
                                    <button type="button" class="btn btn-danger" @click="$emit('Serv_Req_Cancel',sreq.serv_req_id)">Cancel Service?</button>
                                    <button type="button" class="btn btn-warning" @click="$emit('Serv_Req_Close',sreq.serv_req_id)">Close Service?</button>
                                </div>
                                <div v-else-if="sreq.serv_status==='Closed'">
                                    <p>The service was rated {{sreq.serv_rating}} stars</p>
                                    <p>The professional was rated {{sreq.pro_rating}} stars</p>
                                </div>
                                <div v-else>
                                    <p>This service was cancelled</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else><!-- Assuming now that role=Professional-->
                <div class="row my-3">
                    <p class="mb-0" style="color:teal; font-size:35px; font-weight:bold;">Service History</p>
                    <table class="table table-hover table-bordered border-primary">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Service Name</th>
                                <th>Customer Name</th>
                                <th>Service Location</th>
                                <th>DateTime_of_Completion</th>
                                <th>Service Status</th>
                                <th>Service Remarks</th>
                                <th>Service Rating</th>
                                <th>My Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="sh in service_reqs_data" :key="sh.serv_req_id">
                                <td><button type="button" class="btn btn-primary" @click="$emit('Serv_Req_Details_Pro',sh.serv_req_id)">{{sh.serv_req_id}}</button></td>
                                <td>{{sh.serv_name}}</td>
                                <td>{{sh.cust_name}}</td>
                                <td>{{sh.cust_address}} {{sh.cust_pincode}}</td>
                                <td>{{sh.serv_close_datetime}}</td> 
                                <td>{{sh.serv_status}}</td>
                                <td>{{sh.serv_remarks}}</td>
                                <td>{{sh.serv_rating}}</td>
                                <td>{{sh.pro_rating}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    `,
}
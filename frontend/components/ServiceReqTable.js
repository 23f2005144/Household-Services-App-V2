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
            <div v-else-if="$store.state.role==='Customer'">
                <p class="mb-0" style="color:teal; font-size:40px; font-weight:bold;">Service History</p>
                <table class="table table-hover table-bordered border-primary">
                    <thead>
                        <th>Service Type</th>
                        <th>Service Name</th>
                        <th>Assigned Professional</th>
                        <th>Professional's Experience</th>
                        <th>Contact Number</th>
                        <th>Date of Request</th>
                        <th>Status</th>
                        <th>Action</th>
                    </thead>
                    <tr>
                    <td>{{y[1]}}</td>
                    <td>{{y[2]}}</td>
                    <td>{{y[3]}}</td>
                    {% if y[4]==None %}
                        <td>{{y[4]}}</td>
                    {% else %}
                        <td>{{y[4]}} Yrs</td>
                    {% endif %}
                    <td>{{y[5]}}</td>
                    <td>{{y[6]}}</td>
                    {% if y[7]=='Closed' %}
                        <td>Closed</td>
                        <td>
                        Service was rated <strong>{{y[8]}}</strong> Stars<br>
                        Professional was rated <strong>{{y[9]}}</strong> Stars
                        </td>
                    {% elif y[7]=='Cancelled' %}
                        <td>Cancelled</td>
                        <td>Cancelled by Customer/Admin</td>
                    {% elif y[7]=='Requested' %}
                        <td>{{y[7]}}</td>
                        <td>
                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-warning" disabled>Close Service?</button>
                            <a href="/customer/{{c_id}}/service/cancel/{{y[0]}}"><button type="button" class="btn btn-danger">Cancel Service?</button></a>
                        </div>
                        </td>
                    {% else %}
                        <td>{{y[7]}}</td>
                        <td>
                        <div class="btn-group" role="group">
                            <a href="/customer/{{c_id}}/service/close/{{y[0]}}"><button type="button" class="btn btn-warning">Close Service?</button></a>
                            <a href="/customer/{{c_id}}/service/cancel/{{y[0]}}"><button type="button" class="btn btn-danger">Cancel Service?</button></a>
                        </div>
                        </td>
                    {%endif%}
                    </tr>
                    {% endfor %}
                </table>
            </div>
        </div>
    </div>
    `,
}
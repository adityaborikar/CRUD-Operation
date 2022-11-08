<template>
  <div class="card bg-slate-900 w-[70%] mx-auto mt-10">
    <div class="my-2 mx-2">
      <table class="table w-full">
        <!-- head -->
        <thead>
          <tr>
            <th class="bg-slate-900 text-white">Emp_Id</th>
            <th class="bg-slate-900 text-white">Name</th>
            <th class="bg-slate-900 text-white">Contact No.</th>
            <th class="bg-slate-900 text-white">Department</th>
            <th class="bg-slate-900 text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover" v-for="d in data.values" :key="d.id">
            <td>{{ d.id }}</td>
            <td>{{ d.name }}</td>
            <td>{{ d.contact }}</td>
            <td>{{ d.department.name }}</td>
            <td>
              <button class="btn btn-ghost text-base" @click="remove(d.id)">
                <i class="fa fa-trash"></i>
              </button>
              <button class="btn btn-ghost text-base" @click="update(d.id)">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import EmployeeInterface from "../employeeInterface";
import { onMounted, reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const data = reactive<EmployeeInterface[]>([]);

let config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem(`access_token`),
  },
};
const getAll = () => {
  axios.get(`http://localhost:3030/employee/`, config).then((response) => {
    console.log(response);
    data.values = response.data.data;
  });
};
const remove = (id: number) => {
  axios.patch(`http://localhost:3030/employee/delete/${id}`, config);
  getAll();
};

const update = (id: number) => {
  router.push({ path: `/addEmployee`, query: { id: id } });
};

onMounted(() => {
  getAll();
});
</script>
